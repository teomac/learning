class Solution {
	public boolean isPalindrome(int x) {
		String s = String.valueOf(x);

		int l = s.length();
		int i = 0;
		Boolean result = false;


		int half = l/2;

		if(l==1){
			result = true;
		}

		else{
			for(i=0; i<l; i++){
				if(s.charAt(i) == s.charAt(l-i-1) && i==half-1){
					result = true;
				}
				else if(s.charAt(i) == s.charAt(l-i-1)){
					continue;
				}
				else{
					result = false;
				}
			}
		}


		return result;
	}
}
