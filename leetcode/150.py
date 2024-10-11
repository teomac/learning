class Solution:
    def evalRPN(self, tokens: List[str]) -> int:
        stack = []

        for i in tokens:
            if i == "+":
                stack.append(stack.pop() + stack.pop())
            elif i == "-":
                tmp1, tmp2 = stack.pop(), stack.pop()
                stack.append(tmp2 - tmp1)
            elif i == "*":
                stack.append(stack.pop() * stack.pop())
            elif i == "/":
                tmp1, tmp2 = stack.pop(), stack.pop()
                stack.append(int(tmp2 / tmp1))
            else:
                stack.append(int(i))

        return stack[0]