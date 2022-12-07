import java.util.HashMap;
import java.util.Map;

class Solution4 {
    public int lengthOfLongestSubstring(String s) {
        int n = s.length();
        if (n == 0) return 0;
        // 向前跑，如果发现重复的，那么直接将重复的全部删除掉
        // 重复的东西是无法增加子字符串长度的

        Map<Character, Integer> record = new HashMap<>();
        int res = 0, left = 0, right = 0;
        while(right < n) {
            var ch = s.charAt(right);
            
            if (record.containsKey(ch)) {
                int j = record.get(ch);
                record.put(ch, j+1);
                while (record.get(ch) > 1) {
                    char c = s.charAt(left);
                    left++;
                    record.put(c, record.get(c) - 1);
                }
            } else {
                record.put(ch, 1);
            }

            right++;
            res = Math.max(res, right - left);
        }

        return res;
    }

    public static void main(String[] args) {
        var l = new Solution4().lengthOfLongestSubstring("abcabcbb");
        System.out.println(l);
    }
}