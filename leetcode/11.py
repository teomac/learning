class Solution:
    def maxArea(self, height: List[int]) -> int:
        x, y = 0, len(height)-1
        res = 0

        while x<y:
            if height[x]>height[y]:
                res = max(res, height[y]*(y-x))
                y-=1
            elif height[x]<=height[y]:
                res = max(res, height[x]*(y-x))
                x+=1
        return res