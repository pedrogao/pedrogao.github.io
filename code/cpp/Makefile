CC=gcc
CXX=g++
RM=rm -f
CPPFLAGS=-g 
LDFLAGS=-g -lpthread
LDLIBS=

SRCS=relaxed_ordering.cc
OBJS=$(subst .cc,.o,$(SRCS))

all: relaxed_ordering

relaxed_ordering: $(OBJS)
	$(CXX) $(LDFLAGS) -o relaxed_ordering $(OBJS) $(LDLIBS)

relaxed_ordering.o: relaxed_ordering.cc

clean:
	$(RM) $(OBJS)

distclean: clean
	$(RM) relaxed_ordering