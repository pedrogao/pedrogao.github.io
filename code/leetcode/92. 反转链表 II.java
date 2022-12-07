
class Solution1 {
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

    public ListNode reverseBetween(ListNode head, int left, int right) {
        if (left >= right) {
            return head;
        }
        var dummy = new ListNode(-1);
        dummy.next = head;
        var pre = dummy;
        for (int i = 1; i < left; i++)
            pre = pre.next;
        var end = dummy;
        for (int i = 0; i < right; i++)
            end = end.next;

        var next = end.next;
        end.next = null;

        var l = pre.next;
        pre.next = reverse(l);
        // System.out.println(l.val);
        l.next = next;

        return dummy.next;
    }

    private ListNode reverse(ListNode head) {
        ListNode pre = null;
        // pre -> 2 -> 3
        while (head != null) { // 2
            var next = head.next; // 3
            head.next = pre; // 2 -> pre
            pre = head;
            head = next;
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
        int[] nums = new int[] { 3, 5 };
        var root = buildNode(nums);
        var sl = new Solution1();
        sl.reverseBetween(root, 1, 2);
    }
}