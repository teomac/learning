class Solution:
    def search(self, nums: List[int], target: int) -> int:
        l, r = 0, len(nums)-1

        while l<=r:
            mid = (l+r) // 2
            if nums[mid] == target:
                return mid
            
            if nums[mid] >= nums[l]:
                # search in the right portion
                if target > nums[mid] or target < nums[l]:
                    l = mid + 1
                # search in the left portion
                else:
                    r = mid - 1
                    

            else:
                # search in the right portion
                if target > nums[mid] and target <= nums[r]:
                    l = mid + 1
                # search in the left portion
                else:
                    r = mid - 1

        return -1
