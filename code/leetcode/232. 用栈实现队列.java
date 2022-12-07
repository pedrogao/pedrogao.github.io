import java.util.Stack;

class Solution14 {
    static class MyQueue {
        private Stack<Integer> pushStack;
        private Stack<Integer> popStack;

        public MyQueue() {
            pushStack = new Stack<>();
            popStack = new Stack<>();
            // 1. pushStack 必须一次性将数据全部推到 popStack
            // 2. popStack 如果不为空，那么不能接受新的数据
            // 二者必须严格遵守，不然破坏队列的顺序
        }

        public void push(int x) {
            pushStack.push(x);
            if (popStack.empty()) {
                while (!pushStack.empty()) {
                    popStack.push(pushStack.pop());
                }
            }
        }

        public int pop() {
            if (popStack.empty()) {
                while (!pushStack.empty()) {
                    popStack.push(pushStack.pop());
                }
            }
            if (popStack.empty())
                return -1;

            int val = popStack.pop();
            return val;
        }

        public int peek() {
            if (popStack.empty()) {
                while (!pushStack.empty()) {
                    popStack.push(pushStack.pop());
                }
            }
            if (popStack.empty())
                return -1;

            return popStack.peek();
        }

        public boolean empty() {
            return popStack.empty() && pushStack.empty();
        }
    }

    public static void main(String[] args) {
        var q = new MyQueue();
        q.push(1);
        q.push(2);
        System.out.println(q.peek());
        System.out.println(q.pop());
        System.out.println(q.empty());
    }
}
