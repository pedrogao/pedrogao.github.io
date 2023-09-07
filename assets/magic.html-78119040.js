const e=JSON.parse('{"key":"v-d2803c04","path":"/posts/go/magic.html","title":"go 的两个黑魔法技巧","lang":"zh-CN","frontmatter":{"icon":"edit","title":"go 的两个黑魔法技巧","date":"2022-02-28T00:00:00.000Z","tag":["go","magic"],"category":["go"],"description":"go 的两个黑魔法技巧 最近，在写 Go 代码的时候，发现了其特别有意思的两个奇技淫巧，于是写下这篇 文章和大家分享一下。 魔法 1：调用 runtime 中的私有函数 按照 Go 的编译约定，代码包内以小写字母开头的函数、变量是私有的： package test // 私有 func abs() {} // 公共 func Abs() {}","head":[["meta",{"property":"og:url","content":"https://pedrogao.github.io/posts/go/magic.html"}],["meta",{"property":"og:site_name","content":"廊中别苑"}],["meta",{"property":"og:title","content":"go 的两个黑魔法技巧"}],["meta",{"property":"og:description","content":"go 的两个黑魔法技巧 最近，在写 Go 代码的时候，发现了其特别有意思的两个奇技淫巧，于是写下这篇 文章和大家分享一下。 魔法 1：调用 runtime 中的私有函数 按照 Go 的编译约定，代码包内以小写字母开头的函数、变量是私有的： package test // 私有 func abs() {} // 公共 func Abs() {}"}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2022-05-29T07:49:07.000Z"}],["meta",{"property":"article:author","content":"pedrogao"}],["meta",{"property":"article:tag","content":"go"}],["meta",{"property":"article:tag","content":"magic"}],["meta",{"property":"article:published_time","content":"2022-02-28T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2022-05-29T07:49:07.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"go 的两个黑魔法技巧\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2022-02-28T00:00:00.000Z\\",\\"dateModified\\":\\"2022-05-29T07:49:07.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"pedrogao\\",\\"url\\":\\"https://github.com/pedrogao/\\"}]}"]]},"headers":[{"level":2,"title":"魔法 1：调用 runtime 中的私有函数","slug":"魔法-1-调用-runtime-中的私有函数","link":"#魔法-1-调用-runtime-中的私有函数","children":[{"level":3,"title":"memmove","slug":"memmove","link":"#memmove","children":[]},{"level":3,"title":"growslice","slug":"growslice","link":"#growslice","children":[]}]},{"level":2,"title":"魔法 2：调用 C/汇编函数","slug":"魔法-2-调用-c-汇编函数","link":"#魔法-2-调用-c-汇编函数","children":[{"level":3,"title":"cgo","slug":"cgo","link":"#cgo","children":[]},{"level":3,"title":"汇编","slug":"汇编","link":"#汇编","children":[]}]},{"level":2,"title":"总结","slug":"总结","link":"#总结","children":[]},{"level":2,"title":"参考资料","slug":"参考资料","link":"#参考资料","children":[]}],"git":{"createdTime":1653810547000,"updatedTime":1653810547000,"contributors":[{"name":"pedrogao","email":"1312342604@qq.com","commits":1}]},"readingTime":{"minutes":12.14,"words":3641},"filePathRelative":"posts/go/magic.md","localizedDate":"2022年2月28日","excerpt":"<h1> go 的两个黑魔法技巧</h1>\\n<p>最近，在写 Go 代码的时候，发现了其特别有意思的<strong>两个</strong>奇技淫巧，于是写下这篇<br>\\n文章和大家分享一下。</p>\\n<h2> 魔法 1：调用 runtime 中的私有函数</h2>\\n<p>按照 Go 的编译约定，代码包内以<strong>小写字母</strong>开头的函数、变量是私有的：</p>\\n<div class=\\"language-go line-numbers-mode\\" data-ext=\\"go\\"><pre class=\\"language-go\\"><code><span class=\\"token keyword\\">package</span> test\\n\\n<span class=\\"token comment\\">// 私有</span>\\n<span class=\\"token keyword\\">func</span> <span class=\\"token function\\">abs</span><span class=\\"token punctuation\\">(</span><span class=\\"token punctuation\\">)</span> <span class=\\"token punctuation\\">{</span><span class=\\"token punctuation\\">}</span>\\n\\n<span class=\\"token comment\\">// 公共</span>\\n<span class=\\"token keyword\\">func</span> <span class=\\"token function\\">Abs</span><span class=\\"token punctuation\\">(</span><span class=\\"token punctuation\\">)</span> <span class=\\"token punctuation\\">{</span><span class=\\"token punctuation\\">}</span>\\n</code></pre><div class=\\"line-numbers\\" aria-hidden=\\"true\\"><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div></div></div>","autoDesc":true}');export{e as data};
