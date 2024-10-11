class Solution:
    def isValid(self, s: str) -> bool:
        stack = []
        map = {")": "(", "]": "[", "}": "{"}

        for i in s:
            if i == '(' or i == '[' or i == '{':
                stack.append(i)
            elif len(stack) > 0 and map[i] == stack[-1]:
                stack.pop()
            else:
                return False

        if len(stack) == 0:
            return True

        return False
