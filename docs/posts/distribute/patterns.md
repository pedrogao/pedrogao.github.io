---
icon: edit
title: 《分布式系统设计模式》总结
date: 2024-10-12
tag:
  - pattern
category:
  - distribute
  - pattern
---

《Patterns of Distributed Systems》这本书由 Unmesh Joshi 撰写，全面介绍了分布式系统中的各种模式。以下是对这本书的总结：

### 第一部分：概述

- **为什么要分布式**
  - **资源限制**：CPU、内存、网络和磁盘是计算的基本资源，单服务器处理能力受这些资源上限限制，如网络带宽决定数据传输上限，磁盘有读写速度限制，内存限制可加载的数据量，CPU 处理能力有限。当请求数超过资源上限，请求需排队等待，影响系统吞吐量，因此需通过分布式利用多服务器资源。
  - **分区和复制**：介绍了两种常见的分布式架构方式。一是分离业务逻辑和数据层，无状态部分暴露功能，有状态部分由数据库管理，通过水平扩展无状态服务处理更多请求，但存在数据库响应和连接处理问题，可通过添加缓存层缓解，但缓存不适用于所有情况。二是按领域边界分区，如微服务架构，不同领域有各自的软件系统，但共享基础设施组件仍可能面临类似问题。还强调了数据量和请求数增长导致的问题，以及处理数据时故障处理和复制的重要性。
  - **定义分布式系统**：存储数据并在多服务器上作为多个进程运行，协调数据状态的软件系统。具有运行在多个进程、管理数据、通过消息传递通信、容忍部分故障等特点。
- **模式概述**
  - 介绍了分布式系统中的两种基本操作：分区和复制。以一个简单的数据记录在三个节点上的复制为例，阐述了在不同场景下如何保证数据的一致性和可用性。

### 第二部分：数据复制模式

- **Write - Ahead Log**
  - **问题**：服务器存储数据失败时需强耐久性保证，即使重启丢失内存状态，也应执行已同意的操作。
  - **解决方案**：将每个状态变化作为命令存储在硬盘文件的日志中，单个服务器进程维护一个顺序追加的日志。日志更新可通过 Singular Update Queue 实现。日志条目有唯一标识符，有助于其他操作，如分段日志或低水位标记清理日志。
  - **示例**：Consensus 算法（如 Zookeeper、RAFT）的日志实现，Kafka 的存储实现，以及所有数据库（包括 NoSQL 数据库如 Cassandra）都使用类似技术。
- **Segmented Log**
  - **问题**：单个日志文件可能增长过大，在启动时读取成为性能瓶颈，且清理操作困难。
  - **解决方案**：将单个日志分割成多个较小的段，日志文件达到指定大小限制后滚动。需要一种方法将逻辑日志偏移量映射到日志段文件。
  - **示例**：Zookeeper、RAFT 的日志实现，Kafka 的存储实现以及所有数据库（包括 NoSQL 数据库如 Cassandra）都使用基于预配置日志大小的滚动策略。
- **Low - Water Mark**
  - **问题**：Write - Ahead Log 会无限增长磁盘存储，需一种机制确定可安全丢弃的日志部分。
  - **解决方案**：通过机制（如基于快照或时间）确定可丢弃的日志下限（低水位标记），后台任务持续检查并删除可丢弃的日志文件。
  - **示例**：Zookeeper、RAFT 等 Consensus 算法实现基于快照的日志清理，Kafka 实现基于时间的日志清理。
- **Leader and Followers**
  - **问题**：为实现系统容错需在多服务器复制数据，同时要保证数据一致性，Write 和 Read Quorum 不够，需更强的一致性保证。
  - **解决方案**：在集群中选一个服务器作为领导者（Leader），负责决策并将决策传播给其他服务器（Followers）。服务器启动时查找领导者，无领导者则触发选举，只有领导者处理客户端请求，追随者可转发请求给领导者。
  - **示例**：Consensus 算法需一个服务器协调复制过程，如 Paxos Made Simple 论文中强调的，以及 Raft 和 Zab 等 Consensus 算法中的领导者选举。
- **HeartBeat**
  - **问题**：在集群中，服务器需及时检测其他服务器故障，以便采取正确行动处理故障服务器上的数据请求。
  - **解决方案**：服务器定期向其他服务器发送心跳消息，若一段时间未收到某个服务器的心跳，则认为该服务器故障。心跳间隔需大于网络往返时间，小于服务器等待心跳的超时时间。
  - **示例**：在基于 Consensus 的系统（如 RAFT、Zookeeper）中，领导者向追随者发送心跳；在大规模集群中，如 Akka、Cassandra 使用 Phi Accrual 故障检测器，Hashicorp Consul 使用基于 Gossip 的故障检测器。
