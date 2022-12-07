import java.util.Arrays;

class Solution17 {

    public int[] twoSum(int[] numbers, int target) {
        int[] res = new int[2];
        Arrays.sort(numbers);
        int left = 0, right = numbers.length - 1;
        while (left < right) {
            var sum = numbers[left] + numbers[right];
            if (sum == target) {
                // 去重
                return new int[] { left + 1, right + 1 };
            } else if (sum < target) {
                left++;
            } else {
                right--;
            }
        }

        return res;
    }

    public static void main(String[] args) {
        var res = new Solution17().twoSum(new int[] { 2, 7, 11, 15 }, 7);
        System.out.println(res);
    }
}
