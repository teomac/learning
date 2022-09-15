class Solution(object):
    def romanToInt(self, s):
        
        order = 'IVXLCDM'
        
        roman = {'I': 1, 'V': 5, 'X': 10, 'L': 50, 'C': 100, 'D': 500, 'M': 1000}
        
        l = len(s)
        i = 0
        result = 0
        
        while i < l:
            if i<l-1:
                if roman.get(s[i]) >= roman.get(s[i+1]):
                    result = result + roman.get(s[i])
                    i+=1

                else:
                    result = result + (roman.get(s[i+1]) - roman.get(s[i]))
                    i+=2

            
            else:
                result = result + roman.get(s[i])
                break


        return result