- **Paxos**
  - **问题**：多个节点共享状态时需达成一致，在无领导者或领导者选举时节点需自行确定值，且要处理节点故障和网络问题。
  - **解决方案**：Paxos 算法通过三个阶段（准备阶段、接受阶段、提交阶段）确保多个节点对同一值达成一致，即使存在部分网络或节点故障。
  - **示例**：在集群中多个节点需确定一个值的场景，如设置集群名称；在一些数据库产品（如 Cosmos DB、Spanner）中使用 Paxos 的变体（如 Multi - Paxos），Cassandra 使用基本 Paxos 实现轻量级事务。
- **Replicated Log**
  - **问题**：多个节点共享状态时需同步状态，且每个副本需按相同顺序执行请求，以保证最终状态一致。
  - **解决方案**：集群节点维护 Write - Ahead Log，通过共识算法协调日志条目复制，使所有节点有相同日志。选举领导者协调复制，客户端与领导者通信，领导者添加请求到日志并确保复制到追随者。
  - **示例**：Raft 和 Multi - Paxos 是实现 Replicated Log 的流行算法，被许多数据库和分布式系统使用。
- **Quorum**
  - **问题**：在分布式系统中，需平衡系统性能和连续性，确定多少服务器确认复制才能保证更新可靠。
  - **解决方案**：集群中多数节点确认更新时认为更新已接收，这个多数称为 Quorum。Quorum 用于决定何时数据对客户端可见以及领导者选举等。
  - **示例**：所有基于 Consensus 的实现（如 Zab、Raft、Paxos）都基于 Quorum，在一些非 Consensus 系统中，也用 Quorum 确保在故障或网络分区时最新更新至少在一个服务器可用。
- **Generation Clock**
  - **问题**：在 Leader 和 Followers 模式中，领导者可能暂时与追随者断开连接，集群需检测并处理来自旧领导者的请求。
  - **解决方案**：每个进程维护一个 Generation Clock，每次选举领导者时递增。领导者在日志中标记请求所属的 Generation，追随者通过比较 Generation 拒绝旧领导者的请求。
  - **示例**：Raft 使用 Term 概念标记领导者 Generation，Zookeeper 中每个事务 ID 包含 Epoch（类似 Generation），Cassandra 中服务器重启时递增 Generation 并在系统键空间中传播。
- **High - Water Mark**
  - **问题**：在复制日志的系统中，需确定日志中哪些部分已安全复制到多数追随者，以便在领导者故障时数据仍可用。
  - **解决方案**：High - Water Mark 是日志中最后成功复制到 Quorum 的索引。领导者将其添加到心跳消息中，追随者根据此标记确定可提交的日志条目。
  - **示例**：在 RAFT 共识算法中称为 CommitIndex，Kafka 复制协议中有单独的 High - Water Mark，Apache BookKeeper 有类似概念。
- **Singular Update Queue**
  - **问题**：多个并发客户端更新状态时，需安全地逐个处理更新，同时避免阻塞调用者和影响系统吞吐量。
  - **解决方案**：使用工作队列和单个处理线程，多个客户端可提交状态变化到队列，单个线程按顺序处理。
  - **示例**：所有基于 Consensus 的实现（如 Zookeeper、etcd）需要严格顺序处理请求，使用类似代码结构；Apache Kafka 的 Controller 和 Cassandra 的某些阶段也使用单线程处理更新。
- **Request Waiting List**
  - **问题**：集群节点处理客户端请求需与其他节点通信复制数据，需等待其他节点响应后才能响应客户端，且要处理异步响应。
  - **解决方案**：集群节点维护一个等待列表，映射请求和回调函数。当收到其他节点响应时，通过回调函数处理响应并确定是否满足客户端请求的条件（如 Quorum）。
  - **示例**：Cassandra 使用异步消息传递并处理响应消息，Kafka 使用数据结构跟踪等待请求，etcd 维护等待列表响应客户端请求。
- **Idempotent Receiver**
  - **问题**：客户端发送请求可能未收到响应，重试时服务器可能收到重复请求，需确保请求只处理一次。
  - **解决方案**：为客户端分配唯一 ID，客户端注册自己，服务器为每个客户端存储请求响应。客户端发送请求时带上唯一 ID 和请求编号，服务器根据编号检查是否已处理。
  - **示例**：Raft 实现提供线性化操作的幂等性，Kafka 允许幂等生产者，Zookeeper 通过 Sessions 和 zxid 概念实现客户端恢复。
