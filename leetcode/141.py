# Definition for singly-linked list.
# class ListNode:
#     def __init__(self, x):
#         self.val = x
#         self.next = None

class Solution:
    def hasCycle(self, head: Optional[ListNode]) -> bool:
        map = {}
        i = 0

        while head:
            if head in map:
                return True
            map[head] = i
            head = head.next
            i += 1
        return False