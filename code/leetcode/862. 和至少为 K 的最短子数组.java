import java.util.ArrayDeque;
import java.util.Arrays;
import java.util.Deque;

class Solution12 {
    public int shortestSubarray(int[] nums, int k) {
        int n = nums.length;
        if (n == 0) {
            return 0;
        }
        long[] sum = new long[n + 1];
        for (int i = 1; i <= n; i++) {
            sum[i] = sum[i - 1] + nums[i - 1];
        }
        System.out.println(Arrays.toString(sum));

        Deque<Integer> q = new ArrayDeque<>();
        int res = n + 1;
        for (int i = 0; i <= n; i++) {
            while (!q.isEmpty() && sum[i] - sum[q.peekFirst()] >= k) {
                res = Math.min(res, i - q.pollFirst());
            }
            // 和最小为k，那么将大的数出队列
            while (!q.isEmpty() && sum[q.peekLast()] >= sum[i]) {
                q.removeLast();
            }
            q.addLast(i);
        }

        return res > n ? -1 : res;
    }

    public static void main(String[] args) {
        var res = new Solution12().shortestSubarray(new int[] { 2, -1, 2 }, 3);
        System.out.println(res);
    }
}