---
icon: edit
title: go pool 池化学习、实践总结
date: 2022-02-28
tag:
  - go
  - pool
category:
  - go
---

# go pool 池化学习、实践总结

## 概述

最近在业务性能优化过程中，大量使用到了 pool 池化、缓存等技术。在用 pool 的时候一知半解  
地怼了上去，待上线过后就得抽时间系统学习、总结一下，于是就有了这篇文章。

首先，我们从一个场景出发，在一个简单的 http 接口服务中，如下：

```go
func handleV1(writer http.ResponseWriter, req *http.Request) {
	var (
		err  error
		data []byte
	)
    // ....
	data, err = ioutil.ReadAll(req.Body)
	if err != nil {
		return
	}
	// ...... json.Unmarshal 之类的
}
```

都避免不了从请求体中读取数据，然后将其解析为 json 处理。每次服务收到请求调用 `handleV1`函数  
都避免不了在堆中(如果数据量很小，可能在栈中)开辟新的 `data []byte` 数据，而 `data` 数据在  
请求完毕后就成为了垃圾数据待回收。

在并发量、请求体都很大的情况下，内存就会迅速被占满，从而无法开启新的内存接受新的请求。

一般遇到这种内存大量开辟且迅速消亡的场景，做性能优化的时，可以采用对象池的方式，  
把不用的对象回收起来，避免被垃圾回收掉，这样使用的时候就不必重新创建。

类似的情况还有：数据库连接、TCP 长连接、HTTP 客户端连接等，这些连接在创建的时候是一个非常耗时的操作。

如果每次都创建一个新的连接对象，耗时较长，很可能整个业务的大部分耗时都花在了创建连接上。  
如果把这些连接保存下来，避免每次使用的时候都重新创建，不仅可以减少业务的耗时，还能提高应用程序的整体性能。

## Go pool

Go 标准库中提供了一个通用的 pool 数据结构，也就是 sync.Pool，来帮助我们来处理这类问题。

但，Go pool 也有不适合的场景，它池化的对象可能会被垃圾回收掉，  
这对于数据库长连接等场景是不合适的，因此我们可以使用其它的池化方式，  
后面我们再来谈这个。

sync.Pool 用来保存一组可独立访问的**临时**对象。

注意这里的“临时”这两个字，它说明 pool 中的对象可能会被垃圾回收(GC)给干掉。

pool 可以有效地减少新对象的申请，提升内存的应用效率，所以 Go 标准库也用到了 pool。  
在 fmt 包中，使用了一个动态大小的 buffer 池做输出缓存，当大量的 goroutine 并发输出的时候，  
就会创建比较多的 buffer，并且在不需要的时候回收掉。

pool 有两个重要的知识点：

- pool 本身就是线程安全的，多个 goroutine 可以并发地调用它的方法存取对象；
- pool 不可在使用之后再复制使用，内嵌了 `noCopy` 结构体，`go vet` 时检查。

另外，pool API 非常易用，对外提供了三个方法，分别是 `New`，`Put` 和 `Get`。

- New：struct Pool 包含了一个 New 字段，这个字段的类型是函数 func() interface{}。  
  当调用 pool 的 Get 方法从池中获取元素，没有更多的空闲元素可返回时，就会调用这个 New 方法来创建新的元素。  
  如果没有设置 New 字段，没有更多的空闲元素可返回时，Get 方法将返回 nil，表明当前没有可用的元素。
- Get：调用该方法，就会从 pool 取走一个元素，该元素会从 pool 中移除，返回给调用者。  
  不过，除了返回值是正常实例化的元素，Get 方法的返回值还可能会是一个 nil(Pool.New 字段没有设置，又没有空闲元素可以返回)，  
  所以在使用的时候，可能需要判断。
- Put：将一个元素返还给 pool，pool 会把这个元素保存到池中(内部队列)，并且可以复用。  
  但如果 Put 一个 nil 值，Pool 就会忽略这个值。

## 缓存池 bufferPool

回到刚才的业务场景上，字节切片(byte slice) data 被频繁创建然后销毁，  
浪费了大量内存。我们使用 pool 来优化这些场景，如下：

```go
var bufferPool = sync.Pool{
    New: func() interface{} {
        return new(bytes.Buffer)
    },
}

func GetBuffer() *bytes.Buffer {
    return bufferPool.Get().(*bytes.Buffer)
}

func PutBuffer(buf *bytes.Buffer) {
    buf.Reset()
    bufferPool.Put(buf)
}
```

