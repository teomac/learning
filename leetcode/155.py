class MinStack:

    def __init__(self):
        self.data = []

    def push(self, val: int) -> None:
        if not self.data or val <= self.data[-1][1]:
            self.data.append([val, val])
        else:
            self.data.append([val, self.data[-1][1]])

    def pop(self) -> None:
        self.data.pop()

    def top(self) -> int:
        return self.data[-1][0]
        

    def getMin(self) -> int:
        return self.data[-1][1]
        


# Your MinStack object will be instantiated and called as such:
# obj = MinStack()
# obj.push(val)
# obj.pop()
# param_3 = obj.top()
# param_4 = obj.getMin()