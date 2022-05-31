---
icon: edit
title: go 汇编简单入门
date: 2022-05-31
tag:
  - go
  - plan9
  - assembly
category:
  - go
---

在 Go runtime 中存在了大量由 plan9 汇编书写的代码，想要了解 runtime 的实现和机制，掌握 plan9 汇编的基本使用是必须的。(Go 的作者们在选择汇编语言的时候没有选择 intel，也没有选择 AT&T，而是选择了 plan9，哎，一群固执老古董们）。

plan9 语法虽然与 intel 和 AT&T 略有不同，但整体而言相差不大，如果你之前有其它汇编语言的基本，相信入手也很快。

下面会介绍一些 plan9 中的常见语法，想要深入了解的可以查看本文的参考资料。

## 基本介绍

### 寄存器

plan9 中对寄存器的命名略有不同，全部大写而且不要前缀，它们之间的对应关系如下：

| rax | rbx | rcx | rdx | rdi | rsi | rbp | rsp | r8  | r9  | r10 | r11 | r12 | r13 | r14 | rip    |
| :-- | :-- | :-- | :-- | :-- | :-- | :-- | :-- | :-- | :-- | :-- | :-- | :-- | :-- | :-- | :----- |
| AX  | BX  | CX  | DX  | DI  | SI  | BP  | SP  | R8  | R9  | R10 | R11 | R12 | R13 | R14 | PC<br> |

表格第一行是通用寄存器的真实名称，第二行是 plan9 中对通用寄存器的称呼。

除了通用寄存器外，plan9 还定义了几个特殊寄存器来代表一些特殊值，即伪寄存器：

- PC：对应 64 位机中 rip 寄存器，一般称为 ip 寄存器；
- SB：Static Base Pointer 全局静态基地址，一般用来申明全局函数和变量，静态区的首地址；
- SP：Stack Poninter 当前函数调用栈帧基地址，即局部变量的首地址；
- FP：Frame Pointer 帧地址，用来访问函数的参数。

### 栈操作

plan9 支持 push 和 pop 指令来操作当前调用栈：

```s
// 分配栈内存，将 AX 中的数据入栈
PUSHQ  AX
// 回收栈内存，将出栈数据拷贝到 AX
POPQ   AX
```

例子：

```s
MOVQ    $runtime·mainPC(SB), AX // entry 设置程序入口 AX = runtime.main
PUSHQ   AX          // 入栈，传递参数
PUSHQ   $0          // arg size，参数内存大小为 0，第一个参数最后入栈
CALL    runtime·newproc(SB) // 新建 G，来启动 runtime.main，AX 寄存器上存储的是 runtime.main 函数的地址
POPQ    AX   // 两次出栈
POPQ    AX
```

这是 runtime 中的一个例子，runtime·newproc 函数通过栈接受两个参数，这里通过 PUSHQ 指令来将两个参数入栈，待调用完毕后，再执行 POPQ 出栈。

### 数据移动

plan9 使用 MOV 指令来实现数据移动，与 AT&T 类似，MOV 的原数据在左侧，目标地址在右侧，格式如下：

```s
MOV SRC DST
```

移动数据的大小由 MOV 指令后缀决定，如下：

```s
MOVB $1, DI
MOVQ $-10, AX
```

B 表示移动一个字节，即 byte，Q 表示四个字节，即 4 byte。

### 数据计算

plan9 支持计算指令直接在寄存器上进行数据操作：

```s
ADDQ  AX, BX   // BX += AX
SUBQ  AX, BX   // BX -= AX
IMULQ AX, BX   // BX *= AX
```

指令不同的后缀表示操作数据大小，如 Q 表示 4 字节。

### 流程跳转

plan9 支持 JMP 无条件直接跳转，如下：

```s
JMP    _rt0_amd64(SB) // 入口
```

当然也支持有条件跳转：

```s
CMPQ    AX, $0x123 // 比较 AX 与 0x123，如果不等直接 abort
JEQ 2(PC)  // 相等，直接跳过 2 行，到 get_tls
```

这个例子中，CMPQ 指令比较 AX 是否与 0x123 相等，如果相等，JEQ 会跳到 PC+2 的指令位置处。

### 变量定义

在汇编中，变量存储在 .data 和 .rodata 区，其中 .data 区全局可变，如 var 定义的全局变量，而 .rodata 全局不可变，如 const 定义的全局变量。

plan9 中使用 DATA 结合 GLOBAL 来定义一个变量，基本语法如下：

```s
DATA symbol+offset(SB)/width, value
GLOBL ·symbol(SB), [flags,], width
```

- symbol 表示符号，即变量名称；
- offset 表示相对于符号的偏移，即与变量首地址的偏移值；
- width 表示变量大小；
- value 表示是变量值
- flags 表示一些标志，如 RODATA 只读，这里不做过多介绍，感兴趣 [戳这](https://golang.org/doc/asm) 。
- SB 是全局变量的首地址，必须加上，其实无实际意义。
  举个实际例子：

```s
DATA age+0x00(SB)/4, $25
GLOBL age(SB), RODATA, $4
```

这里定义了一个全局变量 age，其大小为 4 字节，值为 25，RODATA 表示 age 只读。
在定义符号变量的时候，offset 一般都是 0，而如果定义数组和字符串，那 offset 就可以为其它值了：

```s
DATA msg<>+0(SB)/8, $"oh yes i"
DATA msg<>+8(SB)/8, $"am here "
GLOBL msg<>(SB), RODATA, $16
```

- <> 是一个特殊符号，表明当前变量只在自己的文件中生效，类似于 C 中的 static。
- msg 大小总共 16，由于是分开定义，所以第一个 offset 是 0，而第二个是 8。

### 函数定义

函数定义语法如下：

```s
TEXT symbol(SB), [flags,] $framesize[-argsize]
```

- symbol 表示函数名
- flags 标志位
- framesize 函数栈帧大小
- argsize 函数参数大小
  以一个简单函数定义为例：

```go
func add(a, b int) int
```

该函数对应的汇编代码如下：

```s
TEXT main·add(SB), NOSPLIT, $0-8
    MOVQ a+0(FP), AX
    MOVQ a+8(FP), BX
    ADDQ AX, BX
    MOVQ BX, ret+16(FP)
    RET
```

使用 TEXT 指令来定义函数，对应 ELF 中的 .text 段。add 函数说明如下：

- main 表示包名，add 函数定义在 main 包下
- add 是函数名
- NOSPLIT 表示该函数跳过堆栈溢出的检查
- $0-8 中：0 表示栈帧大小，8 表示返回值大小，即 int 类型大小，很明显由于直接使用寄存器相加，没有局部变量产生，所以栈帧为 0
  对于已经定义的函数，可直接通过 CALL 指令来调用，如下：

```s
CALL  runtime·args(SB)
```

## 小例子

接下来，我们以一个 Hello World 小例子来看看 plan9 汇编是如何使用的(linux 平台下)。项目结构如下：

```shell
├── go.mod # go 模块文件
├── helloworld # helloworld 包
│   ├── helloworld.go # go 源代码文件
│   └── helloworld.s # go 汇编文件
└── main.go # main 入口文件
```

在 Go 中如果需要使用汇编函数，那么需要一个同包同文件名且同名的函数来与之对应，即 helloworld.s 与 helloworld.go 对应。
其中 helloworld.go 文件内容：

```go
package helloworld

func Say()
```

在文件中声明了一个 Say 函数，但函数却没有函数体，该函数在 helloworld.s 文件中实现。
helloworld.s 文件内容如下：

```s
#include "textflag.h"

DATA  msg<>+0x00(SB)/6, $"Hello "
DATA  msg<>+0x06(SB)/6, $"World\n"
GLOBL msg<>(SB),NOPTR,$12

TEXT ·Say(SB), NOSPLIT, $0
  MOVL    $1, AX          // 在 Go 中 sys_write 系统调用数字编号为  1
  MOVQ    $1, DI          // 第 1 个参数 stdout 编号 1
  LEAQ    msg<>(SB), SI   // 第 2 个参数 msg 指针地址
  MOVL    $12, DX         // 第 3 个参数 count，字符串长度
  SYSCALL                 // 系统调用
  RET
```

结合上面的汇编基本介绍，我们来理一理 plan9 汇编究竟是如何使用的。
代码第 3 ～ 4 行，定义了 msg 变量，即字符串 Hello World\n。

```s
// 指令  变量名  偏移   长度  字符串内容
   DATA  msg<>+0x00(SB)/6, $"Hello "
```

DATA 用来表示变量，msg 是字符串名称，<> 符号表明 msg 变量仅当前包可用，0x00(SB) 表示变量偏移，这里是 0，而下面是 6，/6 表示字符串长度为 6，DATA 可以分开定义同一个变量，如这里的 msg 变量，被分为了两个部分，注意偏移和长度即可。
代码第 5 行，通过 GLOBL 声明 msg 为全局变量，<> 表示仅在当前包可用，NOPTR 可以不予理会，$12 表示字符串长度。

代码第 7 行，通过 TEXT 指令来定义函数，注意函数名前面的中点 ·，NOSPLIT 可以不理会，$0 表示返回值大小为 0。

代码第 8 ～ 13 行，将参数赋值给特定寄存器，然后 SYSCALL 系统调用，注意在 Go 中 sys_write 的编号竟然是 1，而且寄存器的使用也与 C 中不同，笔者一直按照 C 语言的约定来调用，一直失败，后面看了源码以后才恍然大悟。

最后是入口文件 main.go：

```go
package main

import "passembly/helloworld"

func main() {
        helloworld.Say()
}
```

直接运行 main.go 文件：

```shell
$ go run main.go 
Hello World
```

看到 Hello World 即代表运行成功。
通过 strace 可以查看一下 Say 函数是否成功调用了 write 系统调用：

```shell
$ go build main.go
$ strace ./main

....
....
write(1, "Hello World\n", 12Hello World
)           = 12
exit_group(0)                           = ?
+++ exited with 0 +++
```

通过输出可以清晰的看到 Say 函数通过汇编成功的调用了 write 系统调用。

## 参考资料

- [A Quick Guide to Go's Assembler](https://golang.org/doc/asm)
- [Go 系列文章 3 ：plan9 汇编入门](https://xargin.com/plan9-assembly/)
- [汇编是深入理解 Go 的基础 ](https://jishuin.proginn.com/p/763bfbd2c39d)
- [Go 系列文章 6: syscall](https://juejin.cn/post/6844903630978416648)
- [Go 语言汇编入门](https://mp.weixin.qq.com/s/B577CdUkWCp_XgUc1VVvSQ)
