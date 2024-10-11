class Solution:
    def isValidSudoku(self, board: List[List[str]]) -> bool:

        #check rows
        for i in range(len(board)):
            hash = {}
            for j in range(len(board[0])):
                if board[i][j] == ".":
                    continue
                if board[i][j] not in hash and board[i][j] >= "1" and board[i][j] <= "9":
                    hash[board[i][j]] = 1
                else:
                    return False
        
        #check columns
        for i in range(len(board)):
            hash = {}
            for j in range(len(board[0])):
                if board[j][i] == ".":
                    continue
                if board[j][i] not in hash and board[j][i] >= "1" and board[j][i] <= "9":
                    hash[board[j][i]] = 1
                else:
                    return False
        
        #check sub-boxes
        subRow = 0
        while subRow <= 6:
            subCol = 0
            while subCol <= 6:
                hash = {}
                for i in range(subRow, subRow+3):
                    for j in range(subCol, subCol+3):
                        if board[i][j] == ".":
                            continue
                        if board[i][j] not in hash and board[i][j] >= "1" and board[i][j] <= "9":
                            hash[board[i][j]] = 1
                        else:
                            return False
                subCol += 3
            subRow += 3
        
        return True