////////////////////////////////////////////////////////////////////////////////
// FILENAME: bamazonCustomer.js
// PURPOSE: customer interface for BAMAZON
// DATE: 11/14/17
// AUTHOR: W KASSEBUM
////////////////////////////////////////////////////////////////////////////////

//gets the environent paramters
require('dotenv').config({path: 'web-inf/.env' });


// inquirer module to capture selections
var inquirer = require("inquirer");

// mysql module to communicate w/ the db
var mysql 	= require("mysql");

// console.table package to display items nicely
require('console.table');

// importing the Purchase object
var Purchase = require("./assets/objects/Purchase.js");

// holding  the  priceof the selected item
var itmPrice = 0;

//making prodResults availalbe 
//var prodResults = "";

var connection = mysql.createConnection({

	host: process.env.DB_HOST,
	port: process.env.DB_PORT,
	user: process.env.DB_ID,
	password: process.env.DB_PASS,
	database: process.env.DB_INSTANCE

});

connection.connect(function(err){
	if(err) throw err;

	console.log("Connection establise to " + process.env.DB_INSTANCE);

	// getting data from teh query
	connection.query("SELECT item_id AS 'Item',product_name AS 'Product', price AS 'Price' FROM products", getProducts);
	connection.end();



})// end fcn


function getSalesInfo(passItemArray){
	//////////////////////////////////////
	// prmpts the users for the item ID and quantity
	// then creaed newProduct instance of the Product object
	// then checks availabilty and if enough is available,
	// - calls deduct method
	// - prints the total cost
	// other wise, prints mssage that order cannot be filled
	/////////////////////////////////////// 
	var retQty = 0;
	var totCost = 0;
	var holdItemList = (passItemArray);

	inquirer.prompt([{
		type: "input",
		name: "ordrItem",
		message: "Please select an Item."
	},
	{
		type: "input",
		name: "ordrQuantity",
		message: "Please select How Many you wish."
	}]).then(function(salesInfo){
		 
		var newPurchase =new Purchase(salesInfo.ordrItem, salesInfo.ordrQuantity);
		console.log("----------------------------------------------------");
		console.log("Thank you..we are checking aviability on the item.");
		console.log("Item ID is "	+	newPurchase.enteredItem );
		console.log("----------------------------------------------------");
		
		newPurchase.checkAvailability(function(result){

			retQty = result;

			if (parseInt(retQty,10)>= parseInt(salesInfo.ordrQuantity,10)){
				var updtQty =  parseInt(retQty,10) - parseInt(salesInfo.ordrQuantity,10) ;
				newPurchase.updateQuantity(updtQty, function(updtResult){
					if (updtResult > 0){
						console.log("------------------------------")
						console.log("Yes..We will ship the product.");
						console.log("------------------------------")
						// getting pricde of the from the item array
						for (var index in holdItemList){
							if (holdItemList[index].Item == newPurchase.enteredItem){

								totCost =  holdItemList[index].Price  * salesInfo.ordrQuantity;
									console.log("------------------------------")
									console.log("Your Total Cost is: " + totCost);
									console.log("------------------------------")
							}
						}

					} else {
						console.log("----------------------------------------------")						
						console.log("There is still a problem completing our order");
						console.log("----------------------------------------------")						
					}

				 });
			} else {
				console.log("~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~");
				console.log("We appologize, we have insufficient quantity to honor your request.")
				console.log("You ordered " + salesInfo.ordrQuantity + ", we only have " + retQty + " items.");
				console.log("~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~");
			}
		
			
		});	// end newPurchase	
	}); // end reqirer.
}// endGetSales



function getProducts(err, prodResults){
	// display error 
	if (err) {
		throw err;
	}

	console.table(prodResults);

getSalesInfo(prodResults);
//getSalesPrice(prodResults)
}// end getProducts

