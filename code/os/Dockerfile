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