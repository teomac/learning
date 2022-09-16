class Solution {
    public int lengthOfLastWord(String s) {
        
        int l = s.length();
        int result = 0;
        int last_char = 0; //last character excluding spaces

        for(int i=l-1; i>=0; i--){
            if(s.charAt(i) == ' '){
                continue;
            }
            else{
                last_char = i;
                break;
            }
        }

        result = l - last_char;

        for(int i=last_char; i>=0; i--){
            
            if(i==0 && s.charAt(i)!=' '){
                result = last_char + 1;
                break;
            }
            else if(s.charAt(i) != ' '){
                continue;
            }
            else{
                result = last_char-i;
                break;
            }
        }

        return result;
    }
}