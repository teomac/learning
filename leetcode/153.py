class Solution:
    def findMin(self, nums: List[int]) -> int:
        l, r = 0, len(nums)-1
        res = nums[0]

        while l<=r:
            if nums[l] < nums[r]:
                res = min(nums[l], res)
                break
            
            mid = (l+r) // 2
            res = min(nums[mid], res)
            # right portion has the min
            if nums[mid] >= nums[l]:
                l = mid+1

            # left portion has the min
            else:
                r = mid-1
        return res