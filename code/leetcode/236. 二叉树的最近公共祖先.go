package main

type TreeNode struct {
	Val   int
	Left  *TreeNode
	Right *TreeNode
}

func lowestCommonAncestor(root, p, q *TreeNode) *TreeNode {
	// 二叉树的最近公共祖先
	// 递归

	// base case
	// 如果 root 为nil，或者 root=p，或者 root=q，那么 root就是最近祖先
	if root == nil || root == p || root == q {
		return root
	}

	// 从root的左子树找
	left := lowestCommonAncestor(root.Left, p, q)
	// 从root右子树找
	right := lowestCommonAncestor(root.Right, p, q)

	if left != nil && right != nil {
		return root
	}

	if left == nil && right == nil {
		return nil
	}

	if left != nil {
		return left
	}

	return right
}

func main() {

}
