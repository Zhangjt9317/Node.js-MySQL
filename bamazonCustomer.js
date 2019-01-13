// import packages
var mysql = require("mysql");
var inquirer = require("inquirer");


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
    if (err) { throw err; }

    // run start function after connection is made to prompt user
    showproduct_names();
});


//function to display items for sale on the console
function showproduct_names() {
    connection.query('SELECT * FROM product', function (err, res) {
        if (err) throw err;

        for (var i = 0; i < res.length; i++) {
            console.log('Item : ' + res[i].item_id + ' product : ' + res[i].product_name + ' department: ' + res[i].department_name);
            console.log('price : ' + res[i].price + ' quantity Left : ' + res[i].stock_quantity);
            console.log(' ');

        }
        //call function to start the user prompt 
        start();
    });
}

// starting
function start() {
    connection.query("SELECT * FROM product", function (err, res) {
        if (err) throw console.log("connection error:" + err);
        inquirer
            .prompt([
                {
                    name: 'select_id',
                    type: 'input',
                    message: 'Enter the ID of a product you wish to purchase:',
                    valitem_idate: function (value) {
                        if (isNaN(value) === false) {
                            return true;
                        }
                        return false;
                    }

                },

                {
                    name: 'amountBought',
                    type: 'input',
                    message: 'How much do you want?',
                    valitem_idate: function (value) {
                        if (isNaN(value) === false) {
                            return true;
                        }
                        return false;
                    }

                }

            ]).then(function (answers) {
                var query = "SELECT * FROM product WHERE ?";
                connection.query(query, {
                    item_id: answers.select_id
                }, function (err, res) {
                    if(err) throw err;

                    var inStock = res[0].stock_quantity;
                    var itemBought = answers.amountBought;

                    if (inStock >= itemBought) {
                        var leftInStock = inStock - itemBought;
                        var totalPrice = res[0].price * itemBought;
                        var itemPurchased = res[0].product_name;

                        console.log("Total price of items bought: " + totalPrice);

                        connection.query(
                            "UPDATE product SET ? WHERE ?", [
                                {
                                    stock_quantity: leftInStock

                                },
                                {
                                    item_id: answers.select_id
                                }

                            ],
                            function (error) {
                                //                            console.log(price, amountBought);
                                if (error) throw err;
                                console.log("==============================================");
                                console.log("\n\r");
                                console.log("Order details:");
                                console.log("Item(s) purchased: " + itemPurchased);
                                console.log("quantity purchased: " + itemBought + " @ $" + res[0].price);
                                console.log("Total Cost: $" + totalPrice);
                                console.log("\n\r");
                                console.log("Thank you for visiting");
                                console.log("==============================================");
                                showproduct_names();

                            }
                        );
                    } else {
                        console.log("==============================================");
                        console.log("\n\r");
                        console.log("Insufficient Supply, Please Select the Other Amount");
                        console.log("\n\r");
                        console.log("==============================================");
                        showproduct_names();

                    }

                });

            });
    });
}
