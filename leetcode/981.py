class TimeMap:

    def __init__(self):
        self.data = []
        

    def set(self, key: str, value: str, timestamp: int) -> None:
        self.data.append([key, value, timestamp])
        

    def get(self, key: str, timestamp: int) -> str:
        l, r = 0, len(self.data)-1
        i = len(self.data)-1
        
        while l <= r:
            mid = (l+r) // 2
            if self.data[mid][2] > timestamp:
                r = mid - 1
            elif self.data[mid][2] < timestamp:
                l = mid + 1
            else:
                i = mid
                while i<len(self.data) and self.data[i][2] == timestamp:
                    i += 1
                i -= 1
                break

        while i >= 0:
            if self.data[i][0] == key and self.data[i][2] <= timestamp:
                return self.data[i][1]
            i -= 1
        return ""



# Your TimeMap object will be instantiated and called as such:
# obj = TimeMap()
# obj.set(key,value,timestamp)
# param_2 = obj.get(key,timestamp)