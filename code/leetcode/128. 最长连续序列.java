import java.util.HashSet;
import java.util.Set;

class Solution21 {

    public int longestConsecutive(int[] nums) {
        Set<Integer> set = new HashSet<>();
        for (var num : nums) {
            set.add(num);
        }

        int res = 0;
        for (var num : nums) {
            // 存在比num小的，所以不是子序列的第一个元素，直接跳过
            if (set.contains(num - 1)) {
                continue;
            }
            var curNum = num;
            var curLen = 1;
            // 计算最大长度
            while (set.contains(curNum + 1)) {
                curLen++;
                curNum++;
            }
            // 更新最大长度
            res = Math.max(res, curLen);
        }

        return res;
    }

    public static void main(String[] args) {
        var res = new Solution21().longestConsecutive(new int[] { 100, 4, 200, 1, 3, 2 });
        System.out.println(res);
    }
}
