class Solution {
    public int countOdds(int low, int high) {
        int diff = high - low;
        int result = 0;

        if(low==high){
            if(low%2==0){
                return 0;
            }
            else{
                return 1;
            }
        }

        if(low%2==0 && high%2==0){
            result = diff/2;
        }
        else if(low%2!=0 && high%2!=0){
            result = (diff/2) + 1;
        }
        else{
            diff = high - low - 1;
            result = (diff/2) + 1;
        }

        return result;
    }
}