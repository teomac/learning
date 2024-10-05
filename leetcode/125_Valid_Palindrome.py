class Solution:
    def isPalindrome(self, s: str) -> bool:
        # remove special characters, spaces and make all characters lowercase
        s = ''.join(e for e in s if e.isalnum()).lower()

        l, r = 0, len(s)-1

        while l<r:
            if s[l] != s[r]:
                return False
            l+=1
            r-=1
        return True