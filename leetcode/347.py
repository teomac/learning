class Solution:
    def topKFrequent(self, nums: List[int], k: int) -> List[int]:
        map = {}
        res = []
        topK = []
        for i in nums:
            if not i in map:
                map[i] = 1
            else:
                map[i] += 1

        values = list(map.values())
        print(values)
        for i in range(k):
            topK.append(max(values))
            values.remove(max(values))
        for i in range(k):
            res.append(list(map.keys())[list(map.values()).index(topK[i])])
            map.pop(list(map.keys())[list(map.values()).index(topK[i])])



        return res