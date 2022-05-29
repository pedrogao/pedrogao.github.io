---
icon: edit
title: go 泛型尝鲜，实现一个流式处理库
date: 2022-02-28
tag:
  - go
  - generics
category:
  - go
---

# go 泛型尝鲜，实现一个流式处理库

## 背景

熟悉 Java、Rust 的同学，肯定都非常喜欢其 Stream API，以 Java 为例，筛选一个简单的数字列表，可以有如下实现：

```java
boolean ok = Stream.of(1, 2, 3, 4, 5).
            map(item -> item + 100).
            filter(item -> item > 102).
            allMatch(item -> item > 102);
```

[Stream](https://docs.oracle.com/javase/8/docs/api/java/util/stream/Stream.html) API 能让我们以链式调用和
函数式编程的方式来处理数据，数据在函数之间流转、映射，最后汇总得到结果。

Stream 是流式处理的一种实现，Stream 是数据的通道，简称数据流，数据流进入(无状态)函数后，返回一个新的数据流。

而在 Go 中，目前标准库是没有提供相关的实现，既眼馋于 Stream API 的易用与炫酷，又恰逢 Go 泛型的即将发布(go1.18 发布)，  
想着将二者结合，体验一把 Go 泛型，于是就有了这篇文章。

我们的目标很明确，使用 Go 泛型实现一个流式处理库，实现后的效果如下：

```go
ok := stream.Just(1, 2, 3, 4, 5).
    Concat(stream.Just(6, 9, 10)).
    Map(func (item int) int {
        return item + 100
    }).
    Filter(func (item int) bool {
        return item > 105
    }).
    Sort(func (a, b int) bool {
        return a > b
    }).
    AllMatch(func (item int) bool {
        return item > 105
    })
```

下面，就来实现它吧。

## 泛型

泛型是 Go 近几年最大的一次变动，考虑到很多同学对其不熟悉，这里会先介绍一下 Go 泛型，如果你对 Go 泛型非常了解，可以跳过。

### 泛型样例 1

在 Go 中，对于一个加法函数：

```go
func add(a, b int) int {
	return a + b
}
```

由于 Go 是强类型语言，因此在编译器就必须确定 a，b 的类型，一旦确定 a，b 是`int`类型后，就无法改变其类型。

因此，函数 `add` 就只能用于 `int` 类型数据的加法，如果此时还需要一个用于浮点数的加法函数，  
那么就只能新写一个函数了：

```go
// Bad
func add(a, b float64) float64 {
	return a + b
}
```

而 Go 本身是不支持函数重载的，因此两个 add 函数重名，是不能编译通过的，所以我们需要更改函数名：

```go
func addi(a, b int) int {
	return a + b
}

func addf(a, b float64) float64 {
	return a + b
}
```

如果再新增一个用于 `complex64` 加法函数，就需要再写一个相同功能的函数，而这些函数除了数据类型不同，其它的逻辑却一样。

在 Go1.18 之前，对于这些重复的逻辑，我们可以通过 `interface{}` 和反射来将其提取为一个函数，如下：

```go
// Bad, need to be improved
func add(a, b interface{}) interface{} {
	typ := reflect.TypeOf(a)
	if typ.Kind() == reflect.Int {
		return a.(int) + b.(int)
	} else {
		// TODO
	}
	return nil
}
```

虽然这样可以传入任意类型的参数，但是却给程序的安全性和可维护性带来了问题，并且每次都需要类型断言，给函数使用带来的麻烦。

而在 Go1.18 引入了泛型后，我们可以实现泛型来解决这个问题：

```go
func add[T int | float64](a, b T) T {
	return a + b
}
```

函数 add 的参数 a，b 类型为`T`，而`T`并不是一个固定的类型，它既可以为`int`类型， 也可以为`float64`类型，因此将其称为泛型。

有了泛型`T`后，函数 add 只需定义一次，就可以接受两种类型的参数，并且完成加法，  
而如果需要再支持一个新类型，也只需给`T`添加一个新的类型约束即可：

```go
func add[T int | float64 | complex64](a, b T) T {
	return a + b
}
```

考虑到，如果`T`的类型约束过多，那么写在函数上面也不太好看，因此 Go 支持我们将泛型定义为接口再使用，如下：

```go
// main.go
type Addable interface {
	int | int64 | int32 | float64 | float32 | string
}

func add[T Addable](a, b T) T {
	return a + b
}
```

这样，泛型`T`就能支持 6 种类型的加法，而无需为每种类型都写一个 add 函数。

### 泛型原理

那么泛型`T`是如何实现支持多种数据类型的呢？

使用反汇编工具来查看一下生成的汇编代码：

```sh
$ go tool compile -N -l -S ./main.go
$ go tool objdump ./main.o
```

对应的汇编代码如下(截取部分)：

```s
TEXT "".add[go.shape.int_0](SB) gofile../add/main.go
  main.go:11            SUBQ $0x10, SP
  main.go:11            MOVQ BP, 0x8(SP)
  main.go:11            LEAQ 0x8(SP), BP
  main.go:11            MOVQ AX, 0x18(SP)
  main.go:11            MOVQ BX, 0x20(SP)
  main.go:11            MOVQ CX, 0x28(SP)
  main.go:11            MOVQ $0x0, 0(SP)
  main.go:12            MOVQ 0x20(SP), AX
  main.go:12            ADDQ 0x28(SP), AX
  main.go:12            MOVQ AX, 0(SP)
  main.go:12            MOVQ 0x8(SP), BP
  main.go:12            ADDQ $0x10, SP
  main.go:12            RET

TEXT "".add[go.shape.float64_0](SB) gofile../add/main.go
  main.go:11            SUBQ $0x10, SP
  main.go:11            MOVQ BP, 0x8(SP)
  main.go:11            LEAQ 0x8(SP), BP
  main.go:11            MOVQ AX, 0x18(SP)
  main.go:11            MOVSD_XMM X0, 0x20(SP)
  main.go:11            MOVSD_XMM X1, 0x28(SP)
  main.go:11            XORPS X1, X1
  main.go:11            MOVSD_XMM X1, 0(SP)
  main.go:12            MOVSD_XMM 0x20(SP), X0
  main.go:12            ADDSD 0x28(SP), X0
  main.go:12            MOVSD_XMM X0, 0(SP)
  main.go:12            MOVQ 0x8(SP), BP
  main.go:12            ADDQ $0x10, SP
  main.go:12            RET
```

从汇编代码上可以看到，Go add 函数被编译成了多个 `add[go.shape.xxx]` 函数，不同类型  
对应的着不同的指令实现，如 `int_0` 是 `int` 的函数实现，通过 `ADDQ` 指令来实现加法,  
而 `float64_0` 通过 `ADDSD` 指令来实现加法。

Go 泛型可以理解为：编译器帮忙写不同类型的实现代码，编译器通过泛型定义来生成不同的指令实现。

### 泛型样例 2

下面，来看一个稍微复杂一点的泛型样例。在正式的流式处理实现之前，我们先来看看 Map、Filter 函数的泛型是如何实现的？

首先，给出类型定义：

```go
type (
	Item interface {
		comparable
	}
	// FilterFunc 筛选函数
	FilterFunc[T Item] func(T) bool
	// MapFunc 数据映射函数
	MapFunc[T Item, R Item] func(item T) R
)
```

此处定义了三个类型，`Item`接口，作为泛型约束，内部实际是一个 `comparable` 类型。

comparable 是 Go1.18 后新加入至标准库的内置类型：

> comparable is an interface that is implemented by all comparable types,
> (booleans, numbers, strings, pointers, channels, interfaces, arrays of comparable types,
> structs whose fields are all comparable types).

`FilterFunc`函数类型用于过滤数据，该函数有一个泛型参数，即 `T`，泛型约束则是 `Item`，代表着 FilterFunc 可以接受一切实现了 comparable 的参数。

`MapFunc`函数类型用于数据映射，该函数拥有两个泛型参数，即`T`和`R`，泛型约束均为`Item`，所以 MapFunc 可以接受一个类型的参数，  
但返回另一个类型的结果，但这两个类型均需实现 comparable 接口。

有了 FilterFunc 和 MapFunc 函数类型后，我们还需实现对应的函数来使用它们，如下：

```go
func Map[T Item, R Item](a []T, m MapFunc[T, R]) []R {
	var n []R
	for _, e := range a {
		v := m(e)
		n = append(n, v)
	}
	return n
}

func Filter[T Item](a []T, f FilterFunc[T]) []T {
	var n []T
	for _, e := range a {
		if f(e) {
			n = append(n, e)
		}
	}
	return n
}
```

有了泛型后，`Map`和`Filter`函数的实现可以说是既简洁又明确。对于 Map 函数，接受两个参数，分别是数据切片`a`和 MapFunc `m`，  
函数内部使用 range 得到每个元素后调用 m 函数得到新的元素，最后将其 append 到新的切片返回即可。

Filter 函数实现类似，就不做过多介绍了。

有了 Map 和 Filter 两个函数就，我们可以实现简单的数据过滤和映射。如下：

1. `vi`是一个简单的整数切片；
2. `vi`通过 Filter 函数会过滤掉>=4 的数字;
3. 然后`vi`会通过 Map 函数得到最后的 float 切片;
4. 输出最后的结果。

```go
// main.go
func main() {
	vi := []int{1, 2, 3, 4, 5, 6}

	vi = Filter(vi, func(v int) bool {
		return v < 4
	})

	bi := Map(vi, func(v int) float32 {
		return float32(v) + 100.01
	})
	fmt.Println(bi)
}
// output: [101.01 102.01 103.01]
```

在这个例子中，可以清晰的看到泛型的作用。因为泛型的存在，使 Map 和 Filter 函数足够简单，每当需要新的类型支持时，  
不用去兼容老的代码逻辑，而是直接在调用时指定泛型参数的类型即可。

## Stream 设计

在对 Go 泛型和函数式编程有了一定了解后，我们再来看看如何设计和实现 Stream。流式处理与工厂中的流水线作业非常类似，可以  
将其拆解为如下三个阶段：

1. 创建阶段：获取原始数据；
2. 加工阶段：数据处理、映射；
3. 汇总阶段：得到数据处理后的结果。

### 创建阶段

按照这三个阶段来设计 Stream 的 API。首先是创建阶段，即 Stream 的构造函数：

```go
// Stream computing
Stream[T Item] struct {
    source <-chan T // 只读 channel，不能写
}

func Range[T Item](source <-chan T) Stream[T]

func Just[T Item](items ...T) Stream[T]

func From[T Item](generate GenerateFunc[T]) Stream[T]

func (s Stream[T]) Concat(steams ...Stream[T]) Stream[T]
```

为了支持链式调用，将 Stream 定义为一个结构体，Stream 有一个泛型参数，用于编译时指定  
数据流的类型；Stream 内部通过 `source` 字段来存储数据流。

提供了 Range、Just、From、Concat 四个函数来初始化、合并数据流：

- Range：通过 channel 来初始化 Stream；
- Just：通过切片来初始化；
- From：通过生成函数来初始化；
- Concat：通过 Stream 拼接得到新的 Stream。

### 加工阶段

数据处理映射阶段可以定义出非常复杂和丰富的 API，这里只给出部分的定义：

```go
func (s Stream[T]) Distinct(keyFunc KeyFunc[T, T]) Stream[T]

func (s Stream[T]) Filter(filterFunc FilterFunc[T], opts ...Option) Stream[T]

func (s Stream[T]) Walk(fn WalkFunc[T, T], opts ...Option) Stream[T]

func (s Stream[T]) Head(n int64) Stream[T]

func (s Stream[T]) Tail(n int64) Stream[T]

func (s Stream[T]) Map(fn MapFunc[T, T], opts ...Option) Stream[T]

func (s Stream[T]) Sort(fn LessFunc[T]) Stream[T]
```

数据处理不会停止流，而是彼此组合，越丰富的 API 越拥有强大的数据处理能力。

其对应的功能分别如下：

- Distinct：数据去重；
- Filter：数据过滤；
- Walk：数据遍历；
- Head：截取流头部数据；
- Tail：截取流尾部数据：
- Map：数据映射；
- Sort：数据排序。

### 汇总阶段

数据流经处理后，可由汇总函数得到最后的处理结果，汇总函数调用后，流处理就会终止。

其部分 API 定义如下：

```go
func (s Stream[T]) AllMatch(fn PredicateFunc[T]) bool

func (s Stream[T]) AnyMatch(fn PredicateFunc[T]) bool

func (s Stream[T]) NoneMatch(fn func(item T) bool) bool

func (s Stream[T]) Count() int

func (s Stream[T]) ForAll(fn ForAllFunc[T])

func (s Stream[T]) ForEach(fn ForEachFunc[T])
```

汇总函数不会再返回新的数据流，而是一个处理结果：

- AllMatch：每个数据项均需满足条件后返回结果；
- AnyMatch：任何一个数据项需满足条件后返回结果；
- NoneMatch：无任何数据项需满足条件后返回结果；
- Count：得到数据项总数；
- ForAll：对整个数据流执行操作；
- ForEach：对数据流中的每一项都执行操作。

## Stream 实现

在设计完备的基础上，借助 Go channel 和泛型的强大能力，我们能够非常方便的实现 Stream。

这里只给出部分 API 的实现，其它基本类似。

### 创建阶段

以 `Range` 函数为例：

```go
func Range[T Item](source <-chan T) Stream[T] {
	return Stream[T]{
		source: source,
	}
}
```

Range 函数实则是一个简单的构造函数，从参数读取 source 后赋值给 Stream 返回即可。

对于稍微复杂一点的 `Concat` 函数：

```go
func (s Stream[T]) Concat(steams ...Stream[T]) Stream[T] {
	// 创建新的无缓冲channel
	source := make(chan T)
	go func() {
		// 创建一个waiGroup对象
		group := task.NewRoutineGroup()
		// 异步从原channel读取数据
		group.Run(func() {
			for item := range s.source {
				source <- item
			}
		})
		// 异步读取待拼接Stream的channel数据
		for _, stream := range steams {
			// 每个Stream开启一个协程
			group.Run(func() {
				for item := range stream.channel() {
					source <- item
				}
			})
		}
		// 阻塞等待读取完成
		group.Wait()
		close(source)
	}()
	// 返回新的Stream
	return Range[T](source)
}
```

Concat 函数会拼接多个流的数据，然后汇总到 source 通道中，最后返回。

### 加工阶段

数据处理函数是实现的一个难点，以 `Distinct` 为例：

```go
// Distinct 去重，使用 map 来实现去重
func (s Stream[T]) Distinct(keyFunc KeyFunc[T, T]) Stream[T] {
	source := make(chan T)
	common.GoSafe(func() { // 新建协程写数据
		// channel记得关闭是个好习惯
		defer close(source)
		keys := make(map[T]common.PlaceholderType)

		for item := range s.source {
			// 自定义去重逻辑
			key := keyFunc(item) // 这里的key类型是R
			// 如果key不存在,则将数据写入新的channel
			if _, ok := keys[key]; !ok {
				source <- item
				keys[key] = common.Placeholder
			}
		}
	})
	return Range[T](source)
}
```

Distinct 函数的核心在于去重，这里我们借助 map 来混存数据映射关系，以数据项作为 key，  
去掉重复的 key 从而达到去重的效果。

对于 `Tail` 函数，由于 channel 的特性，我们必须遍历完 channel 才能得到最后的几项，因此  
我们可以借助环形切片来实现：

```go
func (s Stream[T]) Tail(n int64) Stream[T] {
	if n < 1 {
		panic("n must be greater than 1")
	}
	source := make(chan T)
	go func() {
		ring := collection.NewRing[T](int(n))
		// 读取全部元素，如果数量>n环形切片能实现新数据覆盖旧数据
		// 保证获取到的一定最后n个元素
		for item := range s.source {
			ring.Add(item)
		}
		for _, item := range ring.Take() {
			source <- item
		}
		close(source)
	}()
	return Range[T](source)
}
```

`Ring`是一个带有固定缓存池的环形切片，它只能保存固定`n`个数据项，我们依次遍历 source  
并向 Ring 中添加，待遍历完毕后，就能得到最后的 n 个数据。

而 `Head` 函数就比较简单了，只需遍历 n 次停止即可，这里就不做过多介绍了。

### 汇总阶段

在数据汇总阶段，实则是对数据流的一个检查与判断，以`AnyMatch`为例：

```go
func (s Stream[T]) AnyMatch(fn PredicateFunc[T]) bool {
	for item := range s.source {
		if fn(item) {
			// 需要排空 s.source，否则前面的goroutine可能阻塞
			go drain(s.source)
			return true
		}
	}

	return false
}
```

`AnyMatch`接受一个断言函数`fn`，在遍历 source 的时候，只需一个满足条件的项出现，就能立马返回 true。

`AllMatch`与`NoneMatch`与之类似，内部处理逻辑稍有不同。

而对于`ForEach`、`Count`就必须全部遍历，并对每一个数据项进行处理：

```go
func (s Stream[T]) ForEach(fn ForEachFunc[T]) {
	for item := range s.source {
		fn(item)
	}
}

func (s Stream[T]) Count() int {
	var count int
	for range s.source {
		count++
	}
	return count
}
```

ForEach 接受一个 fn 参数，用于对每一个数据项处理，而 Count 函数只需增加数据项的总数返回即可。

## 总结

完成 Stream 后，就能方便的使用 Stream API 对数据进行处理与检查，如下：

```go
// main.go

func main() {
	ok := stream.Just(1, 2, 3, 4, 5).
		Concat(stream.Just(6, 9, 10)).
		Map(func(item int) int {
			return item + 100
		}).
		Filter(func(item int) bool {
			return item > 105
		}).
		Sort(func(a, b int) bool {
			return a > b
		}).
		AllMatch(func(item int) bool {
			return item > 105
		})
	fmt.Println(ok)
}

// output: true
```

Stream 处理数据优雅又易读，在有了泛型后，就无需过多关系数据类型的问题，相较于使用 for range 的  
语法来处理数据流，Stream 无疑更加合适。

而在整个设计、实现的过程中，借助 channel 和泛型是颇为简单的，当然前提是你得对数据结构有一定的理解，  
上面我们就借助哈希表和环形切片来快速实现了数据去重、数据尾项等功能。

至此，一个基于泛型的流式处理库已实现完毕，当然这个库只能称为 tiny Stream，因为 Stream API 实则非常丰富，  
比如我们未涉及到的 Reduce 等，这就待我们后续去实践和完善了。

## 参考资料

- https://docs.oracle.com/javase/8/docs/api/java/util/stream/Stream.html
- https://mp.weixin.qq.com/s/ocI6TWGI9f5c11uAKBumew
- https://mp.weixin.qq.com/s/t3INtSfFSmv-nsJqLmdPew
- https://github.com/zeromicro/go-zero
- https://github.com/akutz/go-generics-the-hard-way
- https://github.com/mattn/go-generics-example
- https://github.com/zyedidia/generic
- https://github.com/golang/go
