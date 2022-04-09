const cTable = require('console.table');
const mysql = require('mysql2');
var inquirer = require('inquirer');

// create the connection to database
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'password',
    database: 'employees_db'
});



const managerQuestions = [{
    name: "actions",
    type: 'list',
    message: "What would you like to do?",
    choices: ["view all departments", "view all roles", "view all employees", "add a department", "add a role", "add an employee", "update an employee role", "Exit"]
}];


function init() {
    console.log("something happened")
    inquirer
        .prompt(managerQuestions)

        .then((answers) => {

            switch (answers.actions) {
                case "view all departments":
                    connection.query(
                        'SELECT * FROM department',
                        function (err, results, fields) {
                            console.log(err);
                            console.table(results); // results contains rows returned by server
                            //console.log(fields); // fields contains extra meta data about results, if available
                            //ask question again 
                            inquirer
                                .prompt(managerQuestions)
                        }
                    );
                    break;

                case "view all roles":
                    console.log("view all roles...");
                    connection.query(
                        'SELECT * FROM role',
                        function (err, results, fields) {
                            console.log(err);

                            // results contains rows returned by server
                            if (results.length > 0) {
                                console.table(results);
                            } else {
                                console.log("No roles found !!")
                            }
                            //ask question again 
                            inquirer
                                .prompt(managerQuestions)
                        });

                    break;
                case "view all employees":
                    // simple query
                    connection.query(
                        'SELECT * FROM employee',
                        function (err, results, fields) {
                            console.log(err);
                            if (results.length > 0) {
                                console.table(results);
                            } else {
                                console.log("No Employee's found !!")
                            }
                            inquirer
                                .prompt(managerQuestions)
                        }
                    );
                    break;
                case "add a department":
                    inquirer.prompt([{
                        name: "name",
                        type: 'input',
                        message: "What is the name of the department"
                    }]).then(response => {

                        connection.query(
                            `INSERT INTO department(name) VALUES ('${response.name}')`,
                            function (err, results, fields) {
                                console.log(err);
                                console.log("Added" + response.name + "department");
                                //ask question again 
                                inquirer
                                    .prompt(managerQuestions)
                            }
                        );
                    })

                    break;

                case "add a role":
                    console.log("add a role");
                    inquirer.prompt([
                        {
                            name: "title",
                            type: 'input',
                            message: "What is the name of the role?"
                        },
                        {
                            name: "salary",
                            type: 'input',
                            message: "What is the salary for this role?"
                        },
                        {
                            name: "department_id",
                            type: 'input',
                            message: "Please enter department id:"
                        },
                    ]).then(response => {

                        connection.query(
                            `INSERT INTO role(title, salary, department_id) VALUES ('${response.title}', ${response.salary}, ${response.department_id})`,
                            function (err, results, fields) {
                                console.log(err);
                                console.log("Added " + response.title + " succesfully");
                                //ask question again 
                                inquirer
                                    .prompt(managerQuestions)
                            }
                        );
                    })

                    break;

                default:
                    console.log("you can't do that yet...");
                    process.exit(0);
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
