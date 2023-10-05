const e=JSON.parse(`{"key":"v-70ba9e64","path":"/posts/distribute/distributedkv.html","title":"distributed-kv 设计与实现","lang":"zh-CN","frontmatter":{"icon":"edit","title":"distributed-kv 设计与实现","date":"2023-09-20T00:00:00.000Z","tag":["kv"],"category":["distribute","kv"],"description":"旨在探索分布式缓存的设计与实现 架构设计 目标 支持大容量缓存、持久化，PB 级别； 支持哈希槽分片，动态收缩； 支持 List，Set，String，Hash，Sorted set 等数据结构； 集成 Deno，支持脚本事务； 使用简单，redis-cli 客户端可直接使用，直连代理节点； 二次封装 redis 客户端，支持代理模式自动切换； 整体架构 distributed-kv 基于 Tikv 实现，并提供兼容 redis 数据结构的 API，支持基本 5 种基本类型数据结构，不支持 Pub/Sub，Pipeline 等高级特性，旨在探索超大容量缓存的架构实践。","head":[["meta",{"property":"og:url","content":"https://pedrogao.github.io/posts/distribute/distributedkv.html"}],["meta",{"property":"og:site_name","content":"廊中别苑"}],["meta",{"property":"og:title","content":"distributed-kv 设计与实现"}],["meta",{"property":"og:description","content":"旨在探索分布式缓存的设计与实现 架构设计 目标 支持大容量缓存、持久化，PB 级别； 支持哈希槽分片，动态收缩； 支持 List，Set，String，Hash，Sorted set 等数据结构； 集成 Deno，支持脚本事务； 使用简单，redis-cli 客户端可直接使用，直连代理节点； 二次封装 redis 客户端，支持代理模式自动切换； 整体架构 distributed-kv 基于 Tikv 实现，并提供兼容 redis 数据结构的 API，支持基本 5 种基本类型数据结构，不支持 Pub/Sub，Pipeline 等高级特性，旨在探索超大容量缓存的架构实践。"}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2023-09-20T11:56:34.000Z"}],["meta",{"property":"article:author","content":"pedrogao"}],["meta",{"property":"article:tag","content":"kv"}],["meta",{"property":"article:published_time","content":"2023-09-20T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2023-09-20T11:56:34.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"distributed-kv 设计与实现\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2023-09-20T00:00:00.000Z\\",\\"dateModified\\":\\"2023-09-20T11:56:34.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"pedrogao\\",\\"url\\":\\"https://github.com/pedrogao/\\"}]}"]]},"headers":[{"level":2,"title":"架构设计","slug":"架构设计","link":"#架构设计","children":[{"level":3,"title":"目标","slug":"目标","link":"#目标","children":[]},{"level":3,"title":"整体架构","slug":"整体架构","link":"#整体架构","children":[]},{"level":3,"title":"客户端","slug":"客户端","link":"#客户端","children":[]},{"level":3,"title":"代理服务","slug":"代理服务","link":"#代理服务","children":[]},{"level":3,"title":"缓存服务","slug":"缓存服务","link":"#缓存服务","children":[]},{"level":3,"title":"Tikv & PD","slug":"tikv-pd","link":"#tikv-pd","children":[]}]},{"level":2,"title":"详细设计","slug":"详细设计","link":"#详细设计","children":[{"level":3,"title":"客户端","slug":"客户端-1","link":"#客户端-1","children":[]},{"level":3,"title":"代理服务","slug":"代理服务-1","link":"#代理服务-1","children":[]},{"level":3,"title":"缓存服务","slug":"缓存服务-1","link":"#缓存服务-1","children":[]}]},{"level":2,"title":"What's Next","slug":"what-s-next","link":"#what-s-next","children":[]},{"level":2,"title":"参考资料","slug":"参考资料","link":"#参考资料","children":[]}],"git":{"createdTime":1695210994000,"updatedTime":1695210994000,"contributors":[{"name":"pedrogao","email":"1312342604@qq.com","commits":1}]},"readingTime":{"minutes":7.8,"words":2340},"filePathRelative":"posts/distribute/distributedkv.md","localizedDate":"2023年9月20日","excerpt":"<p><em>旨在探索分布式缓存的设计与实现</em></p>\\n<h2> 架构设计</h2>\\n<h3> 目标</h3>\\n<ul>\\n<li>支持大容量缓存、持久化，PB 级别；</li>\\n<li>支持哈希槽分片，动态收缩；</li>\\n<li>支持 List，Set，String，Hash，Sorted set 等数据结构；</li>\\n<li>集成 Deno，支持脚本事务；</li>\\n<li>使用简单，redis-cli 客户端可直接使用，直连代理节点；</li>\\n<li>二次封装 redis 客户端，支持代理模式自动切换；</li>\\n</ul>\\n<h3> 整体架构</h3>\\n<p>distributed-kv 基于 Tikv 实现，并提供兼容 redis 数据结构的 API，支持基本 5 种基本类型数据结构，不支持 Pub/Sub，Pipeline 等高级特性，旨在探索超大容量缓存的架构实践。</p>","autoDesc":true}`);export{e as data};