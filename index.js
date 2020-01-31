const inquirer = require("inquirer");
// const consoleTable = require("console-table");
const mySQL = require("mysql");




// Create the connection information for the sql database ////////////////////////////
const connection = mySQL.createConnection({
    host: "localhost",

    // Your port; if not 3306 //////
    port: 3306,

    user: "root",
    password: "rootroot",
    database: "abcCompany_DB"
});

// Connect to the mysql server and sql database /////
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
            choices: ["View All Employees", "View All Employees By Department", "View All Employees By Manager", "Add Employee", "Update Employee Role", "Update Employee Manager"],
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
            } else {
                connection.end();
            }
        })
}


async function addEmployee() {
    let { firstName, lastName, role } =
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
                choices: ["Sales Lead", "Salesperson", "Lead Engineer", "Software Engineer", "Account Manager", "Accountant", "Legal Team Lead"],
                name: "role",
            }
        ])
}

function viewEmployees() {
    // Write function that allows all employees to be viewed ///
    console.log("This will be the view employees function")
}

function viewByDept() {
    //Write function that allows user to view employees by department //
    console.log("This will be the view employees by department function")
}

function viewByManager() {
    //Write function that allows user to view employees by manager //
    console.log("This will be the view employees by manager function")
}

function removeEmployee() {
    //Write function that allows user to remove an employee //
    // Which employee do you want to remove? //
    // John Doe //
    // Mike Chan //
    // Ashley Rodriguez //
    // Kevin Tupik //
    // Malia Brown //
    // Sarah Lourd //
    // Tom Allen //
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