const inquirer = require('inquirer');
const db = require('./db/connection');
require("console.table");
const mysql = require('mysql2');


db.connect(err => {
    if (err) throw err;
    console.log('Database connected.');
    initialPrompt();
});



function initialPrompt() {
    inquirer.prompt([

        {
            type: 'list',
            name: 'choice',
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
    db.query("SELECT employee.first_name, employee.last_name, role.title, role.salary, department.name, CONCAT(e.first_name, ' ' ,e.last_name) AS Manager FROM employee INNER JOIN role on role.id = employee.role_id INNER JOIN department on department.id = role.department_id left join employee e on employee.manager_id = e.id;", 
    function(err, res) {
      if (err) throw err
      console.table(res)
      initialPrompt()
  })
}


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
                initialPrompt();
            }
            console.table(result);
            initialPrompt();
        });
    })
});
};


function viewAllRoles() {
    db.query("SELECT employee.first_name, employee.last_name, role.title AS Title FROM employee JOIN role ON employee.role_id = role.id;", 
    function(err, res) {
    if (err) throw err
    console.table(res)
     initialPrompt()
    })
  }


  function viewAllDepts() {
    db.query("SELECT employee.first_name, employee.last_name, department.name AS Department FROM employee JOIN role ON employee.role_id = role.id JOIN department ON role.department_id = department.id ORDER BY employee.id;", 
    function(err, res) {
      if (err) throw err
      console.table(res)
       initialPrompt()
    })
  }


  var roleArr = [];
  function selectRole() {
    db.query("SELECT * FROM role", function(err, res) {
      if (err) throw err
      for (var i = 0; i < res.length; i++) {
        roleArr.push(res[i].title);
      }
  
    })
    return roleArr;
  }
 
  var managersArr = [];
  function selectManager() {
    db.query("SELECT first_name, last_name FROM employee WHERE manager_id IS NULL", function(err, res) {
      if (err) throw err
      for (var i = 0; i < res.length; i++) {
        managersArr.push(res[i].first_name);
      }
  
    })
    return managersArr;
  }

  function addEmployee() { 
      inquirer.prompt([
          {
            name: "firstname",
            type: "input",
            message: "Enter their first name "
          },
          {
            name: "lastname",
            type: "input",
            message: "Enter their last name "
          },
          {
            name: "role",
            type: "list",
            message: "What is their role? ",
            choices: selectRole()
          },
          {
              name: "choice",
              type: "rawlist",
              message: "Whats their managers name?",
              choices: selectManager()
          }
      ]).then(function (val) {
        var roleId = selectRole().indexOf(val.role) + 1
        var managerId = selectManager().indexOf(val.choice) + 1
        db.query("INSERT INTO employee SET ?", 
        {
            first_name: val.firstName,
            last_name: val.lastName,
            manager_id: managerId,
            role_id: roleId
            
        }, function(err){
            if (err) throw err
            console.table(val)
            initialPrompt()
        })
  
    })
  }

  function updateEmployee() {
    db.query("SELECT employee.last_name, role.title FROM employee JOIN role ON employee.role_id = role.id;", function(err, res) {
    // console.log(res)
     if (err) throw err
     console.log(res)
    inquirer.prompt([
          {
            name: "lastName",
            type: "rawlist",
            choices: function() {
              var lastName = [];
              for (var i = 0; i < res.length; i++) {
                lastName.push(res[i].last_name);
              }
              return lastName;
            },
            message: "What is the Employee's last name? ",
          },
          {
            name: "role",
            type: "rawlist",
            message: "What is the Employees new title? ",
            choices: selectRole()
          },
      ]).then(function(val) {
        var roleId = selectRole().indexOf(val.role) + 1
        db.query("UPDATE employee SET WHERE ?", 
        {
          last_name: val.lastName
           
        }, 
        {
          role_id: roleId
           
        }, 
        function(err){
            if (err) throw err
            console.table(val)
            initialPrompt()
        })
  
    });
  });

  }

function addRole() { 
  db.query("SELECT role.title AS Title, role.salary AS Salary FROM role",   function(err, res) {
    inquirer.prompt([
        {
          name: "Title",
          type: "input",
          message: "What is the roles Title?"
        },
        {
          name: "Salary",
          type: "input",
          message: "What is the Salary?"

        } 
    ]).then(function(res) {
        db.query(
            "INSERT INTO role SET ?",
            {
              title: res.Title,
              salary: res.Salary,
            },
            function(err) {
                if (err) throw err
                console.table(res);
                initialPrompt();
            }
        )

    });
  });
  }

function addDepartment() { 

    inquirer.prompt([
        {
          name: "name",
          type: "input",
          message: "What Department would you like to add?"
        }
    ]).then(function(res) {
        var query = connection.query(
            "INSERT INTO department SET ? ",
            {
              name: res.name
            
            },
            function(err) {
                if (err) throw err
                console.table(res);
                initialPrompt();
            }
        )
    })
  }

  

   



















































