- **Follower Reads**
  - **问题**：在 Leader 和 Followers 模式中，领导者可能因过多请求而过载，且在多数据中心设置中，远程客户端请求领导者会有额外延迟。
  - **解决方案**：允许追随者处理读请求，以减轻领导者负载并提高吞吐量。追随者可根据位置或延迟选择，同时要处理读请求可能返回旧值的问题。
  - **示例**：许多数据库和分布式系统支持追随者读，如 Neo4j 的因果集群，MongoDB 的副本集，CockroachDB 和 Kafka 的相关实现。
- **Versioned Value**
  - **问题**：在分布式系统中，节点需确定某个键的最新值，有时还需知道过去的值。
  - **解决方案**：为每个值存储一个版本号，每次更新递增版本号。客户端可读取特定版本的值，服务器根据版本号处理读请求。
  - **示例**：许多数据系统使用版本号实现 MVCC 和事务隔离，如 RocksDB、etcd、MongoDB 和 CockroachDB 等。
- **Version Vector**
  - **问题**：多个服务器允许更新同一键时，需检测并发更新。
  - **解决方案**：为每个键关联一个版本向量，向量包含每个集群节点的计数器。通过比较版本向量检测并发更新并处理冲突。
  - **示例**：一些数据库（如 riak、voldemort）使用版本向量，Cassandra 不使用版本向量，而是通过时间戳支持最后写入获胜的冲突解决策略。

### 第三部分：数据分区模式

- **Fixed Partitions**
  - **问题**：将数据映射到集群节点时，要保证数据均匀分布，且能快速确定某个数据记录存储在哪个节点，同时在集群节点变化时尽量减少数据移动。
  - **解决方案**：将数据映射到逻辑分区，逻辑分区再映射到集群节点。选择合适的哈希函数保证哈希值不受平台和运行时影响，通过 Consistent Core 或其他协调器管理分区映射，并跟踪集群成员。
  - **示例**：Kafka 每个主题有固定数量的分区，Akka 的分片分配有固定数量的分片，一些内存数据网格产品（如 Apache Ignite、Hazelcast）配置有固定数量的分区。
- **Key - Range Partitions**
  - **问题**：使用哈希映射数据到集群节点时，查询一个键范围的数据需查询所有分区，效率低下。
  - **解决方案**：创建按键范围排序的逻辑分区，将分区映射到集群节点。可以预定义键范围，也可实现自动拆分分区。
  - **示例**：一些数据库（如 hbase、CockroachDB、YugabyteDB、TiKV）支持范围分区。
- **Two Phase Commit**
  - **问题**：在多个集群节点上原子性地存储数据时，每个节点需知道其他节点是否成功存储数据。
  - **解决方案**：两阶段提交协议包括准备阶段和提交阶段。一个节点作为协调者跟踪事务状态，在准备阶段各节点获取所需资源并承诺可提交，在提交阶段实际执行更新。
  - **示例**：一些分布式数据库（如 CockroachDB、MongoDB）使用两阶段提交在分区上原子性存储值，Kafka 允许跨多个分区原子性地生产消息。

### 第四部分：分布式时间模式

- **Lamport Clock**
  - **问题**：在多个服务器上存储数据时，需确定数据的存储顺序，但系统时钟不可靠（可能不单调），不能用于比较不同服务器的时间戳。
  - **解决方案**：Lamport Clock 为每个服务器维护一个逻辑时间戳，每次写操作时递增。通过比较逻辑时间戳确定事件的先后顺序。
  - **示例**：一些数据库（如 MongoDB、CockroachDB）使用 Lamport Clock 的变体实现 MVCC 存储，Generation Clock 是 Lamport Clock 的一个例子。
- **Hybrid Clock**
  - **问题**：使用 Lamport Clock 作为版本号时，客户端无法知道版本的实际日期时间。
  - **解决方案**：Hybrid Clock 结合系统时间戳和逻辑时间戳，既保证单调递增又与实际日期时间相关。
  - **示例**：一些数据库（如 MongoDB、CockroachDB、YugabyteDB）使用 Hybrid Clock 维护分布式事务的因果关系。
