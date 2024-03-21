class Solution:
    def containsDuplicate(self, nums: List[int]) -> bool:
        map = {}
        for i in range(len(nums)):
            if map.get(nums[i], 0) != 0:
                return True
            else:
                map[nums[i]] = i+1
                continue
        return False