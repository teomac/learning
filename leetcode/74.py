class Solution:
    def searchMatrix(self, matrix: List[List[int]], target: int) -> bool:
        top, bot = 0, len(matrix) - 1
        width = len(matrix[0]) - 1
        row = 0
        
        while top <= bot:
            m = floor((bot + top) / 2)
            if target > matrix[m][-1]:
                top = m + 1
            elif target < matrix[m][0]:
                bot = m - 1
            else:
                row = m
                break
        
        l, r = 0, len(matrix[0])-1
        while l <= r:
            m = floor((l+r) / 2)
            if matrix[row][m] > target:
                r = m - 1
            elif matrix[row][m] < target:
                l = m + 1
            else:
                return True
        return False