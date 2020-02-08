const inquirer = require("inquirer");
const cTable = require("console.table");
const mySQL = require("mysql");

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
/// Initial questions to begin application //////////////////////////////////////////////////////////////////////////////
const startQuestions = [
    {
        type: "list",
        message: "What would you like to do?",
        choices: [
            "View All Employees",
            "View All Employees By Department",
            "Add Employee",
            "Add Role",
            "Add Department",
            "Update Employee Role",
        ],
        name: "firstQuestion",
    }
]

// Function to start application through Inquirer. Answers determine which functions will be initiated  ////////////////////////////////////
function start() {
    inquirer.prompt(startQuestions)
        .then(function (answer) {
            if (answer.firstQuestion === "View All Employees") {
                viewEmployees();
            }
            else if (answer.firstQuestion === "View All Employees By Department") {
                viewByDept();
            }
            else if (answer.firstQuestion === "Add Employee") {
                addEmployee();
            }
            else if (answer.firstQuestion === "Update Employee Role") {
                updateRole();
            }
            else if (answer.firstQuestion == "Add Department") {
                addDepartment();
            }
            else if (answer.firstQuestion == "Add Role") {
                addRole();
            } else {
                connection.end();
            }
        })
};

/// Add employee function ///////////////////////////////////////////////////////////////////////////////////////////////
async function addEmployee() {
    //mysql query to pull role list for inquirer prompt///
    connection.query("SELECT title , role_id FROM roles", function (err, resOne) {
        if (err) throw err;
        console.log("This is resOne");
        console.log(resOne);
        let roles = resOne.map(each => each.title);
        console.log(roles);

        //mysql query to pull employee list for management inquirer prompt///
        connection.query("SELECT concat(first_name, ' ', last_name) as manager_name, employee_id FROM employee", function (err, resTwo) {
            if (err) throw err;
            console.log("This is resTwo")
            console.log(resTwo);
            let managers = resTwo.map(each => each.manager_name);
            let managerID = resTwo.map(each => each.employee_id);
            managers.push("none");
            console.log(managers);
            console.log(managerID);

            /// inquirer prompt - Questions to add new employee////////////////////////////////////
            inquirer.prompt([
                {
                    type: "input",
                    message: "What is the employee's first name?",
                    name: "firstName"
                },
                {
                    type: "input",
                    message: "What is the employee's last name?",
                    name: "lastName"
                },
                {
                    type: "list",
                    message: "What is the employee's role?",
                    choices: roles,
                    name: "role"
                },
                {
                    type: "list",
                    message: "Who is the employee's manager?",
                    choices: managers,
                    name: "managers"
                }
            ])
                // inquirer call-back to define manager id//////
                .then(function (answer) {
                    console.log("This is console.log of answer");
                    console.log(answer);
                    if (answer.managers == "none") {
                        assignedManagerID = null
                    } else {
                        assignedManagerID = resTwo.filter(function (object) {
                            if (answer.managers = object.manager_name) {
                                return (object)
                            }
                        });
                        console.log(assignedManagerID);
                        assignedManagerID = assignedManagerID[0].employee_id;
                    };
                    let assignedRoleID = resOne.filter(function (object) {
                        if (answer.roles = object.title) {
                            return (object)
                        }
                    });
                    console.log(assignedRoleID);
                    assignedRoleID == assignedRoleID[0].role_id;


                    console.log("This should be the assigned manager's ID: " + assignedManagerID);
                    console.log(answer.firstName + "this is the first name")
                    // uses mysql node module to insert new employee information into database ////
                    connection.query(
                        'INSERT INTO employee set ?',
                        {
                            first_name: answer.firstName,
                            last_name: answer.lastName,
                            role_id: assignedRoleID,
                            manager_id: managerID
                        },
                        function (err) {
                            if (err) throw err;
                        },
                    )
                    console.log("Employee first/last name successfully added " + answer.firstName);
                    start();
                })
        });

    });
}

