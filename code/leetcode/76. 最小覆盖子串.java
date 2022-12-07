import java.util.HashMap;
import java.util.Map;

class Solution5 {
    public String minWindow(String s, String t) {
        // 最小覆盖子串
        // 滑动窗口
        // 记录最短子串的开始位置和长度
        int start = 0, minLen = Integer.MAX_VALUE;
        int left = 0, right = 0;
        Map<Character, Integer> window = new HashMap<>();
        Map<Character, Integer> needs = new HashMap<>();
        for (char c : t.toCharArray()) {
            needs.compute(c, (k, v) -> (v == null) ? 1 : v + 1);
        }
        int match = 0;

        while (right < s.length()) {
            char c1 = s.charAt(right);
            if (needs.containsKey(c1)) {
                window.compute(c1, (k, v) -> (v == null) ? 1 : v + 1);
                if (window.get(c1).equals(needs.get(c1))) {
                    match++;
                }
            }
            right++;

            while (match == needs.size()) {
                if (right - left < minLen) {
                    // 更新最小子串的位置和长度
                    start = left;
                    minLen = right - left;
                }
                char c2 = s.charAt(left);
                if (needs.containsKey(c2)) {
                    window.computeIfPresent(c2, (k, v) -> v - 1);
                    if (window.get(c2) < needs.get(c2)) {
                        match--;
                    }
                }
                left++;
            }
        }
        return minLen == Integer.MAX_VALUE ? "" : s.substring(start, start + minLen);
    }

    public static void main(String[] args) {
        var sz = new Solution5().minWindow("ADOBECODEBANC", "ABC");
        System.out.println(sz);
    }
}