class Solution:
    def sortColors(self, nums: List[int]) -> None:
        """
        Do not return anything, modify nums in-place instead.
        """

        bucket = [0,0,0]

        for i in range(len(nums)):
            if nums[i] == 0:
                bucket[0] += 1
            elif nums[i] == 1:
                bucket[1] += 1
            else:
                bucket[2] += 1
        
        for j in range(len(nums)):
            if bucket[0] > 0:
                nums[j] = 0
                bucket[0] -= 1
            elif bucket[1] > 0:
                nums[j] = 1
                bucket[1] -= 1
            elif bucket[2] > 0:
                nums[j] = 2
                bucket[2] -= 1