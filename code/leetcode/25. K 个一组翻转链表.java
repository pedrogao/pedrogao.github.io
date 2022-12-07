
class Solution2 {
    public static class ListNode {
        int val;
        ListNode next;

        ListNode() {
        }

        ListNode(int val) {
            this.val = val;
        }

        ListNode(int val, ListNode next) {
            this.val = val;
            this.next = next;
        }
    }

    public ListNode reverseKGroup(ListNode head, int k) {
        var dummy = new ListNode(-1);
        dummy.next = head;

        var pre = dummy;
        var end = dummy;
        while (true) {
            for (int i = 0; i < k && end != null; i++)
                end = end.next;
            if (end == null) {
                break;
            }
            // 0 1
            // end -> 2
            var next = end.next; // 记录3
            end.next = null; // 2 -> null
            var start = pre.next; // 1 -> 2
            pre.next = reverse(start); // pre -> 2 -> 1
            // 1 -> 3
            // pre -> 2 -> 1 -> 3
            start.next = next;
            pre = start;
            end = start;
        }
        return dummy.next;
    }

    private ListNode reverse(ListNode head) {
        ListNode pre = null;
        ListNode curr = head;
        while (curr != null) {
            ListNode next = curr.next;
            curr.next = pre;
            pre = curr;
            curr = next;
        }
        return pre;
    }

    public static ListNode buildNode(int[] nums) {
        var dummy = new ListNode();
        var head = dummy;
        for (int i : nums) {
            head.next = new ListNode(i);
            head = head.next;
        }
        return dummy.next;
    }

    public static void main(String[] args) {
        int[] nums = new int[] { 1,2,3,4,5 };
        var root = buildNode(nums);
        var sl = new Solution2();
        sl.reverseKGroup(root, 2);
    }
}