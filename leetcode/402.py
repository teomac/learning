class Solution:
    def removeKdigits(self, num: str, k: int) -> str:
        stack = []

        for c in num:
            while k > 0 and stack and stack[-1] > c:
                k -= 1
                stack.pop()
            stack.append(c)
        
        stack = stack[:len(stack) - k]
        
        i=0
        while(i < len(stack) and stack[i] == "0"):
            i +=1

        return "".join(stack[i:]) if len(stack[i:]) > 0 else "0"
        