- **Clock - Bound Wait**
  - **问题**：在分布式系统中，由于时钟不同步，可能导致读操作无法获取最新值，或写操作无法保证数据顺序正确。
  - **解决方案**：集群节点在读写值之前等待，直到集群中所有节点的时钟值都高于分配给该值的时间戳。可根据历史观察选择一个合理的最大时钟漂移值，或使用特定的时钟 API（如 Google 的 True Time、AWS 的相关服务）。
  - **示例**：一些数据库（如 CockroachDB、YugabyteDB）实现读重启机制，Google 的 Spanner 使用相关技术实现提交等待。

### 第五部分：集群管理模式

- **Consistent Core**
  - **问题**：在大型数据集群中，要提供线性一致性保证，同时处理客户端交互的各种问题（如查找领导者、处理重复请求等），且要保证系统的容错性。
  - **解决方案**：实现一个较小的（3 - 5 个节点）提供线性一致性和容错性的集群，用于管理大型数据集群的元数据和做出集群范围的决策。通过 Consensus 算法实现，如 Raft。处理客户端交互时，提供查找领导者的机制（如通过追随者返回领导者地址或转发请求），使用幂等接收器处理重复请求。
  - **示例**：Google 的 Chubby 用于协调和元数据管理，Kafka 使用 Zookeeper 管理元数据，Kubernetes 使用 etcd 进行协调和管理元数据及组成员信息。
- **Lease**
  - **问题**：集群节点需要对某些资源有独占访问权，但节点可能出现故障或暂时断开连接，不能无限期占用资源。
  - **解决方案**：节点向 Consistent Core 请求一个有时间限制的租约，定期刷新租约。租约在所有节点上创建，但只有领导者跟踪租约超时。节点通过 HeartBeat 刷新租约时间。
  - **示例**：Google 的 Chubby 服务、Zookeeper 的会话管理、Kafka 的 KIP - 631 提案以及 etcd 都使用了类似的时间绑定租约机制，dhcp 协议也涉及租约概念。
- **State Watch**
  - **问题**：客户端需要知道服务器上特定值的变化，但持续轮询服务器会增加服务器负担，且过多连接会使服务器不堪重负。
  - **解决方案**：允许客户端向服务器注册对特定状态变化的兴趣，服务器通过单套接字通道通知客户端。服务器维护状态变化的映射，客户端发送注册请求并存储回调函数。
  - **示例**：Zookeeper 可设置节点观察，用于 Kafka 的组成员和集群成员故障检测；etcd 的观察实现用于 Kubernetes 的资源观察。
- **Gossip Dissemination**
  - **问题**：在集群中，节点需要传递元数据信息给其他节点，若所有节点两两通信会消耗大量网络带宽，且要保证信息在网络问题下也能到达所有节点。
  - **解决方案**：节点使用 Gossip 风格的通信，定期随机选择一个节点传递信息。基于流行病学模型，即使每个节点只与少数节点通信，信息也能在对数时间内传播到所有节点。同时可限制消息数量和带宽使用，并处理节点故障和网络问题。
  - **示例**：Cassandra 使用 Gossip 协议进行组成员和故障检测以及元数据传输，Consul 使用相关协议进行组成员和故障检测，同时结合 Consistent Core 存储服务目录。
- **Emergent Leader**
  - **问题**：在对等网络系统中，没有严格的领导者选举过程，但仍需要一个节点作为集群协调器处理任务，如分配数据分区和跟踪节点加入或故障。
  - **解决方案**：根据节点在集群中的“年龄”选择领导者，最老的节点作为协调器。节点通过种子节点加入集群，协调器负责处理节点加入请求、更新成员列表并发送给所有节点，同时处理节点故障和网络问题。
  - **示例**：JGroups 中最老的成员是协调器，Akka 中最老的成员决定固定分区的放置，一些内存数据网格（如 Hazelcast、Ignite）以最老的成员作为集群协调器。

### 第六部分：节点间通信模式

- **Single Socket Channel**
  - **问题**：在 Leader 和 Followers 模式中，需保证领导者和追随者之间消息的顺序，同时避免过多的新连接增加系统延迟。
  - **解决方案**：使用单个 TCP 连接（Single Socket Channel）进行通信，节点打开连接后不关闭，通过线程读写请求。使用 HeartBeat 保持连接活跃，并设置合理的连接超时。
  - **示例**：Zookeeper、Kafka 和 Raft 的参考实现都使用了 Single Socket Channel 进行通信。
- **Request Batch**
  - **问题**：当向集群节点发送大量小数据量的请求时，网络延迟和请求处理

### 思考

这些模式往往都是多个一起出现某个系统中，比如 ETCD，有实现 Lease，Leader-flower，Replace Log，Lamport Clock 等等一系列模式。

