class Solution {
    public boolean repeatedSubstringPattern(String s) {
        String a = s + s;
        String b = a.substring(1,a.length()-1);

        if(b.contains(s)){
            return true;
        }
        else{
            return false;
        }
    }
}