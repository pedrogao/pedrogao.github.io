import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

class Solution18 {
    public List<List<Integer>> threeSum(int[] nums) {
        // 排序+双指针
        Arrays.sort(nums);
        return nSum(nums, 3, 0, 0);
    }

    private List<List<Integer>> nSum(int[] nums, int n, int start, int target) {
        int len = nums.length;
        List<List<Integer>> res = new ArrayList<>();
        if (n < 2 || len < n) { // 数组长度小于n，或者n小于2，那么直接返回结果
            return res;
        }
        if (n == 2) { // base case
            int left = start, right = len - 1;
            while (left < right) {
                int l = nums[left], r = nums[right], sum = l + r;
                if (sum == target) {
                    res.add(new ArrayList<>(Arrays.asList(l, r)));
                    while (left < right && nums[left] == l) {
                        left++;
                    }
                    while (left < right && nums[right] == r) {
                        right--;
                    }
                } else if (sum > target) {
                    while (left < right && nums[right] == r) {
                        right--;
                    }
                } else {
                    while (left < right && nums[left] == l) {
                        left++;
                    }
                }
            }
        } else {
            int i = start;
            while (i < len) {
                int now = nums[i];
                var sub = nSum(nums, n - 1, i + 1, target - now);
                for (var item : sub) {
                    item.add(now); // 新增差值
                    res.add(item); // 添加到res
                }
                // 忽略now的等值
                while (i < len && nums[i] == now) {
                    i++;
                }
            }
        }
        return res;
    }

    public static void main(String[] args) {
        var res = new Solution18().threeSum(new int[] { -1, 0, 1, 2, -1, -4 });
        System.out.println(res.toString());
    }
}
