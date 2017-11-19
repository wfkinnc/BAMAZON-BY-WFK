#bamazon-by-wfk
Bamazon-by-wfk is a console based application which displays the items and prices avaialable and lets the user select the item and quantity.

It then makes a SQL call to the database to confirm the quantity is available. 

* If  it is available..then the 'order' is placed and another SQL call is made to deduct (update) the available quanity.  Lastly, it prints the total cost for the product.

* If is it not available, the a  message is displayed to the user that the quantity is not available.

image (/assets/docImages/tstImg.png) 