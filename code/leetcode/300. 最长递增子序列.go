package main

import "fmt"

func lengthOfLIS(nums []int) int {
	// 最长递增子序列
	// 动态规划

	// 定义 dp[i]\textit{dp}[i]dp[i] 为考虑前 iii 个元素，以第 iii 个数字结尾的最长上升子序列的长度，
	// 注意 nums[i]\textit{nums}[i]nums[i] 必须被选取。
	dp := make([]int, len(nums))
	for i := 0; i < len(nums); i++ {
		dp[i] = 1
	}

	for i := range nums {
		for j := 0; j < i; j++ {
			if nums[i] > nums[j] {
				dp[i] = maxInt(dp[j]+1, dp[i])
			}
		}
	}
	ret := 0
	for _, num := range dp {
		ret = maxInt(ret, num)
	}
	return ret
}

func maxInt(x, y int) int {
	if x > y {
		return x
	}
	return y
}

func main() {
	l := lengthOfLIS([]int{10, 9, 2, 5, 3, 7, 101, 18})
	fmt.Println(l)
}
