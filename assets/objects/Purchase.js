var mysql = require("mysql");

var retQty = 0;
var passConn = mysql.createConnection({
// connection for a retrieval	
		host: process.env.DB_HOST,
		port: process.env.DB_PORT,
		user: process.env.DB_ID,
		password: process.env.DB_PASS,
		database: process.env.DB_INSTANCE
	
	});
var passUpdtConn  = mysql.createConnection({
// conneciton for an update
		host: process.env.DB_HOST,
		port: process.env.DB_PORT,
		user: process.env.DB_ID,
		password: process.env.DB_PASS,
		database: process.env.DB_INSTANCE
	
});
	
function Purchase(passEnteredItem,passEnteredQty){
	this.enteredItem 	= passEnteredItem,
	this.enteredQty 	= passEnteredQty,
	this.checkAvailability = function(callback){
		/////////////////////////////////////////////
		// runs step to check if the quantity is available
		// this is a SQL call to the db to the the stock_quantity and then
		// compare the the entered quantity
		/////////////////////////////////////////////
		this.useItem 	= this.enteredItem;
		this.useQty 	= this.enteredQty;
		this.retQty     = 0;
	// checks the avathis.retQtyilability of an item after making another SQL call to get the quantity for the item
	// getting the passed item and entered qty and going thru the JSON
	// object to  find availabilty
	// if availabe..do one thing
	// if not available..do another
	  
		var itemId = this.useItem;
		var itemQty= this.useQty;
		passConn.connect(function(err){
			if(err) throw err;
			getQuantity(itemId,function(result){
				this.retQty = result;
				callback(result);
			});
		passConn.end();	
		})// end fcn
	},// end checkAvailabity
	this.updateQuantity = function(updtQuantityAmt, callback){
      	/////////////////////////////////////////////
		//runs step to update teh quantity.
		////////////////////////////////////////
		var updtItem	= this.enteredItem;
		var updtQty     = updtQuantityAmt;
		var delQty 		= this.enteredQty;
		// updates the quanity 
		passUpdtConn.connect(function(err){
			if (err) throw err;
				updtQuantity(updtItem, updtQty, function(result){
				// sending the result back to the calling doc
				callback(result);
			}); // end passConn
			passUpdtConn.end();
		})// end fcn
	}//end  this.updateQuantity
} // end f cn

function getQuantity(item,callback) {
	/////////////////////////////////////////////
	// executs the sql query and retursn the result thru the callback
	/////////////////////////////////////////////
	var retQty = 0;
	passConn.query(
	  'SELECT stock_quantity FROM products WHERE ?',
	  {
		item_id: item
	  },
	  function(err, result) {
		if (err) throw err;
		retQty = result[0].stock_quantity;
		callback(retQty);		
	  });
  } // end fcn

function updtQuantity(item, updateQty, callback){
    ///////////////////////////////////////////////
	// running SQL query to update the product and
	// retrun the result changedRows
	///////////////////////////////////////////////
	var rowsAffected = 0;
	// SETTING THE JSON OBJECT W/ THE VALUES
	// CREATING THE SQL STRING..
	 var post  = [{
		stock_quantity: updateQty
		},
		{
		item_id: item
		}];
	 
	 var sqlQuery = 'UPDATE products SET ? WHERE ?';

	passUpdtConn.query(
		sqlQuery,
		post,
		function(err, result){
			if (err) throw err;
			callback(result.changedRows);
		});
}// end fcn delQuantity

  module.exports = Purchase;