import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collection;
import java.util.List;

class Solution6 {
    public boolean wordBreak(String s, List<String> wordDict) {
        // 动态规划
        // 排列、剪枝 => 超时
        boolean[] dp = new boolean[s.length() + 1];
        dp[0] = true;

        for (int i = 1; i <= s.length(); i++) {
            for (int j = 0; j < i; j++) {
                if (dp[j] && wordDict.contains(s.substring(j, i))) {
                    dp[i] = true;
                    break;
                }
            }
        }
        return dp[s.length()];
    }

    public static void main(String[] args) {
        List<String> wordDict = new ArrayList<>();
        wordDict.addAll(Arrays.asList("cats","dog","sand","and","cat"));

        var ok = new Solution6().wordBreak("catsandog", wordDict);
        System.out.println(ok);
    }
}