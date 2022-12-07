#include <atomic>
#include <cassert>
#include <iostream>
#include <thread>
#include <vector>

std::atomic<std::string *> ptr;
int data;

void producer() {
  std::string *p = new std::string("Hello");
  data = 42;
  ptr.store(p, std::memory_order_release);
}

void consumer() {
  std::string *p2;
  while (!(p2 = ptr.load(std::memory_order_consume))) // consume有明确的依赖关系
    ;
  // producer 线程对 ptr 的操作一定得与 consumer的 load 操作之前
  // 为啥p2一定会等于 Hello：
  // 1. p2是 atomic 的字符串指针
  // 2. p2 通过 consume memory order 来保证了多线程的内存可见性
  assert(*p2 == "Hello"); // never fires: *p2 carries dependency from ptr
  assert(data ==
         42); // may or may not fire: data does not carry dependency from ptr
}

int main() {
  std::thread t1(producer);
  std::thread t2(consumer);
  t1.join();
  t2.join();
}