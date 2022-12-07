package main

import (
	"fmt"
	"sync/atomic"
)

type WaitGroup struct {
	ch    chan struct{}
	count int64
}

func New() *WaitGroup {
	return &WaitGroup{
		ch:    make(chan struct{}, 0),
		count: 0,
	}
}

func (wg *WaitGroup) Add(n int64) {
	atomic.AddInt64(&wg.count, n)
}

func (wg *WaitGroup) Done() {
	atomic.AddInt64(&wg.count, -1)

	if atomic.LoadInt64(&wg.count) == 0 {
		close(wg.ch)
		return
	}
}

func (wg *WaitGroup) Wait() {
	<-wg.ch
}

func main() {
	// Wait
	// Done
	// Add
	wg := New()
	wg.Add(2)
	go func() {
		for i := 0; i < 10; i++ {
			fmt.Println(i)
		}
		wg.Done()
	}()

	go func() {
		for i := 0; i < 10; i++ {
			fmt.Println(i)
		}
		wg.Done()
	}()

	wg.Wait()
}
