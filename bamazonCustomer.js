// import packages 
var mysql = require("mysql");
var inquirer = require("inquirer");
var table = require("cli-table");

// Create the Connection to the DB //
var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,

    user: "root",
    password: "password",
    database: "bamazon_DB"
});

// Connect to SQL server and SQL DB
connection.connect(function (err) {
    if (err) {
        throw error;
    } else {
        display();
    }
});

//function to display items for sale on the console
function display() {
    connection.query('SELECT * FROM product', function (err, res) {
        if (err) {
            throw error;
        } else {
            for (var i = 0; i < res.length; i++) {
                console.log('ID: ' + res[i].item_id + '  Product: ' + res[i].product_name + '  Department: ' + res[i].department_name);
                console.log('Price: ' + res[i].price + '  Amount Left: ' + res[i].stock_quantity);
                console.log('===================================================================');
            }
            //call function to start the user prompt for shopping//
            start();
        }
    });
}

// function to prompt user  on what they would like to do
function start() {
    connection.query("SELECT * FROM product", function (err, res) {
        if (err) {
            throw error;
        } else {
            inquirer.prompt([
                {
                    name: 'enteredID',
                    type: 'input',
                    message: 'Enter the ID for product you wish to purchase: ',

                    // validate the value input
                    validate: function (value) {
                        if (isNaN(value) === false) {
                            return true;
                        }
                        return false;
                    }

                },

                {
                    name: 'amountBought',
                    type: 'input',
                    message: 'How many would you like?',
                    validate: function (value) {

                        // validate the number input 
                        if (isNaN(value) === false) {
                            return true;
                        }
                        return false;
                    }

                }
            ]).then(function (answers) {
                var query = "SELECT * FROM product WHERE ?";
                connection.query(query, { id: answers.enteredID },
                    function (err, res) {
                        if (err) {
                            throw error;
                        }

                        // get the information of the chosen item, set input to variables, pass variables as Parameters
                        var stock = res[0].stock_quantity;
                        var itemBought = answers.amountBought;

                        if (stock >= itemBought) {
                            var leftstock = stock - itemBought;

                            var totalPrice = res[0].price * itemBought;
                            var itemPurchased = res[0].product;

                            console.log("total price of items bought: " + totalPrice);

                            connection.query(
                                "UPDATE product SET ? WHERE ?", [
                                    { stock_quantity: leftstock }, { item_id: answers.enteredID }
                                ],
                                function (err, res) {
                                    if (err) {
                                        throw error;
                                    } else {
                                        console.log(price, amountBought);
                                        console.log("==============================================");
                                        console.log("\n\r");
                                        console.log("Order details:");
                                        console.log("Item(s) purchased: " + itemPurchased);
                                        console.log("amount purchased: " + itemBought + " at price each of $" + res[0].price);
                                        console.log("Total price: $" + totalPrice);
                                        console.log("\n\r");
                                        console.log("==============================================");
                                        display();
                                    }
                                }
                            );
                        } else {
                            console.log("==============================================");
                            console.log("\n\r");
                            console.log("Insuffcient quantity, please select another amount");
                            console.log("\n\r");
                            console.log("==============================================");
                            display();
                        }

                    });

            });
        }
    });
}