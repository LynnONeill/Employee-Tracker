const inquirer = require("inquirer");
const consoleTable = require("console.table");
const mySQL = require("mysql");

const Employee = require("./lib/Employee");

// Create the connection information for the sql database ////////////////////////////
const connection = mySQL.createConnection({
    host: "localhost",

    port: 3306,

    user: "root",
    password: "rootroot",
    database: "abcCompany_DB"
});

// Connect to the mysql server and sql database /////////////////////////////////////
connection.connect(function (err) {
    if (err) throw err;
    console.log("mysql connection successful");
    start()
});

function start() {
    inquirer.prompt([
        {
            type: "list",
            message: "What would you like to do?",
            choices: [
                "View All Employees",
                "View All Employees By Department",
                "View All Employees By Manager",
                "Add Employee",
                "Update Employee Role",
                "Update Employee Manager",
                "Remove Employee"
            ],
            name: "firstQuestion",
        }
    ])
        .then(function (answer) {
            if (answer.firstQuestion === "View All Employees") {
                viewEmployees();
            }
            else if (answer.firstQuestion === "View All Employees By Department") {
                viewByDept();
            }
            else if (answer.firstQuestion === "View All Employees By Manager") {
                viewByManager();
            }
            else if (answer.firstQuestion === "Add Employee") {
                addEmployee();
            }
            else if (answer.firstQuestion === "Update Employee Role") {
                updateRole();
            }
            else if (answer.firstQuestion === "Update Employee Manager") {
                updateManager();
            }
            else if (answer.firstQuestion == "Remove Employee") {
                removeEmployee();
            } else {
                connection.end();
            }
        })
};

async function addEmployee() {
    await inquirer.prompt([
        {
            type: "input",
            message: "What is the employee's first name?",
            name: "firstName",
        },
        {
            type: "input",
            message: "What is the employee's last name?",
            name: "lastName",
        },
        {
            type: "list",
            message: "What is the employee's role?",
            choices: [
                "Sales Lead",
                "Salesperson",
                "Lead Engineer",
                "Software Engineer",
                "Account Manager",
                "Accountant",
                "Legal Team Lead"
            ],
            name: "role",
        },
        {
            type: "input",
            message: "What is this employee's salary?",
            name: "salary",
        },
        {
            type: "list",
            message: "What is employee's department?",
            choices: [
                "Sales",
                "Engineering",
                "Finance",
                "Legal",
            ],
            name: "departmentName",
        }
    ])
        .then(function (answer) {
            connection.query(
                "INSERT INTO roles SET ?",
                {
                    title: answer.role,
                    salary: answer.salary,
                },
                function (err) {
                    if (err) throw err;
                    console.log("Employee role successfully added");
                },
            );
            connection.query(
                "INSERT INTO employee set ?",
                {
                    first_name: answer.firstName,
                    last_name: answer.lastName,
                },
                function (err) {
                    if (err) throw err;
                    console.log("Employee first/last name successfully added " + answer.firstName);
                }
            );
            connection.query(
                "INSERT INTO department set ?",
                {
                    name: answer.departmentName,
                },
                function (err) {
                    if (err) throw err;
                    console.log("Employee department sucessfully added " + answer.departmentName);
                }
            )
        });
};

// Function that allows for all employees to be displayed /////////////////////////////////////////////////////
function viewEmployees() {
    connection.query('SELECT * FROM employee', function (err, res) {
        if (err) throw err;
        console.table(res);
        console.log("View employees function successful!")
    })
}

// Function that allows for employees to be grouped and viewed by their department //////////////////////////////
function viewByDept() {
    connection.query('SELECT ')
    console.log("This will be the view employees by department function")
};

// Function that allows for employees to be grouped and viewed by their manager ////////////////////////////////
function viewByManager() {
    console.log("This will be the view employees by manager function")
}

function removeEmployee() {
    //Write function that allows user to remove an employee //
    // Which employee do you want to remove? //
    console.log("This will be the remove employee function")
}

function updateRole() {
    //Write function that allows user to update employee role //
    console.log("This will be the update role function")
}

function updateManager() {
    //Write function that allows user to update an employees manager //
    // Which employee's manager do you want to update? //
    // Which employee do you want to set as manager for the selected employee? //
    console.log("This will be the update manager function")
}