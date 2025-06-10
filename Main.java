import java.util.*;
class ListNode{
    int val;
    ListNode next;
    ListNode(int val){
        this.val=val;
        this.next= null;
    }
}

public class Main{
    public static void main(String[] args) {
     ListNode first= new ListNode(10);
     ListNode second= new ListNode(20);
     ListNode third = new ListNode(30);
     
     first.next=second;
     second.next=third;
     first =insertHead(first,5);
     third= insertAtEnd(first, 40);
     boolean ans=serach(first, 30);
     ListNode middle= findMiddle(first);
     System.out.println(middle);
     System.out.println(ans);
     printList(first);
    }
    public static ListNode findMiddle(ListNode head){
        ListNode slow= head, fast=head;
        while(fast!=null &&fast.next!=null)
 {
         slow.next=head;
         fast= fast.next.next;

 }   
 return slow;
}
    public static boolean serach(ListNode head, int val){
        ListNode temp=head;
        while (temp.next!=null) {
            if(temp.val==val){
                return true;
            }
            temp=temp.next;
        }
        return false;
    }
     public static ListNode insertAtEnd(ListNode head, int val){
           ListNode newNode= new ListNode(val);
          ListNode temp=head;
          while(temp.next!=null){
            temp=temp.next;
          }
          temp.next= newNode;
          return newNode;
    }
    public static ListNode insertHead(ListNode head, int val){
           ListNode newNode= new ListNode(val);
           newNode.next=head;
           return newNode;
    }
    public static void printList(ListNode head){
        ListNode temp=head;
        while (temp!=null){
            System.out.print(temp.val+" ");
            temp=temp.next;
        }
        System.out.println("null");

    }
}