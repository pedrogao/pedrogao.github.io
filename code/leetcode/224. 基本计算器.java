import java.util.Stack;

class Solution {
    public int calculate(String s) {
        if (s.length() == 0) {
            return 0;
        }
        // 支持括号
        // 先计算括号内部的表达式，然后作为结果
        char[] chars = s.toCharArray();
        int[] res = subCalculate(chars, 0);
        return res[0];
    }

    private int[] subCalculate(char[] chars, int s) {
        Stack<Integer> stack = new Stack<>();
        char op = '+';
        int res = 0;
        int end = s;
        StringBuilder builder = new StringBuilder();
        for (int i = s; i < chars.length; i++) {
            char ch = chars[i];
            if (Character.isDigit(ch)) {
                builder.append(ch);
            }
            if ((!Character.isDigit(ch) && ch != ' ') || i == chars.length - 1) {
                int n = 0;
                if (ch == '(') {
                    System.out.printf("sub %d\n", i + 1);
                    int[] sub = subCalculate(chars, i + 1);
                    i = sub[1];
                    n = sub[0];
                } else if (builder.length() > 0) {
                    n = Integer.parseInt(builder.toString());
                    builder.setLength(0);
                }
                System.out.printf("%s %d\n", op, n);
                switch (op) {
                    case '+':
                        stack.push(n);
                        break;
                    case '-':
                        stack.push(-n);
                        break;
                    case '*':
                        stack.push(n * stack.pop());
                        break;
                    case '/':
                        stack.push(stack.pop() / n);
                        break;
                }
                if (ch == '+' || ch == '-' || ch == '*' || ch == '/') {
                    op = ch;
                }
                if (ch == ')') {
                    end = i;
                    break;
                }
            }
        }
        while (!stack.empty()) {
            res += stack.pop();
        }
        System.out.printf("%d --> %d\n", s, res);
        return new int[] { res, end };
    }

    public static void main(String[] args) {
        Solution s = new Solution();
        int res = s.calculate("(1+(4+5+2)-3)+(6+8)");
        System.out.printf("%d\n", res);
    }
}