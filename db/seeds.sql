INSERT INTO department (department_name)
VALUES 
('IT'),
('HR'),
('Sales'),
('Engineering'),
('Finance'),
('Legal');

INSERT INTO role (title, salary, department_id)
VALUES
('Recruiter', 20000, 2),
('HR Accountant', 20000, 2),
('HR Supervisor', 20000, 2),
('Engineer', 85000, 4),
('Attorney', 20000, 6),
('Legal Accountant', 20000, 6),
('Legal Advisor', 20000, 6),
('Accountant', 20000, 5),
('Advisor', 20000, 5),
('Financial Attorney', 20000, 5),
('Lead Engineer', 20000, 4),
('Head of Engineering', 20000, 4),
('IT Lead Tech', 20000, 1),
('IT Project Manager ', 20000, 1),
('IT Project Director', 20000, 1),
('Sales Person', 20000, 3),
('Sales Lead', 20000, 3),
('Sales Director', 20000, 3);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES
('Dottie', 'O''Neil', 12, NULL),
('Becky', 'Houlihan', 13, 1),
('April', 'Romper', 14, 1),
('Dale', 'Robson', 3, 2),
('William', 'Louie', 9, 2),
('Carl', 'Cliffbeard', 11, 2),
('Jackie', 'O''Rourke', 6, 2),
('Bob', 'Johnson', 1, 4),
('Frank', 'Dodson', 1, 4),
('Jim', 'Bobson', 2, 4),
('Frankie', 'Codson', 4, 7),
('Bill', 'Brewer', 5, 7),
('Dom', 'Chewer', 5, 7),
('Mary', 'Bronson', 7, 5),
('Sarah', 'Robbie', 8, 5),
('Jeb', 'Johnnygriff', 10, 6),
('Barton', 'Heathcliffscruff', 10, 6);