1. 定义 `bufferPool` 缓存池，`New` 函数用于返回一个新的 `bytes.Buffer`；
2. `GetBuffer` 返回池中一个 Buffer；
3. `PutBuffer` 将 Buffer 重新放入池中。

这样就达到了对象重复利用的效果，减少了非必要内存的分配。pool 的使用就是这么简单，  
当然，对于 http 请求来说，如果请求体的大小是可预测的，完全可以在`New`的时候预分配  
足够的切片容量，即：

```go
var bufferPool = sync.Pool{
    New: func() interface{} {
        return bytes.NewBuffer(make([]byte, 0, 20*1024)) // 20KB
    },
}
```

但是这段代码是有问题的，它会产生内存泄漏。产生内存泄漏的原因在于 pool 的具体实现(可以自行 Google)，  
pool 中的对象通过自定义 GC 函数`poolCleanup`来实现回收，该函数在一次 GC 时  
不会将对象直接 GC 掉，而是移动到 `victim` 队列中，下次还是可以使用，但两次 GC 之后就被回收了。

为什么会有内存浪费、内存泄漏(样例见附录 Pool 内存泄漏样例)：

1. Get 方法从队列中取元素，本质上是随机的；
2. 如果缓存了很大的[]byte，比如 256MB，那么 pool 占据了很大的内存容量；
3. 如果后续 Get 方法取出了 256MB 的[]byte，但实际上只使用了 1KB 的小内存，就会浪费大量的内存；
4. 由于 pool 的 GC 机制，一次 GC 并不会直接回收，所以就会有大量的大内存切片在队列中，  
   只有下次 GC 才能回收，就会导致内存泄漏。

Go fmt 包中，也踩了这个坑，而修复方法也很简单，当判断回收切片内存过大时，直接丢弃，不再  
进入池中：

```go
func PutBuffer(buf *bytes.Buffer) {
    if buf.Cap() > 2*1024*1024 {
       return
    }
    buf.Reset()
    bufferPool.Put(buf)
}
```

