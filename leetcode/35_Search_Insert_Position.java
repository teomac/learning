class Solution {
    public int searchInsert(int[] nums, int target) {
        
        int l = nums.length;
        int result = -1;
        int left = 0;
        int right = l-1;
        int middle = 0;

        while(left <= right){

            middle = (left + right) / 2;

            if(nums[middle] == target){
                result = middle;
                break;
            }
            else if(nums[middle] > target){
                right = middle - 1;
            }
            else{
                left = middle + 1;
            }

        }

        if(result == -1){
            result = left;
        }


        return result;
    }
}