class Solution {
    public int maxProfit(int[] prices) {
        int min = prices[0];
        int maxP = 0;
        int l = prices.length;

        if(l==0){
            return 0;
        }

        for(int i=0; i<l; i++){
            if(prices[i] > min){
                maxP = Math.max(maxP, prices[i] - min);
            }
            else{
                min = prices[i];
            }
        }

        return maxP;
    }
}