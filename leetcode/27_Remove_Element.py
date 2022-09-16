class Solution:
    def removeElement(self, nums: List[int], val: int) -> int:
        
        l = len(nums)

        for i in range(l):
            if nums[i] == val:
                nums