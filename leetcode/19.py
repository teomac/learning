# Definition for singly-linked list.
# class ListNode:
#     def __init__(self, val=0, next=None):
#         self.val = val
#         self.next = next
class Solution:
    def removeNthFromEnd(self, head: Optional[ListNode], n: int) -> Optional[ListNode]: 
        cur = head
        nodesCount = 0

        while cur != None:
            cur = cur.next
            nodesCount += 1
        
        if nodesCount == n:
            return head.next
    
        cur = head
        i = 0
        while i < nodesCount:
            if i == nodesCount-n-1:
                cur.next = cur.next.next
                break
            cur = cur.next
            i+=1
        return head
        