class Solution:
    def topKFrequent(self, nums: List[int], k: int) -> List[int]:
        map = {}
        res = []
        for i in range(len(nums)):
            if nums[i] in map:
                map[nums[i]] += 1
            else:
                map[nums[i]] = 1

        while k > 0:
            max = 0
            val = 0
            for key in map:
                if map[key] > max:
                    max = map[key]
                    val = key

            if max > 0:
                res.append(val)
                map.pop(val)
            k -= 1
        
        return res