/// Add role function /////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function addRole() {
    //mysql query to pull departments for inquirer prompt///
    connection.query("SELECT department_name, department_id FROM department", function (err, res) {
        if (err) throw err;
        let DeptPlusID = res.map(each => each.department_name + " " + each.department_id);
        let deptID = res.map(each => each.department_id);
        let departments = res.map(each => each.department_name);
        console.log(res);
        console.log("This should be the department name and the department id " + DeptPlusID);
        console.log("This should be just the department names: " + departments);
        console.log("This should be just be the department numbers " + deptID);

        // inquirer prompt to add roles //
        inquirer.prompt([
            {
                type: "input",
                message: "What employee role would you like to add?",
                name: "positions",
            },
            {
                type: "list",
                message: "To which department would you like to assign this role?",
                choices: departments,
                name: "deptAssignment"
            },
            {
                type: "input",
                message: "What is this position's salary?",
                name: "salary",
            },

        ])
            /// inquirer call back to define answers //
            .then(function (answer) {
                console.log(answer);
                let matchedDeptID = res.filter(function (object) {
                    if (object.department_name == answer.deptAssignment) {
                        return (object)
                    }
                })

                matchedDeptID = matchedDeptID[0].department_id;

                // mysql query //
                connection.query(
                    'INSERT INTO  roles set ?',
                    {
                        title: answer.positions,
                        salary: answer.salary,
                        department_id: matchedDeptID
                    },
                    function (err) {
                        if (err) throw err;
                    },
                )
                console.log("Employee role successfully added");
                start();
            });
    });
}

// Function that allows user to add departments ///////////////////////////////////////////////////////////////
async function addDepartment() {
    // Use inquirer node module to prompt user for new department information /////////
    await inquirer.prompt([
        {
            type: "input",
            message: "What is the name of the department you would like to add?",
            name: "departmentName"
        }
    ])
        // Call back for inquirer node module //////////////////////////
        .then(function (answer) {
            // Use the mysql node module to insert new department into data base //////////////////////
            connection.query(
                "INSERT INTO department set ?",
                {
                    department_name: answer.departmentName,
                },
                function (err) {
                    if (err) throw err;
                }
            );
            start();
        })
};

// Function that allows for all employees to be displayed /////////////////////////////////////////////////////
function viewEmployees() {
    // Use mysql node module to select all information from employee table in data base ///////////
    connection.query("SELECT employee_id, first_name, last_name, title, salary, department_name, manager_id AS manager FROM employee JOIN roles USING(role_id) JOIN department USING(department_id);", function (err, res) {
        if (err) throw err;
        console.table(res);
        start();
    });
}

// Function that allows for employees to be grouped and viewed by their department //////////////////////////////
function viewByDept() {
    // Use mysql node module to select name from the employee table and the department name from the department table and join the data ///
    connection.query("SELECT first_name, last_name, department_name FROM employee JOIN roles USING(role_id) JOIN department USING(department_id);", function (err, res) {
        if (err) throw err;
        console.table(res);
        start();
    })
};

function updateRole() {
    connection.query("SELECT concat(first_name, ' ', last_name) as name from employee", function (err, resOne) {
        if (err) throw err;
        console.log(resOne);
        let empSel = resOne.map(each => each.name);
        console.log(empSel);

        connection.query("SELECT title , role_id FROM roles", function (err, resTwo) {
            if (err) throw err;
            console.log(resTwo);
            let roles = resTwo.map(each => each.title);
            console.log(roles);

            inquirer.prompt([
                {
                    type: "list",
                    message: "For which employee would you like to modify the role?",
                    choices: empSel,
                    name: "empSel"
                },
                {
                    type: "list",
                    message: "What is this employee's new role?",
                    choices: roles,
                    name: "roles"
                }
            ])
            // inquirer call back to define answers //
            .then(function (answer) {
                console.log(answer);
                let currentEmployee = resOne.filter(function (object) {
                    if (object.name == answer.empSel) {
                        return (object)
                    }
                });
                let newRoleID = resTwo.filter(function (object) {
                    if (object.title == answer.roles) {
                        return (object)
                    }
                })

            connection.query(
                `UPDATE employee SET role_id = ${newRoleID} WHERE name = ${currentEmployee}`,

                function (err) {
                    if (err) throw err;
                }
            );
            start();
            })
        })
    })
}
