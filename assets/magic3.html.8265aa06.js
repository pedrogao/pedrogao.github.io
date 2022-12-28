import{_ as l}from"./plugin-vue_export-helper.21dcd24c.js";import{r as t,o as p,c as o,a as n,d as a,e as i,b as s}from"./app.052c6d34.js";var c="/assets/go-err.61bce072.jpeg",d="/assets/magic-go-compiler.fa7e7b4e.png",r="/assets/magic-gfs.18c29901.png";const u={},m=i(`<h2 id="\u524D\u8A00" tabindex="-1"><a class="header-anchor" href="#\u524D\u8A00" aria-hidden="true">#</a> \u524D\u8A00</h2><p>\u51E0\u4E4E\u6240\u6709\u4EBA\u90FD\u9047\u5230\u8FC7\u7C7B\u4F3C\u4E0B\u9762\u7684 go \u4EE3\u7801\uFF1A</p><div class="language-go ext-go line-numbers-mode"><pre class="language-go"><code><span class="token keyword">if</span> err <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span>
  <span class="token keyword">return</span> <span class="token boolean">nil</span><span class="token punctuation">,</span> err
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>\u8D1F\u8D23\u4EFB\u7684\u8BF4\uFF0C\u7B14\u8005\u6BCF\u5929\u90FD\u5F97\u5199\u5F88\u591A\u6B21\u8FD9\u6837\u7684 <strong>err</strong> \u5904\u7406\u4EE3\u7801\uFF0C\u4EE5\u81F3\u4E8E\u4E00\u4E2A\u51FD\u6570\u4E2D\uFF0C\u534A\u6570\u4EE3\u7801\u90FD\u662F\u5728<br> \u5904\u7406 error\u3002\u6240\u4EE5\u5F88\u591A\u4EBA\u7528\u4E0B\u9762\u8FD9\u5F20\u56FE\u6765\u8C03\u4F83\uFF1A</p><p><img src="`+c+'" alt="go-err" loading="lazy"></p>',5),v=s("\u9047\u5230\u5982\u6B64\u91CD\u590D\u9519\u8BEF\u5904\u7406\u4EE3\u7801\uFF0C\u5927\u5BB6\u90FD\u4F1A\u4E0B\u610F\u8BC6\u7684\u60F3\u529E\u6CD5\u53BB\u5C01\u88C5\u548C\u7B80\u5316\uFF0C\u6BD4\u5982\u8FD9\u91CC\u7684\u4E24\u7BC7\u6587\u7AE0"),k={href:"https://coolshell.cn/articles/21140.html",target:"_blank",rel:"noopener noreferrer"},b=s("GO \u7F16\u7A0B\u6A21\u5F0F\uFF1A\u9519\u8BEF\u5904\u7406"),g=s(" \u548C "),f={href:"https://www.modb.pro/db/172962",target:"_blank",rel:"noopener noreferrer"},h=s("Go error \u5904\u7406\u6700\u4F73\u5B9E\u8DF5"),x=s("\u3002"),_=i(`<p>\u4E00\u5B9A\u7A0B\u5EA6\u4E0A\uFF0C\u8FD9\u79CD\u6280\u5DE7\u89E3\u51B3\u4E86 go error \u5904\u7406\u7684\u7E41\u7410\uFF0C\u4F46\u663E\u7136\u8FD9\u79CD\u65B9\u5F0F\u8FD8\u662F\u4E0D\u591F\u4F18\u96C5\u3002</p><p>\u601D\u6765\u60F3\u53BB\uFF0C\u6839\u672C\u539F\u56E0\u5728\u4E8E <strong>go</strong> \u672C\u8EAB error \u7684\u54F2\u5B66\u548C\u673A\u5236\u95EE\u9898\uFF0Cgo \u521B\u59CB\u4EBA\u5E0C\u671B\u5DE5\u7A0B\u5E08\u80FD\u591F\u8BA4\u771F\u5BF9\u5F85\u6BCF\u4E00\u4E2A error\uFF0C\u4ECE\u800C\u63D0\u5347\u4EE3\u7801\u8D28\u91CF\uFF1B<br> \u53E6\u5916 go \u8BED\u8A00\u672C\u8EAB\u53C8\u6CA1\u6709\u63D0\u4F9B\u9519\u8BEF\u5904\u7406\u8BED\u6CD5\u7CD6\uFF0C\u8FD9\u4F7F\u5F97 error \u5904\u7406\u5341\u5206\u539F\u59CB\u548C\u91CD\u590D\u3002</p><p>\u65E2\u7136\u5E38\u89C4\u65B9\u6CD5\u4E0D\u884C\uFF0C\u7B14\u8005\u5C31\u628A\u89C6\u89D2\u653E\u5230\u4E86 go \u672C\u8EAB\u4E0A\u9762\uFF1A\u7ED9 go \u7F16\u8BD1\u5668\u65B0\u589E<strong>\u5173\u952E\u5B57</strong>\u6765\u5904\u7406 error\u3002</p><h2 id="\u7F16\u8BD1\u6E90\u7801" tabindex="-1"><a class="header-anchor" href="#\u7F16\u8BD1\u6E90\u7801" aria-hidden="true">#</a> \u7F16\u8BD1\u6E90\u7801</h2><p>\u8BDD\u4E0D\u591A\u8BF4\uFF0C\u6211\u4EEC\u76F4\u63A5\u5F00\u641E\u3002</p><p>\u4ECE github \u4E0A\u4E0B\u8F7D go \u7684\u6E90\u7801\uFF0C\u5E76\u5C06\u5176\u5207\u5230\uFF08\u5F53\u524D\uFF09\u6700\u65B0\u7684 go1.19 \u7248\u4E0A\uFF1A</p><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code><span class="token comment"># git clone https://github.com/golang/go  </span>
<span class="token comment"># cd go &amp;&amp; git checkout go1.19 </span>
<span class="token comment"># git checkout -b pedro</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>\u5207\u6362\u5230\u4E86\u4E00\u4E2A\u65B0\u7684\u5206\u652F\u7528\u4E8E\u5F00\u53D1\u65B0\u7684\u7279\u6027\u3002\u7136\u540E\u8BBE\u7F6E\u76EE\u5F55\u53D8\u91CF\uFF0C\u901A\u8FC7\u811A\u672C\u7F16\u8BD1\u51FA\u6700\u65B0\u7684 go1.19\uFF1A</p><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code><span class="token comment"># pwd=$(pwd)</span>
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
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,9),w=s("\u4ECE\u6784\u5EFA\u8F93\u51FA\u53EF\u4EE5\u770B\u51FA\uFF0Cgo \u7684\u81EA\u4E3E\u5176\u5B9E\u9887\u4E3A\u590D\u6742\u3002\u9996\u5148\u4F7F\u7528\u65E7 go1.18.3 \u7F16\u8BD1\u6784\u5EFA toolchain1\uFF0C"),y=n("br",null,null,-1),S=s(" \u7136\u540E\u518D\u7528 toolchain1 \u6784\u5EFA\u51FA bootstrap\uFF0C\u6700\u540E\u51E0\u6B21\u8FED\u4EE3\u7F16\u8BD1\u6784\u5EFA\u51FA go1.19 \u548C\u5176\u5B83\u5DE5\u5177\uFF0C"),B=n("br",null,null,-1),q=s(" \u611F\u5174\u8DA3\u7684\u53EF\u4EE5 "),O={href:"https://github.com/golang/go/blob/master/src/make.bash",target:"_blank",rel:"noopener noreferrer"},D=s("\u70B9\u51FB"),N=s(" \u770B\u770B go \u7684\u6784\u5EFA\u8FC7\u7A0B\u3002"),E=i(`<p>\u8FD9\u6837\u5C31\u901A\u8FC7\u5DF2\u6709\u7684 go1.18 \u7F16\u8BD1\u51FA\u6700\u65B0\u7684 go1.19 \u4E86\uFF1A</p><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code><span class="token comment"># $pwd/bin/go version</span>
<span class="token comment"># go version go1.19 linux/amd64</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>\u8BBE\u7F6E GOROOT \u548C GOPATH\uFF1A</p><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code><span class="token comment"># export GOROOT=$pwd</span>
<span class="token comment"># export GOPATH=$pwd/lab</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="ereturn" tabindex="-1"><a class="header-anchor" href="#ereturn" aria-hidden="true">#</a> ereturn</h2><p>\u5BF9\u4E8E\u4E0B\u9762\u7684 error \u5904\u7406\u4EE3\u7801\uFF1A</p><div class="language-go ext-go line-numbers-mode"><pre class="language-go"><code>err <span class="token operator">:=</span> <span class="token function">testErr</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token keyword">if</span> err <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span>
  <span class="token keyword">return</span> <span class="token number">123</span><span class="token punctuation">,</span> err
<span class="token punctuation">}</span>
<span class="token comment">// \u7EE7\u7EED</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>\u6211\u4EEC\u65B0\u5F15\u5165\u4E00\u4E2A\u5173\u952E\u5B57 <code>ereturn</code> \u6765\u7B80\u5316\u3002ereturn \u4F1A\u81EA\u52A8\u5224\u65AD error \u662F\u5426\u4E3A nil\uFF0C<br> \u5982\u679C\u4E0D\u4E3A nil\uFF0C\u5219\u76F4\u63A5\u8FD4\u56DE\uFF0C\u5426\u5219\u7EE7\u7EED\u5411\u4E0B\u8FD0\u884C\uFF0C\u5982\u4E0B\uFF1A</p><div class="language-go ext-go line-numbers-mode"><pre class="language-go"><code> err <span class="token operator">:=</span> <span class="token function">testErr</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
 ereturn <span class="token number">123</span><span class="token punctuation">,</span> err
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>ereturn \u5224\u65AD\u6700\u540E\u4E00\u4E2A\u8FD4\u56DE\u53C2\u6570 err \u662F\u5426\u4E3A nil\uFF0C\u5F53\u4E3A nil \u5219\u51FD\u6570\u7EE7\u7EED\uFF0C\u5426\u5219\u51FD\u6570\u8FD4\u56DE\u3002</p><p>\u8FD9\u6837\u5C31\u7701\u53BB\u4E86\u91CD\u590D\u591A\u6B21\u7684 if \u5224\u7A7A\u64CD\u4F5C\uFF0C\u51CF\u5C11\u4E86\u91CD\u590D\u4EE3\u7801\u3002</p><p>\u90A3\u4E48\u5982\u4F55\u5B9E\u73B0 ereturn \u4E86\uFF1F\u601D\u8DEF\u5176\u5B9E\u5F88\u7B80\u5355\uFF0Cereturn \u8BED\u53E5\u662F\u5C06 if, return \u4E24\u6761\u8BED\u53E5\u5408\u5E76\uFF0C\u5C06<br> error \u5224\u65AD\u64CD\u4F5C\u653E\u5728\u4E86\u7F16\u8BD1\u671F\u751F\u6210\uFF0C\u800C\u4E0D\u662F\u7531\u5DE5\u7A0B\u5E08\u624B\u52A8\u5224\u65AD\uFF1B\u56E0\u6B64\u6211\u4EEC\u53EA\u9700\u5728 go \u7F16\u8BD1\u5668\u4E2D\u65B0\u589E ereturn \u5173\u952E\u5B57\uFF0C<br> \u5E76\u5728\u7A0B\u5E8F\u7F16\u8BD1\u7684\u65F6\u5019\u5C06 ereturn \u8BED\u53E5 \u91CD\u5199\u4E3A if+return \u8BED\u53E5\u5373\u53EF\u3002</p><p>\u9996\u5148\uFF0C\u6DFB\u52A0\u65B0\u7684\u5173\u952E\u5B57 <strong>ereturn</strong>\uFF1A</p><div class="language-diff ext-diff line-numbers-mode"><pre class="language-diff"><code><span class="token coord">--- a/src/cmd/compile/internal/syntax/tokens.go</span>
<span class="token coord">+++ b/src/cmd/compile/internal/syntax/tokens.go</span>
@@ -60,6 +60,7 @@ const (
        _Package     // package
        _Range       // range
        _Return      // return
<span class="token inserted-sign inserted"><span class="token prefix inserted">+</span><span class="token line">       _Ereturn     // ereturn
</span></span>        _Select      // select
        _Struct      // struct
        _Switch      // switch
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>\u7136\u540E\u901A\u8FC7 <code>go generate</code> \u547D\u4EE4\u81EA\u52A8\u751F\u6210\u8BE5\u5173\u952E\u5B57\u7684\u89E3\u6790\u7A0B\u5E8F\uFF1A</p><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code><span class="token comment"># $pwd/bin/go generate $pwd/src/cmd/compile/internal/syntax/tokens.go</span>
stringer -type token -linecomment tokens.go
tokens.go:9: running <span class="token string">&quot;stringer&quot;</span><span class="token builtin class-name">:</span> exec: <span class="token string">&quot;stringer&quot;</span><span class="token builtin class-name">:</span> executable <span class="token function">file</span> not found <span class="token keyword">in</span> <span class="token environment constant">$PATH</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>\u63D0\u793A\u7F3A\u5C11 stringer\uFF0C\u901A\u8FC7 <code>go install</code> \u4E0B\u8F7D\uFF0C\u7136\u540E\u518D\u6B21\u8FD0\u884C\uFF1A</p><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code><span class="token comment"># $pwd/bin/go install golang.org/x/tools/cmd/stringer@latest</span>
<span class="token comment"># export PATH=$GOPATH/bin:$PATH</span>
<span class="token comment"># $pwd/bin/go generate $pwd/src/cmd/compile/internal/syntax/tokens.go</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>generate \u4F1A\u81EA\u52A8\u89E3\u6790 tokens.go\uFF0C\u7136\u540E\u751F\u6210\u5BF9\u5E94\u7684\u89E3\u6790\u7A0B\u5E8F\u90E8\u5206 token_string.go\uFF1A</p><div class="language-diff ext-diff line-numbers-mode"><pre class="language-diff"><code><span class="token coord">--- a/src/cmd/compile/internal/syntax/token_string.go</span>
<span class="token coord">+++ b/src/cmd/compile/internal/syntax/token_string.go</span>
@@ -49,17 +49,18 @@ func _() {
        _ = x[_Package-39]
        _ = x[_Range-40]
        _ = x[_Return-41]
<span class="token inserted-sign inserted"><span class="token prefix inserted">+</span><span class="token line">       _ = x[_Ereturn-42]
</span></span></code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>\u6709\u4E86\u5173\u952E\u5B57\u540E\uFF0C\u4FEE\u6539 parser.stmtOrNil \u65B9\u6CD5\uFF0C\u5C06 ereturn \u8BED\u53E5\u6539\u5199\u4E3A if+return \u8BED\u53E5\uFF1A</p><div class="language-diff ext-diff line-numbers-mode"><pre class="language-diff"><code><span class="token coord">--- a/src/cmd/compile/internal/syntax/parser.go</span>
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
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>\u8FD9\u91CC\u8FD0\u7528\u4E86\u4E00\u4E2A\u5C0F\u6280\u5DE7\uFF0C\u90A3\u5C31\u662F\uFF1A\u8BED\u53E5\u91CD\u5199\u3002</p><p>ereturn \u5173\u952E\u5B57\u672C\u8EAB\u53EF\u4EE5\u89C6\u4E3A if\uFF0Creturn \u8BED\u53E5\u7684\u8054\u5408\u4F53\uFF0C\u5F53 return \u8BED\u53E5\u6700\u540E\u4E00\u4E2A\u8FD4\u56DE\u503C\u4E3A error \u4E14\u4E0D\u4E3A\u7A7A\u65F6\uFF0C\u5C31\u5C06\u5176\u89E3\u6790\u4E3A ereturn \u8BED\u53E5\u3002 \u56E0\u6B64\u8FD9\u91CC<strong>\u5148</strong>\u5C06 ereturn \u8BED\u53E5\u89E3\u6790\u4E3A return \u8BED\u53E5\uFF0C\u7136\u540E<strong>\u5224\u65AD</strong> Results \u5217\u8868\u7684<strong>\u6700\u540E\u4E00\u4E2A\u5143\u7D20</strong>\u662F\u5426\u4E3A error\uFF0C<br> \u5982\u679C\u662F\u5219\u5C06\u5176\u5305\u88C5\u4E3A <strong>if</strong> \u8BED\u53E5\uFF0C\u5373\u5728 return \u4E4B\u524D\u5148\u5BF9 error \u8FDB\u884C nil \u5224\u65AD\uFF0C\u5982\u679C error \u4E0D\u4E3A nil\uFF0C\u5219\u8C03\u7528 return\uFF0C\u5426\u5219\u4E0D\u505A\u4EFB\u4F55\u4E8B\u60C5\u3002</p><p>\u4FEE\u6539\u5B8C\u6BD5\u540E\uFF0C\u91CD\u65B0\u751F\u6210\u65B0\u7684 go.19\uFF1A</p><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code><span class="token comment"># cd $pwd/src</span>
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
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,26),I=s("\u7F16\u8BD1\u5B8C\u6210\u540E\uFF0C\u7528\u4E00\u4E2A"),C={href:"https://github.com/pedrogao/go/commit/7df86e87f555af26cb51dc60484327c0d0eb64b0#diff-e3c67b440212ca6e8ffdb55884bbd573cd4235c439948caeb2d92bebf6f5372c",target:"_blank",rel:"noopener noreferrer"},T=s("\u4F8B\u5B50"),$=s("\u770B\u770B\u6548\u679C\uFF1A"),G=i(`<div class="language-go ext-go line-numbers-mode"><pre class="language-go"><code><span class="token keyword">func</span> <span class="token function">testErr</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token builtin">error</span> <span class="token punctuation">{</span>
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
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>\u8FD0\u884C\uFF1A</p><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code><span class="token comment"># $pwd/bin/go run $pwd/lab/examples/example1/main.go                                                                                                 </span>
<span class="token number">222</span> err
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>\u7A0B\u5E8F\u8F93\u5165 <code>222\uFF0Cerr</code>\uFF0C\u8BC1\u660E\u51FD\u6570 hello \u4ECE r3 \u5904\u9000\u51FA\uFF0C\u663E\u7136 r1\uFF0Cr2 \u5904\u7684 error \u90FD\u662F nil\uFF0C\u56E0\u6B64\u5224\u65AD\u4E0D\u6210\u7ACB\uFF0C<br> \u6240\u4EE5\u51FD\u6570\u7EE7\u7EED\u6267\u884C\uFF0C\u800C\u5230 r3 \u5904\u65F6\uFF0Cerror \u4E0D\u4E3A nil\uFF0C\u6240\u4EE5\u76F4\u63A5\u8FD4\u56DE\u3002</p>`,4),P=s("\u5230\u6B64\u4E00\u4E2A\u65B0\u7684 ereturn \u5173\u952E\u5B57\u5C31\u987A\u5229\u5B8C\u6210\u4E86\uFF0C\u5177\u4F53\u5B9E\u73B0\u53EF\u4EE5\u53C2\u8003\u8FD9\u4E2A "),R={href:"https://github.com/pedrogao/go/commit/7df86e87f555af26cb51dc60484327c0d0eb64b0",target:"_blank",rel:"noopener noreferrer"},F=s("commit"),A=s("\u3002"),H=n("h2",{id:"go-\u7F16\u8BD1\u5668",tabindex:"-1"},[n("a",{class:"header-anchor",href:"#go-\u7F16\u8BD1\u5668","aria-hidden":"true"},"#"),s(" go \u7F16\u8BD1\u5668")],-1),L=n("p",null,[s("\u5230\u8FD9\u91CC\uFF0C\u6211\u4EEC\u53EF\u4EE5\u53D1\u73B0 go \u7F16\u8BD1\u5668\u8BBE\u8BA1\u826F\u597D\u3001\u4EE3\u7801\u6613\u8BFB\uFF0C\u65B0\u589E\u4E00\u4E2A\u53EF\u7528\u7684\u5173\u952E\u5B57\u7ADF\u5982\u6B64\u7B80\u5355\u3002\u4F46\u662F\u65C5\u7A0B\u7EDD\u4E0D\u4EC5\u9650\u4E8E\u6B64\uFF0C"),n("br"),s(" \u5C31\u76EE\u524D\u800C\u8A00\uFF0C\u6211\u4EEC\u53EA\u63A5\u89E6\u5230 go \u7F16\u8BD1\u5668\u4E2D\u6781\u5176\u5C0F\u7684\u4E00\u90E8\u5206\uFF0C\u751A\u81F3\u8FD9\u4E9B\u90FD\u4E0D\u662F go \u7F16\u8BD1\u5668\u4E2D\u7684\u6838\u5FC3\u70B9\u3002")],-1),W=n("p",null,"go \u7F16\u8BD1\u5668\u662F\u6309\u7167\u7A0B\u5E8F\u7F16\u8BD1\u8FC7\u7A0B\u6765\u8BBE\u8BA1\u5B9E\u73B0\u7684\uFF0C\u5927\u81F4\u53EF\u5206\u4E3A\u5982\u4E0B 4 \u4E2A\u5927\u9636\u6BB5\uFF1A",-1),V=n("p",null,[n("img",{src:d,alt:"compiler",loading:"lazy"})],-1),z=s("\u4EE5\u4E0A\u56FE\u7247\u6309\u7167 go \u5B98\u65B9\u6587\u6863\u4ECB\u7ECD\u7ED8\u5236\u800C\u6210\uFF0C\u611F\u5174\u8DA3\u7684\u53EF\u4EE5\u70B9\u51FB"),X=n("br",null,null,-1),j={href:"https://github.com/golang/go/blob/master/src/cmd/compile/README.md",target:"_blank",rel:"noopener noreferrer"},K=s("\u8FD9\u91CC"),Y=s("\u67E5\u770B\u4E00\u4E0B go \u7F16\u8BD1\u5668\u7684"),M=n("br",null,null,-1),U=s(" \u7B80\u5355\u4ECB\u7ECD\u3002\u6587\u6863\u53EF\u80FD\u4F1A\u968F\u7740\u8FED\u4EE3\u66F4\u65B0\u3002"),J=n("ol",null,[n("li",null,"\u89E3\u6790\u9636\u6BB5\uFF1A\u5C06 go \u6E90\u4EE3\u7801\u8BCD\u6CD5\u3001\u53E5\u6CD5\u3001\u8BED\u6CD5\u5206\u6790\uFF0C\u751F\u6210\u7A0B\u5E8F\u53EF\u8BFB\u7684\u8BED\u6CD5\u6811\uFF08syntax tree\uFF09\uFF1B"),n("li",null,"\u68C0\u67E5\u3001\u8F6C\u6362\u9636\u6BB5\uFF1A\u5BF9\u751F\u6210\u7684\u8BED\u6CD5\u6811\u505A\u8BED\u6CD5\u68C0\u67E5\uFF0C\u8865\u5145\u5143\u4FE1\u606F\uFF1B"),n("li",null,"\u751F\u6210 SSA \u8282\u70B9\uFF0C\u901A\u8FC7\u6D41\u7A0B\u56FE\u5206\u6790\u5BF9\u4EE3\u7801\u8FDB\u884C\u4F18\u5316\u3001\u91CD\u5199\uFF1B"),n("li",null,"\u751F\u6210\u673A\u5668\u7801\uFF0C\u5373\u6700\u540E\u7684\u53EF\u6267\u884C\u4EE3\u7801\u3002")],-1),Q=s("\u5173\u4E8E SSA\uFF0C\u53EF\u70B9\u51FB"),Z={href:"https://en.wikipedia.org/wiki/Static_single-assignment_form",target:"_blank",rel:"noopener noreferrer"},nn=s("\u6B64\u5904"),sn=s("\u4E86\u89E3\u3002"),en=i(`<p>\u800C ereturn \u8BED\u53E5\u7684\u5904\u7406\uFF0C\u53EA\u505C\u7559\u5728\u4E86\u7B2C 1 \u9636\u6BB5\uFF0C\u5373\u89E3\u6790\u9636\u6BB5\u7684\u65F6\u5019\uFF0C\u5C31\u88AB\u8F6C\u5316\u4E3A\u4E86 if\u3001return \u8BED\u53E5\uFF0C\u540E\u9762\u7684 2\u30013\u30014 \u9636\u6BB5\u90FD\u662F\u4EE5\u5176\u5B83\u8BED\u53E5\u7684\u8EAB\u4EFD\u6765\u53C2\u4E0E\u3002</p><p>\u4E0B\u9762\uFF0C\u6211\u4EEC\u5C31\u901A\u8FC7\u53E6\u5916\u4E00\u4E2A\u5173\u952E\u5B57 <code>dowhile</code> \u6765\u4E00\u8D77\u770B\u770B go \u7F16\u8BD1\u7684 4 \u4E2A\u9636\u6BB5\u3002</p><h2 id="dowhile" tabindex="-1"><a class="header-anchor" href="#dowhile" aria-hidden="true">#</a> dowhile</h2><p>\u6709\u4E00\u5B9A c \u8BED\u8A00\u57FA\u7840\u7684\u540C\u5B66\u80AF\u5B9A\u719F\u6089 <code>do while</code> \u8FD9\u4E24\u4E2A\u5173\u952E\u5B57\uFF0C\u56E0\u6B64\u5B83\u4EEC\u8054\u5408\u53EF\u4EE5\u5B9E\u73B0\u5982\u4E0B\u8BED\u53E5\uFF1A</p><div class="language-c ext-c line-numbers-mode"><pre class="language-c"><code><span class="token keyword">do</span>
<span class="token punctuation">{</span>
  <span class="token comment">// body</span>
  <span class="token comment">// do something</span>
<span class="token punctuation">}</span> <span class="token keyword">while</span><span class="token punctuation">(</span> condition <span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>do while \u8BED\u53E5\u6700\u5927\u7684\u597D\u5904\u5728\u4E8E\uFF0C\u5373\u4F7F condition \u4E0D\u6EE1\u8DB3\uFF0C\u90A3\u4E48\u4E5F\u80FD\u6267\u884C body \u91CC\u9762\u7684\u4EE3\u7801\uFF0C\u5982\u679C\u6EE1\u8DB3\uFF0C\u90A3\u4E48\u4F1A\u91CD\u590D\u6267\u884C<br> \u76F4\u5230\u4E0D\u6EE1\u8DB3\u4E3A\u6B62\u3002</p><p>\u5728 go \u4E2D\u662F\u6CA1\u6709 do\u3001while \u4E24\u4E2A\u5173\u952E\u5B57\u7684\uFF0C\u5BF9\u4E8E\u5FAA\u73AF\u6267\u884C\u4E5F\u53EA\u63D0\u4F9B\u4E86 for \u8BED\u53E5\u3002</p><blockquote><p>\u5343\u4E07\u4E0D\u8981\u4F7F\u7528 do \u4F5C\u4E3A\u5173\u952E\u5B57\uFF0C\u56E0\u4E3A go \u4E2D\u5927\u91CF\u4F7F\u7528\u4E86 do \u4F5C\u4E3A\u53D8\u91CF\u540D\uFF0C\u5982\u679C\u4F7F\u7528 do {} while \u8FD9\u7C7B\u8BED\u6CD5\uFF0C\u90A3\u4E48 go \u65E0\u6CD5\u7F16\u8BD1\u6210\u529F\u3002</p></blockquote><p>\u56E0\u6B64\uFF0C\u6211\u4EEC\u51B3\u5B9A\u5728 go \u4E2D\u65B0\u589E dowhile \u5173\u952E\u5B57\uFF0C\u53EF\u8FBE\u5230\u4E0B\u9762\u7684\u6548\u679C\uFF1A</p><div class="language-go ext-go line-numbers-mode"><pre class="language-go"><code>i <span class="token operator">:=</span> <span class="token number">3</span>
dowhile i <span class="token operator">!=</span> <span class="token number">0</span> <span class="token punctuation">{</span>
  i<span class="token operator">--</span>
  <span class="token comment">// do something</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>\u53D8\u91CF <code>i</code> \u5728 dowhile \u8BED\u53E5\u5916\u90E8\u521D\u59CB\u5316\uFF0Cdowhile \u6267\u884C\u5230 i \u4E0D\u6EE1\u8DB3\u6761\u4EF6\u4E3A\u6B62\u3002</p><p>\u6216\u8005\uFF1A</p><div class="language-go ext-go line-numbers-mode"><pre class="language-go"><code>dowhile i <span class="token operator">:=</span> <span class="token number">3</span><span class="token punctuation">;</span> i <span class="token operator">!=</span> <span class="token number">0</span> <span class="token punctuation">{</span>
  i<span class="token operator">--</span>
  <span class="token comment">// do something</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>\u53D8\u91CF <code>i</code> \u5728 dowhile \u8BED\u53E5\u4E0A\u521D\u59CB\u5316\uFF0Cdowhile \u6267\u884C\u5230 i \u4E0D\u6EE1\u8DB3\u6761\u4EF6\u4E3A\u6B62\u3002</p><p>\u6216\u8005\uFF1A</p><div class="language-go ext-go line-numbers-mode"><pre class="language-go"><code>i <span class="token operator">:=</span> <span class="token number">4</span>
dowhile i <span class="token operator">!=</span> <span class="token number">4</span> <span class="token punctuation">{</span>
   <span class="token comment">// do something</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>\u53D8\u91CF <code>i</code> \u5728 dowhile \u8BED\u53E5\u5916\u90E8\u521D\u59CB\u5316\uFF0C\u4E0D\u6EE1\u8DB3\u5FAA\u73AF\u6761\u4EF6\uFF0C\u4F46 dowhile \u4ECD\u4F1A\u6267\u884C body \u4E2D\u7684\u8BED\u53E5\u3002</p><p>\u4E0B\u9762\u6211\u4EEC\u5C31\u6765\u4E3A go \u65B0\u589E dowhile \u652F\u6301\u3002</p><p>\u9996\u5148\uFF0C\u6DFB\u52A0\u65B0\u7684 dowhile \u5173\u952E\u5B57\uFF1A</p><div class="language-diff ext-diff line-numbers-mode"><pre class="language-diff"><code><span class="token coord">--- a/src/cmd/compile/internal/syntax/tokens.go</span>
<span class="token coord">+++ b/src/cmd/compile/internal/syntax/tokens.go</span>
@@ -50,6 +50,7 @@ const (
        _For         // for
<span class="token inserted-sign inserted"><span class="token prefix inserted">+</span><span class="token line">       _Dowhile     // dowhile
</span></span>        _Func        // func
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>\u5B9A\u4E49\u65B0\u7684 dowhile \u8BED\u53E5\uFF1A</p><div class="language-diff ext-diff line-numbers-mode"><pre class="language-diff"><code><span class="token coord">--- a/src/cmd/compile/internal/syntax/nodes.go</span>
<span class="token coord">+++ b/src/cmd/compile/internal/syntax/nodes.go</span>
@@ -410,6 +410,19 @@ type (
                stmt
        }
 
<span class="token inserted-sign inserted"><span class="token prefix inserted">+</span><span class="token line">       /**
</span><span class="token prefix inserted">+</span><span class="token line">       init\u3001cond \u5747\u53EF\u7701\u7565
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
</span></span></code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>\u65B0\u589E\u5173\u952E\u5B57\u540E\u518D\u6B21\u751F\u6210 token_string \u7528\u4E8E\u89E3\u6790\u65B0\u7684\u5173\u952E\u5B57\uFF1A</p><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code><span class="token comment"># export PATH=$GOPATH/bin:$PATH</span>
<span class="token comment"># $pwd/bin/go generate $pwd/src/cmd/compile/internal/syntax/tokens.go</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>\u68C0\u67E5 token_string.go \u4E2D dowhile \u5173\u952E\u5B57\u662F\u5426\u6210\u529F\uFF1A</p><div class="language-diff ext-diff line-numbers-mode"><pre class="language-diff"><code><span class="token coord">--- a/src/cmd/compile/internal/syntax/token_string.go</span>
<span class="token coord">+++ b/src/cmd/compile/internal/syntax/token_string.go</span>
@@ -39,28 +39,29 @@ func _() {
        _ = x[_Else-29]
        _ = x[_Fallthrough-30]
        _ = x[_For-31]
<span class="token inserted-sign inserted"><span class="token prefix inserted">+</span><span class="token line">       _ = x[_Dowhile-32]
</span></span></code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>\u6539\u9020 parser \u4F7F\u5176\u652F\u6301 dowhile \u5173\u952E\u5B57\u89E3\u6790\uFF1A</p><div class="language-diff ext-diff line-numbers-mode"><pre class="language-diff"><code><span class="token coord">--- a/src/cmd/compile/internal/syntax/parser.go</span>
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
</span></span></code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>\u8FD9\u6837\uFF0Cgo \u7F16\u8BD1\u5668\u5C31\u652F\u6301 dowhile \u8BED\u53E5\u7684\u89E3\u6790\u4E86\uFF0C\u6211\u4EEC\u53EF\u4EE5\u6D4B\u8BD5\u770B\u770B\u89E3\u6790\u4E00\u4E2A dowhile \u4F8B\u5B50\uFF1A</p><div class="language-go ext-go line-numbers-mode"><pre class="language-go"><code><span class="token keyword">package</span> main
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
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>\u7F16\u8BD1 go\uFF1A</p><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code><span class="token comment"># cd $pwd/src</span>
<span class="token comment"># ./make.bash </span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>\u5728 dumper_test \u4E2D\u65B0\u589E\u6D4B\u8BD5\u7528\u4F8B\uFF1A</p><div class="language-diff ext-diff line-numbers-mode"><pre class="language-diff"><code>index 1ba85cc8d9..dcfaf063e7 100644
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
</span></span></code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>\u8FD0\u884C\u6D4B\u8BD5\uFF0C\u8F93\u51FA\u8BED\u6CD5 AST \u6811\uFF1A</p><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code><span class="token comment"># $pwd/bin/go test -c -o dump.test ./src/cmd/compile/internal/syntax/ -run TestDump1</span>
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
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>\u89E3\u6790\u6210\u529F\u3002\u5F53\u7136\u6709\u4E86\u5B9A\u4E49\u8FD8\u4E0D\u591F\uFF0C\u8FD8\u9700\u65B0\u589E DowhileStmt \u8BED\u53E5\u904D\u5386\u51FD\u6570\uFF1A</p><div class="language-diff ext-diff line-numbers-mode"><pre class="language-diff"><code><span class="token coord">--- a/src/cmd/compile/internal/syntax/walk.go</span>
<span class="token coord">+++ b/src/cmd/compile/internal/syntax/walk.go</span>
@@ -289,6 +289,15 @@ func (w walker) node(n Node) {
                }
                w.node(n.Body)
 
<span class="token inserted-sign inserted"><span class="token prefix inserted">+</span><span class="token line">       case *DowhileStmt: // \u65B0\u589E
</span><span class="token prefix inserted">+</span><span class="token line">               if n.Init != nil {
</span><span class="token prefix inserted">+</span><span class="token line">                       w.node(n.Init)
</span><span class="token prefix inserted">+</span><span class="token line">               }
</span><span class="token prefix inserted">+</span><span class="token line">               if n.Cond != nil {
</span><span class="token prefix inserted">+</span><span class="token line">                       w.node(n.Cond)
</span><span class="token prefix inserted">+</span><span class="token line">               }
</span><span class="token prefix inserted">+</span><span class="token line">               w.node(n.Body)
</span><span class="token prefix inserted">+</span><span class="token line">
</span></span>        case *SwitchStmt:
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>\u65B0\u589E\u5BF9 dowhile \u8BED\u53E5\u8BED\u6CD5\u68C0\u67E5 case\uFF1A</p><div class="language-diff ext-diff line-numbers-mode"><pre class="language-diff"><code><span class="token coord">--- a/src/cmd/compile/internal/types2/stmt.go</span>
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
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>\u8BED\u6CD5\u89E3\u6790\u3001\u68C0\u67E5\u540E\uFF0Cgo \u4F1A\u5C06\u8BED\u6CD5\u6811\u8F6C\u5316\u4E3A IR\uFF08\u4E2D\u95F4\u7801\uFF09\uFF0C\u65B0\u589E <code>ODOWHILE</code> IR \u5173\u952E\u5B57\uFF1A</p><div class="language-diff ext-diff line-numbers-mode"><pre class="language-diff"><code><span class="token coord">--- a/src/cmd/compile/internal/ir/node.go</span>
<span class="token coord">+++ b/src/cmd/compile/internal/ir/node.go</span>
@@ -273,14 +273,15 @@ const (
        //      }
        OFORUNTIL
<span class="token inserted-sign inserted"><span class="token prefix inserted">+</span><span class="token line">       ODOWHILE // dowhile Init; Cond { Body };
</span></span></code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>\u65B0\u589E IR \u8BED\u53E5\u5B9A\u4E49\uFF1A</p><div class="language-diff ext-diff line-numbers-mode"><pre class="language-diff"><code><span class="token coord">--- a/src/cmd/compile/internal/ir/stmt.go</span>
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
</span></span></code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>\u6709\u4E86\u5173\u952E\u5B57\u3001\u8BED\u53E5\u5B9A\u4E49\u540E\uFF0C\u901A\u8FC7\u811A\u672C\u751F\u6210 IR \u5173\u952E\u5B57\uFF1A</p><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code><span class="token comment"># $pwd/bin/go generate $pwd/src/cmd/compile/internal/ir/node.go</span>
<span class="token comment"># $pwd/bin/go run -mod=mod $pwd/src/cmd/compile/internal/ir/mknode.go</span>
<span class="token comment"># mv $pwd/node_gen.go $pwd/src/cmd/compile/internal/ir/</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,46),an=s("generate \u547D\u4EE4\u4F1A\u91CD\u65B0\u751F\u6210"),ln={href:"https://github.com/pedrogao/go/commit/491af5b8c929fd12b65674a8def061b5cced9da9#diff-103e7d8cdbb3e39378d0cd1b928ca2c9455b4de306c234ab5eeacdc9f3c0ac3c",target:"_blank",rel:"noopener noreferrer"},tn=s("op_string.go"),pn=s("\u6587\u4EF6\uFF0C"),on=n("br",null,null,-1),cn=s(" \u7528\u4E8E\u5C06 ODOWHILE \u5173\u952E\u5B57\u8F6C\u5316\u4E3A\u5B57\u7B26\u4E32\u65B9\u4FBF debug\u3002"),dn=s("run \u547D\u4EE4\u4F1A\u91CD\u65B0\u751F\u6210"),rn={href:"https://github.com/pedrogao/go/commit/491af5b8c929fd12b65674a8def061b5cced9da9#diff-fe8447c6058eafe833372607bb6d2514d1feb5e3c09b2dddbc8776e58e1acf07",target:"_blank",rel:"noopener noreferrer"},un=s("node_gen.go"),mn=s("\u6587\u4EF6\uFF0C"),vn=n("br",null,null,-1),kn=s(" \u7528\u4E8E\u81EA\u52A8\u5B9E\u73B0 DowhileStmt \u8BED\u53E5\u7684\u683C\u5F0F\u5316\u3001\u62F7\u8D1D\u7B49\u64CD\u4F5C\u3002"),bn=i(`<p>\u4E3A\u4E86\u65B9\u4FBF DowhileStmt \u8BED\u53E5\u7684 debug\uFF0C\u56E0\u6B64\u65B0\u589E ODOWHILE \u683C\u5F0F\u5316\u7684 case\uFF1A</p><div class="language-diff ext-diff line-numbers-mode"><pre class="language-diff"><code><span class="token coord">--- a/src/cmd/compile/internal/ir/fmt.go</span>
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
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>\u6709\u4E86 AST\u3001IR \u7684 dowhile \u5B9A\u4E49\u540E\uFF0C\u6211\u4EEC\u9700\u8981\u5728 noder \u4E2D\u5B9E\u73B0\u4E8C\u8005\u4E4B\u95F4\u7684\u8F6C\u5316\uFF0C<br> \u5373\u5C06 syntax.DowhileStmt \u8F6C\u5316\u4E3A ir.DowhileStmt\uFF0C\u5982\u4E0B\uFF1A</p><div class="language-diff ext-diff line-numbers-mode"><pre class="language-diff"><code><span class="token coord">--- a/src/cmd/compile/internal/noder/stmt.go</span>
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
</span></span></code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>AST \u8F6C\u6362\u4E3A IR node \u540E\uFF0C\u7F16\u8BD1\u5C31\u8FDB\u5165\u5230\u4E86\u7B2C 3 \u6B65\uFF0C\u4E0B\u9762\u5C31\u9700\u8981\u5BF9 IR \u8FDB\u884C\u4E00\u7CFB\u5217\u7684\u5206\u6790\u548C\u4F18\u5316\u3002</p><p>\u6BD4\u5982\uFF0C\u5148\u5BF9 ir.DowhileStmt \u8BED\u53E5\u8FDB\u884C\u9003\u9038\u5206\u6790\uFF1A</p><div class="language-diff ext-diff line-numbers-mode"><pre class="language-diff"><code><span class="token coord">--- a/src/cmd/compile/internal/escape/stmt.go</span>
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
</span></span></code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>\u63A5\u7740\u5C06\u8282\u70B9\u62C6\u5206\u4E3A\u66F4\u52A0\u7B80\u5355\u7684\u8282\u70B9\uFF0C\u6BD4\u5982\u62C6\u5206 dowhile \u4E2D\u7684\u521D\u59CB\u5316\u3001\u6761\u4EF6\u3001\u6267\u884C\u4F53\u7B49\u8282\u70B9\uFF1A</p><div class="language-diff ext-diff line-numbers-mode"><pre class="language-diff"><code><span class="token coord">--- a/src/cmd/compile/internal/syntax/walk.go</span>
<span class="token coord">+++ b/src/cmd/compile/internal/syntax/walk.go</span>
@@ -289,6 +289,15 @@ func (w walker) node(n Node) {
<span class="token unchanged"><span class="token prefix unchanged"> </span><span class="token line">               }
</span><span class="token prefix unchanged"> </span><span class="token line">               w.node(n.Body)
</span></span>
<span class="token inserted-sign inserted"><span class="token prefix inserted">+</span><span class="token line">       case *DowhileStmt: // \u65B0\u589E
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
</span></span></code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>\u518D\u9488\u5BF9 dowhile \u4E2D\u7684\u4E00\u4E9B\u8BED\u53E5\u6267\u884C\u987A\u5E8F\u5C1D\u8BD5\u8FDB\u884C\u91CD\u6392\u5E8F\uFF1A</p><div class="language-diff ext-diff line-numbers-mode"><pre class="language-diff"><code><span class="token coord">--- a/src/cmd/compile/internal/walk/order.go</span>
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
</span></span></code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>\u5B8C\u6210\u4E86\u4E00\u7CFB\u5217\u68C0\u67E5\u3001\u4F18\u5316\u540E\uFF0C\u7F16\u8BD1\u5668 \u9700\u5C06 dowhile \u8282\u70B9\u8F6C\u5316\u4E3A\u63A7\u5236\u6D41\u56FE CFG \uFF08Control-flow Graph\uFF09\uFF0C\u5982\u4E0B\uFF1A</p><div class="language-diff ext-diff line-numbers-mode"><pre class="language-diff"><code><span class="token coord">--- a/src/cmd/compile/internal/ssagen/ssa.go</span>
<span class="token coord">+++ b/src/cmd/compile/internal/ssagen/ssa.go</span>
@@ -1821,6 +1821,34 @@ func (s *state) stmt(n ir.Node) {

<span class="token unchanged"><span class="token prefix unchanged"> </span><span class="token line">               s.startBlock(bEnd)
</span></span>
<span class="token inserted-sign inserted"><span class="token prefix inserted">+</span><span class="token line">       case ir.ODOWHILE: // dowhile Init; Cond { Body };
</span><span class="token prefix inserted">+</span><span class="token line">               // TODO \u589E\u52A0 break\u3001continue \u652F\u6301
</span><span class="token prefix inserted">+</span><span class="token line">               n := n.(*ir.DowhileStmt)
</span><span class="token prefix inserted">+</span><span class="token line">               bCond := s.f.NewBlock(ssa.BlockPlain)
</span><span class="token prefix inserted">+</span><span class="token line">               bBody := s.f.NewBlock(ssa.BlockPlain)
</span><span class="token prefix inserted">+</span><span class="token line">               bEnd := s.f.NewBlock(ssa.BlockPlain)
</span><span class="token prefix inserted">+</span><span class="token line">               bBody.Pos = n.Pos()
</span><span class="token prefix inserted">+</span><span class="token line">               // \u4E0A\u4E00\u4E2A block
</span><span class="token prefix inserted">+</span><span class="token line">               b := s.endBlock()
</span><span class="token prefix inserted">+</span><span class="token line">               // \u4E0A\u4E00\u4E2A\u7D27\u63A5\u7740 body, dowhile \u7684\u6548\u679C
</span><span class="token prefix inserted">+</span><span class="token line">               b.AddEdgeTo(bBody)
</span><span class="token prefix inserted">+</span><span class="token line">               // \u5904\u7406 body
</span><span class="token prefix inserted">+</span><span class="token line">               s.startBlock(bBody)
</span><span class="token prefix inserted">+</span><span class="token line">               s.stmtList(n.Body)
</span><span class="token prefix inserted">+</span><span class="token line">               b = s.endBlock()
</span><span class="token prefix inserted">+</span><span class="token line">               // \u6761\u4EF6\u5904\u7406
</span><span class="token prefix inserted">+</span><span class="token line">               b.AddEdgeTo(bCond)
</span><span class="token prefix inserted">+</span><span class="token line">               s.startBlock(bCond)
</span><span class="token prefix inserted">+</span><span class="token line">               if n.Cond != nil {
</span><span class="token prefix inserted">+</span><span class="token line">                       s.condBranch(n.Cond, bBody, bEnd, 1)
</span><span class="token prefix inserted">+</span><span class="token line">               } else {
</span><span class="token prefix inserted">+</span><span class="token line">                       b := s.endBlock()
</span><span class="token prefix inserted">+</span><span class="token line">                       b.Kind = ssa.BlockPlain
</span><span class="token prefix inserted">+</span><span class="token line">                       b.AddEdgeTo(bBody)
</span><span class="token prefix inserted">+</span><span class="token line">               }
</span><span class="token prefix inserted">+</span><span class="token line">               // \u7ED3\u675F
</span><span class="token prefix inserted">+</span><span class="token line">               s.startBlock(bEnd)
</span><span class="token prefix inserted">+</span><span class="token line">
</span></span><span class="token unchanged"><span class="token prefix unchanged"> </span><span class="token line">       case ir.OSWITCH, ir.OSELECT:
</span><span class="token prefix unchanged"> </span><span class="token line">               // These have been mostly rewritten by the front end into their Nbody fields.
</span><span class="token prefix unchanged"> </span><span class="token line">               // Our main task is to correctly hook up any break statements.
</span></span></code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>CFS \u57FA\u672C\u5DF2\u7ECF\u63A5\u8FD1\u4EBA\u7C7B\u7406\u89E3\u7684\u7A0B\u5E8F\u6267\u884C\u6D41\u7A0B\u56FE\u4E86\uFF0C\u4E0A\u9762\u7684\u4EE3\u7801\u4F1A\u5C06 dowhile \u751F\u6210\u5982\u4E0B\u63A7\u5236\u6D41\u56FE\uFF1A</p><p><img src="`+r+'" alt="cfs" loading="lazy"></p><p>dowhile \u5F00\u59CB\u65F6\uFF0C\u76F4\u63A5\u8FDB\u5165 body \u4E2D\u6267\u884C\uFF0C\u6267\u884C\u5B8C\u540E\u518D\u6765\u5224\u65AD cond \u662F\u5426\u6EE1\u8DB3\uFF0C\u5982\u679C\u6EE1\u8DB3\u5219\u518D\u6B21\u8DF3\u5165\u5230 body \u4E2D\u6267\u884C\uFF0C\u5426\u5219 dowhile \u7ED3\u675F\u3002</p><p>\u53EF\u4EE5\u770B\u5230\uFF0C\u4ECE\u4E00\u4E2A\u57FA\u672C\u7684 dowhile \u8BED\u53E5\u5230 CFS\uFF0C\u7F16\u8BD1\u5668\u505A\u4E86\u5927\u91CF\u5DE5\u4F5C\uFF0C\u4E00\u6B65\u6B65\u5C06\u8BED\u8A00\u5411\u4E0B\u6F14\u5316\uFF08\u8FD9\u4E2A\u8FC7\u7A0B\u4E5F\u79F0 lower\uFF09\u3002</p>',17),gn=s("\u6700\u540E\uFF0C\u5C31\u662F\u7F16\u8BD1\u5668\u7684\u6700\u540E\u4E00\u6B65\u4E86\uFF0C\u5C06 CFS \u56FE\u8F6C\u5316\u4E3A\u5BF9\u5E94\u5E73\u53F0\u7684\u673A\u5668\u7801\uFF0C\u5BF9\u5E94 "),fn={href:"https://github.com/pedrogao/go/blob/pedro/src/cmd/internal/obj/",target:"_blank",rel:"noopener noreferrer"},hn=s("obj"),xn=s("\u5305\uFF1B"),_n=n("br",null,null,-1),wn=s(" \u5305\u4E0B\u6709\u5BF9\u5404\u4E2A\u5E73\u53F0\u7684\u673A\u5668\u7801\u652F\u6301\uFF0C\u7531\u4E8E\u5E73\u53F0\u4E4B\u95F4\u7684\u5DEE\u5F02\u90FD\u6BD4\u8F83\u5927\uFF0C\u56E0\u6B64\u6211\u4EEC\u5BF9 dowhile \u7684\u652F\u6301\u5176\u5B9E\u5230 IR \u8FD9\u4E00\u6B65\u5C31\u591F\u4E86\uFF0C\u5269\u4E0B\u7684\u5DE5\u4F5C go \u7F16\u8BD1\u5668\u4F1A\u5E2E\u52A9\u6211\u4EEC\u6765\u5904\u7406\u3002"),yn=i(`<p>\u518D\u6B21\u7F16\u8BD1 go1.19\uFF0C\u6B64\u65F6\u7684 go1.19 \u5DF2\u7ECF\u652F\u6301 dowhile \u5173\u952E\u5B57\uFF1A</p><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code><span class="token comment"># cd $pwd/src</span>
<span class="token comment"># ./make.bash</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div>`,2),Sn=s("\u6211\u4EEC\u53EF\u4EE5\u6D4B\u8BD5\u770B\u770B\uFF0C\u4E00\u4E2A "),Bn={href:"https://github.com/pedrogao/go/commit/491af5b8c929fd12b65674a8def061b5cced9da9#diff-890164fa94bc37c4cd437e241d79d9d1898987a5fb3c6d0a69b0aa9164cee5e3",target:"_blank",rel:"noopener noreferrer"},qn=s("dowhile \u4F8B\u5B50"),On=s("\uFF1A"),Dn=i(`<div class="language-go ext-go line-numbers-mode"><pre class="language-go"><code><span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    i <span class="token operator">:=</span> <span class="token number">4</span>
    dowhile i <span class="token operator">&gt;</span> <span class="token number">0</span> <span class="token punctuation">{</span>
        fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span>i<span class="token punctuation">)</span>
        i<span class="token operator">--</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>\u8F93\u51FA\uFF1A</p><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code><span class="token comment"># $pwd/bin/go run $pwd/lab/examples/example2/main.go</span>
<span class="token number">4</span>
<span class="token number">3</span>
<span class="token number">2</span>
<span class="token number">1</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,3),Nn=s("\u4F8B\u5B50 2\uFF1A"),En={href:"https://github.com/pedrogao/go/commit/491af5b8c929fd12b65674a8def061b5cced9da9#diff-efe8aa91b1bad6bf66e574790c88f5b58fd56d87bf47f41ea083368a902b8724",target:"_blank",rel:"noopener noreferrer"},In=s("dowhile \u8BED\u53E5\u4E0A\u521D\u59CB\u5316"),Cn=s("\uFF1A"),Tn=i(`<div class="language-go ext-go line-numbers-mode"><pre class="language-go"><code><span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	dowhile i <span class="token operator">:=</span> <span class="token number">4</span><span class="token punctuation">;</span> i <span class="token operator">&gt;</span> <span class="token number">0</span> <span class="token punctuation">{</span>
		fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span>i<span class="token punctuation">)</span>
		i<span class="token operator">--</span>
	<span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>\u8F93\u51FA\uFF1A</p><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code><span class="token comment"># $pwd/bin/go run $pwd/lab/examples/example3/main.go</span>
<span class="token number">4</span>
<span class="token number">3</span>
<span class="token number">2</span>
<span class="token number">1</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,3),$n=s("\u4F8B\u5B50 3\uFF1A"),Gn={href:"https://github.com/pedrogao/go/commit/491af5b8c929fd12b65674a8def061b5cced9da9#diff-98d9e0c744509ee4e2f1cd8eb85994a5023c5f0785054abbf7a417b6a1a4c35d",target:"_blank",rel:"noopener noreferrer"},Pn=s("dowhile \u6761\u4EF6\u4E0D\u6EE1\u8DB3"),Rn=s("\uFF1A"),Fn=i(`<div class="language-go ext-go line-numbers-mode"><pre class="language-go"><code><span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	i <span class="token operator">:=</span> <span class="token number">4</span>
	dowhile i <span class="token operator">!=</span> <span class="token number">4</span> <span class="token punctuation">{</span>
		fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span>i<span class="token punctuation">)</span>
	<span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>\u8F93\u51FA\uFF1A</p><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code><span class="token comment"># $pwd/bin/go run $pwd/lab/examples/example4/main.go   </span>
<span class="token number">4</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>\u53EF\u4EE5\u53D1\u73B0\uFF0C\u5373 <code>i != 4</code> \u4E0D\u6EE1\u8DB3\uFF0C\u4F46\u4ECD\u7136\u6267\u884C\u4E86\u4E00\u6B21 <code>fmt.Println</code>\u3002</p>`,4),An=s("\u5173\u4E8E dowhile \u7684\u5177\u4F53\u5B9E\u73B0\u53EF\u4EE5\u53C2\u8003\u8FD9\u4E2A"),Hn={href:"https://github.com/pedrogao/go/commit/491af5b8c929fd12b65674a8def061b5cced9da9",target:"_blank",rel:"noopener noreferrer"},Ln=s("commit"),Wn=s("\u3002"),Vn=i('<h2 id="\u7ED3\u8BED" tabindex="-1"><a class="header-anchor" href="#\u7ED3\u8BED" aria-hidden="true">#</a> \u7ED3\u8BED</h2><p>\u81F3\u6B64\uFF0C\u6211\u4EEC\u5B8C\u6210\u4E86 go \u7F16\u8BD1\u5668\u65B0\u589E\u5173\u952E\u5B57\u7684\u6311\u6218\uFF0C\u5728\u8FD9\u4E00\u6BB5\u8DEF\u7684\u65C5\u7A0B\u4E2D\uFF0C\u6211\u4EEC\u89C1\u8BC6\u5230\u4E86\u7F16\u8BD1\u539F\u7406\u7684\u9B45\u529B\uFF0C\u611F\u53D7\u5230\u4E86 go \u7F16\u8BD1\u5668\u8BBE\u8BA1\u4E4B\u7CBE\u5DE7\u3001\u529F\u80FD\u4E4B\u5B8C\u5584\uFF1B<br> \u65E0\u8BBA\u662F\u7F16\u8BD1\u5668\u672C\u8EAB\u3001\u8FD8\u662F runtime \u7684\u5B9E\u73B0\uFF0C\u90FD\u662F\u5B66\u4E60\uFF08\u4EFB\u610F\uFF09\u8BED\u8A00\u5B9E\u73B0\u7684\u5DE8\u5927\u5B9D\u5E93\u3002</p><p>\u6309\u7167 go \u6587\u6863\u7684\u8BF4\u6CD5\uFF0Cgo \u7F16\u8BD1\u5668\u88AB\u79F0\u4E3A <code>gc\u7F16\u8BD1\u5668</code>\uFF0C\u867D\u7136\u8FD9\u4E00\u5EA6\u8BA9\u6211\u6000\u7591\u8FD9\u662F\u5783\u573E\u56DE\u6536\u7684\u4EE3\u7801\u5305\uFF0C\u4F46\u660E\u663E\u8FD9\u4E0D\u662F\u3002go \u81EA\u4ECE 1.4 \u7248\u672C\u81EA\u4E3E\u540E\uFF0C\u53C2\u4E0E\u7F16\u8BD1\u5668\u5DE5\u4F5C\u7684<br> \u95E8\u69DB\u964D\u4F4E\u4E86\u5F88\u591A\uFF0C\u5728\u5F00\u53D1\u548C\u5B9E\u8DF5\u4E2D\uFF0C\u6211\u4EEC\u90FD\u80FD\u76F4\u63A5\u53BB\u770B\u6E90\u7801\u6765 debug \u7A0B\u5E8F\u95EE\u9898\uFF1B\u5F53\u7136\u9047\u5230 go \u65E0\u6CD5\u89E3\u51B3\u7684\u95EE\u9898\uFF0C\u6211\u4EEC\u4E5F\u80FD fork \u7136\u540E\u81EA\u5DF1\u6765\u89E3\u51B3\u3002</p><p>c/cpp \u7F16\u8BD1\u5668\u4E00\u76F4\u90FD\u662F gcc\u3001clang\u3001MSVC \u4E09\u5BB6\u4E89\u9738\uFF0C\u800C go \u7F16\u8BD1\u5668\u4F3C\u4E4E\u4E00\u76F4\u90FD\u662F\u4E00\u5BB6\u72EC\u5927\uFF0C\u8FD9\u4E5F\u76F4\u63A5\u5BFC\u81F4\u4E86 go \u56E2\u961F\u7684\u50B2\u6162\uFF0C\u5F53\u7136\u4E5F\u907F\u514D\u4E86\u5206\u88C2\u548C\u6495\u903C\u3002</p><p>\u53EF\u80FD\u4E0D\u4E45\u7684\u5C06\u6765\uFF0C\u56E0\u4E3A\u6216\u591A\u6216\u5C11\u7684\u653F\u6CBB\u539F\u56E0\uFF0Cgo \u7F16\u8BD1\u5668\u4E5F\u4F1A\u8D70\u5411\u591A\u5143\u5316\uFF0C\u671F\u5F85\u90A3\u4E00\u5929\u7684\u5230\u6765\uFF0C\u8BA9 go \u62E5\u6709\u66F4\u591A\u7684\u6D3B\u529B\u3002</p><h2 id="\u53C2\u8003\u8D44\u6599" tabindex="-1"><a class="header-anchor" href="#\u53C2\u8003\u8D44\u6599" aria-hidden="true">#</a> \u53C2\u8003\u8D44\u6599</h2>',6),zn={href:"https://eli.thegreenplace.net/2019/go-compiler-internals-adding-a-new-statement-to-go-part-2/",target:"_blank",rel:"noopener noreferrer"},Xn=s("go compiler internals"),jn={href:"https://zhuanlan.zhihu.com/p/549728632",target:"_blank",rel:"noopener noreferrer"},Kn=s("\u9759\u6001\u5206\u6790-\u4E2D\u95F4\u8868\u793A"),Yn={href:"https://github.com/pedrogao/go",target:"_blank",rel:"noopener noreferrer"},Mn=s("golang"),Un={href:"https://coolshell.cn/articles/21140.html",target:"_blank",rel:"noopener noreferrer"},Jn=s("GO \u7F16\u7A0B\u6A21\u5F0F\uFF1A\u9519\u8BEF\u5904\u7406"),Qn={href:"https://www.modb.pro/db/172962",target:"_blank",rel:"noopener noreferrer"},Zn=s("Go error \u5904\u7406\u6700\u4F73\u5B9E\u8DF5"),ns={href:"https://quasilyte.dev/blog/post/go_ssa_rules/",target:"_blank",rel:"noopener noreferrer"},ss=s("Go compiler: SSA optimization rules description language");function es(as,is){const e=t("ExternalLinkIcon");return p(),o("div",null,[m,n("p",null,[v,n("a",k,[b,a(e)]),g,n("a",f,[h,a(e)]),x]),_,n("blockquote",null,[n("p",null,[w,y,S,B,q,n("a",O,[D,a(e)]),N])]),E,n("p",null,[I,n("a",C,[T,a(e)]),$]),G,n("p",null,[P,n("a",R,[F,a(e)]),A]),H,L,W,V,n("blockquote",null,[n("p",null,[z,X,n("a",j,[K,a(e)]),Y,M,U])]),J,n("blockquote",null,[n("p",null,[Q,n("a",Z,[nn,a(e)]),sn])]),en,n("p",null,[an,n("a",ln,[tn,a(e)]),pn,on,cn]),n("p",null,[dn,n("a",rn,[un,a(e)]),mn,vn,kn]),bn,n("p",null,[gn,n("a",fn,[hn,a(e)]),xn,_n,wn]),yn,n("p",null,[Sn,n("a",Bn,[qn,a(e)]),On]),Dn,n("p",null,[Nn,n("a",En,[In,a(e)]),Cn]),Tn,n("p",null,[$n,n("a",Gn,[Pn,a(e)]),Rn]),Fn,n("p",null,[An,n("a",Hn,[Ln,a(e)]),Wn]),Vn,n("ul",null,[n("li",null,[n("a",zn,[Xn,a(e)])]),n("li",null,[n("a",jn,[Kn,a(e)])]),n("li",null,[n("a",Yn,[Mn,a(e)])]),n("li",null,[n("a",Un,[Jn,a(e)])]),n("li",null,[n("a",Qn,[Zn,a(e)])]),n("li",null,[n("a",ns,[ss,a(e)])])])])}var ps=l(u,[["render",es],["__file","magic3.html.vue"]]);export{ps as default};
