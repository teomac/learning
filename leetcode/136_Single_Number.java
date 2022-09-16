import java.util.HashMap;

class Solution {
    public int singleNumber(int[] nums) {

        HashMap<Integer, Integer> map = new HashMap<Integer, Integer>();

        int l = nums.length;
        int result=0;

        for(int i=0; i<l; i++){
            if(!map.containsKey(nums[i])){
                map.put(nums[i], 1);
            }
            else{
                map.put(nums[i], 2);
            }
        }

        for(int key : map.keySet()){
            if(map.get(key) == 1){
                result = key;
            }
        }

        
        return result;


    }
}