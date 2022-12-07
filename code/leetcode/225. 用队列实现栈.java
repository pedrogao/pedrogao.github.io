import java.util.ArrayDeque;
import java.util.Queue;

class Solution15 {
    static class MyStack {
        private Queue<Integer> q1;
        private Queue<Integer> q2;

        public MyStack() {
            q1 = new ArrayDeque<>();
            q2 = new ArrayDeque<>();
        }

        public void push(int x) {
            // 1. 先推入q2
            q2.offer(x);
            // 2. 再将q1的值推入q2
            while (!q1.isEmpty()) {
                q2.offer(q1.poll());
            }
            // 3. 交换q1、q2
            var t = q1;
            q1 = q2;
            q2 = t;
        }

        public int pop() {
            return q1.poll();
        }

        public int top() {
            return q1.peek();
        }

        public boolean empty() {
            return q1.isEmpty();
        }
    }

    public static void main(String[] args) {
        var stack = new MyStack();
        stack.push(1);
        stack.push(2);
        System.out.println(stack.top());
        System.out.println(stack.pop());
        System.out.println(stack.empty());
    }
}
