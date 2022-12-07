import java.util.Arrays;
import java.util.LinkedList;
import java.util.List;

class Solution8 {

    List<String> res = new LinkedList<>();
    // 记录回溯路径
    LinkedList<String> track = new LinkedList<>();

    public List<String> wordBreak(String s, List<String> wordDict) {
        // 根据函数定义，判断 s[0..] 是否能够被拼出
        backtrack(s, 0, wordDict);
        return res;
    }

    // 回溯算法框架
    void backtrack(String s, int i, List<String> wordDict) {
        // base case，整个 s 都被拼出来了
        if (i == s.length()) {
            res.add(String.join(" ", track));
            return;
        }
        if (i > s.length()) {
            return;
        }

        // 遍历所有单词，尝试匹配 s[i..] 的前缀
        for (String word : wordDict) {
            int len = word.length();
            // 单词太长，跳过
            if (i + len > s.length()) {
                continue;
            }
            // 无法匹配，跳过
            String subStr = s.substring(i, i + len);
            if (!subStr.equals(word)) {
                continue;
            }
            // s[i..] 的前缀被 word 匹配，做选择
            track.addLast(word);
            backtrack(s, i + len, wordDict);
            // 撤销选择
            track.removeLast();
        }
    }

    public static void main(String[] args) {
        var res = new Solution8().wordBreak("catsanddog", Arrays.asList("cat","cats","and","sand","dog"));
        System.out.println(res.toString());
    }
}
