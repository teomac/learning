class Solution {
    public void reverseString(char[] s) {
        
        int l = s.length;
        char[] s2 = new char[l];

        for(int i=0; i<l; i++){
            s2[l-i-1] = s[i];
        }
        for(int i=0; i<l; i++){
            s[i] = s2[i];
        }
    }
}