class Solution {
    public boolean isPalindrome(String s) {
        
        boolean result=false;
        String p = "";

        s = s.replaceAll("[^A-Za-z0-9]", "");
        s = s.toLowerCase();
        int l = s.length();

        for(int i=l-1; i>=0; i--){
            p = p + s.charAt(i);
        }

        if(p.equals(s)){
            result = true;
        }

        return result;
    }
}