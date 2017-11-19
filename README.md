#bamazon-by-wfk
Bamazon-by-wfk is a console based application which displays the items and prices avaialable and lets the user select the item and quantity.

It then makes a SQL call to the database to confirm the quantity is available. 

* If  it is available..then the 'order' is placed and another SQL call is made to deduct (update) the available quanity.  Lastly, it prints the total cost for the product.

* If is it not available, the a  message is displayed to the user that the quantity is not available.

1. The application is started by navigation  to the directory and running "node bamazonCustomer"
 (/assets/docImages/logon.png)

2. A list of items will be displayed and a prompt to select an item
(/assets/docImages/selectItem.png) 

3. Then enter the amount desired.
(/assets/docImages/enterQuantity.png)

4. The system will check availabity and 
4.a if enough is availabe, a message is displayed that the items will ship and the total cost.
(/assets/docImages/orderFilled.png)

4.b if not enough is availalbe, a message is displayed that not enough is available to meet the order.
(/assets/docImages/notEnough.png)

5. The application ends after that.

