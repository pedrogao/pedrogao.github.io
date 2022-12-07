import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

class Solution19 {
    public List<List<Integer>> fourSum(int[] nums, int target) {
        Arrays.sort(nums);
        return nSum(nums, 4, 0, (long)target);
    }

    private List<List<Integer>> nSum(int[] nums, int n, int start, long target) {
        int len = nums.length;
        List<List<Integer>> res = new ArrayList<>();
        if (n < 2 || n > len)
            return res;

        if (n == 2) {
            int left = start, right = len - 1;
            while (left < right) {
                int l = nums[left], r = nums[right];
                long sum = l + r;
                if (sum == target) {
                    res.add(new ArrayList<>(Arrays.asList(l, r)));
                    while (left < right && nums[left] == l) {
                        left++;
                    }
                    while (left < right && nums[right] == r) {
                        right--;
                    }
                } else if (sum < target) {
                    while (left < right && nums[left] == l) {
                        left++;
                    }
                } else {
                    while (left < right && nums[right] == r) {
                        right--;
                    }
                }
            }
        } else {
            int i = start;
            while (i < len) {
                int now = nums[i];
                var sub = nSum(nums, n - 1, i + 1, target - now);
                for (var item : sub) {
                    item.add(now);
                    res.add(item);
                }
                while (i < len && nums[i] == now) {
                    i++;
                }
            }
        }
        return res;
    }

    public static void main(String[] args) {
        var res = new Solution19().fourSum(new int[] { 1000000000, 1000000000, 1000000000, 1000000000 }, -294967296);
        System.out.println(res.toString());
    }
}
