import math
class Solution:
    def minEatingSpeed(self, piles: List[int], h: int) -> int:
        l, r = 1, max(piles)
        res = r

        while l <= r:
            mid = (l+r) // 2
            
            time = 0
            for x in piles:
                time += math.ceil(x / mid)
            if time > h:
                l = mid + 1
            elif time <= h:
                r = mid - 1
                res = mid
        return res