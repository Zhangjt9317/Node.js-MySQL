-- drop the database if it already existed --
DROP DATABASE IF EXISTS bamazon_DB;

-- create the database -- 
CREATE DATABASE bamazon_DB;

-- use the created database -
USE bamazon_DB;

-- create the mysql table --
CREATE TABLE product(
	-- ID of one item --
	item_id INTEGER NOT NULL AUTO_INCREMENT,
    -- product names -- 
	product_name VARCHAR(100) NOT NULL,
    -- department of the product -- 
    department_name VARCHAR(100) NOT NULL,
    -- price of the product --
    price DECIMAL(10,2) NULL,
    -- stock left for this product --
    stock_quantity INTEGER NULL,
    
    -- primary key set to be the item ID --
    PRIMARY KEY (item_id)
);

INSERT INTO product (product_name, department_name, price, stock_quantity)
VALUES ("iphone8", "phones", 800, 39);

INSERT INTO product (product_name, department_name, price, stock_quantity)
VALUES ("iphone7", "phones", 550, 12);

INSERT INTO product (product_name, department_name, price, stock_quantity)
VALUES ("iphone6", "phones", 350, 22);

INSERT INTO product (product_name, department_name, price, stock_quantity)
VALUES ("Bose Comfort 35", "headphones", 350, 10);

INSERT INTO product (product_name, department_name, price, stock_quantity)
VALUES ("All-new Echo Dot", "speakers", 30, 220);

INSERT INTO product (product_name, department_name, price, stock_quantity)
VALUES ("iphone5S", "phones", 250, 10);

INSERT INTO product (product_name, department_name, price, stock_quantity)
VALUES ("Apple MacBook Air", "laptops", 1149, 28);

INSERT INTO product (product_name, department_name, price, stock_quantity)
VALUES ("Microsoft Surface Book 2", "laptops", 2380, 12);

INSERT INTO product (product_name, department_name, price, stock_quantity)
VALUES ("Cards Against Humanity", "games", 25, 1000);

INSERT INTO product (product_name, department_name, price, stock_quantity)
VALUES ("V for Vendetta", "comics", 0, 1000);
