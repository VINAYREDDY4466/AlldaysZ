import java.util.*;
public class Main{
    public static void main(String[] args) {
       int arr[] ={8, -8, 9, -9, 10, -11, 12, 8, -8, 9, -9, 10, -11,12};
       int sum=0;
         int  maxsum=0;
       for(int i=0;i<arr.length-1;i++){
        for(int j=i+1;j<arr.length-1;j++){
           sum=sum+arr[i]+arr[j];
            maxsum=Math.max(maxsum, sum);
        }
       }
       System.out.println(maxsum);
    }



}