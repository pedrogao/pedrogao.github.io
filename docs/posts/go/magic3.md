---
icon: edit
title: go黑魔法——新增关键字
date: 2022-08-23
tag:
  - go
  - magic
category:
  - go
---

## 前言

几乎所有人都遇到过类似下面的 go 代码：

```go
if err != nil {
  return nil, err
}
```

负责任的说，笔者每天都得写很多次这样的 **err** 处理代码，以至于一个函数中，半数代码都是在  
处理 error。所以很多人用下面这张图来调侃：

![go-err](../../imgs/go-err.jpeg)

遇到如此重复错误处理代码，大家都会下意识的想办法去封装和简化，比如这里的两篇文章[GO 编程模式：错误处理](https://coolshell.cn/articles/21140.html) 和
[Go error 处理最佳实践](https://www.modb.pro/db/172962)。

一定程度上，这种技巧解决了 go error 处理的繁琐，但显然这种方式还是不够优雅。

思来想去，根本原因在于 **go** 本身 error 的哲学和机制问题，go 创始人希望工程师能够认真对待每一个 error，从而提升代码质量；  
另外 go 语言本身又没有提供错误处理语法糖，这使得 error 处理十分原始和重复。

既然常规方法不行，笔者就把视角放到了 go 本身上面：给 go 编译器新增**关键字**来处理 error。

## 编译源码

话不多说，我们直接开搞。

从 github 上下载 go 的源码，并将其切到（当前）最新的 go1.19 版上：

```shell
# git clone https://github.com/golang/go  
# cd go && git checkout go1.19 
# git checkout -b pedro
```

切换到了一个新的分支用于开发新的特性。然后设置目录变量，通过脚本编译出最新的 go1.19：

```shell
# pwd=$(pwd)
# cd $pwd/src

# ./make.bash 
Building Go cmd/dist using xxx/go1.18.3. (go1.18.3 linux/amd64)
Building Go toolchain1 using xxx/go1.18.3.
Building Go bootstrap cmd/go (go_bootstrap) using Go toolchain1.
Building Go toolchain2 using go_bootstrap and Go toolchain1.
Building Go toolchain3 using go_bootstrap and Go toolchain2.
Building packages and commands for linux/amd64.
---
Installed Go for linux/amd64 in xxx/go
Installed commands in xxx/go/bin
```

> 从构建输出可以看出，go 的自举其实颇为复杂。首先使用旧 go1.18.3 编译构建 toolchain1，  
> 然后再用 toolchain1 构建出 bootstrap，最后几次迭代编译构建出 go1.19 和其它工具，  
> 感兴趣的可以 [点击](https://github.com/golang/go/blob/master/src/make.bash) 看看 go 的构建过程。

这样就通过已有的 go1.18 编译出最新的 go1.19 了：

```shell
# $pwd/bin/go version
# go version go1.19 linux/amd64
```

设置 GOROOT 和 GOPATH：

```shell
# export GOROOT=$pwd
# export GOPATH=$pwd/lab
```

## ereturn

对于下面的 error 处理代码：

```go
err := testErr()
if err != nil {
  return 123, err
}
// 继续
```

我们新引入一个关键字 `ereturn` 来简化。ereturn 会自动判断 error 是否为 nil，  
如果不为 nil，则直接返回，否则继续向下运行，如下：

```go
 err := testErr()
 ereturn 123, err
```

ereturn 判断最后一个返回参数 err 是否为 nil，当为 nil 则函数继续，否则函数返回。

这样就省去了重复多次的 if 判空操作，减少了重复代码。

那么如何实现 ereturn 了？思路其实很简单，ereturn 语句是将 if, return 两条语句合并，将  
error 判断操作放在了编译期生成，而不是由工程师手动判断；因此我们只需在 go 编译器中新增 ereturn 关键字，  
并在程序编译的时候将 ereturn 语句 重写为 if+return 语句即可。

首先，添加新的关键字 **ereturn**：

```diff
--- a/src/cmd/compile/internal/syntax/tokens.go
+++ b/src/cmd/compile/internal/syntax/tokens.go
@@ -60,6 +60,7 @@ const (
        _Package     // package
        _Range       // range
        _Return      // return
+       _Ereturn     // ereturn
        _Select      // select
        _Struct      // struct
        _Switch      // switch
```

然后通过 `go generate` 命令自动生成该关键字的解析程序：

```shell
# $pwd/bin/go generate $pwd/src/cmd/compile/internal/syntax/tokens.go
stringer -type token -linecomment tokens.go
tokens.go:9: running "stringer": exec: "stringer": executable file not found in $PATH
```

提示缺少 stringer，通过 `go install` 下载，然后再次运行：

```shell
# $pwd/bin/go install golang.org/x/tools/cmd/stringer@latest
# export PATH=$GOPATH/bin:$PATH
# $pwd/bin/go generate $pwd/src/cmd/compile/internal/syntax/tokens.go
```

generate 会自动解析 tokens.go，然后生成对应的解析程序部分 token_string.go：

```diff
--- a/src/cmd/compile/internal/syntax/token_string.go
+++ b/src/cmd/compile/internal/syntax/token_string.go
@@ -49,17 +49,18 @@ func _() {
        _ = x[_Package-39]
        _ = x[_Range-40]
        _ = x[_Return-41]
+       _ = x[_Ereturn-42]
```

有了关键字后，修改 parser.stmtOrNil 方法，将 ereturn 语句改写为 if+return 语句：

```diff
--- a/src/cmd/compile/internal/syntax/parser.go
+++ b/src/cmd/compile/internal/syntax/parser.go
@@ -2613,6 +2613,56 @@ func (p *parser) stmtOrNil() Stmt {
                }
                return s
 
+       case _Ereturn:
+               pos := p.pos()
+               e := new(ReturnStmt)
+               e.pos = pos
+               p.next()
+               if p.tok != _Semi && p.tok != _Rbrace {
+                       e.Results = p.exprList()
+               }
+               // return block
+               b1 := new(BlockStmt)
+               b1.pos = pos
+               b1.Rbrace = pos
+               b1.List = []Stmt{e}
+
+               set := false
+               f := new(IfStmt)
+               f.pos = pos
+               switch ep := e.Results.(type) {
+               case *ListExpr:
+                       if len(ep.ElemList) > 0 {
+                               if eep, ok := ep.ElemList[len(ep.ElemList)-1].(*Name); ok && strings.HasPrefix(eep.Value, "err") {
+                                       op := &Operation{
+                                               Op: Neq,
+                                               X:  eep,
+                                               Y:  NewName(pos, "nil"),
+                                       }
+                                       op.pos = pos
+                                       f.Cond = op
+                                       set = true
+                               }
+                       }
+               case *Name:
+                       if strings.HasPrefix(ep.Value, "err") {
+                               op := &Operation{
+                                       Op: Neq,
+                                       X:  ep,
+                                       Y:  NewName(pos, "nil"),
+                               }
+                               op.pos = pos
+                               f.Cond = op
+                               set = true
+                       }
+               }
+               f.Then = b1
+               if set {
+                       return f
+               } else {
+                       return e
+               }
+
        case _Semi:
                s := new(EmptyStmt)
                s.pos = p.pos()
```

这里运用了一个小技巧，那就是：语句重写。

ereturn 关键字本身可以视为 if，return 语句的联合体，当 return 语句最后一个返回值为 error 且不为空时，就将其解析为 ereturn 语句。
因此这里**先**将 ereturn 语句解析为 return 语句，然后**判断** Results 列表的**最后一个元素**是否为 error，  
如果是则将其包装为 **if** 语句，即在 return 之前先对 error 进行 nil 判断，如果 error 不为 nil，则调用 return，否则不做任何事情。

修改完毕后，重新生成新的 go.19：

```sh
# cd $pwd/src
# ./make.bash 
Building Go cmd/dist using /root/.go/go1.18.3. (go1.18.3 linux/amd64)
Building Go toolchain1 using /root/.go/go1.18.3.
Building Go bootstrap cmd/go (go_bootstrap) using Go toolchain1.
Building Go toolchain2 using go_bootstrap and Go toolchain1.
Building Go toolchain3 using go_bootstrap and Go toolchain2.
Building packages and commands for linux/amd64.
---
Installed Go for linux/amd64 in /root/workspace/go
Installed commands in /root/workspace/go/bin
```

编译完成后，用一个[例子](https://github.com/pedrogao/go/commit/7df86e87f555af26cb51dc60484327c0d0eb64b0#diff-e3c67b440212ca6e8ffdb55884bbd573cd4235c439948caeb2d92bebf6f5372c)看看效果：

```go
func testErr() error {
    return errors.New("err")
}

func testNoErr() error {
    return nil
}

func hello() (string, error) {
    err := testNoErr()
    ereturn "111", err // r1

    err = testNoErr()
    ereturn "777", err // r2

    err = testErr()
    ereturn "222", err // r3

    return "333", nil // r4
}

func main() {
    fmt.Println(hello())
}
```

运行：

```shell
# $pwd/bin/go run $pwd/lab/examples/example1/main.go                                                                                                 
222 err
```

程序输入 `222，err`，证明函数 hello 从 r3 处退出，显然 r1，r2 处的 error 都是 nil，因此判断不成立，  
所以函数继续执行，而到 r3 处时，error 不为 nil，所以直接返回。

到此一个新的 ereturn 关键字就顺利完成了，具体实现可以参考这个 [commit](https://github.com/pedrogao/go/commit/7df86e87f555af26cb51dc60484327c0d0eb64b0)。

## go 编译器

到这里，我们可以发现 go 编译器设计良好、代码易读，新增一个可用的关键字竟如此简单。但是旅程绝不仅限于此，  
就目前而言，我们只接触到 go 编译器中极其小的一部分，甚至这些都不是 go 编译器中的核心点。

go 编译器是按照程序编译过程来设计实现的，大致可分为如下 4 个大阶段：

![compiler](../../imgs/magic-go-compiler.png)

> 以上图片按照 go 官方文档介绍绘制而成，感兴趣的可以点击  
> [这里](https://github.com/golang/go/blob/master/src/cmd/compile/README.md)查看一下 go 编译器的  
> 简单介绍。文档可能会随着迭代更新。

1. 解析阶段：将 go 源代码词法、句法、语法分析，生成程序可读的语法树（syntax tree）；
2. 检查、转换阶段：对生成的语法树做语法检查，补充元信息；
3. 生成 SSA 节点，通过流程图分析对代码进行优化、重写；
4. 生成机器码，即最后的可执行代码。

> 关于 SSA，可点击[此处](https://en.wikipedia.org/wiki/Static_single-assignment_form)了解。

而 ereturn 语句的处理，只停留在了第 1 阶段，即解析阶段的时候，就被转化为了 if、return 语句，后面的 2、3、4 阶段都是以其它语句的身份来参与。

下面，我们就通过另外一个关键字 `dowhile` 来一起看看 go 编译的 4 个阶段。

## dowhile

有一定 c 语言基础的同学肯定熟悉 `do while` 这两个关键字，因此它们联合可以实现如下语句：

```c
do
{
  // body
  // do something
} while( condition );
```

do while 语句最大的好处在于，即使 condition 不满足，那么也能执行 body 里面的代码，如果满足，那么会重复执行  
直到不满足为止。

在 go 中是没有 do、while 两个关键字的，对于循环执行也只提供了 for 语句。

> 千万不要使用 do 作为关键字，因为 go 中大量使用了 do 作为变量名，如果使用 do {} while 这类语法，那么 go 无法编译成功。

因此，我们决定在 go 中新增 dowhile 关键字，可达到下面的效果：

```go
i := 3
dowhile i != 0 {
  i--
  // do something
}
```

变量 `i` 在 dowhile 语句外部初始化，dowhile 执行到 i 不满足条件为止。

或者：

```go
dowhile i := 3; i != 0 {
  i--
  // do something
}
```

变量 `i` 在 dowhile 语句上初始化，dowhile 执行到 i 不满足条件为止。

或者：

```go
i := 4
dowhile i != 4 {
   // do something
}
```

变量 `i` 在 dowhile 语句外部初始化，不满足循环条件，但 dowhile 仍会执行 body 中的语句。

下面我们就来为 go 新增 dowhile 支持。

首先，添加新的 dowhile 关键字：

```diff
--- a/src/cmd/compile/internal/syntax/tokens.go
+++ b/src/cmd/compile/internal/syntax/tokens.go
@@ -50,6 +50,7 @@ const (
        _For         // for
+       _Dowhile     // dowhile
        _Func        // func
```

定义新的 dowhile 语句：

```diff
--- a/src/cmd/compile/internal/syntax/nodes.go
+++ b/src/cmd/compile/internal/syntax/nodes.go
@@ -410,6 +410,19 @@ type (
                stmt
        }
 
+       /**
+       init、cond 均可省略
+       dowhile <init>; <cond> {
+         <body>
+       }
+       */
+       DowhileStmt struct {
+               Init SimpleStmt // incl. *RangeClause
+               Cond Expr
+               Body *BlockStmt
+               stmt
+       }
```

新增关键字后再次生成 token_string 用于解析新的关键字：

```shell
# export PATH=$GOPATH/bin:$PATH
# $pwd/bin/go generate $pwd/src/cmd/compile/internal/syntax/tokens.go
```

检查 token_string.go 中 dowhile 关键字是否成功：

```diff
--- a/src/cmd/compile/internal/syntax/token_string.go
+++ b/src/cmd/compile/internal/syntax/token_string.go
@@ -39,28 +39,29 @@ func _() {
        _ = x[_Else-29]
        _ = x[_Fallthrough-30]
        _ = x[_For-31]
+       _ = x[_Dowhile-32]
```

改造 parser 使其支持 dowhile 关键字解析：

```diff
--- a/src/cmd/compile/internal/syntax/parser.go
+++ b/src/cmd/compile/internal/syntax/parser.go
@@ -2269,6 +2269,20 @@ func (p *parser) forStmt() Stmt {
        return s
 }
 
+func (p *parser) dowhileStmt() Stmt {
+       if trace {
+               defer p.trace("dowhileStmt")()
+       }
+
+       s := new(DowhileStmt)
+       s.pos = p.pos()
+
+       s.Init, s.Cond, _ = p.header(_Dowhile)
+       s.Body = p.blockStmt("dowhile clause")
+
+       return s
+}
+
 func (p *parser) header(keyword token) (init SimpleStmt, cond Expr, post SimpleStmt) {
        p.want(keyword)
 
@@ -2567,6 +2581,9 @@ func (p *parser) stmtOrNil() Stmt {
        case _For:
                return p.forStmt()
 
+       case _Dowhile:
+               return p.dowhileStmt()
```

这样，go 编译器就支持 dowhile 语句的解析了，我们可以测试看看解析一个 dowhile 例子：

```go
package main
import (
    "fmt"
)
func main() {
    i := 4
    dowhile i > 0 {
        fmt.Println(i)
        i--
    }
}
```

编译 go：

```sh
# cd $pwd/src
# ./make.bash 
```

在 dumper_test 中新增测试用例：

```diff
index 1ba85cc8d9..dcfaf063e7 100644
--- a/src/cmd/compile/internal/syntax/dumper_test.go
+++ b/src/cmd/compile/internal/syntax/dumper_test.go
@@ -19,3 +19,12 @@ func TestDump(t *testing.T) {
+
+func TestDump1(t *testing.T) {
+       file := "./lab/examples/example2/main.go"
+       ast, _ := ParseFile(file, func(err error) { t.Error(err) }, nil, CheckBranches)
+
+       if ast != nil {
+               Fdump(testOut(), ast)
+       }
+}
```

运行测试，输出语法 AST 树：

```shell
# $pwd/bin/go test -c -o dump.test ./src/cmd/compile/internal/syntax/ -run TestDump1
# ./dump.test -test.run TestDump1 -test.v

=== RUN   TestDump1
# ...
    35  .  .  .  .  .  1: *syntax.DowhileStmt {
    36  .  .  .  .  .  .  Init: nil
    37  .  .  .  .  .  .  Cond: *syntax.Operation {
    38  .  .  .  .  .  .  .  Op: >
    39  .  .  .  .  .  .  .  X: i @ ./lab/examples/example2/main.go:9:10
    40  .  .  .  .  .  .  .  Y: *syntax.BasicLit {
    41  .  .  .  .  .  .  .  .  Value: "0"
    42  .  .  .  .  .  .  .  .  Kind: 0
    43  .  .  .  .  .  .  .  .  Bad: false
    44  .  .  .  .  .  .  .  }
    45  .  .  .  .  .  .  }
# ...
--- PASS: TestDump1 (0.00s)
```

解析成功。当然有了定义还不够，还需新增 DowhileStmt 语句遍历函数：

```diff
--- a/src/cmd/compile/internal/syntax/walk.go
+++ b/src/cmd/compile/internal/syntax/walk.go
@@ -289,6 +289,15 @@ func (w walker) node(n Node) {
                }
                w.node(n.Body)
 
+       case *DowhileStmt: // 新增
+               if n.Init != nil {
+                       w.node(n.Init)
+               }
+               if n.Cond != nil {
+                       w.node(n.Cond)
+               }
+               w.node(n.Body)
+
        case *SwitchStmt:
```

新增对 dowhile 语句语法检查 case：

```diff
--- a/src/cmd/compile/internal/types2/stmt.go
+++ b/src/cmd/compile/internal/types2/stmt.go
@@ -652,6 +652,21 @@ func (check *Checker) stmt(ctxt stmtContext, s syntax.Stmt) {
                }
                check.stmt(inner, s.Body)
 
+       case *syntax.DowhileStmt:
+               inner |= breakOk | continueOk
+
+               check.openScope(s, "do while")
+               defer check.closeScope()
+               check.simpleStmt(s.Init)
+               if s.Cond != nil {
+                       var x operand
+                       check.expr(&x, s.Cond)
+                       if x.mode != invalid && !allBoolean(x.typ) {
+                               check.error(s.Cond, "non-boolean condition in for statement")
+                       }
+               }
+               check.stmt(inner, s.Body)
+
        default:
                check.error(s, "invalid statement")
```

语法解析、检查后，go 会将语法树转化为 IR（中间码），新增 `ODOWHILE` IR 关键字：

```diff
--- a/src/cmd/compile/internal/ir/node.go
+++ b/src/cmd/compile/internal/ir/node.go
@@ -273,14 +273,15 @@ const (
        //      }
        OFORUNTIL
+       ODOWHILE // dowhile Init; Cond { Body };
```

新增 IR 语句定义：

```diff
--- a/src/cmd/compile/internal/ir/stmt.go
+++ b/src/cmd/compile/internal/ir/stmt.go
@@ -223,6 +223,35 @@ func (n *ForStmt) SetOp(op Op) {
        n.op = op
 }
 
+// A DowhileStmt is a non-range for loop: dowhile Init; Cond { Body }
+type DowhileStmt struct {
+       miniStmt
+       Label    *types.Sym
+       Cond     Node
+       Body     Nodes
+       HasBreak bool // break in body
+}
+
+// New dowhile statement
+func NewDowhileStmt(pos src.XPos, init Node, cond Node, body []Node) *DowhileStmt {
+       n := &DowhileStmt{Cond: cond} // condition
+       n.pos = pos
+       n.op = ODOWHILE
+       if init != nil { // init
+               n.init = []Node{init}
+       }
+       n.Body = body // body
+       return n
+}
+
+func (n *DowhileStmt) SetOp(op Op) {
+       if op != ODOWHILE {
+               panic(n.no("SetOp " + op.String()))
+       }
+       n.op = op
+}
```

有了关键字、语句定义后，通过脚本生成 IR 关键字：

```shell
# $pwd/bin/go generate $pwd/src/cmd/compile/internal/ir/node.go
# $pwd/bin/go run -mod=mod $pwd/src/cmd/compile/internal/ir/mknode.go
# mv $pwd/node_gen.go $pwd/src/cmd/compile/internal/ir/
```

generate 命令会重新生成[op_string.go](https://github.com/pedrogao/go/commit/491af5b8c929fd12b65674a8def061b5cced9da9#diff-103e7d8cdbb3e39378d0cd1b928ca2c9455b4de306c234ab5eeacdc9f3c0ac3c)文件，  
用于将 ODOWHILE 关键字转化为字符串方便 debug。

run 命令会重新生成[node_gen.go](https://github.com/pedrogao/go/commit/491af5b8c929fd12b65674a8def061b5cced9da9#diff-fe8447c6058eafe833372607bb6d2514d1feb5e3c09b2dddbc8776e58e1acf07)文件，  
用于自动实现 DowhileStmt 语句的格式化、拷贝等操作。

为了方便 DowhileStmt 语句的 debug，因此新增 ODOWHILE 格式化的 case：

```diff
--- a/src/cmd/compile/internal/ir/fmt.go
+++ b/src/cmd/compile/internal/ir/fmt.go
@@ -435,6 +435,25 @@ func stmtFmt(n Node, s fmt.State) {
 
                fmt.Fprintf(s, " { %v }", n.Body)
 
+       case ODOWHILE:
+               n := n.(*DowhileStmt)
+               opname := "dowhile"
+               if !exportFormat {
+                       fmt.Fprintf(s, "%s loop", opname)
+                       break
+               }
+               fmt.Fprint(s, opname)
+               if simpleinit {
+                       fmt.Fprintf(s, " %v;", n.Init()[0])
+               }
+               if n.Cond != nil {
+                       fmt.Fprintf(s, " %v", n.Cond)
+               }
+               if simpleinit {
+                       fmt.Fprint(s, ";")
+               }
+               fmt.Fprintf(s, " { %v }", n.Body)
+
        case ORANGE:
```

有了 AST、IR 的 dowhile 定义后，我们需要在 noder 中实现二者之间的转化，  
即将 syntax.DowhileStmt 转化为 ir.DowhileStmt，如下：

```diff
--- a/src/cmd/compile/internal/noder/stmt.go
+++ b/src/cmd/compile/internal/noder/stmt.go
@@ -118,6 +118,8 @@ func (g *irgen) stmt(stmt syntax.Stmt) ir.Node {
                return g.ifStmt(stmt)
        case *syntax.ForStmt:
                return g.forStmt(stmt)
+       case *syntax.DowhileStmt:
+               return g.dowhileStmt(stmt)
        case *syntax.SelectStmt:
                n := g.selectStmt(stmt)
 
@@ -260,6 +262,10 @@ func (g *irgen) forStmt(stmt *syntax.ForStmt) ir.Node {
        return ir.NewForStmt(g.pos(stmt), g.stmt(stmt.Init), g.expr(stmt.Cond), g.stmt(stmt.Post), g.blockStmt(stmt.Body))
 }
 
+func (g *irgen) dowhileStmt(stmt *syntax.DowhileStmt) ir.Node {
+       return ir.NewDowhileStmt(g.pos(stmt), g.stmt(stmt.Init), g.expr(stmt.Cond), g.blockStmt(stmt.Body))
+}
```

AST 转换为 IR node 后，编译就进入到了第 3 步，下面就需要对 IR 进行一系列的分析和优化。

比如，先对 ir.DowhileStmt 语句进行逃逸分析：

```diff
--- a/src/cmd/compile/internal/escape/stmt.go
+++ b/src/cmd/compile/internal/escape/stmt.go
@@ -82,6 +82,13 @@ func (e *escape) stmt(n ir.Node) {
                e.block(n.Body)
                e.loopDepth--

+       case ir.ODOWHILE:
+               n := n.(*ir.DowhileStmt)
+               e.loopDepth++
+               e.discard(n.Cond)
+               e.block(n.Body)
+               e.loopDepth--
+
        case ir.ORANGE:
                // for Key, Value = range X { Body }
                n := n.(*ir.RangeStmt)
```

接着将节点拆分为更加简单的节点，比如拆分 dowhile 中的初始化、条件、执行体等节点：

```diff
--- a/src/cmd/compile/internal/syntax/walk.go
+++ b/src/cmd/compile/internal/syntax/walk.go
@@ -289,6 +289,15 @@ func (w walker) node(n Node) {
                }
                w.node(n.Body)

+       case *DowhileStmt: // 新增
+               if n.Init != nil {
+                       w.node(n.Init)
+               }
+               if n.Cond != nil {
+                       w.node(n.Cond)
+               }
+               w.node(n.Body)
+
        case *SwitchStmt:
                if n.Init != nil {
                        w.node(n.Init)
```

再针对 dowhile 中的一些语句执行顺序尝试进行重排序：

```diff
--- a/src/cmd/compile/internal/walk/order.go
+++ b/src/cmd/compile/internal/walk/order.go
@@ -829,6 +829,15 @@ func (o *orderState) stmt(n ir.Node) {
                o.out = append(o.out, n)
                o.cleanTemp(t)

+       case ir.ODOWHILE:
+               n := n.(*ir.DowhileStmt)
+               t := o.markTemp()
+               n.Cond = o.exprInPlace(n.Cond)
+               n.Body.Prepend(o.cleanTempNoPop(t)...)
+               orderBlock(&n.Body, o.free)
+               o.out = append(o.out, n)
+               o.cleanTemp(t)
+
        // Clean temporaries from condition at
        // beginning of both branches.
        case ir.OIF:
```

完成了一系列检查、优化后，编译器 需将 dowhile 节点转化为控制流图 CFG （Control-flow Graph），如下：

```diff
--- a/src/cmd/compile/internal/ssagen/ssa.go
+++ b/src/cmd/compile/internal/ssagen/ssa.go
@@ -1821,6 +1821,34 @@ func (s *state) stmt(n ir.Node) {

                s.startBlock(bEnd)

+       case ir.ODOWHILE: // dowhile Init; Cond { Body };
+               // TODO 增加 break、continue 支持
+               n := n.(*ir.DowhileStmt)
+               bCond := s.f.NewBlock(ssa.BlockPlain)
+               bBody := s.f.NewBlock(ssa.BlockPlain)
+               bEnd := s.f.NewBlock(ssa.BlockPlain)
+               bBody.Pos = n.Pos()
+               // 上一个 block
+               b := s.endBlock()
+               // 上一个紧接着 body, dowhile 的效果
+               b.AddEdgeTo(bBody)
+               // 处理 body
+               s.startBlock(bBody)
+               s.stmtList(n.Body)
+               b = s.endBlock()
+               // 条件处理
+               b.AddEdgeTo(bCond)
+               s.startBlock(bCond)
+               if n.Cond != nil {
+                       s.condBranch(n.Cond, bBody, bEnd, 1)
+               } else {
+                       b := s.endBlock()
+                       b.Kind = ssa.BlockPlain
+                       b.AddEdgeTo(bBody)
+               }
+               // 结束
+               s.startBlock(bEnd)
+
        case ir.OSWITCH, ir.OSELECT:
                // These have been mostly rewritten by the front end into their Nbody fields.
                // Our main task is to correctly hook up any break statements.
```

CFS 基本已经接近人类理解的程序执行流程图了，上面的代码会将 dowhile 生成如下控制流图：

![cfs](../../imgs/magic-gfs.png)

dowhile 开始时，直接进入 body 中执行，执行完后再来判断 cond 是否满足，如果满足则再次跳入到 body 中执行，否则 dowhile 结束。

可以看到，从一个基本的 dowhile 语句到 CFS，编译器做了大量工作，一步步将语言向下演化（这个过程也称 lower）。

最后，就是编译器的最后一步了，将 CFS 图转化为对应平台的机器码，对应 [obj](https://github.com/pedrogao/go/blob/pedro/src/cmd/internal/obj/)包；  
包下有对各个平台的机器码支持，由于平台之间的差异都比较大，因此我们对 dowhile 的支持其实到 IR 这一步就够了，剩下的工作 go 编译器会帮助我们来处理。

再次编译 go1.19，此时的 go1.19 已经支持 dowhile 关键字：

```shell
# cd $pwd/src
# ./make.bash
```

我们可以测试看看，一个 [dowhile 例子](https://github.com/pedrogao/go/commit/491af5b8c929fd12b65674a8def061b5cced9da9#diff-890164fa94bc37c4cd437e241d79d9d1898987a5fb3c6d0a69b0aa9164cee5e3)：

```go
func main() {
    i := 4
    dowhile i > 0 {
        fmt.Println(i)
        i--
    }
}
```

输出：

```shell
# $pwd/bin/go run $pwd/lab/examples/example2/main.go
4
3
2
1
```

例子 2：[dowhile 语句上初始化](https://github.com/pedrogao/go/commit/491af5b8c929fd12b65674a8def061b5cced9da9#diff-efe8aa91b1bad6bf66e574790c88f5b58fd56d87bf47f41ea083368a902b8724)：

```go
func main() {
	dowhile i := 4; i > 0 {
		fmt.Println(i)
		i--
	}
}
```

输出：

```shell
# $pwd/bin/go run $pwd/lab/examples/example3/main.go
4
3
2
1
```

例子 3：[dowhile 条件不满足](https://github.com/pedrogao/go/commit/491af5b8c929fd12b65674a8def061b5cced9da9#diff-98d9e0c744509ee4e2f1cd8eb85994a5023c5f0785054abbf7a417b6a1a4c35d)：

```go
func main() {
	i := 4
	dowhile i != 4 {
		fmt.Println(i)
	}
}
```

输出：

```shell
# $pwd/bin/go run $pwd/lab/examples/example4/main.go   
4
```

可以发现，即 `i != 4` 不满足，但仍然执行了一次 `fmt.Println`。

关于 dowhile 的具体实现可以参考这个[commit](https://github.com/pedrogao/go/commit/491af5b8c929fd12b65674a8def061b5cced9da9)。

## 结语

至此，我们完成了 go 编译器新增关键字的挑战，在这一段路的旅程中，我们见识到了编译原理的魅力，感受到了 go 编译器设计之精巧、功能之完善；  
无论是编译器本身、还是 runtime 的实现，都是学习（任意）语言实现的巨大宝库。

按照 go 文档的说法，go 编译器被称为 `gc编译器`，虽然这一度让我怀疑这是垃圾回收的代码包，但明显这不是。go 自从 1.4 版本自举后，参与编译器工作的  
门槛降低了很多，在开发和实践中，我们都能直接去看源码来 debug 程序问题；当然遇到 go 无法解决的问题，我们也能 fork 然后自己来解决。

c/cpp 编译器一直都是 gcc、clang、MSVC 三家争霸，而 go 编译器似乎一直都是一家独大，这也直接导致了 go 团队的傲慢，当然也避免了分裂和撕逼。

可能不久的将来，因为或多或少的政治原因，go 编译器也会走向多元化，期待那一天的到来，让 go 拥有更多的活力。

## 参考资料

- [go compiler internals](https://eli.thegreenplace.net/2019/go-compiler-internals-adding-a-new-statement-to-go-part-2/)
- [静态分析-中间表示](https://zhuanlan.zhihu.com/p/549728632)
- [golang](https://github.com/pedrogao/go)
- [GO 编程模式：错误处理](https://coolshell.cn/articles/21140.html)
- [Go error 处理最佳实践](https://www.modb.pro/db/172962)
- [Go compiler: SSA optimization rules description language](https://quasilyte.dev/blog/post/go_ssa_rules/)
