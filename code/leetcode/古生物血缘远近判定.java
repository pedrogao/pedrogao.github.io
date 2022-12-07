import java.util.Arrays;
import java.util.Scanner;

class Solution20 {
    public static int minDistance(String word1, String word2) {
        // 最小编辑距离
        // 动态规划
        int n1 = word1.length(), n2 = word2.length();
        int[][] dp = new int[n1+1][n2+1];
        for(int i = 1; i <= n1; i++)
            dp[i][0] = i;
        for(int i = 1; i <= n2; i++)
            dp[0][i] = i;
        
        System.out.println(Arrays.deepToString(dp));

        for (int i = 1; i <= n1; i++) {
            for (int j = 1; j <= n2; j++) {
                if (word1.charAt(i-1) == word2.charAt(j-1)) {
                    dp[i][j] = dp[i-1][j-1];
                } else {
                    dp[i][j] = Math.min(
                        Math.min(dp[i-1][j] + 1, // 新增 
                        dp[i-1][j-1] + 1), // 替换
                        dp[i][j-1] + 1 // 删除
                    );
                }
            }
        }
        return dp[n1][n2];
    }

    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        var line = scanner.nextLine();
        scanner.close();
        var parts = line.split(",");
        System.out.println(minDistance(parts[0], parts[1]));
    }
}
