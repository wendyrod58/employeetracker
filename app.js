const cTable = require('console.table');
const mysql = require('mysql2');
var inquirer = require('inquirer');

// create the connection to database
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'password',
    database: 'employees'
  });
  
  

const managerQuestions = [{
    name: "actions",
    type: 'list',
    message: "What would you like to do?",
    choices: ["view all departments", "view all roles", "view all employees", "add a department", "add a role", "add an employee", "update an employee role"]
}];


function init(){
    console.log("something happened")
    inquirer
    .prompt(managerQuestions)

    .then((answers) => {
        switch(answers.actions){
            case "view all departments":
                connection.query(
                    'SELECT * FROM department',
                    function(err, results, fields) {
                        console.log(err);
                        console.log(results); // results contains rows returned by server
                        //console.log(fields); // fields contains extra meta data about results, if available
                    }
                );
                break;
            case "view all roles":
                console.log("view all roles...");
                break;
            case "view all employees":
                // simple query
                connection.query(
                    'SELECT * FROM employee',
                    function(err, results, fields) {
                        console.log(err);
                        console.log(results); // results contains rows returned by server
                        //console.log(fields); // fields contains extra meta data about results, if available
                    }
                );
                break;
            case "add a department":
                /*connection.query(
                    'INSERT INTO department(name, id) VALUES (' + answers.value + ')',
                    function(err, results, fields) {
                        console.log(err);
                        console.log(results); // results contains rows returned by server
                        //console.log(fields); // fields contains extra meta data about results, if available
                    }
                );*/
                break;
            default:
                console.log("you can't do that yet...")
        }
    })
    .catch((error) => {
        if (error.isTtyError) {
        console.log(error)
        } else {
        console.log(error)
        }
    });
}

init();