当然这也带来了学习的门槛，这本书将这些常用的分布式设计模式都剥离了出来，附加说明与伪代码，是学习分布式系统的绝佳资料。

### 附录

#### Lease 模式示例代码

```java
import java.util.concurrent.TimeUnit;

// 租约类
class Lease {
    private String name;
    private long ttl; // 租约有效期（以毫秒为单位）
    private long expiresAt;

    public Lease(String name, long ttl) {
        this.name = name;
        this.ttl = ttl;
        this.expiresAt = System.currentTimeMillis() + ttl;
    }

    public boolean isExpired() {
        return System.currentTimeMillis() >= expiresAt;
    }

    public void refresh() {
        expiresAt = System.currentTimeMillis() + ttl;
    }

    public String getName() {
        return name;
    }
}

// 租约管理器类
class LeaseManager {
    private Lease currentLease;

    public synchronized boolean acquireLease(String name, long ttl) {
        if (currentLease == null || currentLease.isExpired()) {
            currentLease = new Lease(name, ttl);
            return true;
        }
        return false;
    }

    public synchronized boolean releaseLease() {
        if (currentLease!= null) {
            currentLease = null;
            return true;
        }
        return false;
    }

    public synchronized boolean refreshLease() {
        if (currentLease!= null) {
            currentLease.refresh();
            return true;
        }
        return false;
    }

    public synchronized boolean hasLease() {
        return currentLease!= null &&!currentLease.isExpired();
    }
}

// 测试类
public class LeasePatternExample {
    public static void main(String[] args) throws InterruptedException {
        LeaseManager leaseManager = new LeaseManager();

        // 尝试获取租约
        boolean acquired = leaseManager.acquireLease("resource1", TimeUnit.SECONDS.toMillis(5));
        if (acquired) {
            System.out.println("租约获取成功");
            // 模拟使用资源
            Thread.sleep(TimeUnit.SECONDS.toMillis(3));
            // 刷新租约
            boolean refreshed = leaseManager.refreshLease();
            if (refreshed) {
                System.out.println("租约刷新成功");
            } else {
                System.out.println("租约刷新失败");
            }
            // 继续使用资源
            Thread.sleep(TimeUnit.SECONDS.toMillis(2));
            // 释放租约
            boolean released = leaseManager.releaseLease();
            if (released) {
                System.out.println("租约释放成功");
            } else {
                System.out.println("租约释放失败");
            }
        } else {
            System.out.println("租约获取失败");
        }

        // 检查是否还有租约
        boolean hasLease = leaseManager.hasLease();
        if (hasLease) {
            System.out.println("仍然持有租约");
        } else {
            System.out.println("没有租约");
        }
    }
}
```

#### Gossip 模式示例代码

