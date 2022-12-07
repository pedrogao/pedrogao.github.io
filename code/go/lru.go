package main

import (
	"container/list"
	"fmt"
)

type LURCache struct {
	record map[int]*list.Element
	list   *list.List
	cap    int
}

type item struct {
	key, val int
}

func New(cap int) *LURCache {
	return &LURCache{
		record: map[int]*list.Element{},
		list:   list.New(),
		cap:    cap,
	}
}

func (c *LURCache) Put(key, val int) {
	// 存在
	ele, ok := c.record[key]
	if ok {
		// 无需考虑淘汰
		item := ele.Value.(*item)
		item.val = val
		c.list.MoveToFront(ele)
	} else {
		// 淘汰
		if len(c.record)+1 > c.cap {
			back := c.list.Back()
			iter := back.Value.(*item)
			delete(c.record, iter.key)
			c.list.Remove(back)
		}
		it := &item{
			key: key,
			val: val,
		}
		el := c.list.PushFront(it)
		c.record[key] = el
	}
}

func (c *LURCache) Get(key int) int {
	ele, ok := c.record[key]
	if !ok {
		return -1
	}
	// 无需考虑淘汰
	item := ele.Value.(*item)
	// item 新访问 list front
	c.list.MoveToFront(ele)
	return item.val
}

func main() {
	cache := New(2)
	cache.Put(1, 2)
	cache.Put(2, 3)
	fmt.Println(cache.Get(1))
	fmt.Println(cache.Get(2))
	cache.Put(3, 4)
	fmt.Println(cache.Get(1))
	fmt.Println(cache.Get(2))
	fmt.Println(cache.Get(3))
}
