var mysql = require("mysql");
var inquirer = require("inquirer");

var connection = mysql.createConnection({
  host: "localhost",

  // Your port; if not 3306
  port: 3306,

  // Your username
  user: "root",

  // Your password
  password: "INSERT PASSWORD",
  database: "greatbay_db"
});

connection.connect(function(err) {
  if (err) throw err;
  console.log("connected as id " + connection.threadId);
  startPrompt();
});

function startPrompt() {
  inquirer.prompt([
    {
      type: "list",
      message: "What would you like to do? ",
      choices: ["POST", "BID", "LEAVE"],
      name: "action"
    }
  ]).then(function(response) {
    switch(response.action) {

      case "POST":
        postItemPrompt();
        break;

      case "BID":
        bidItemPrompt();
        break;

      case "LEAVE":
        connection.end();
        break;

      default:
      break;
    }
  });
}

function postItemPrompt() {
  inquirer.prompt([
    {
      type: "input",
      message: "What is the name of the item posting? ",
      name: "name"
    },
    {
      type: "input",
      message: "What is the item category? ",
      name: "category"
    },
    {
      type: "input",
      message: "what is the starting bid? ",
      name: "startBid",
      default: 0
    }
  ]).then(function(response) {
    postItem( response.name, response.category, response.startBid);
  });
}

function postItem( name, category, startBid ) {
  var query = connection.query(
    "INSERT INTO greatbay SET ?",
    {
      objectName: name,
      category: category,
      bid: startBid
    },
    function(err, res) {
      console.log(res.affectedRows + " item inserted!\n");

      startPrompt();
    }
  );
}

function bidItemPrompt() {
  var query = connection.query("SELECT * FROM greatbay", function(err, res) {
    if (err) throw err;


    console.log(res);

    var items = [];

    for (var i = 0; i < res.length; i++){
      items[i] = res[i].objectName;
    }

    inquirer.prompt([
      {
        type: "list",
        message: "Which item would you like to bid on?",
        choices: items,
        name: "selection"
      }
    ]).then(function(response) {

      var selectedID = 0;
      var selectedBid = 0;

      for (var i = 0; i < res.length; i++){
        if (res[i].objectName === response.selection){
          selectedID = res[i].id;
          selectedBid = res[i].bid;
        }
      };

      bidItem(selectedID, selectedBid);
    });
  });
}

function bidItem( ID, currBid ) {
  inquirer.prompt([
    {
      type: "input",
      message: "How much would you like to bid? ",
      name: "userBid"
    }
  ]).then(function(response){
    connection.query("SELECT FROM greatbay WHERE ?",
    {
      id: ID
    },
    function(err, res){
      if (currBid > response.userBid){
        console.log("Your bid is too low!\n");
        startPrompt();
      }
      else {
        updateBid( ID, response.userBid);
      }
    });
  });
}

function updateBid( ID, userBid ) {
  var query = connection.query(
    "UPDATE greatbay SET ? WHERE ?",
    [
      {
        bid: userBid
      },
      {
        id: ID
      }
    ],
    function(err, res) {
      console.log("Item number: " + ID + " items updated!\n");
      startPrompt();
    }
  );
}
