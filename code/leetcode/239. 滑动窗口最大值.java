import java.util.ArrayDeque;
import java.util.Arrays;
import java.util.Deque;

class Solution11 {
    
    public int[] maxSlidingWindow(int[] nums, int k) {
        // 滑动窗口暴力解法
        // 或者单调队列
        Deque<Integer> dq = new ArrayDeque<>();
        int n = nums.length;
        int m = n - k + 1;
        int[] ret = new int[m];
        for (int i = 0; i < n; i++) {
            if (i < k - 1) {
                while (!dq.isEmpty() && nums[dq.peekLast()] <= nums[i]) { // 当发现尾部小的时候，remove
                    dq.removeLast();
                }
                dq.addLast(i);
            } else {
                // 移除 i - k
                if (i - k >= 0) {
                    if (!dq.isEmpty() && i - dq.peekFirst() >= k) {
                        dq.removeFirst();
                    }
                }
                // 加入最大
                while (!dq.isEmpty() && nums[dq.peekLast()] <= nums[i]) {
                    dq.removeLast();
                }
                dq.addLast(i);
                int last = dq.peekFirst(); // 头部是最大的，尾部是最小的
                ret[i - k + 1] = nums[last];
            }
        }

        return ret;
    }

    public static void main(String[] args) {
        int[] maxSlidingWindow = new Solution11().maxSlidingWindow(new int[]{1,3,-1,-3,5,3,6,7}, 3);
        System.out.println(Arrays.toString(maxSlidingWindow));
    }
}
