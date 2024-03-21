class Solution:
    def isPalindrome(self, s: str) -> bool:
        i = 0
        j = len(s) - 1
        s = s.lower()

        while(i<=j):
            if not s[i].isalnum():
                i += 1
                continue
            elif not s[j].isalnum():
                j -= 1
                continue
            elif s[i] == s[j]:
                i += 1
                j -= 1
            else:
                return False
        return True