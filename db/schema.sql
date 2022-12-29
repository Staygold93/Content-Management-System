DROP DATABASE IF EXISTS employeeTracker_db;


CREATE DATABASE employeeTracker_db;


USE employeeTracker_db;


CREATE TABLE department (
    department_id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(30)
);

CREATE TABLE role (
    role_id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(30),
    salary DECIMAL,
    department_id INT,
    CONSTRAINT foreignKey_department FOREIGN KEY (department_id) REFERENCES department(id) 
    ON DELETE CASCADE
);

CREATE TABLE employee (
    id INTEGER AUTO_INCREMENT PRIMARY KEY 
    first_name VARCHAR(30) NOT NULL,
    last_name VARCHAR(30) NOT NULL,
    role_id INTEGER 
    manager_id INTEGER NULL,
    CONSTRAINT 
