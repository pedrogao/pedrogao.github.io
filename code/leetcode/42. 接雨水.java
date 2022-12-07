import java.util.Stack;

class Solution13 {

    public int trap(int[] height) {
        int n = height.length;
        if (n == 0) {
            return 0;
        }
        int res = 0;
        // 动态规划
        // 双指针
        // 单调栈
        Stack<Integer> stack = new Stack<>();
        // 发生后面的高度大于前面的，那么证明需要计算雨水量了
        for (int i = 0; i < n; i++) {
            while (!stack.empty() && height[i] > height[stack.peek()]) {
                int pop = stack.pop(); // 0
                if (stack.empty()) {
                    break; // 为啥需要两个，因为雨水需要两个栏杆接住
                }
                int peek = stack.peek(); // 1 前面的那个
                int w = i - peek - 1; // 3 - 1 - 1
                int h = Math.min(height[peek], height[i]) - height[pop];
                res += (w * h);
            }
            stack.push(i);
        }

        return res;
    }

    public static void main(String[] args) {
        var res = new Solution13().trap(new int[] { 0, 1, 0, 2, 1, 0, 1, 3, 2, 1, 2, 1 });
        System.out.println(res);
    }
}
