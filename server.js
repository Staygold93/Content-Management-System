const inquirer = require("inquirer");
const mysql = require("mysql2");
const tables = require("console.table");





const connection = mysql.createConnection({
    host: 'localhost',
    port: 3001,
    user: 'root',
    password: "",
    database: 'departments_db'
});










    function initialPrompt() {
        inquirer.prompt([

            {
                type: 'list',
                name: 'userChoice',
                message: 'What would you like to do ?',
                choices: ["View All Employees", 
                          "Add an Employee",
                          "Update Employee Role", 
                          "View All Roles",
                          "Add Role", 
                          "View All Departments",
                          "Add Department"
                         ]

            }
        ]).then(function(val) {
            switch(val.choice) {
                case "View All employees":
                    viewAllEmployees();
                    break;

                case "Add An Employee":
                    addEmployee();
                    break;

                case "Update Employee Role":
                     updateEmployee();
                     break;

                case "View All Roles":
                     viewAllRoles(); 
                     break;

                case "Add Role":
                     addRole(); 
                     break;

                case "View All Departments":
                     viewAllDepts(); 
                     break;

                     case "Add Department":
                     addDept(); 
                     break;
                 
            }
        })
    }


    function viewAllEmployees() {
    const sql = `SELECT employee.id,
                employee.first_name,
                employee.last_name,
                role.title AS job_title,
                department.department_name,
                role.salary,
                CONCAT(manager.first_name, ' ' ,manager.last_name) AS manager
                FROM employee
                LEFT JOIN role ON employee.role_id = role.id
                LEFT JOIN department ON role.department_id = department.id
                LEFT JOIN employee AS manager ON employee.manager_id = manager.id
                ORDER By employee.id`;
    db.query(sql, (err, result) => {
        if (err) throw err;
        console.table(result);
        initialPrompt();
    });
};






function addEmployee() {
    inquirer.prompt([
        {
            name: "first_name",
            type: "input",
            message: "Please enter the first name of the employee."
        },
        {
            name: "last_name",
            type: "input",
            message: "Please enter the last name of the employee."
        },
        {
            name: "role",
            type: "number",
            message: "What is the employess role?."
        },
        

    ]).then(function (response) {
        db.query("INSERT INTO employee (first_name, last_name, role, ) VALUES (?, ?, ?, ?)",
         [response.first_name, response.last_name, response.role], function (err, data) {
            if (err) throw err;
            console.log('The new employee entered has been added successfully to the database.');

            db.query(`SELECT * FROM employee`, (err, result) => {
                if (err) {
                    res.status(500).json({ error: err.message })
                    startPrompt();
                }
                console.table(result);
                startPrompt();
            });
        })
});
};





initialPrompt();