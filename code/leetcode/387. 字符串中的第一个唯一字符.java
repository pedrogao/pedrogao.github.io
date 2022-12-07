import java.util.HashMap;
import java.util.Map;

class Solution7 {
    public int firstUniqChar(String s) {
        char[] chars = s.toCharArray();
        Map<Character, Integer> record = new HashMap<>();
        for(int i = 0; i < chars.length; i++) {
            record.compute(chars[i], (k, v) -> v == null? 1: v+1);
        }
        
        for(int i = 0; i < chars.length; i++) {
            if (record.get(chars[i]) == 1) {
                return i;
            }
        }

        return -1;
    }

    public static void main(String[] args) {
        int firstUniqChar = new Solution7().firstUniqChar("loveleetcode");
        System.out.println(firstUniqChar);
    }
}
