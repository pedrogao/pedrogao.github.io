#include <atomic>
#include <cassert>
#include <iostream>
#include <thread>
#include <vector>

std::atomic<int> cnt = {0};

void f() {
  for (int i = 0; i < 1000; ++i) {
    // 最宽松的一致性保证，只保证 cnt 的原子性
    cnt.fetch_add(1, std::memory_order_release);
  }
}

int main() {
  std::vector<std::thread> v;

  for (int i = 0; i < 10; ++i) {
    v.emplace_back(f); // emplace_back 会自动调用thread的构造函数
  }

  for (auto &t : v) {
    t.join();
  }

  assert(cnt == 10000); // never failed

  return 0;
}