```java
import java.io.IOException;
import java.net.InetAddress;
import java.net.InetSocketAddress;
import java.net.ServerSocket;
import java.net.Socket;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Random;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;

// 节点状态类
class NodeState {
    private Map<String, String> metadata = new HashMap<>();

    public void setMetadata(String key, String value) {
        metadata.put(key, value);
    }

    public String getMetadata(String key) {
        return metadata.get(key);
    }
}

// Gossip节点类
class GossipNode {
    private String nodeId;
    private InetSocketAddress address;
    private NodeState state;
    private List<InetSocketAddress> seedNodes;
    private Map<String, GossipNode> clusterNodes = new HashMap<>();
    private ExecutorService executorService = Executors.newFixedThreadPool(5);

    public GossipNode(String nodeId, InetSocketAddress address, List<InetSocketAddress> seedNodes) {
        this.nodeId = nodeId;
        this.address = address;
        this.state = new NodeState();
        this.seedNodes = seedNodes;
    }

    public void start() {
        // 首先连接种子节点并交换信息
        connectToSeedNodes();
        // 启动定期发送和接收Gossip消息的任务
        executorService.submit(this::sendGossipPeriodically);
        executorService.submit(this::receiveGossip);
    }

    private void connectToSeedNodes() {
        for (InetSocketAddress seedNode : seedNodes) {
            try {
                Socket socket = new Socket();
                socket.connect(seedNode);
                // 这里可以进行信息交换，例如发送自己的状态并接收对方的状态
                GossipMessage outgoingMessage = new GossipMessage(nodeId, state.metadata);
                GossipMessage incomingMessage = sendAndReceiveMessage(socket, outgoingMessage);
                mergeState(incomingMessage.getNodeStates());
                clusterNodes.put(incomingMessage.getNodeId(), this);
                socket.close();
            } catch (IOException e) {
                e.printStackTrace();
            }
        }
    }

    private void sendGossipPeriodically() {
        while (true) {
            try {
                Thread.sleep(5000); // 每隔5秒发送一次Gossip消息
                List<GossipNode> nodesToSend = selectRandomNodes();
                for (GossipNode node : nodesToSend) {
                    Socket socket = new Socket();
                    socket.connect(node.address);
                    GossipMessage outgoingMessage = new GossipMessage(nodeId, state.metadata);
                    GossipMessage incomingMessage = sendAndReceiveMessage(socket, outgoingMessage);
                    mergeState(incomingMessage.getNodeStates());
                    socket.close();
                }
            } catch (IOException | InterruptedException e) {
                e.printStackTrace();
            }
        }
    }

    private List<GossipNode> selectRandomNodes() {
        List<GossipNode> selectedNodes = new ArrayList<>();
        Random random = new Random();
        int numToSelect = Math.min(3, clusterNodes.size()); // 每次选择最多3个节点进行发送
        for (int i = 0; i < numToSelect; i++) {
            int index = random.nextInt(clusterNodes.size());
            GossipNode node = (GossipNode) clusterNodes.values().toArray()[index];
            if (!selectedNodes.contains(node)) {
                selectedNodes.add(node);
            }
        }
        return selectedNodes;
    }

    private void receiveGossip() {
        try (ServerSocket serverSocket = new ServerSocket(address.getPort())) {
            while (true) {
                Socket socket = serverSocket.accept();
                GossipMessage incomingMessage = receiveMessage(socket);
                GossipMessage outgoingMessage = new GossipMessage(nodeId, state.metadata);
                sendMessage(socket, outgoingMessage);
                mergeState(incomingMessage.getNodeStates());
                socket.close();
            }
        } catch (IOException e) {
            e.printStackTrace();
        }
    }

    private GossipMessage sendAndReceiveMessage(Socket socket, GossipMessage outgoingMessage) throws IOException {
        sendMessage(socket, outgoingMessage);
        return receiveMessage(socket);
    }

    private void sendMessage(Socket socket, GossipMessage message) throws IOException {
        // 这里需要实现消息的序列化和发送逻辑
        // 为了简单起见，这里只是打印消息内容
        System.out.println("发送消息: " + message);
    }

    private GossipMessage receiveMessage(Socket socket) throws IOException {
        // 这里需要实现消息的反序列化和接收逻辑
        // 为了简单起见，这里只是返回一个模拟的消息
        return new GossipMessage("node2", Map.of("key", "value"));
    }

    private void mergeState(Map<String, String> otherState) {
        for (Map.Entry<String, String> entry : otherState.entry()) {
            if (!state.metadata.containsKey(entry.getKey()) ||
                    isNewerVersion(entry.getValue(), state.metadata.get(entry.getKey()))) {
                state.setMetadata(entry.getKey(), entry.getValue());
            }
        }
    }

    private boolean isNewerVersion(String newValue, String oldValue) {
        // 这里可以根据实际情况定义版本比较逻辑
        // 为了简单起见，这里只是比较字符串长度
        return newValue.length() > oldValue.length();
    }
}

// Gossip消息类
class GossipMessage {
    private String nodeId;
    private Map<String, String> nodeStates;

    public GossipMessage(String nodeId, Map<String, String> nodeStates) {
        this.nodeId = nodeId;
        this.nodeStates = nodeStates;
    }

    public String getNodeId() {
        return nodeId;
    }

    public Map<String, String> getNodeStates() {
        return nodeStates;
    }
}

public class GossipDisseminationExample {
    public static void main(String[] args) throws IOException {
        InetSocketAddress node1Address = new InetSocketAddress(InetAddress.getLocalHost(), 8080);
        InetSocketAddress node2Address = new InetSocketAddress(InetAddress.getLocalHost(), 8081);
        List<InetSocketAddress> seedNodes = List.of(node2Address);
        GossipNode node1 = new GossipNode("node1", node1Address, seedNodes);
        GossipNode node2 = new GossipNode("node2", node2Address, seedNodes);
        node1.start();
        node2.start();
    }
}
```

#### Emergent Leader 模式示例代码

