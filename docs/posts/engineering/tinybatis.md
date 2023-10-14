---
icon: edit
title: TDD实践——从零写一个简单的Mybatis——TinyBatis
date: 2023-10-14
tag:
  - mybatis
  - java
  - orm
category:
  - tdd
---

## 前言

之前有幸学习过徐昊的 [TDD](./tdd1.md) 课程，收获颇大，但是一直没有好的 idea 去实践，这次就用 TDD 的模式来实现一个简单的 Mybatis，取名为 TinyBatis。

## TDD 流程

> 以下仅为个人理解，一千个读者就有一千个哈姆雷特，欢迎大家探讨。

[TDD(Test-Driven Development)](https://en.wikipedia.org/wiki/Test-driven_development)核心是一套指导思想。

之前笔者编程的模式一直是：**先写代码，后写测试**。

这样编程会带来几个很麻烦的问题：

1. 代码写完后，测试用例写起来很麻烦，因为代码的设计并没有考虑到测试用例，所以测试用例写起来很费劲。
2. 严重依赖模块、代码结构设计，写起来很容易卡壳。
3. 误导排期和进度，代码写完了不代表功能完成了。

而 TDD 的核心思想是：**先写测试，后写代码**：

1. 编写测试用例，测试用例是对功能的需求的描述，有助于理解需求（需求都没理解，怎么可能写好代码）；
2. 测试用例反推代码结构，有利于写出测试良好的代码；
3. 重构方便，完备的测试用例保证了重构后代码的正确性；

有了 TDD 思想指导后，笔者的流程是这样的：

1. 理解需求，先写入口测试用例；
2. 从入口测试用例反推代码结构，写出测试良好的代码；
3. 通过测试用例；
4. 发现不合理代码，重构再通过测试用例；

## 需求

TinyBatis 的需求是这样的：

TODO

## 参考资料

- [Generating java code from xml schema](https://www.jetbrains.com/help/idea/generating-java-code-from-xml-schema.html#jaxb)
- [Test-driven development](https://en.wikipedia.org/wiki/Test-driven_development)
