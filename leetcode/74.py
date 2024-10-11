class Solution:
    def searchMatrix(self, matrix: List[List[int]], target: int) -> bool:
        l, r = 0, len(matrix)-1

        while l <= r:
            mid = l + ((r - l) // 2)

            if matrix[mid][0] > target:
                r = mid - 1
            elif matrix[mid][0] <= target and (mid == len(matrix)-1 or matrix[mid+1][0] > target):
                break
            else:
                l = mid + 1
                
        l, r = 0, len(matrix[0])-1
        while l <= r:
            mid2 = l + ((r - l) // 2)
            if matrix[mid][mid2] > target:
                r = mid2 - 1
            elif matrix[mid][mid2] < target:
                l = mid2 + 1
            else:
                return True
        return False