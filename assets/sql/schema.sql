CREATE database bamazon;

USE bamazon;
CREATE TABLE products (
item_id INT NOT NULL AUTO_INCREMENT,
product_name VARCHAR(75) NOT NULL,
department_name VARCHAR(25) NOT NULL,
price FLOAT(8 ,2),
stock_quantity INT(8),
PRIMARY KEY (item_id)
);