```java
import java.net.InetSocketAddress;
import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.CompletableFuture;
import java.util.concurrent.ExecutionException;
import java.util.concurrent.TimeUnit;
import java.util.concurrent.TimeoutException;

// 成员类，表示集群中的一个节点
class Member {
    private InetSocketAddress address;
    private int age;
    private boolean joined;

    public Member(InetSocketAddress address, int age) {
        this.address = address;
        this.age = age;
        this.joined = false;
    }

    public InetSocketAddress getAddress() {
        return address;
    }

    public int getAge() {
        return age;
    }

    public boolean hasJoined() {
        return joined;
    }

    public void setJoined(boolean joined) {
        this.joined = joined;
    }
}

// 成员服务类，负责管理节点的加入和集群成员信息
class MembershipService {
    private Member self;
    private List<Member> members = new ArrayList<>();
    private int maxJoinAttempts = 5;

    public MembershipService(InetSocketAddress selfAddress, int selfAge) {
        this.self = new Member(selfAddress, selfAge);
    }

    public void join(InetSocketAddress seedAddress) throws ExecutionException, InterruptedException, TimeoutException {
        if (self.getAddress().equals(seedAddress)) {
            // 如果自己是种子节点，初始化成员列表并设置自己已加入
            self.setJoined(true);
            members.add(self);
            start();
        } else {
            // 非种子节点尝试加入集群
            for (int i = 0; i < maxJoinAttempts; i++) {
                try {
                    CompletableFuture<Boolean> joinFuture = attemptJoin(seedAddress);
                    boolean joined = joinFuture.get(5, TimeUnit.SECONDS);
                    if (joined) {
                        return;
                    }
                } catch (TimeoutException e) {
                    // 加入超时，继续尝试
                }
            }
            throw new TimeoutException("无法加入集群");
        }
    }

    private CompletableFuture<Boolean> attemptJoin(InetSocketAddress seedAddress) {
        return CompletableFuture.supplyAsync(() -> {
            try {
                // 这里可以模拟与种子节点的通信，发送加入请求
                // 为了简单起见，这里直接返回是否成功加入的结果
                return seedAddress.equals(self.getAddress()) || Math.random() < 0.5;
            } catch (Exception e) {
                return false;
            }
        });
    }

    public void start() {
        // 这里可以启动一些与集群管理相关的任务，如心跳检测等
        // 为了简单起见，这里只是打印节点已加入集群的信息
        System.out.println(self.getAddress() + " 已加入集群");
    }

    public Member getCoordinator() {
        Member coordinator = null;
        for (Member member : members) {
            if (coordinator == null || member.getAge() > coordinator.getAge()) {
                coordinator = member;
            }
        }
        return coordinator;
    }

    public boolean isCoordinator(Member member) {
        return member == getCoordinator();
    }

    public void handleNodeFailure(Member failedMember) {
        members.remove(failedMember);
        if (isCoordinator(failedMember)) {
            // 如果故障节点是协调器，重新选举协调器
            Member newCoordinator = getCoordinator();
            if (newCoordinator!= null) {
                System.out.println(newCoordinator.getAddress() + " 成为新的协调器");
            }
        }
    }
}

// 集群节点类
class ClusterNode {
    private MembershipService membershipService;

    public ClusterNode(InetSocketAddress address, int age, InetSocketAddress seedAddress) throws ExecutionException, InterruptedException, TimeoutException {
        this.membershipService = new MembershipService(address, age);
        this.membershipService.join(seedAddress);
    }

    public void start() {
        membershipService.start();
    }

    public void setMembershipService(MembershipService membershipService) {
        this.membershipService = membershipService;
    }

    public MembershipService getMembershipService() {
        return membershipService;
    }
}

public class EmergentLeaderExample {
    public static void main(String[] args) throws ExecutionException, InterruptedException, TimeoutException {
        InetSocketAddress seedAddress = new InetSocketAddress("127.0.0.1", 8080);
        InetSocketAddress node1Address = new InetSocketAddress("127.0.0.1", 8081);
        InetSocketAddress node2Address = new InetSocketAddress("127.0.0.1", 8082);
        InetSocketAddress node3Address = new InetSocketAddress("127.0.0.1", 8083);

        // 创建节点并加入集群
        ClusterNode node1 = new ClusterNode(node1Address, 1, seedAddress);
        ClusterNode node2 = new ClusterNode(node2Address, 2, seedAddress);
        ClusterNode node3 = new ClusterNode(node3Address, 3, seedAddress);

        // 启动节点
        node1.start();
        node2.start();
        node3.start();

        // 模拟节点故障
        node2.getMembershipService().handleNodeFailure(node2.getMembershipService().getCoordinator());
    }
}
```

#### WAL 模式示例代码

