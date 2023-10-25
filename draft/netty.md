---
icon: edit
title: Netty 学习要点
date: 2023-10-25
tag:
  - netty
category:
  - netty
---

## TOC

- Reactor 模型
- EventLoop、EventLoopGroup，Channel，NioChannel，ChannelPipieline 基本架构
- HashedWheelTimer
- FastThreadLocal
- 对象池
- 内存分配
- 弱引用，内存泄露检测

1. Java NIO 空轮训 BUG，在没有任何事件触发的情况下，仍然会不断触发监听程序导致空轮训，CPU 爆炸；Netty 的解决方案是，检测空轮训触发次数，空轮训触发次数超过 512 时，直接重建 selector。
2. HashedWheelTimer 核心概念，槽，刻度，秒、分、小时分开；
3. FastThreadLocal 重建了 ThreadLocal 体系，核心优化点是，原生 ThreadLocal 使用 Map 存储局部变量，每次会计算 Hash 值，而 FastThreadLocal 使用数组+索引来获取变量，加快了读取过程（老实说，有点过度设计）；
4. 对象池，对象复用，FastThreadLocal 线程局部复用，获取回收线程安全；
5. 内存分配，管理堆外内存，核心还是链表、内存池，类似 TCMalloc；
6. 内存泄露，堆内存一般不会发生泄露，使用弱引用队列，回收引用的内存；
