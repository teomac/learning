class Solution:
    def longestConsecutive(self, nums: List[int]) -> int:
        seq = 0
        maxSeq = 0
        hash = {}

        for x in nums:
            hash[x] = 1
        
        for x in hash:
            if (x-1) not in hash:
                seq = 1
                count = x
                while True:
                    if count+1 in hash:
                        seq += 1
                        count+=1
                        continue
                    else:
                        maxSeq = max(seq, maxSeq)
                        break
        return maxSeq