```java
import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.ObjectOutputStream;
import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.Executors;
import java.util.concurrent.ScheduledExecutorService;
import java.util.concurrent.TimeUnit;

// Write Ahead Log条目类
class WALEntry {
    private long entryIndex;
    private Object data;

    public WALEntry(long entryIndex, Object data) {
        this.entryIndex = entryIndex;
        this.data = data;
    }

    public long getEntryIndex() {
        return entryIndex;
    }

    public Object getData() {
        return data;
    }
}

// 分段日志段类
class WALSegment {
    private List<WALEntry> entries = new ArrayList<>();
    private long baseOffset;
    private long maxLogSize;
    private File file;

    public WALSegment(long baseOffset, long maxLogSize, File file) {
        this.baseOffset = baseOffset;
        this.maxLogSize = maxLogSize;
        this.file = file;
    }

    public synchronized long writeEntry(WALEntry entry) throws IOException {
        if (entries.size() >= maxLogSize) {
            flush();
        }
        entries.add(entry);
        return baseOffset + entries.size() - 1;
    }

    public synchronized List<WALEntry> readEntries() throws IOException {
        return entries;
    }

    public synchronized void flush() throws IOException {
        try (ObjectOutputStream oos = new ObjectOutputStream(new FileOutputStream(file))) {
            oos.writeObject(entries);
        }
        entries.clear();
    }
}

// Write Ahead Log类
class WriteAheadLog {
    private List<WALSegment> segments = new ArrayList<>();
    private long currentBaseOffset = 0;
    private long maxLogSize;
    private File logDir;
    private ScheduledExecutorService cleanerExecutor;

    public WriteAheadLog(long maxLogSize, File logDir) {
        this.maxLogSize = maxLogSize;
        this.logDir = logDir;
        this.cleanerExecutor = Executors.newSingleThreadScheduledExecutor();
        // 启动低水位标记清理任务
        cleanerExecutor.scheduleAtFixedRate(this::cleanLogs, 0, 1, TimeUnit.HOURS);
    }

    public synchronized long writeEntry(WALEntry entry) throws IOException {
        WALSegment currentSegment = getCurrentSegment();
        return currentSegment.writeEntry(entry);
    }

    public synchronized List<WALEntry> readAll() throws IOException {
        List<WALEntry> allEntries = new ArrayList<>();
        for (WALSegment segment : segments) {
            allEntries.addAll(segment.readEntries());
        }
        return allEntries;
    }

    private WALSegment getCurrentSegment() throws IOException {
        if (segments.isEmpty() || segments.get(segments.size() - 1).entries.size() >= maxLogSize) {
            File newFile = new File(logDir, "segment_" + currentBaseOffset + ".log");
            WALSegment newSegment = new WALSegment(currentBaseOffset, maxLogSize, newFile);
            segments.add(newSegment);
            currentBaseOffset += maxLogSize;
        }
        return segments.get(segments.size() - 1);
    }

    // 低水位标记清理方法
    private void cleanLogs() {
        // 这里可以根据具体的低水位标记逻辑来确定哪些日志段可以被清理
        // 为了简单起见，这里只是删除最早的一个日志段
        if (!segments.isEmpty()) {
            WALSegment segmentToDelete = segments.remove(0);
            File fileToDelete = segmentToDelete.file;
            if (fileToDelete.exists()) {
                fileToDelete.delete();
            }
        }
    }

    public void close() {
        cleanerExecutor.shutdown();
        try {
            for (WALSegment segment : segments) {
                segment.flush();
            }
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
}

// 测试类
public class WriteAheadLogExample {
    public static void main(String[] args) throws IOException, InterruptedException {
        File logDir = new File("logs");
        if (!logDir.exists()) {
            logDir.mkdirs();
        }
        WriteAheadLog wal = new WriteAheadLog(10, logDir);

        // 写入一些日志条目
        for (int i = 0; i < 30; i++) {
            WALEntry entry = new WALEntry(i, "Data " + i);
            wal.writeEntry(entry);
        }

        // 读取所有日志条目并打印
        List<WALEntry> allEntries = wal.readAll();
        for (WALEntry entry : allEntries) {
            System.out.println("Index: " + entry.getEntryIndex() + ", Data: " + entry.getData());
        }

        // 等待一段时间，让清理任务执行
        Thread.sleep(TimeUnit.HOURS.toMillis(2));

        wal.close();
    }
}
```

### 参考资料

- [分布式系统模式](https://pedrogao.github.io/patterns-of-distributed-systems/)
