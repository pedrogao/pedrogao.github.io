---
icon: edit
title: 带你修改一次 Linux 内核
date: 2022-07-22
tag:
  - os
  - linux
category:
  - os
---

## 概述

我们在工作中几乎离不开 Linux，虽然一直在使用它，但是面对它时仍会有畏惧。

可能害怕它几百万行的源代码，也可能害怕一个线上问题而不知所措。

为了打破这种畏惧，笔者决定真正的去尝试读 Linux 内核源码，理解、实践、调试。然后从根本上解决它，

因此笔者查阅资料，。。。

下面，是笔者踩坑的旅程，这个旅程中。

## 环境搭建

本次实验环境为 ubuntu 20.04，但这种环境无疑有些苛刻，好在我们有 `Docker`。

通过 Docker 我们仅通过一个 Dockerfile 文件就能搭建起完善的实验环境，如下：

```Dockerfile
FROM ubuntu:20.04

ENV DEBIAN_FRONTEND=noninteractive

RUN echo "deb http://mirrors.aliyun.com/ubuntu/ focal main restricted universe multiverse \n \
deb-src http://mirrors.aliyun.com/ubuntu/ focal main restricted universe multiverse \n \
deb http://mirrors.aliyun.com/ubuntu/ focal-security main restricted universe multiverse \n \
deb-src http://mirrors.aliyun.com/ubuntu/ focal-security main restricted universe multiverse \n \
deb http://mirrors.aliyun.com/ubuntu/ focal-updates main restricted universe multiverse \n \
deb-src http://mirrors.aliyun.com/ubuntu/ focal-updates main restricted universe multiverse \n \
deb http://mirrors.aliyun.com/ubuntu/ focal-proposed main restricted universe multiverse \n  \
deb-src http://mirrors.aliyun.com/ubuntu/ focal-proposed main restricted universe multiverse \n \
deb http://mirrors.aliyun.com/ubuntu/ focal-backports main restricted universe multiverse \n \
deb-src http://mirrors.aliyun.com/ubuntu/ focal-backports main restricted universe multiverse">/etc/apt/sources.list

RUN cat /etc/apt/sources.list
RUN apt update
RUN apt-get install -y wget \
    gcc \
    gcc-multilib \
    git \
    make \
    bc \
    texinfo \
    gdb \
    cgdb \
    qemu-system-x86-64 \
    libncurses5-dev \
    vim \
    cpio

WORKDIR /home
```

## 参考资料

- [vmlinux、zImage、bzImage 的区别](https://blog.csdn.net/hanxuefan/article/details/7454352)
