import{_ as t}from"./plugin-vue_export-helper-c27b6911.js";import{r as o,o as c,c as l,a as n,b as s,e,f as p}from"./app-dd607917.js";const i="/assets/tinymq1-d3c7a52f.png",u="/assets/tinymq2-9ca95f12.png",r="/assets/tinymq3-e6130963.png",k="/assets/tinymq4-1fac95a1.png",d="/assets/tinymq5-7529f73a.png",m={},v=p('<blockquote><p>旨在探索 MQ 的设计与实现，掌握基本原型即可，不上升高级功能。</p></blockquote><p>中间件三驾马车：数据库、缓存，MQ，是每个后端工程师都应深入理解的必备技能，同时也是工作、面试的常客。</p><p>自工作以来，笔者基本每天都在与消息队列（MQ）打交道，无论是模块解耦，流量削峰，还是事件通知，MQ 都太好用了。</p><p>彻底搞懂 MQ，这个目标一直都在，但苦于下面的原因所以一直没有实施：</p><ol><li>工作内容又繁又杂，没有一个整块时间去思考与沉淀；</li><li>MQ 选型众多，Kafka，RocketMQ，Pulsar 等都非常好用，但各有各的特点与不同；</li><li>MQ 经过这么多年的发展，本来也越来越复杂，一头扎进去难免一叶障目；</li></ol><p>市面上的 MQ 产品，比如 Pulsar，Kafka，RocketMQ，经过多年的迭代，已经变得十分复杂和臃肿，不再适合作为一个原型产品进行学习与实践。本着实现了才算理解的初衷，笔者尝试去设计与实现一个极简 MQ，称为 tinymq。</p><h2 id="架构设计" tabindex="-1"><a class="header-anchor" href="#架构设计" aria-hidden="true">#</a> 架构设计</h2><p>tinymq 架构着重参考了 Kafka（没办法，Pulsar、RocketMQ 都参考了它）， 在一些方面做了精简：</p><p><img src="'+i+'" alt="tinymq1"></p><ul><li>整体上，仍然沿用 Producer、Broker、Consumer 的数据流设计；</li><li>注册中心选用 Zookeeper，实现上可以抽象为注册接口，方便后续迁移；</li><li>通信上，直接集成了 grpc 作为通信框架，无需自定义协议、序列化；</li><li>消息分区在 Producer 端实现，Broker 地址从注册中心获取；</li><li>不支持消费者组，一个 Topic 可以有多个消费者（Channel），每个消费者独有自己的消费序号；</li><li>消费进度没有存储至 ZK 中，而是直接在 DiskQueue 中存储；</li></ul><h2 id="详细设计" tabindex="-1"><a class="header-anchor" href="#详细设计" aria-hidden="true">#</a> 详细设计</h2><p>下面就每个模块，详细阐述其设计与实现。</p><h3 id="元数据" tabindex="-1"><a class="header-anchor" href="#元数据" aria-hidden="true">#</a> 元数据</h3><p>tinymq 主要有如下几类元数据：</p><ul><li>broker 注册信息，那些 broker 在线，broker 地址、端口等，broker 下线则自动删除；</li><li>topic 注册信息，创建了那些 topic，topic 下有那些分区（Queue），分区下消费者等；</li></ul><p><img src="'+u+`" alt="tinymq2"></p><p>元数据必须保证强一致性，高可靠，主流的注册中心有 Zookeeper、ETCD，Consul 等，这里和 Kafka 保持一致选择 ZK，ZK 的树结构十分适合 tinymq 注册数据。</p><p>实现上，为了方便后续扩展，tinymq 定义了 RegistryService：</p><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">interface</span> <span class="token class-name">RegistryService</span> <span class="token keyword">extends</span> <span class="token class-name">Closeable</span> <span class="token punctuation">{</span>
  <span class="token keyword">void</span> <span class="token function">registerBroker</span><span class="token punctuation">(</span><span class="token class-name">String</span> brokerId<span class="token punctuation">,</span> <span class="token class-name">BrokerInfo</span> brokerInfo<span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token keyword">void</span> <span class="token function">unRegisterBroker</span><span class="token punctuation">(</span><span class="token class-name">String</span> brokerId<span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token class-name">BrokerInfo</span> <span class="token function">getBroker</span><span class="token punctuation">(</span><span class="token class-name">String</span> brokerId<span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token class-name">List</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">BrokerInfo</span><span class="token punctuation">&gt;</span></span> <span class="token function">getAllBrokers</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token keyword">void</span> <span class="token function">registerTopic</span><span class="token punctuation">(</span><span class="token class-name">String</span> topicId<span class="token punctuation">,</span> <span class="token class-name">TopicInfo</span> topicInfo<span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token keyword">void</span> <span class="token function">unRegisterTopic</span><span class="token punctuation">(</span><span class="token class-name">String</span> topicId<span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token class-name">TopicInfo</span> <span class="token function">getTopic</span><span class="token punctuation">(</span><span class="token class-name">String</span> topicId<span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token class-name">List</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">TopicInfo</span><span class="token punctuation">&gt;</span></span> <span class="token function">getAllTopics</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token keyword">void</span> <span class="token function">registerQueue</span><span class="token punctuation">(</span><span class="token class-name">String</span> topicId<span class="token punctuation">,</span> <span class="token class-name">String</span> queueId<span class="token punctuation">,</span> <span class="token class-name">QueueInfo</span> queueInfo<span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token keyword">void</span> <span class="token function">unRegisterQueue</span><span class="token punctuation">(</span><span class="token class-name">String</span> topicId<span class="token punctuation">,</span> <span class="token class-name">String</span> queueId<span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token class-name">QueueInfo</span> <span class="token function">getQueue</span><span class="token punctuation">(</span><span class="token class-name">String</span> topicId<span class="token punctuation">,</span> <span class="token class-name">String</span> queueId<span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token keyword">void</span> <span class="token function">setQueueConsumer</span><span class="token punctuation">(</span><span class="token class-name">String</span> topicId<span class="token punctuation">,</span> <span class="token class-name">String</span> queueId<span class="token punctuation">,</span> <span class="token class-name">String</span> consumerId<span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token class-name">String</span> <span class="token function">getQueueConsumer</span><span class="token punctuation">(</span><span class="token class-name">String</span> topicId<span class="token punctuation">,</span> <span class="token class-name">String</span> queueId<span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token keyword">void</span> <span class="token function">unsetQueueConsumer</span><span class="token punctuation">(</span><span class="token class-name">String</span> topicId<span class="token punctuation">,</span> <span class="token class-name">String</span> queueId<span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token class-name">List</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">QueueInfo</span><span class="token punctuation">&gt;</span></span> <span class="token function">getQueuesByTopic</span><span class="token punctuation">(</span><span class="token class-name">String</span> topicId<span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token class-name">List</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">QueueInfo</span><span class="token punctuation">&gt;</span></span> <span class="token function">getAllQueues</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>默认实现了 ZookeeperRegistryService，如果以后弃用 ZK，可以更换 RegistryService 实现。</p><p>在架构上，RegistryService 是多端访问元数据的桥梁，因此整个 ZK 集群的稳定性至关重要。</p><h3 id="broker" tabindex="-1"><a class="header-anchor" href="#broker" aria-hidden="true">#</a> Broker</h3><p>broker 是 MQ 的心脏，承担着消息存储、转发、处理等核心功能，对外暴露主题操作、消息生产消费等核心 API。</p><h4 id="api" tabindex="-1"><a class="header-anchor" href="#api" aria-hidden="true">#</a> API</h4><p>broker 对外暴露的 API 分为两大类：</p><ul><li>主题、队列类：操作 Topic，查询 Queue 信息；</li><li>消息：生产、消费消息；</li></ul><p>tinymq 网络层直接由 protobuf 实现，API 定义如下：</p><div class="language-proto line-numbers-mode" data-ext="proto"><pre class="language-proto"><code>service QueueService {
  rpc produceMessage (ProduceMessageRequest) returns (ProduceMessageResponse) {}
  rpc asyncProduceMessage (ProduceMessageRequest) returns(Empty) {}
  rpc consumeMessage (ConsumeMessageRequest) returns (ConsumeMessageResponse) {}
  rpc fetchMessage (FetchMessageRequest) returns (FetchMessageResponse) {}

  rpc createQueue(CreateQueueRequest) returns (CreateQueueResponse) {}
  rpc deleteQueue(DeleteQueueRequest) returns (DeleteQueueResponse) {}
  rpc getQueueSize(GetQueueSizeRequest) returns (GetQueueSizeResponse) {}
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><blockquote><p>为什么选择 grpc？ 主流的 MQ 框架都会自定义通信层、序列化层，这样就能保证消息链路全可控，方便迭代和优化，但同时也带来了麻烦，作为一个 MQ 原型，实在是不应该把精力花在通信层上面，因此已有成熟稳定的实现，拿来用是最好的选择。 暴露的消息 API 可以由生产者、消费者访问，主题操作 API 由 admin 平台访问。</p></blockquote><p>有了 grpc 支持后，tinymq 只需实现 QueueService 服务即可，而这个接口由 QueueManager 来实现：</p><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">QueueManager</span> <span class="token keyword">extends</span> <span class="token class-name">QueueServiceGrpc<span class="token punctuation">.</span>QueueServiceImplBase</span> <span class="token keyword">implements</span> <span class="token class-name">Closeable</span> <span class="token punctuation">{</span>
<span class="token comment">//...</span>
<span class="token annotation punctuation">@Override</span>
<span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">produceMessage</span><span class="token punctuation">(</span><span class="token class-name">ProduceMessageRequest</span> request<span class="token punctuation">,</span> <span class="token class-name">StreamObserver</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">ProduceMessageResponse</span><span class="token punctuation">&gt;</span></span> responseObserver<span class="token punctuation">)</span> <span class="token punctuation">{</span>
<span class="token class-name">String</span> queueName <span class="token operator">=</span> request<span class="token punctuation">.</span><span class="token function">getQueueName</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token class-name">ByteString</span> payload <span class="token operator">=</span> request<span class="token punctuation">.</span><span class="token function">getPayload</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token keyword">try</span> <span class="token punctuation">{</span>
        <span class="token class-name">BackendQueue</span> queue <span class="token operator">=</span> queueMap<span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span>queueName<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span>queue <span class="token operator">==</span> <span class="token keyword">null</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            log<span class="token punctuation">.</span><span class="token function">error</span><span class="token punctuation">(</span><span class="token string">&quot;queue {} not found&quot;</span><span class="token punctuation">,</span> queueName<span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token class-name">Result</span> result <span class="token operator">=</span> <span class="token function">genQueueNotFoundResult</span><span class="token punctuation">(</span>queueName<span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token class-name">ProduceMessageResponse</span> response <span class="token operator">=</span> <span class="token class-name">ProduceMessageResponse</span><span class="token punctuation">.</span><span class="token function">newBuilder</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">setResult</span><span class="token punctuation">(</span>result<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">build</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            responseObserver<span class="token punctuation">.</span><span class="token function">onNext</span><span class="token punctuation">(</span>response<span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token keyword">return</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>

        <span class="token keyword">long</span> index <span class="token operator">=</span> queue<span class="token punctuation">.</span><span class="token function">push</span><span class="token punctuation">(</span>payload<span class="token punctuation">.</span><span class="token function">toByteArray</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token class-name">ProduceMessageResponse</span> response <span class="token operator">=</span> <span class="token class-name">ProduceMessageResponse</span><span class="token punctuation">.</span><span class="token function">newBuilder</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">setResult</span><span class="token punctuation">(</span><span class="token function">genSuccessResult</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">setIndex</span><span class="token punctuation">(</span>index<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">build</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        responseObserver<span class="token punctuation">.</span><span class="token function">onNext</span><span class="token punctuation">(</span>response<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span> <span class="token keyword">catch</span> <span class="token punctuation">(</span><span class="token class-name">Exception</span> e<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        log<span class="token punctuation">.</span><span class="token function">error</span><span class="token punctuation">(</span><span class="token string">&quot;produce message error&quot;</span><span class="token punctuation">,</span> e<span class="token punctuation">)</span><span class="token punctuation">;</span>
        responseObserver<span class="token punctuation">.</span><span class="token function">onError</span><span class="token punctuation">(</span>e<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span> <span class="token keyword">finally</span> <span class="token punctuation">{</span>
        responseObserver<span class="token punctuation">.</span><span class="token function">onCompleted</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

<span class="token punctuation">}</span>
<span class="token comment">// ...</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>QueueManager 负责管理当前 broker 下的所有 Queue 实例，主要功能包括：</p><ul><li>消息入队、出队；</li><li>消息定时持久化；</li><li>旧消息清理等；</li></ul><h4 id="消息存储" tabindex="-1"><a class="header-anchor" href="#消息存储" aria-hidden="true">#</a> 消息存储</h4><p>Topic 是 tinymq 的逻辑消息组织单位，为了支持分区，一个 Topic 下可以有多个 Queue：</p><p><img src="`+r+`" alt="tinymq3"></p><p>每个 Queue 分配在不同的 broker 实例中。</p><p>Topic 分区分配、管理比较复杂，不同的 MQ 产品的实现都有所不同，tinymq 实现颇为简单粗暴，即每个 broker 一个 queue 实例。</p><p>队列消息存储又是一个大麻烦，可参考 diskqueue 持久化队列设计演进，这里不再赘述。为了支持多存储引擎，方便后续扩展和迭代，tinymq 定义了 BackendQueue 接口：</p><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">interface</span> <span class="token class-name">BackendQueue</span> <span class="token keyword">extends</span> <span class="token class-name">Closeable</span> <span class="token punctuation">{</span>
  <span class="token class-name">String</span> <span class="token function">getName</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token keyword">long</span> <span class="token function">push</span><span class="token punctuation">(</span><span class="token keyword">byte</span><span class="token punctuation">[</span><span class="token punctuation">]</span> data<span class="token punctuation">)</span> <span class="token keyword">throws</span> <span class="token class-name">IOException</span><span class="token punctuation">;</span>
  <span class="token keyword">byte</span><span class="token punctuation">[</span><span class="token punctuation">]</span> <span class="token function">poll</span><span class="token punctuation">(</span><span class="token class-name">String</span> channel<span class="token punctuation">)</span> <span class="token keyword">throws</span> <span class="token class-name">IOException</span><span class="token punctuation">;</span>
  <span class="token keyword">byte</span><span class="token punctuation">[</span><span class="token punctuation">]</span> <span class="token function">peek</span><span class="token punctuation">(</span><span class="token class-name">String</span> channel<span class="token punctuation">)</span> <span class="token keyword">throws</span> <span class="token class-name">IOException</span><span class="token punctuation">;</span>
  <span class="token keyword">byte</span><span class="token punctuation">[</span><span class="token punctuation">]</span> <span class="token function">get</span><span class="token punctuation">(</span><span class="token keyword">long</span> index<span class="token punctuation">)</span> <span class="token keyword">throws</span> <span class="token class-name">IOException</span><span class="token punctuation">;</span>
  <span class="token keyword">boolean</span> <span class="token function">isEmpty</span><span class="token punctuation">(</span><span class="token class-name">String</span> channel<span class="token punctuation">)</span> <span class="token keyword">throws</span> <span class="token class-name">IOException</span><span class="token punctuation">;</span>
  <span class="token keyword">long</span> <span class="token function">size</span><span class="token punctuation">(</span><span class="token class-name">String</span> channel<span class="token punctuation">)</span> <span class="token keyword">throws</span> <span class="token class-name">IOException</span><span class="token punctuation">;</span>
  <span class="token keyword">void</span> <span class="token function">flush</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token keyword">throws</span> <span class="token class-name">IOException</span><span class="token punctuation">;</span>
  <span class="token keyword">void</span> <span class="token function">close</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token keyword">throws</span> <span class="token class-name">IOException</span><span class="token punctuation">;</span>
  <span class="token keyword">void</span> <span class="token function">delete</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token keyword">throws</span> <span class="token class-name">IOException</span><span class="token punctuation">;</span>
  <span class="token keyword">void</span> <span class="token function">removeBefore</span><span class="token punctuation">(</span><span class="token keyword">long</span> timestamp<span class="token punctuation">)</span> <span class="token keyword">throws</span> <span class="token class-name">IOException</span><span class="token punctuation">;</span> <span class="token comment">// 删除旧数据</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,40),b={href:"https://github.com/pedrogao/tinymq/tree/main/diskqueue",target:"_blank",rel:"noopener noreferrer"},g=p('<h3 id="生产者" tabindex="-1"><a class="header-anchor" href="#生产者" aria-hidden="true">#</a> 生产者</h3><p>生产消息，并调用 API 将消息存储到 Broker；常见的消息生产方式有两种：</p><ol><li>同步生产，适合低频率消息生产，保证消息投递可靠性；</li><li>异步生产，适合高频率消息生产，为了性能牺牲可靠性；</li></ol><p>以同步生产为例，其流程图：</p><p><img src="'+k+'" alt="tinymq4"></p><ol><li>Producer 从 RegistryService 获取 broker、queue 注册信息；</li><li>新建 SenderPool 实例，每个 broker 都对应一个 Sender，Producer 可以向多个 broker 发送消息，因此是 SenderPool；</li><li>Sender 将消息发送到 broker，并返回成功；</li></ol><blockquote><p>关于异步生产暂未实现，其核心是引入生产线程，并在成功后回调。</p></blockquote><h3 id="消费者" tabindex="-1"><a class="header-anchor" href="#消费者" aria-hidden="true">#</a> 消费者</h3><p>调用 API 消费消息，消费者实现方式一般有两种：</p><ol><li>拉模式，消费者主动从 broker 拉取消息；</li><li>推模式，broker 主动向消费者推消息；</li></ol><p>二者各有优劣，tinymq 选择实现拉模式，其流程图如下：</p><p><img src="'+d+'" alt="tinymq5"></p><ol><li>Consumer 从 RegistryService 中获取 broker、queue 信息；</li><li>新建 MessageStream 用于返回 topic 下的消息流，Consumer 可以从多个 broker 中请求消息，每个 broker 一个 fetcher；</li><li>消费消息，选择 fecther 获取其对应 broker 中的消息，并返回消息列表；</li></ol><h2 id="其它待实现特性" tabindex="-1"><a class="header-anchor" href="#其它待实现特性" aria-hidden="true">#</a> 其它待实现特性</h2><p>作为一个 MQ 原型，tinymq 实现了核心功能和 API，但距离真正可用还有很远的距离，比如缺少如下特性：</p><ul><li>监控、告警；</li><li>副本；</li><li>延时队列；</li><li>死信队列；</li><li>消费者组；</li><li>so on...；</li></ul><p>参考资料</p>',17),f={href:"https://github.com/pedrogao/tinymq",target:"_blank",rel:"noopener noreferrer"};function y(h,q){const a=o("ExternalLinkIcon");return c(),l("div",null,[v,n("p",null,[s("默认由 "),n("a",b,[s("diskqueue"),e(a)]),s(" 实现。")]),g,n("ul",null,[n("li",null,[n("a",f,[s("GitHub - pedrogao/tinymq: tiny distribute message queue implement & practice"),e(a)])])])])}const Q=t(m,[["render",y],["__file","tinymq.html.vue"]]);export{Q as default};
