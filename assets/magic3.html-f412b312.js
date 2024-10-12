import{_ as p}from"./plugin-vue_export-helper-c27b6911.js";import{r as t,o,c as d,f as l,a as s,b as e,e as i}from"./app-4eb79304.js";const r="/assets/go-err-61bce072.jpeg",c="/assets/magic-go-compiler-fa7e7b4e.png",u="/assets/magic-gfs-18c29901.png",m={},v={href:"https://coolshell.cn/articles/21140.html",target:"_blank",rel:"noopener noreferrer"},k={href:"https://www.modb.pro/db/172962",target:"_blank",rel:"noopener noreferrer"},b={href:"https://github.com/golang/go/blob/master/src/make.bash",target:"_blank",rel:"noopener noreferrer"},g={href:"https://github.com/pedrogao/go/commit/7df86e87f555af26cb51dc60484327c0d0eb64b0#diff-e3c67b440212ca6e8ffdb55884bbd573cd4235c439948caeb2d92bebf6f5372c",target:"_blank",rel:"noopener noreferrer"},f={href:"https://github.com/pedrogao/go/commit/7df86e87f555af26cb51dc60484327c0d0eb64b0",target:"_blank",rel:"noopener noreferrer"},x={href:"https://github.com/golang/go/blob/master/src/cmd/compile/README.md",target:"_blank",rel:"noopener noreferrer"},h={href:"https://en.wikipedia.org/wiki/Static_single-assignment_form",target:"_blank",rel:"noopener noreferrer"},w={href:"https://github.com/pedrogao/go/commit/491af5b8c929fd12b65674a8def061b5cced9da9#diff-103e7d8cdbb3e39378d0cd1b928ca2c9455b4de306c234ab5eeacdc9f3c0ac3c",target:"_blank",rel:"noopener noreferrer"},y={href:"https://github.com/pedrogao/go/commit/491af5b8c929fd12b65674a8def061b5cced9da9#diff-fe8447c6058eafe833372607bb6d2514d1feb5e3c09b2dddbc8776e58e1acf07",target:"_blank",rel:"noopener noreferrer"},S={href:"https://github.com/pedrogao/go/blob/pedro/src/cmd/internal/obj/",target:"_blank",rel:"noopener noreferrer"},B={href:"https://github.com/pedrogao/go/commit/491af5b8c929fd12b65674a8def061b5cced9da9#diff-890164fa94bc37c4cd437e241d79d9d1898987a5fb3c6d0a69b0aa9164cee5e3",target:"_blank",rel:"noopener noreferrer"},q={href:"https://github.com/pedrogao/go/commit/491af5b8c929fd12b65674a8def061b5cced9da9#diff-efe8aa91b1bad6bf66e574790c88f5b58fd56d87bf47f41ea083368a902b8724",target:"_blank",rel:"noopener noreferrer"},O={href:"https://github.com/pedrogao/go/commit/491af5b8c929fd12b65674a8def061b5cced9da9#diff-98d9e0c744509ee4e2f1cd8eb85994a5023c5f0785054abbf7a417b6a1a4c35d",target:"_blank",rel:"noopener noreferrer"},D={href:"https://github.com/pedrogao/go/commit/491af5b8c929fd12b65674a8def061b5cced9da9",target:"_blank",rel:"noopener noreferrer"},N={href:"https://eli.thegreenplace.net/2019/go-compiler-internals-adding-a-new-statement-to-go-part-2/",target:"_blank",rel:"noopener noreferrer"},E={href:"https://zhuanlan.zhihu.com/p/549728632",target:"_blank",rel:"noopener noreferrer"},I={href:"https://github.com/pedrogao/go",target:"_blank",rel:"noopener noreferrer"},C={href:"https://coolshell.cn/articles/21140.html",target:"_blank",rel:"noopener noreferrer"},T={href:"https://www.modb.pro/db/172962",target:"_blank",rel:"noopener noreferrer"},$={href:"https://quasilyte.dev/blog/post/go_ssa_rules/",target:"_blank",rel:"noopener noreferrer"};function G(P,n){const a=t("ExternalLinkIcon");return o(),d("div",null,[n[60]||(n[60]=l(`<h2 id="前言" tabindex="-1"><a class="header-anchor" href="#前言" aria-hidden="true">#</a> 前言</h2><p>几乎所有人都遇到过类似下面的 go 代码：</p><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code><span class="token keyword">if</span> err <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span>
  <span class="token keyword">return</span> <span class="token boolean">nil</span><span class="token punctuation">,</span> err
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>负责任的说，笔者每天都得写很多次这样的 <strong>err</strong> 处理代码，以至于一个函数中，半数代码都是在<br> 处理 error。所以很多人用下面这张图来调侃：</p><p><img src="`+r+'" alt="go-err"></p>',5)),s("p",null,[n[2]||(n[2]=e("遇到如此重复错误处理代码，大家都会下意识的想办法去封装和简化，比如这里的两篇文章")),s("a",v,[n[0]||(n[0]=e("GO 编程模式：错误处理")),i(a)]),n[3]||(n[3]=e(" 和 ")),s("a",k,[n[1]||(n[1]=e("Go error 处理最佳实践")),i(a)]),n[4]||(n[4]=e("。"))]),n[61]||(n[61]=l(`<p>一定程度上，这种技巧解决了 go error 处理的繁琐，但显然这种方式还是不够优雅。</p><p>思来想去，根本原因在于 <strong>go</strong> 本身 error 的哲学和机制问题，go 创始人希望工程师能够认真对待每一个 error，从而提升代码质量；<br> 另外 go 语言本身又没有提供错误处理语法糖，这使得 error 处理十分原始和重复。</p><p>既然常规方法不行，笔者就把视角放到了 go 本身上面：给 go 编译器新增<strong>关键字</strong>来处理 error。</p><h2 id="编译源码" tabindex="-1"><a class="header-anchor" href="#编译源码" aria-hidden="true">#</a> 编译源码</h2><p>话不多说，我们直接开搞。</p><p>从 github 上下载 go 的源码，并将其切到（当前）最新的 go1.19 版上：</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># git clone https://github.com/golang/go  </span>
<span class="token comment"># cd go &amp;&amp; git checkout go1.19 </span>
<span class="token comment"># git checkout -b pedro</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>切换到了一个新的分支用于开发新的特性。然后设置目录变量，通过脚本编译出最新的 go1.19：</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># pwd=$(pwd)</span>
<span class="token comment"># cd $pwd/src</span>

<span class="token comment"># ./make.bash </span>
Building Go cmd/dist using xxx/go1.18.3. <span class="token punctuation">(</span>go1.18.3 linux/amd64<span class="token punctuation">)</span>
Building Go toolchain1 using xxx/go1.18.3.
Building Go bootstrap cmd/go <span class="token punctuation">(</span>go_bootstrap<span class="token punctuation">)</span> using Go toolchain1.
Building Go toolchain2 using go_bootstrap and Go toolchain1.
Building Go toolchain3 using go_bootstrap and Go toolchain2.
Building packages and commands <span class="token keyword">for</span> linux/amd64.
---
Installed Go <span class="token keyword">for</span> linux/amd64 <span class="token keyword">in</span> xxx/go
Installed commands <span class="token keyword">in</span> xxx/go/bin
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,9)),s("blockquote",null,[s("p",null,[n[6]||(n[6]=e("从构建输出可以看出，go 的自举其实颇为复杂。首先使用旧 go1.18.3 编译构建 toolchain1，")),n[7]||(n[7]=s("br",null,null,-1)),n[8]||(n[8]=e(" 然后再用 toolchain1 构建出 bootstrap，最后几次迭代编译构建出 go1.19 和其它工具，")),n[9]||(n[9]=s("br",null,null,-1)),n[10]||(n[10]=e(" 感兴趣的可以 ")),s("a",b,[n[5]||(n[5]=e("点击")),i(a)]),n[11]||(n[11]=e(" 看看 go 的构建过程。"))])]),n[62]||(n[62]=l(`<p>这样就通过已有的 go1.18 编译出最新的 go1.19 了：</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># $pwd/bin/go version</span>
<span class="token comment"># go version go1.19 linux/amd64</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>设置 GOROOT 和 GOPATH：</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># export GOROOT=$pwd</span>
<span class="token comment"># export GOPATH=$pwd/lab</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="ereturn" tabindex="-1"><a class="header-anchor" href="#ereturn" aria-hidden="true">#</a> ereturn</h2><p>对于下面的 error 处理代码：</p><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code>err <span class="token operator">:=</span> <span class="token function">testErr</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token keyword">if</span> err <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span>
  <span class="token keyword">return</span> <span class="token number">123</span><span class="token punctuation">,</span> err
<span class="token punctuation">}</span>
<span class="token comment">// 继续</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>我们新引入一个关键字 <code>ereturn</code> 来简化。ereturn 会自动判断 error 是否为 nil，<br> 如果不为 nil，则直接返回，否则继续向下运行，如下：</p><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code> err <span class="token operator">:=</span> <span class="token function">testErr</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
 ereturn <span class="token number">123</span><span class="token punctuation">,</span> err
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>ereturn 判断最后一个返回参数 err 是否为 nil，当为 nil 则函数继续，否则函数返回。</p><p>这样就省去了重复多次的 if 判空操作，减少了重复代码。</p><p>那么如何实现 ereturn 了？思路其实很简单，ereturn 语句是将 if, return 两条语句合并，将<br> error 判断操作放在了编译期生成，而不是由工程师手动判断；因此我们只需在 go 编译器中新增 ereturn 关键字，<br> 并在程序编译的时候将 ereturn 语句 重写为 if+return 语句即可。</p><p>首先，添加新的关键字 <strong>ereturn</strong>：</p><div class="language-diff line-numbers-mode" data-ext="diff"><pre class="language-diff"><code><span class="token coord">--- a/src/cmd/compile/internal/syntax/tokens.go</span>
<span class="token coord">+++ b/src/cmd/compile/internal/syntax/tokens.go</span>
@@ -60,6 +60,7 @@ const (
        _Package     // package
        _Range       // range
        _Return      // return
<span class="token inserted-sign inserted"><span class="token prefix inserted">+</span><span class="token line">       _Ereturn     // ereturn
</span></span>        _Select      // select
        _Struct      // struct
        _Switch      // switch
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>然后通过 <code>go generate</code> 命令自动生成该关键字的解析程序：</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># $pwd/bin/go generate $pwd/src/cmd/compile/internal/syntax/tokens.go</span>
stringer <span class="token parameter variable">-type</span> token <span class="token parameter variable">-linecomment</span> tokens.go
tokens.go:9: running <span class="token string">&quot;stringer&quot;</span><span class="token builtin class-name">:</span> exec: <span class="token string">&quot;stringer&quot;</span><span class="token builtin class-name">:</span> executable <span class="token function">file</span> not found <span class="token keyword">in</span> <span class="token environment constant">$PATH</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>提示缺少 stringer，通过 <code>go install</code> 下载，然后再次运行：</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># $pwd/bin/go install golang.org/x/tools/cmd/stringer@latest</span>
<span class="token comment"># export PATH=$GOPATH/bin:$PATH</span>
<span class="token comment"># $pwd/bin/go generate $pwd/src/cmd/compile/internal/syntax/tokens.go</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>generate 会自动解析 tokens.go，然后生成对应的解析程序部分 token_string.go：</p><div class="language-diff line-numbers-mode" data-ext="diff"><pre class="language-diff"><code><span class="token coord">--- a/src/cmd/compile/internal/syntax/token_string.go</span>
<span class="token coord">+++ b/src/cmd/compile/internal/syntax/token_string.go</span>
@@ -49,17 +49,18 @@ func _() {
        _ = x[_Package-39]
        _ = x[_Range-40]
        _ = x[_Return-41]
<span class="token inserted-sign inserted"><span class="token prefix inserted">+</span><span class="token line">       _ = x[_Ereturn-42]
</span></span></code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>有了关键字后，修改 parser.stmtOrNil 方法，将 ereturn 语句改写为 if+return 语句：</p><div class="language-diff line-numbers-mode" data-ext="diff"><pre class="language-diff"><code><span class="token coord">--- a/src/cmd/compile/internal/syntax/parser.go</span>
<span class="token coord">+++ b/src/cmd/compile/internal/syntax/parser.go</span>
@@ -2613,6 +2613,56 @@ func (p *parser) stmtOrNil() Stmt {
                }
                return s
 
<span class="token inserted-sign inserted"><span class="token prefix inserted">+</span><span class="token line">       case _Ereturn:
</span><span class="token prefix inserted">+</span><span class="token line">               pos := p.pos()
</span><span class="token prefix inserted">+</span><span class="token line">               e := new(ReturnStmt)
</span><span class="token prefix inserted">+</span><span class="token line">               e.pos = pos
</span><span class="token prefix inserted">+</span><span class="token line">               p.next()
</span><span class="token prefix inserted">+</span><span class="token line">               if p.tok != _Semi &amp;&amp; p.tok != _Rbrace {
</span><span class="token prefix inserted">+</span><span class="token line">                       e.Results = p.exprList()
</span><span class="token prefix inserted">+</span><span class="token line">               }
</span><span class="token prefix inserted">+</span><span class="token line">               // return block
</span><span class="token prefix inserted">+</span><span class="token line">               b1 := new(BlockStmt)
</span><span class="token prefix inserted">+</span><span class="token line">               b1.pos = pos
</span><span class="token prefix inserted">+</span><span class="token line">               b1.Rbrace = pos
</span><span class="token prefix inserted">+</span><span class="token line">               b1.List = []Stmt{e}
</span><span class="token prefix inserted">+</span><span class="token line">
</span><span class="token prefix inserted">+</span><span class="token line">               set := false
</span><span class="token prefix inserted">+</span><span class="token line">               f := new(IfStmt)
</span><span class="token prefix inserted">+</span><span class="token line">               f.pos = pos
</span><span class="token prefix inserted">+</span><span class="token line">               switch ep := e.Results.(type) {
</span><span class="token prefix inserted">+</span><span class="token line">               case *ListExpr:
</span><span class="token prefix inserted">+</span><span class="token line">                       if len(ep.ElemList) &gt; 0 {
</span><span class="token prefix inserted">+</span><span class="token line">                               if eep, ok := ep.ElemList[len(ep.ElemList)-1].(*Name); ok &amp;&amp; strings.HasPrefix(eep.Value, &quot;err&quot;) {
</span><span class="token prefix inserted">+</span><span class="token line">                                       op := &amp;Operation{
</span><span class="token prefix inserted">+</span><span class="token line">                                               Op: Neq,
</span><span class="token prefix inserted">+</span><span class="token line">                                               X:  eep,
</span><span class="token prefix inserted">+</span><span class="token line">                                               Y:  NewName(pos, &quot;nil&quot;),
</span><span class="token prefix inserted">+</span><span class="token line">                                       }
</span><span class="token prefix inserted">+</span><span class="token line">                                       op.pos = pos
</span><span class="token prefix inserted">+</span><span class="token line">                                       f.Cond = op
</span><span class="token prefix inserted">+</span><span class="token line">                                       set = true
</span><span class="token prefix inserted">+</span><span class="token line">                               }
</span><span class="token prefix inserted">+</span><span class="token line">                       }
</span><span class="token prefix inserted">+</span><span class="token line">               case *Name:
</span><span class="token prefix inserted">+</span><span class="token line">                       if strings.HasPrefix(ep.Value, &quot;err&quot;) {
</span><span class="token prefix inserted">+</span><span class="token line">                               op := &amp;Operation{
</span><span class="token prefix inserted">+</span><span class="token line">                                       Op: Neq,
</span><span class="token prefix inserted">+</span><span class="token line">                                       X:  ep,
</span><span class="token prefix inserted">+</span><span class="token line">                                       Y:  NewName(pos, &quot;nil&quot;),
</span><span class="token prefix inserted">+</span><span class="token line">                               }
</span><span class="token prefix inserted">+</span><span class="token line">                               op.pos = pos
</span><span class="token prefix inserted">+</span><span class="token line">                               f.Cond = op
</span><span class="token prefix inserted">+</span><span class="token line">                               set = true
</span><span class="token prefix inserted">+</span><span class="token line">                       }
</span><span class="token prefix inserted">+</span><span class="token line">               }
</span><span class="token prefix inserted">+</span><span class="token line">               f.Then = b1
</span><span class="token prefix inserted">+</span><span class="token line">               if set {
</span><span class="token prefix inserted">+</span><span class="token line">                       return f
</span><span class="token prefix inserted">+</span><span class="token line">               } else {
</span><span class="token prefix inserted">+</span><span class="token line">                       return e
</span><span class="token prefix inserted">+</span><span class="token line">               }
</span><span class="token prefix inserted">+</span><span class="token line">
</span></span>        case _Semi:
                s := new(EmptyStmt)
                s.pos = p.pos()
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这里运用了一个小技巧，那就是：语句重写。</p><p>ereturn 关键字本身可以视为 if，return 语句的联合体，当 return 语句最后一个返回值为 error 且不为空时，就将其解析为 ereturn 语句。 因此这里<strong>先</strong>将 ereturn 语句解析为 return 语句，然后<strong>判断</strong> Results 列表的<strong>最后一个元素</strong>是否为 error，<br> 如果是则将其包装为 <strong>if</strong> 语句，即在 return 之前先对 error 进行 nil 判断，如果 error 不为 nil，则调用 return，否则不做任何事情。</p><p>修改完毕后，重新生成新的 go.19：</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># cd $pwd/src</span>
<span class="token comment"># ./make.bash </span>
Building Go cmd/dist using /root/.go/go1.18.3. <span class="token punctuation">(</span>go1.18.3 linux/amd64<span class="token punctuation">)</span>
Building Go toolchain1 using /root/.go/go1.18.3.
Building Go bootstrap cmd/go <span class="token punctuation">(</span>go_bootstrap<span class="token punctuation">)</span> using Go toolchain1.
Building Go toolchain2 using go_bootstrap and Go toolchain1.
Building Go toolchain3 using go_bootstrap and Go toolchain2.
Building packages and commands <span class="token keyword">for</span> linux/amd64.
---
Installed Go <span class="token keyword">for</span> linux/amd64 <span class="token keyword">in</span> /root/workspace/go
Installed commands <span class="token keyword">in</span> /root/workspace/go/bin
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,26)),s("p",null,[n[13]||(n[13]=e("编译完成后，用一个")),s("a",g,[n[12]||(n[12]=e("例子")),i(a)]),n[14]||(n[14]=e("看看效果："))]),n[63]||(n[63]=l(`<div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code><span class="token keyword">func</span> <span class="token function">testErr</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token builtin">error</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> errors<span class="token punctuation">.</span><span class="token function">New</span><span class="token punctuation">(</span><span class="token string">&quot;err&quot;</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>

<span class="token keyword">func</span> <span class="token function">testNoErr</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token builtin">error</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> <span class="token boolean">nil</span>
<span class="token punctuation">}</span>

<span class="token keyword">func</span> <span class="token function">hello</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">(</span><span class="token builtin">string</span><span class="token punctuation">,</span> <span class="token builtin">error</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    err <span class="token operator">:=</span> <span class="token function">testNoErr</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    ereturn <span class="token string">&quot;111&quot;</span><span class="token punctuation">,</span> err <span class="token comment">// r1</span>

    err <span class="token operator">=</span> <span class="token function">testNoErr</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    ereturn <span class="token string">&quot;777&quot;</span><span class="token punctuation">,</span> err <span class="token comment">// r2</span>

    err <span class="token operator">=</span> <span class="token function">testErr</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    ereturn <span class="token string">&quot;222&quot;</span><span class="token punctuation">,</span> err <span class="token comment">// r3</span>

    <span class="token keyword">return</span> <span class="token string">&quot;333&quot;</span><span class="token punctuation">,</span> <span class="token boolean">nil</span> <span class="token comment">// r4</span>
<span class="token punctuation">}</span>

<span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token function">hello</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>运行：</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># $pwd/bin/go run $pwd/lab/examples/example1/main.go                                                                                                 </span>
<span class="token number">222</span> err
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>程序输入 <code>222，err</code>，证明函数 hello 从 r3 处退出，显然 r1，r2 处的 error 都是 nil，因此判断不成立，<br> 所以函数继续执行，而到 r3 处时，error 不为 nil，所以直接返回。</p>`,4)),s("p",null,[n[16]||(n[16]=e("到此一个新的 ereturn 关键字就顺利完成了，具体实现可以参考这个 ")),s("a",f,[n[15]||(n[15]=e("commit")),i(a)]),n[17]||(n[17]=e("。"))]),n[64]||(n[64]=s("h2",{id:"go-编译器",tabindex:"-1"},[s("a",{class:"header-anchor",href:"#go-编译器","aria-hidden":"true"},"#"),e(" go 编译器")],-1)),n[65]||(n[65]=s("p",null,[e("到这里，我们可以发现 go 编译器设计良好、代码易读，新增一个可用的关键字竟如此简单。但是旅程绝不仅限于此，"),s("br"),e(" 就目前而言，我们只接触到 go 编译器中极其小的一部分，甚至这些都不是 go 编译器中的核心点。")],-1)),n[66]||(n[66]=s("p",null,"go 编译器是按照程序编译过程来设计实现的，大致可分为如下 4 个大阶段：",-1)),n[67]||(n[67]=s("p",null,[s("img",{src:c,alt:"compiler"})],-1)),s("blockquote",null,[s("p",null,[n[19]||(n[19]=e("以上图片按照 go 官方文档介绍绘制而成，感兴趣的可以点击")),n[20]||(n[20]=s("br",null,null,-1)),s("a",x,[n[18]||(n[18]=e("这里")),i(a)]),n[21]||(n[21]=e("查看一下 go 编译器的")),n[22]||(n[22]=s("br",null,null,-1)),n[23]||(n[23]=e(" 简单介绍。文档可能会随着迭代更新。"))])]),n[68]||(n[68]=s("ol",null,[s("li",null,"解析阶段：将 go 源代码词法、句法、语法分析，生成程序可读的语法树（syntax tree）；"),s("li",null,"检查、转换阶段：对生成的语法树做语法检查，补充元信息；"),s("li",null,"生成 SSA 节点，通过流程图分析对代码进行优化、重写；"),s("li",null,"生成机器码，即最后的可执行代码。")],-1)),s("blockquote",null,[s("p",null,[n[25]||(n[25]=e("关于 SSA，可点击")),s("a",h,[n[24]||(n[24]=e("此处")),i(a)]),n[26]||(n[26]=e("了解。"))])]),n[69]||(n[69]=l(`<p>而 ereturn 语句的处理，只停留在了第 1 阶段，即解析阶段的时候，就被转化为了 if、return 语句，后面的 2、3、4 阶段都是以其它语句的身份来参与。</p><p>下面，我们就通过另外一个关键字 <code>dowhile</code> 来一起看看 go 编译的 4 个阶段。</p><h2 id="dowhile" tabindex="-1"><a class="header-anchor" href="#dowhile" aria-hidden="true">#</a> dowhile</h2><p>有一定 c 语言基础的同学肯定熟悉 <code>do while</code> 这两个关键字，因此它们联合可以实现如下语句：</p><div class="language-c line-numbers-mode" data-ext="c"><pre class="language-c"><code><span class="token keyword">do</span>
<span class="token punctuation">{</span>
  <span class="token comment">// body</span>
  <span class="token comment">// do something</span>
<span class="token punctuation">}</span> <span class="token keyword">while</span><span class="token punctuation">(</span> condition <span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>do while 语句最大的好处在于，即使 condition 不满足，那么也能执行 body 里面的代码，如果满足，那么会重复执行<br> 直到不满足为止。</p><p>在 go 中是没有 do、while 两个关键字的，对于循环执行也只提供了 for 语句。</p><blockquote><p>千万不要使用 do 作为关键字，因为 go 中大量使用了 do 作为变量名，如果使用 do {} while 这类语法，那么 go 无法编译成功。</p></blockquote><p>因此，我们决定在 go 中新增 dowhile 关键字，可达到下面的效果：</p><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code>i <span class="token operator">:=</span> <span class="token number">3</span>
dowhile i <span class="token operator">!=</span> <span class="token number">0</span> <span class="token punctuation">{</span>
  i<span class="token operator">--</span>
  <span class="token comment">// do something</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>变量 <code>i</code> 在 dowhile 语句外部初始化，dowhile 执行到 i 不满足条件为止。</p><p>或者：</p><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code>dowhile i <span class="token operator">:=</span> <span class="token number">3</span><span class="token punctuation">;</span> i <span class="token operator">!=</span> <span class="token number">0</span> <span class="token punctuation">{</span>
  i<span class="token operator">--</span>
  <span class="token comment">// do something</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>变量 <code>i</code> 在 dowhile 语句上初始化，dowhile 执行到 i 不满足条件为止。</p><p>或者：</p><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code>i <span class="token operator">:=</span> <span class="token number">4</span>
dowhile i <span class="token operator">!=</span> <span class="token number">4</span> <span class="token punctuation">{</span>
   <span class="token comment">// do something</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>变量 <code>i</code> 在 dowhile 语句外部初始化，不满足循环条件，但 dowhile 仍会执行 body 中的语句。</p><p>下面我们就来为 go 新增 dowhile 支持。</p><p>首先，添加新的 dowhile 关键字：</p><div class="language-diff line-numbers-mode" data-ext="diff"><pre class="language-diff"><code><span class="token coord">--- a/src/cmd/compile/internal/syntax/tokens.go</span>
<span class="token coord">+++ b/src/cmd/compile/internal/syntax/tokens.go</span>
@@ -50,6 +50,7 @@ const (
        _For         // for
<span class="token inserted-sign inserted"><span class="token prefix inserted">+</span><span class="token line">       _Dowhile     // dowhile
</span></span>        _Func        // func
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>定义新的 dowhile 语句：</p><div class="language-diff line-numbers-mode" data-ext="diff"><pre class="language-diff"><code><span class="token coord">--- a/src/cmd/compile/internal/syntax/nodes.go</span>
<span class="token coord">+++ b/src/cmd/compile/internal/syntax/nodes.go</span>
@@ -410,6 +410,19 @@ type (
                stmt
        }
 
<span class="token inserted-sign inserted"><span class="token prefix inserted">+</span><span class="token line">       /**
</span><span class="token prefix inserted">+</span><span class="token line">       init、cond 均可省略
</span><span class="token prefix inserted">+</span><span class="token line">       dowhile &lt;init&gt;; &lt;cond&gt; {
</span><span class="token prefix inserted">+</span><span class="token line">         &lt;body&gt;
</span><span class="token prefix inserted">+</span><span class="token line">       }
</span><span class="token prefix inserted">+</span><span class="token line">       */
</span><span class="token prefix inserted">+</span><span class="token line">       DowhileStmt struct {
</span><span class="token prefix inserted">+</span><span class="token line">               Init SimpleStmt // incl. *RangeClause
</span><span class="token prefix inserted">+</span><span class="token line">               Cond Expr
</span><span class="token prefix inserted">+</span><span class="token line">               Body *BlockStmt
</span><span class="token prefix inserted">+</span><span class="token line">               stmt
</span><span class="token prefix inserted">+</span><span class="token line">       }
</span></span></code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>新增关键字后再次生成 token_string 用于解析新的关键字：</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># export PATH=$GOPATH/bin:$PATH</span>
<span class="token comment"># $pwd/bin/go generate $pwd/src/cmd/compile/internal/syntax/tokens.go</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>检查 token_string.go 中 dowhile 关键字是否成功：</p><div class="language-diff line-numbers-mode" data-ext="diff"><pre class="language-diff"><code><span class="token coord">--- a/src/cmd/compile/internal/syntax/token_string.go</span>
<span class="token coord">+++ b/src/cmd/compile/internal/syntax/token_string.go</span>
@@ -39,28 +39,29 @@ func _() {
        _ = x[_Else-29]
        _ = x[_Fallthrough-30]
        _ = x[_For-31]
<span class="token inserted-sign inserted"><span class="token prefix inserted">+</span><span class="token line">       _ = x[_Dowhile-32]
</span></span></code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>改造 parser 使其支持 dowhile 关键字解析：</p><div class="language-diff line-numbers-mode" data-ext="diff"><pre class="language-diff"><code><span class="token coord">--- a/src/cmd/compile/internal/syntax/parser.go</span>
<span class="token coord">+++ b/src/cmd/compile/internal/syntax/parser.go</span>
@@ -2269,6 +2269,20 @@ func (p *parser) forStmt() Stmt {
        return s
 }
 
<span class="token inserted-sign inserted"><span class="token prefix inserted">+</span><span class="token line">func (p *parser) dowhileStmt() Stmt {
</span><span class="token prefix inserted">+</span><span class="token line">       if trace {
</span><span class="token prefix inserted">+</span><span class="token line">               defer p.trace(&quot;dowhileStmt&quot;)()
</span><span class="token prefix inserted">+</span><span class="token line">       }
</span><span class="token prefix inserted">+</span><span class="token line">
</span><span class="token prefix inserted">+</span><span class="token line">       s := new(DowhileStmt)
</span><span class="token prefix inserted">+</span><span class="token line">       s.pos = p.pos()
</span><span class="token prefix inserted">+</span><span class="token line">
</span><span class="token prefix inserted">+</span><span class="token line">       s.Init, s.Cond, _ = p.header(_Dowhile)
</span><span class="token prefix inserted">+</span><span class="token line">       s.Body = p.blockStmt(&quot;dowhile clause&quot;)
</span><span class="token prefix inserted">+</span><span class="token line">
</span><span class="token prefix inserted">+</span><span class="token line">       return s
</span><span class="token prefix inserted">+</span><span class="token line">}
</span><span class="token prefix inserted">+</span><span class="token line">
</span></span> func (p *parser) header(keyword token) (init SimpleStmt, cond Expr, post SimpleStmt) {
        p.want(keyword)
 
@@ -2567,6 +2581,9 @@ func (p *parser) stmtOrNil() Stmt {
        case _For:
                return p.forStmt()
 
<span class="token inserted-sign inserted"><span class="token prefix inserted">+</span><span class="token line">       case _Dowhile:
</span><span class="token prefix inserted">+</span><span class="token line">               return p.dowhileStmt()
</span></span></code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这样，go 编译器就支持 dowhile 语句的解析了，我们可以测试看看解析一个 dowhile 例子：</p><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code><span class="token keyword">package</span> main
<span class="token keyword">import</span> <span class="token punctuation">(</span>
    <span class="token string">&quot;fmt&quot;</span>
<span class="token punctuation">)</span>
<span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    i <span class="token operator">:=</span> <span class="token number">4</span>
    dowhile i <span class="token operator">&gt;</span> <span class="token number">0</span> <span class="token punctuation">{</span>
        fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span>i<span class="token punctuation">)</span>
        i<span class="token operator">--</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>编译 go：</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># cd $pwd/src</span>
<span class="token comment"># ./make.bash </span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>在 dumper_test 中新增测试用例：</p><div class="language-diff line-numbers-mode" data-ext="diff"><pre class="language-diff"><code>index 1ba85cc8d9..dcfaf063e7 100644
<span class="token coord">--- a/src/cmd/compile/internal/syntax/dumper_test.go</span>
<span class="token coord">+++ b/src/cmd/compile/internal/syntax/dumper_test.go</span>
@@ -19,3 +19,12 @@ func TestDump(t *testing.T) {
<span class="token inserted-sign inserted"><span class="token prefix inserted">+</span><span class="token line">
</span><span class="token prefix inserted">+</span><span class="token line">func TestDump1(t *testing.T) {
</span><span class="token prefix inserted">+</span><span class="token line">       file := &quot;./lab/examples/example2/main.go&quot;
</span><span class="token prefix inserted">+</span><span class="token line">       ast, _ := ParseFile(file, func(err error) { t.Error(err) }, nil, CheckBranches)
</span><span class="token prefix inserted">+</span><span class="token line">
</span><span class="token prefix inserted">+</span><span class="token line">       if ast != nil {
</span><span class="token prefix inserted">+</span><span class="token line">               Fdump(testOut(), ast)
</span><span class="token prefix inserted">+</span><span class="token line">       }
</span><span class="token prefix inserted">+</span><span class="token line">}
</span></span></code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>运行测试，输出语法 AST 树：</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># $pwd/bin/go test -c -o dump.test ./src/cmd/compile/internal/syntax/ -run TestDump1</span>
<span class="token comment"># ./dump.test -test.run TestDump1 -test.v</span>

<span class="token operator">==</span><span class="token operator">=</span> RUN   TestDump1
<span class="token comment"># ...</span>
    <span class="token number">35</span>  <span class="token builtin class-name">.</span>  <span class="token builtin class-name">.</span>  <span class="token builtin class-name">.</span>  <span class="token builtin class-name">.</span>  <span class="token builtin class-name">.</span>  <span class="token number">1</span>: *syntax.DowhileStmt <span class="token punctuation">{</span>
    <span class="token number">36</span>  <span class="token builtin class-name">.</span>  <span class="token builtin class-name">.</span>  <span class="token builtin class-name">.</span>  <span class="token builtin class-name">.</span>  <span class="token builtin class-name">.</span>  <span class="token builtin class-name">.</span>  Init: nil
    <span class="token number">37</span>  <span class="token builtin class-name">.</span>  <span class="token builtin class-name">.</span>  <span class="token builtin class-name">.</span>  <span class="token builtin class-name">.</span>  <span class="token builtin class-name">.</span>  <span class="token builtin class-name">.</span>  Cond: *syntax.Operation <span class="token punctuation">{</span>
    <span class="token number">38</span>  <span class="token builtin class-name">.</span>  <span class="token builtin class-name">.</span>  <span class="token builtin class-name">.</span>  <span class="token builtin class-name">.</span>  <span class="token builtin class-name">.</span>  <span class="token builtin class-name">.</span>  <span class="token builtin class-name">.</span>  Op: <span class="token operator">&gt;</span>
    <span class="token number">39</span>  <span class="token builtin class-name">.</span>  <span class="token builtin class-name">.</span>  <span class="token builtin class-name">.</span>  <span class="token builtin class-name">.</span>  <span class="token builtin class-name">.</span>  <span class="token builtin class-name">.</span>  <span class="token builtin class-name">.</span>  X: i @ ./lab/examples/example2/main.go:9:10
    <span class="token number">40</span>  <span class="token builtin class-name">.</span>  <span class="token builtin class-name">.</span>  <span class="token builtin class-name">.</span>  <span class="token builtin class-name">.</span>  <span class="token builtin class-name">.</span>  <span class="token builtin class-name">.</span>  <span class="token builtin class-name">.</span>  Y: *syntax.BasicLit <span class="token punctuation">{</span>
    <span class="token number">41</span>  <span class="token builtin class-name">.</span>  <span class="token builtin class-name">.</span>  <span class="token builtin class-name">.</span>  <span class="token builtin class-name">.</span>  <span class="token builtin class-name">.</span>  <span class="token builtin class-name">.</span>  <span class="token builtin class-name">.</span>  <span class="token builtin class-name">.</span>  Value: <span class="token string">&quot;0&quot;</span>
    <span class="token number">42</span>  <span class="token builtin class-name">.</span>  <span class="token builtin class-name">.</span>  <span class="token builtin class-name">.</span>  <span class="token builtin class-name">.</span>  <span class="token builtin class-name">.</span>  <span class="token builtin class-name">.</span>  <span class="token builtin class-name">.</span>  <span class="token builtin class-name">.</span>  Kind: <span class="token number">0</span>
    <span class="token number">43</span>  <span class="token builtin class-name">.</span>  <span class="token builtin class-name">.</span>  <span class="token builtin class-name">.</span>  <span class="token builtin class-name">.</span>  <span class="token builtin class-name">.</span>  <span class="token builtin class-name">.</span>  <span class="token builtin class-name">.</span>  <span class="token builtin class-name">.</span>  Bad: <span class="token boolean">false</span>
    <span class="token number">44</span>  <span class="token builtin class-name">.</span>  <span class="token builtin class-name">.</span>  <span class="token builtin class-name">.</span>  <span class="token builtin class-name">.</span>  <span class="token builtin class-name">.</span>  <span class="token builtin class-name">.</span>  <span class="token builtin class-name">.</span>  <span class="token punctuation">}</span>
    <span class="token number">45</span>  <span class="token builtin class-name">.</span>  <span class="token builtin class-name">.</span>  <span class="token builtin class-name">.</span>  <span class="token builtin class-name">.</span>  <span class="token builtin class-name">.</span>  <span class="token builtin class-name">.</span>  <span class="token punctuation">}</span>
<span class="token comment"># ...</span>
--- PASS: TestDump1 <span class="token punctuation">(</span><span class="token number">0</span>.00s<span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>解析成功。当然有了定义还不够，还需新增 DowhileStmt 语句遍历函数：</p><div class="language-diff line-numbers-mode" data-ext="diff"><pre class="language-diff"><code><span class="token coord">--- a/src/cmd/compile/internal/syntax/walk.go</span>
<span class="token coord">+++ b/src/cmd/compile/internal/syntax/walk.go</span>
@@ -289,6 +289,15 @@ func (w walker) node(n Node) {
                }
                w.node(n.Body)
 
<span class="token inserted-sign inserted"><span class="token prefix inserted">+</span><span class="token line">       case *DowhileStmt: // 新增
</span><span class="token prefix inserted">+</span><span class="token line">               if n.Init != nil {
</span><span class="token prefix inserted">+</span><span class="token line">                       w.node(n.Init)
</span><span class="token prefix inserted">+</span><span class="token line">               }
</span><span class="token prefix inserted">+</span><span class="token line">               if n.Cond != nil {
</span><span class="token prefix inserted">+</span><span class="token line">                       w.node(n.Cond)
</span><span class="token prefix inserted">+</span><span class="token line">               }
</span><span class="token prefix inserted">+</span><span class="token line">               w.node(n.Body)
</span><span class="token prefix inserted">+</span><span class="token line">
</span></span>        case *SwitchStmt:
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>新增对 dowhile 语句语法检查 case：</p><div class="language-diff line-numbers-mode" data-ext="diff"><pre class="language-diff"><code><span class="token coord">--- a/src/cmd/compile/internal/types2/stmt.go</span>
<span class="token coord">+++ b/src/cmd/compile/internal/types2/stmt.go</span>
@@ -652,6 +652,21 @@ func (check *Checker) stmt(ctxt stmtContext, s syntax.Stmt) {
                }
                check.stmt(inner, s.Body)
 
<span class="token inserted-sign inserted"><span class="token prefix inserted">+</span><span class="token line">       case *syntax.DowhileStmt:
</span><span class="token prefix inserted">+</span><span class="token line">               inner |= breakOk | continueOk
</span><span class="token prefix inserted">+</span><span class="token line">
</span><span class="token prefix inserted">+</span><span class="token line">               check.openScope(s, &quot;do while&quot;)
</span><span class="token prefix inserted">+</span><span class="token line">               defer check.closeScope()
</span><span class="token prefix inserted">+</span><span class="token line">               check.simpleStmt(s.Init)
</span><span class="token prefix inserted">+</span><span class="token line">               if s.Cond != nil {
</span><span class="token prefix inserted">+</span><span class="token line">                       var x operand
</span><span class="token prefix inserted">+</span><span class="token line">                       check.expr(&amp;x, s.Cond)
</span><span class="token prefix inserted">+</span><span class="token line">                       if x.mode != invalid &amp;&amp; !allBoolean(x.typ) {
</span><span class="token prefix inserted">+</span><span class="token line">                               check.error(s.Cond, &quot;non-boolean condition in for statement&quot;)
</span><span class="token prefix inserted">+</span><span class="token line">                       }
</span><span class="token prefix inserted">+</span><span class="token line">               }
</span><span class="token prefix inserted">+</span><span class="token line">               check.stmt(inner, s.Body)
</span><span class="token prefix inserted">+</span><span class="token line">
</span></span>        default:
                check.error(s, &quot;invalid statement&quot;)
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>语法解析、检查后，go 会将语法树转化为 IR（中间码），新增 <code>ODOWHILE</code> IR 关键字：</p><div class="language-diff line-numbers-mode" data-ext="diff"><pre class="language-diff"><code><span class="token coord">--- a/src/cmd/compile/internal/ir/node.go</span>
<span class="token coord">+++ b/src/cmd/compile/internal/ir/node.go</span>
@@ -273,14 +273,15 @@ const (
        //      }
        OFORUNTIL
<span class="token inserted-sign inserted"><span class="token prefix inserted">+</span><span class="token line">       ODOWHILE // dowhile Init; Cond { Body };
</span></span></code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>新增 IR 语句定义：</p><div class="language-diff line-numbers-mode" data-ext="diff"><pre class="language-diff"><code><span class="token coord">--- a/src/cmd/compile/internal/ir/stmt.go</span>
<span class="token coord">+++ b/src/cmd/compile/internal/ir/stmt.go</span>
@@ -223,6 +223,35 @@ func (n *ForStmt) SetOp(op Op) {
        n.op = op
 }
 
<span class="token inserted-sign inserted"><span class="token prefix inserted">+</span><span class="token line">// A DowhileStmt is a non-range for loop: dowhile Init; Cond { Body }
</span><span class="token prefix inserted">+</span><span class="token line">type DowhileStmt struct {
</span><span class="token prefix inserted">+</span><span class="token line">       miniStmt
</span><span class="token prefix inserted">+</span><span class="token line">       Label    *types.Sym
</span><span class="token prefix inserted">+</span><span class="token line">       Cond     Node
</span><span class="token prefix inserted">+</span><span class="token line">       Body     Nodes
</span><span class="token prefix inserted">+</span><span class="token line">       HasBreak bool // break in body
</span><span class="token prefix inserted">+</span><span class="token line">}
</span><span class="token prefix inserted">+</span><span class="token line">
</span><span class="token prefix inserted">+</span><span class="token line">// New dowhile statement
</span><span class="token prefix inserted">+</span><span class="token line">func NewDowhileStmt(pos src.XPos, init Node, cond Node, body []Node) *DowhileStmt {
</span><span class="token prefix inserted">+</span><span class="token line">       n := &amp;DowhileStmt{Cond: cond} // condition
</span><span class="token prefix inserted">+</span><span class="token line">       n.pos = pos
</span><span class="token prefix inserted">+</span><span class="token line">       n.op = ODOWHILE
</span><span class="token prefix inserted">+</span><span class="token line">       if init != nil { // init
</span><span class="token prefix inserted">+</span><span class="token line">               n.init = []Node{init}
</span><span class="token prefix inserted">+</span><span class="token line">       }
</span><span class="token prefix inserted">+</span><span class="token line">       n.Body = body // body
</span><span class="token prefix inserted">+</span><span class="token line">       return n
</span><span class="token prefix inserted">+</span><span class="token line">}
</span><span class="token prefix inserted">+</span><span class="token line">
</span><span class="token prefix inserted">+</span><span class="token line">func (n *DowhileStmt) SetOp(op Op) {
</span><span class="token prefix inserted">+</span><span class="token line">       if op != ODOWHILE {
</span><span class="token prefix inserted">+</span><span class="token line">               panic(n.no(&quot;SetOp &quot; + op.String()))
</span><span class="token prefix inserted">+</span><span class="token line">       }
</span><span class="token prefix inserted">+</span><span class="token line">       n.op = op
</span><span class="token prefix inserted">+</span><span class="token line">}
</span></span></code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>有了关键字、语句定义后，通过脚本生成 IR 关键字：</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># $pwd/bin/go generate $pwd/src/cmd/compile/internal/ir/node.go</span>
<span class="token comment"># $pwd/bin/go run -mod=mod $pwd/src/cmd/compile/internal/ir/mknode.go</span>
<span class="token comment"># mv $pwd/node_gen.go $pwd/src/cmd/compile/internal/ir/</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,46)),s("p",null,[n[28]||(n[28]=e("generate 命令会重新生成")),s("a",w,[n[27]||(n[27]=e("op_string.go")),i(a)]),n[29]||(n[29]=e("文件，")),n[30]||(n[30]=s("br",null,null,-1)),n[31]||(n[31]=e(" 用于将 ODOWHILE 关键字转化为字符串方便 debug。"))]),s("p",null,[n[33]||(n[33]=e("run 命令会重新生成")),s("a",y,[n[32]||(n[32]=e("node_gen.go")),i(a)]),n[34]||(n[34]=e("文件，")),n[35]||(n[35]=s("br",null,null,-1)),n[36]||(n[36]=e(" 用于自动实现 DowhileStmt 语句的格式化、拷贝等操作。"))]),n[70]||(n[70]=l(`<p>为了方便 DowhileStmt 语句的 debug，因此新增 ODOWHILE 格式化的 case：</p><div class="language-diff line-numbers-mode" data-ext="diff"><pre class="language-diff"><code><span class="token coord">--- a/src/cmd/compile/internal/ir/fmt.go</span>
<span class="token coord">+++ b/src/cmd/compile/internal/ir/fmt.go</span>
@@ -435,6 +435,25 @@ func stmtFmt(n Node, s fmt.State) {
 
                fmt.Fprintf(s, &quot; { %v }&quot;, n.Body)
 
<span class="token inserted-sign inserted"><span class="token prefix inserted">+</span><span class="token line">       case ODOWHILE:
</span><span class="token prefix inserted">+</span><span class="token line">               n := n.(*DowhileStmt)
</span><span class="token prefix inserted">+</span><span class="token line">               opname := &quot;dowhile&quot;
</span><span class="token prefix inserted">+</span><span class="token line">               if !exportFormat {
</span><span class="token prefix inserted">+</span><span class="token line">                       fmt.Fprintf(s, &quot;%s loop&quot;, opname)
</span><span class="token prefix inserted">+</span><span class="token line">                       break
</span><span class="token prefix inserted">+</span><span class="token line">               }
</span><span class="token prefix inserted">+</span><span class="token line">               fmt.Fprint(s, opname)
</span><span class="token prefix inserted">+</span><span class="token line">               if simpleinit {
</span><span class="token prefix inserted">+</span><span class="token line">                       fmt.Fprintf(s, &quot; %v;&quot;, n.Init()[0])
</span><span class="token prefix inserted">+</span><span class="token line">               }
</span><span class="token prefix inserted">+</span><span class="token line">               if n.Cond != nil {
</span><span class="token prefix inserted">+</span><span class="token line">                       fmt.Fprintf(s, &quot; %v&quot;, n.Cond)
</span><span class="token prefix inserted">+</span><span class="token line">               }
</span><span class="token prefix inserted">+</span><span class="token line">               if simpleinit {
</span><span class="token prefix inserted">+</span><span class="token line">                       fmt.Fprint(s, &quot;;&quot;)
</span><span class="token prefix inserted">+</span><span class="token line">               }
</span><span class="token prefix inserted">+</span><span class="token line">               fmt.Fprintf(s, &quot; { %v }&quot;, n.Body)
</span><span class="token prefix inserted">+</span><span class="token line">
</span></span>        case ORANGE:
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>有了 AST、IR 的 dowhile 定义后，我们需要在 noder 中实现二者之间的转化，<br> 即将 syntax.DowhileStmt 转化为 ir.DowhileStmt，如下：</p><div class="language-diff line-numbers-mode" data-ext="diff"><pre class="language-diff"><code><span class="token coord">--- a/src/cmd/compile/internal/noder/stmt.go</span>
<span class="token coord">+++ b/src/cmd/compile/internal/noder/stmt.go</span>
@@ -118,6 +118,8 @@ func (g *irgen) stmt(stmt syntax.Stmt) ir.Node {
                return g.ifStmt(stmt)
        case *syntax.ForStmt:
                return g.forStmt(stmt)
<span class="token inserted-sign inserted"><span class="token prefix inserted">+</span><span class="token line">       case *syntax.DowhileStmt:
</span><span class="token prefix inserted">+</span><span class="token line">               return g.dowhileStmt(stmt)
</span></span>        case *syntax.SelectStmt:
                n := g.selectStmt(stmt)
 
@@ -260,6 +262,10 @@ func (g *irgen) forStmt(stmt *syntax.ForStmt) ir.Node {
        return ir.NewForStmt(g.pos(stmt), g.stmt(stmt.Init), g.expr(stmt.Cond), g.stmt(stmt.Post), g.blockStmt(stmt.Body))
 }
 
<span class="token inserted-sign inserted"><span class="token prefix inserted">+</span><span class="token line">func (g *irgen) dowhileStmt(stmt *syntax.DowhileStmt) ir.Node {
</span><span class="token prefix inserted">+</span><span class="token line">       return ir.NewDowhileStmt(g.pos(stmt), g.stmt(stmt.Init), g.expr(stmt.Cond), g.blockStmt(stmt.Body))
</span><span class="token prefix inserted">+</span><span class="token line">}
</span></span></code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>AST 转换为 IR node 后，编译就进入到了第 3 步，下面就需要对 IR 进行一系列的分析和优化。</p><p>比如，先对 ir.DowhileStmt 语句进行逃逸分析：</p><div class="language-diff line-numbers-mode" data-ext="diff"><pre class="language-diff"><code><span class="token coord">--- a/src/cmd/compile/internal/escape/stmt.go</span>
<span class="token coord">+++ b/src/cmd/compile/internal/escape/stmt.go</span>
@@ -82,6 +82,13 @@ func (e *escape) stmt(n ir.Node) {
<span class="token unchanged"><span class="token prefix unchanged"> </span><span class="token line">               e.block(n.Body)
</span><span class="token prefix unchanged"> </span><span class="token line">               e.loopDepth--
</span></span>
<span class="token inserted-sign inserted"><span class="token prefix inserted">+</span><span class="token line">       case ir.ODOWHILE:
</span><span class="token prefix inserted">+</span><span class="token line">               n := n.(*ir.DowhileStmt)
</span><span class="token prefix inserted">+</span><span class="token line">               e.loopDepth++
</span><span class="token prefix inserted">+</span><span class="token line">               e.discard(n.Cond)
</span><span class="token prefix inserted">+</span><span class="token line">               e.block(n.Body)
</span><span class="token prefix inserted">+</span><span class="token line">               e.loopDepth--
</span><span class="token prefix inserted">+</span><span class="token line">
</span></span><span class="token unchanged"><span class="token prefix unchanged"> </span><span class="token line">       case ir.ORANGE:
</span><span class="token prefix unchanged"> </span><span class="token line">               // for Key, Value = range X { Body }
</span><span class="token prefix unchanged"> </span><span class="token line">               n := n.(*ir.RangeStmt)
</span></span></code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>接着将节点拆分为更加简单的节点，比如拆分 dowhile 中的初始化、条件、执行体等节点：</p><div class="language-diff line-numbers-mode" data-ext="diff"><pre class="language-diff"><code><span class="token coord">--- a/src/cmd/compile/internal/syntax/walk.go</span>
<span class="token coord">+++ b/src/cmd/compile/internal/syntax/walk.go</span>
@@ -289,6 +289,15 @@ func (w walker) node(n Node) {
<span class="token unchanged"><span class="token prefix unchanged"> </span><span class="token line">               }
</span><span class="token prefix unchanged"> </span><span class="token line">               w.node(n.Body)
</span></span>
<span class="token inserted-sign inserted"><span class="token prefix inserted">+</span><span class="token line">       case *DowhileStmt: // 新增
</span><span class="token prefix inserted">+</span><span class="token line">               if n.Init != nil {
</span><span class="token prefix inserted">+</span><span class="token line">                       w.node(n.Init)
</span><span class="token prefix inserted">+</span><span class="token line">               }
</span><span class="token prefix inserted">+</span><span class="token line">               if n.Cond != nil {
</span><span class="token prefix inserted">+</span><span class="token line">                       w.node(n.Cond)
</span><span class="token prefix inserted">+</span><span class="token line">               }
</span><span class="token prefix inserted">+</span><span class="token line">               w.node(n.Body)
</span><span class="token prefix inserted">+</span><span class="token line">
</span></span><span class="token unchanged"><span class="token prefix unchanged"> </span><span class="token line">       case *SwitchStmt:
</span><span class="token prefix unchanged"> </span><span class="token line">               if n.Init != nil {
</span><span class="token prefix unchanged"> </span><span class="token line">                       w.node(n.Init)
</span></span></code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>再针对 dowhile 中的一些语句执行顺序尝试进行重排序：</p><div class="language-diff line-numbers-mode" data-ext="diff"><pre class="language-diff"><code><span class="token coord">--- a/src/cmd/compile/internal/walk/order.go</span>
<span class="token coord">+++ b/src/cmd/compile/internal/walk/order.go</span>
@@ -829,6 +829,15 @@ func (o *orderState) stmt(n ir.Node) {
<span class="token unchanged"><span class="token prefix unchanged"> </span><span class="token line">               o.out = append(o.out, n)
</span><span class="token prefix unchanged"> </span><span class="token line">               o.cleanTemp(t)
</span></span>
<span class="token inserted-sign inserted"><span class="token prefix inserted">+</span><span class="token line">       case ir.ODOWHILE:
</span><span class="token prefix inserted">+</span><span class="token line">               n := n.(*ir.DowhileStmt)
</span><span class="token prefix inserted">+</span><span class="token line">               t := o.markTemp()
</span><span class="token prefix inserted">+</span><span class="token line">               n.Cond = o.exprInPlace(n.Cond)
</span><span class="token prefix inserted">+</span><span class="token line">               n.Body.Prepend(o.cleanTempNoPop(t)...)
</span><span class="token prefix inserted">+</span><span class="token line">               orderBlock(&amp;n.Body, o.free)
</span><span class="token prefix inserted">+</span><span class="token line">               o.out = append(o.out, n)
</span><span class="token prefix inserted">+</span><span class="token line">               o.cleanTemp(t)
</span><span class="token prefix inserted">+</span><span class="token line">
</span></span><span class="token unchanged"><span class="token prefix unchanged"> </span><span class="token line">       // Clean temporaries from condition at
</span><span class="token prefix unchanged"> </span><span class="token line">       // beginning of both branches.
</span><span class="token prefix unchanged"> </span><span class="token line">       case ir.OIF:
</span></span></code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>完成了一系列检查、优化后，编译器 需将 dowhile 节点转化为控制流图 CFG （Control-flow Graph），如下：</p><div class="language-diff line-numbers-mode" data-ext="diff"><pre class="language-diff"><code><span class="token coord">--- a/src/cmd/compile/internal/ssagen/ssa.go</span>
<span class="token coord">+++ b/src/cmd/compile/internal/ssagen/ssa.go</span>
@@ -1821,6 +1821,34 @@ func (s *state) stmt(n ir.Node) {

<span class="token unchanged"><span class="token prefix unchanged"> </span><span class="token line">               s.startBlock(bEnd)
</span></span>
<span class="token inserted-sign inserted"><span class="token prefix inserted">+</span><span class="token line">       case ir.ODOWHILE: // dowhile Init; Cond { Body };
</span><span class="token prefix inserted">+</span><span class="token line">               // TODO 增加 break、continue 支持
</span><span class="token prefix inserted">+</span><span class="token line">               n := n.(*ir.DowhileStmt)
</span><span class="token prefix inserted">+</span><span class="token line">               bCond := s.f.NewBlock(ssa.BlockPlain)
</span><span class="token prefix inserted">+</span><span class="token line">               bBody := s.f.NewBlock(ssa.BlockPlain)
</span><span class="token prefix inserted">+</span><span class="token line">               bEnd := s.f.NewBlock(ssa.BlockPlain)
</span><span class="token prefix inserted">+</span><span class="token line">               bBody.Pos = n.Pos()
</span><span class="token prefix inserted">+</span><span class="token line">               // 上一个 block
</span><span class="token prefix inserted">+</span><span class="token line">               b := s.endBlock()
</span><span class="token prefix inserted">+</span><span class="token line">               // 上一个紧接着 body, dowhile 的效果
</span><span class="token prefix inserted">+</span><span class="token line">               b.AddEdgeTo(bBody)
</span><span class="token prefix inserted">+</span><span class="token line">               // 处理 body
</span><span class="token prefix inserted">+</span><span class="token line">               s.startBlock(bBody)
</span><span class="token prefix inserted">+</span><span class="token line">               s.stmtList(n.Body)
</span><span class="token prefix inserted">+</span><span class="token line">               b = s.endBlock()
</span><span class="token prefix inserted">+</span><span class="token line">               // 条件处理
</span><span class="token prefix inserted">+</span><span class="token line">               b.AddEdgeTo(bCond)
</span><span class="token prefix inserted">+</span><span class="token line">               s.startBlock(bCond)
</span><span class="token prefix inserted">+</span><span class="token line">               if n.Cond != nil {
</span><span class="token prefix inserted">+</span><span class="token line">                       s.condBranch(n.Cond, bBody, bEnd, 1)
</span><span class="token prefix inserted">+</span><span class="token line">               } else {
</span><span class="token prefix inserted">+</span><span class="token line">                       b := s.endBlock()
</span><span class="token prefix inserted">+</span><span class="token line">                       b.Kind = ssa.BlockPlain
</span><span class="token prefix inserted">+</span><span class="token line">                       b.AddEdgeTo(bBody)
</span><span class="token prefix inserted">+</span><span class="token line">               }
</span><span class="token prefix inserted">+</span><span class="token line">               // 结束
</span><span class="token prefix inserted">+</span><span class="token line">               s.startBlock(bEnd)
</span><span class="token prefix inserted">+</span><span class="token line">
</span></span><span class="token unchanged"><span class="token prefix unchanged"> </span><span class="token line">       case ir.OSWITCH, ir.OSELECT:
</span><span class="token prefix unchanged"> </span><span class="token line">               // These have been mostly rewritten by the front end into their Nbody fields.
</span><span class="token prefix unchanged"> </span><span class="token line">               // Our main task is to correctly hook up any break statements.
</span></span></code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>CFS 基本已经接近人类理解的程序执行流程图了，上面的代码会将 dowhile 生成如下控制流图：</p><p><img src="`+u+'" alt="cfs"></p><p>dowhile 开始时，直接进入 body 中执行，执行完后再来判断 cond 是否满足，如果满足则再次跳入到 body 中执行，否则 dowhile 结束。</p><p>可以看到，从一个基本的 dowhile 语句到 CFS，编译器做了大量工作，一步步将语言向下演化（这个过程也称 lower）。</p>',17)),s("p",null,[n[38]||(n[38]=e("最后，就是编译器的最后一步了，将 CFS 图转化为对应平台的机器码，对应 ")),s("a",S,[n[37]||(n[37]=e("obj")),i(a)]),n[39]||(n[39]=e("包；")),n[40]||(n[40]=s("br",null,null,-1)),n[41]||(n[41]=e(" 包下有对各个平台的机器码支持，由于平台之间的差异都比较大，因此我们对 dowhile 的支持其实到 IR 这一步就够了，剩下的工作 go 编译器会帮助我们来处理。"))]),n[71]||(n[71]=l(`<p>再次编译 go1.19，此时的 go1.19 已经支持 dowhile 关键字：</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># cd $pwd/src</span>
<span class="token comment"># ./make.bash</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div>`,2)),s("p",null,[n[43]||(n[43]=e("我们可以测试看看，一个 ")),s("a",B,[n[42]||(n[42]=e("dowhile 例子")),i(a)]),n[44]||(n[44]=e("："))]),n[72]||(n[72]=l(`<div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code><span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    i <span class="token operator">:=</span> <span class="token number">4</span>
    dowhile i <span class="token operator">&gt;</span> <span class="token number">0</span> <span class="token punctuation">{</span>
        fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span>i<span class="token punctuation">)</span>
        i<span class="token operator">--</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>输出：</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># $pwd/bin/go run $pwd/lab/examples/example2/main.go</span>
<span class="token number">4</span>
<span class="token number">3</span>
<span class="token number">2</span>
<span class="token number">1</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,3)),s("p",null,[n[46]||(n[46]=e("例子 2：")),s("a",q,[n[45]||(n[45]=e("dowhile 语句上初始化")),i(a)]),n[47]||(n[47]=e("："))]),n[73]||(n[73]=l(`<div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code><span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	dowhile i <span class="token operator">:=</span> <span class="token number">4</span><span class="token punctuation">;</span> i <span class="token operator">&gt;</span> <span class="token number">0</span> <span class="token punctuation">{</span>
		fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span>i<span class="token punctuation">)</span>
		i<span class="token operator">--</span>
	<span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>输出：</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># $pwd/bin/go run $pwd/lab/examples/example3/main.go</span>
<span class="token number">4</span>
<span class="token number">3</span>
<span class="token number">2</span>
<span class="token number">1</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,3)),s("p",null,[n[49]||(n[49]=e("例子 3：")),s("a",O,[n[48]||(n[48]=e("dowhile 条件不满足")),i(a)]),n[50]||(n[50]=e("："))]),n[74]||(n[74]=l(`<div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code><span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	i <span class="token operator">:=</span> <span class="token number">4</span>
	dowhile i <span class="token operator">!=</span> <span class="token number">4</span> <span class="token punctuation">{</span>
		fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span>i<span class="token punctuation">)</span>
	<span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>输出：</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># $pwd/bin/go run $pwd/lab/examples/example4/main.go   </span>
<span class="token number">4</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>可以发现，即 <code>i != 4</code> 不满足，但仍然执行了一次 <code>fmt.Println</code>。</p>`,4)),s("p",null,[n[52]||(n[52]=e("关于 dowhile 的具体实现可以参考这个")),s("a",D,[n[51]||(n[51]=e("commit")),i(a)]),n[53]||(n[53]=e("。"))]),n[75]||(n[75]=l('<h2 id="结语" tabindex="-1"><a class="header-anchor" href="#结语" aria-hidden="true">#</a> 结语</h2><p>至此，我们完成了 go 编译器新增关键字的挑战，在这一段路的旅程中，我们见识到了编译原理的魅力，感受到了 go 编译器设计之精巧、功能之完善；<br> 无论是编译器本身、还是 runtime 的实现，都是学习（任意）语言实现的巨大宝库。</p><p>按照 go 文档的说法，go 编译器被称为 <code>gc编译器</code>，虽然这一度让我怀疑这是垃圾回收的代码包，但明显这不是。go 自从 1.4 版本自举后，参与编译器工作的<br> 门槛降低了很多，在开发和实践中，我们都能直接去看源码来 debug 程序问题；当然遇到 go 无法解决的问题，我们也能 fork 然后自己来解决。</p><p>c/cpp 编译器一直都是 gcc、clang、MSVC 三家争霸，而 go 编译器似乎一直都是一家独大，这也直接导致了 go 团队的傲慢，当然也避免了分裂和撕逼。</p><p>可能不久的将来，因为或多或少的政治原因，go 编译器也会走向多元化，期待那一天的到来，让 go 拥有更多的活力。</p><h2 id="参考资料" tabindex="-1"><a class="header-anchor" href="#参考资料" aria-hidden="true">#</a> 参考资料</h2>',6)),s("ul",null,[s("li",null,[s("a",N,[n[54]||(n[54]=e("go compiler internals")),i(a)])]),s("li",null,[s("a",E,[n[55]||(n[55]=e("静态分析-中间表示")),i(a)])]),s("li",null,[s("a",I,[n[56]||(n[56]=e("golang")),i(a)])]),s("li",null,[s("a",C,[n[57]||(n[57]=e("GO 编程模式：错误处理")),i(a)])]),s("li",null,[s("a",T,[n[58]||(n[58]=e("Go error 处理最佳实践")),i(a)])]),s("li",null,[s("a",$,[n[59]||(n[59]=e("Go compiler: SSA optimization rules description language")),i(a)])])])])}const A=p(m,[["render",G],["__file","magic3.html.vue"]]);export{A as default};
