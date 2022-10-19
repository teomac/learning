class Solution {
    public double average(int[] salary) {
        int l = salary.length;
        double min = Integer.MAX_VALUE;
        double max = Integer.MIN_VALUE;
        double sum = 0;
        double avg = 0;

        for(int i=0; i<l; i++){
            sum += salary[i];
            min = Math.min(min, salary[i]);
            max = Math.max(max, salary[i]);
        }

        avg = (sum-min-max)/(l-2);

        return avg;
        
    }
}