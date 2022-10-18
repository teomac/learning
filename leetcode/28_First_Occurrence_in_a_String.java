class Solution {
    public int strStr(String haystack, String needle) {
        int l1 = haystack.length();
        int l2 = needle.length();

        for(int i=0; ; i++){
            for(int j=0; ; j++){
                if(j == l2){
                    return i;
                }
                if(i+j == l1){
                    return -1;
                }
                if(needle.charAt(j)!=haystack.charAt(i+j)){
                    break;
                }
            }
        }
    }
}