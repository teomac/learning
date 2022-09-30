class Solution {
    // you need to treat n as an unsigned value
    public int hammingWeight(int n) {

        String s = Integer.toBinaryString(n);
        int l = s.length();
        int counter = 0;

        for(int i=0; i<l; i++){
            if(s.charAt(i) == '1'){
                counter++;
            }
            else{
                continue;
            }
        }

        return counter;
    }
}