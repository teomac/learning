import java.util.Arrays;

class Solution {
    public int[] plusOne(int[] digits) {
        int[] result = digits;
        int l = digits.length;

        for(int i=l-1; i>=0; i--){
            if(result[i] != 9){
                result[i]+=1;
                break;
            }
            else if(i==0 && result[i] == 9 && l != 1){
                digits = Arrays.copyOf(result, l+1);
                digits[0] = 1;
                System.arraycopy(result, 0, digits, 1, l);
                digits[1] = 0;
                result = digits;
                break;
            }
            else if(i==0 && result[i] == 9 && l == 1){
                int[] res = {1,0};
                result = res;
                break;
            }
            else{
                result[i] = 0;
            }
        }

        return result;
    }
}