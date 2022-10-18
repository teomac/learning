class Solution {
    public boolean isMonotonic(int[] nums) {
        Boolean res = true;
        int l = nums.length;

        if(nums[0]<=nums[l-1]){
            for(int i=0; i<l-1; i++){
                if(nums[i]<=nums[i+1]){
                    continue;
                }
                else{
                    res = false;
                    break;
                }
            }
        }
        else{
            for(int i=0; i<l-1; i++){
                if(nums[i]>=nums[i+1]){
                    continue;
                }
                else{
                    res = false;
                    break;
                }
            }
        }

        return res;
    }
}