总而言之，标准库中的 pool 是不够好用的，因此有很多三方库来解决这些问题，  
比如[bucketpool](https://github.com/vitessio/vitess/blob/main/go/bucketpool/bucketpool.go)  
提供了多层级的 pool 实现，按照输入的尺寸大小来返回合适的 pool：

```go
// Get returns pointer to []byte which has len size.
// If there is no bucket with buffers >= size, slice will be allocated.
func (p *Pool) Get(size int) *[]byte {
	sp := p.findPool(size)
	if sp == nil {
		return makeSlicePointer(size)
	}
	buf := sp.pool.Get().(*[]byte)
	*buf = (*buf)[:size]
	return buf
}
```

## 连接池 connPool

对于连接池而言，sync.Pool 自然就不再适用了，连接池的作用就在于能够一直保持连接，  
在需要使用的时候无需再次创建、握手、认证，省掉了一系列的步骤，就能直接使用。

连接池在 Go 的标准库中，也在大量使用。比如 http.Client 就通过 `map` 缓存了一定  
数量的 http 连接，如下：

```go
type Transport struct {
	idleMu       sync.Mutex
	closeIdle    bool                                // user has requested to close all idle conns
	idleConn     map[connectMethodKey][]*persistConn // most recently used at end
	idleConnWait map[connectMethodKey]wantConnQueue  // waiting getConns
	idleLRU      connLRU

	reqMu       sync.Mutex
	reqCanceler map[cancelKey]func(error)
	// ...
}
```

在 sql.DB 中，Go 也提供了一个通用的数据库连接池：

```go
type DB struct {
	// Atomic access only. At top of struct to prevent mis-alignment
	// on 32-bit platforms. Of type time.Duration.
	waitDuration int64 // Total time waited for new connections.

	connector driver.Connector
	// numClosed is an atomic counter which represents a total number of
	// closed connections. Stmt.openStmt checks it before cleaning closed
	// connections in Stmt.css.
	numClosed uint64

	mu           sync.Mutex    // protects following fields
	freeConn     []*driverConn // free connections ordered by returnedAt oldest to newest
	connRequests map[uint64]chan connRequest
	// ...
}
```

`freeConn` 字段用来缓存数据库连接，当需要访问数据的时候，拿来即用，另外还提供了  
API 来设置空闲连接数的大小：

```go
func (db *DB) SetMaxIdleConns(n int);
func (db *DB) SetMaxOpenConns(n int);
// ...so on
```

另外还有一些连接使用的是 TCP 协议，这就需要三方库的支持了，比如[fatih/pool](https://github.com/fatih/pool)  
就是一种 TCP 连接池的实现，不过它的实现略有不同，采用 channel 来缓存连接：

```go
// PoolConn is a wrapper around net.Conn to modify the the behavior of
// net.Conn's Close() method.
type PoolConn struct {
	net.Conn
	mu       sync.RWMutex
	c        *channelPool
	unusable bool
}
```

连接池的使用太频繁，以至于很多人都忘记了它的存在。

## 协程池 goroutinePool

熟悉其它语言的同学肯定知道，在业务中会大量地使用`线程池`，但是 Go 将线程完美的封装了起来，  
并提供了 go 关键字来直接开辟协程，虽然协程相对轻量，开启几万个乃至十万个都没啥问题，但每次  
请求来时开启协程，请求完后协程又得回收，这也是一种协程资源的浪费。

并且，如此大量的协程的创建也给调度器带来了极大的压力，因此参考线程池的使用方式，我们也可以  
来使用协程池。

[ants](https://github.com/panjf2000/ants) 是三方的一个高性能、低损耗的 goroutine 池库，  
提供了简单易用的 API，如下：

```go
// Set 10000 the size of goroutine pool
p, _ := ants.NewPool(10000)
p.Submit(func(){})
```

协程池最多只能有 10000 个 goroutine，当提交的任务过多则会新建 goroutine，  
当有大量 goroutine 空闲时，pool 会释放掉一批 goroutine 来保证内存。

关于 goroutine pool 的实现，ants
的作者有一篇介绍其实现的[文章](https://strikefreedom.top/high-performance-implementation-of-goroutine-pool)，  
感兴趣的同学可以参考参考。

当然 goroutine pool 的实现还有很多，它们特性各异，各有优缺点，可以选择适合自己业务的来使用。

比如：

- gammazero/workerpool：可以无限制地提交任务，提供了更便利的 Submit 和 SubmitWait 方法提交任务，  
  还可以提供当前的 worker 数和任务数以及关闭 Pool 的功能。
- ivpusic/grpool：提供 Worker 的数量和等待执行的任务的最大数量，任务的提交是直接往 Channel 放入任务。
- dpaks/goworkers：提供了更便利的 Submit 方法提交任务以及 Worker 数、任务数等查询方法、关闭 Pool 的方法。
- so on...

## 总结

至此，关于在 Go 中，池化的三种方式均以介绍完毕。

池化几乎可以作为性能、内存优化方案中最常见的一种了，希望下次遇到性能问题时，  
我们都能够精准感知系统已有的池化方案，并能在新的地方使用合适的池化方案。

## 参考资料

- https://github.com/fatih/pool
- https://www.cnblogs.com/qcrao-2018/p/12736031.html
- https://colobu.com/2019/10/08/how-is-sync-Pool-improved-in-Go-1-13/
- https://marksuper.xyz/2021/09/02/sync_pool/
- https://github.com/panjf2000/ants
- https://strikefreedom.top/high-performance-implementation-of-goroutine-pool

## 附录

### Pool 内存泄漏样例

```go
pool := sync.Pool{New: func() interface{} { return new(bytes.Buffer) }}

processRequest := func(size int) {
    b := pool.Get().(*bytes.Buffer)    // Get 从队列里面拿，实际上是随机的
    time.Sleep(500 * time.Millisecond) // Simulate processing time
    b.Grow(size)                       // 扩容后再put

    fmt.Printf("buffer size: %d, cap: %d\n", b.Len(), b.Cap())
    fmt.Printf("address of buffer %p\n", b)

    pool.Put(b)
    time.Sleep(1 * time.Millisecond) // Simulate idle time
}

// Simulate a set of initial large writes.
for i := 0; i < 10; i++ {
    go func() {
        processRequest(1 << 28) // 256MiB
    }()
}

time.Sleep(time.Second) // Let the initial set finish

// Simulate an un-ending series of small writes.
for i := 0; i < 10; i++ {
    go func() {
        for {
            processRequest(1 << 10) // 1KiB
        }
    }()
}

// Continually run a GC and track the allocated bytes.
// 40 Cycles 才被完全 free
var stats runtime.MemStats
for i := 0; ; i++ {
    runtime.ReadMemStats(&stats)
    fmt.Printf("Cycle %d: %dMB\n", i, stats.Alloc/(1024*1024))
    time.Sleep(time.Second)
    runtime.GC()
}
```
