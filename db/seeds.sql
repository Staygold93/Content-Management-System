INSERT INTO department
  (name)
VALUES
  ('Engineering'),
  ('Sales'),
  ('Finance'),
  ('Legal');


INSERT INTO role
  (title, salary, department_id)
VALUES
  ('Lawyer', 200000, 4),
  ('Software Engineer', 90000, 1),
  ('Accountant', 90000, 3),
  ('Salesperson', 68000, 2);
  
  


INSERT INTO employee
  (first_name, last_name, role_id, manager_id)
VALUES
  ('Chucky', 'Lozano', 1, 4),
  ('Leonel', 'Messi', 2, 3),
  ('Gucci', 'Mane', 3, 1),
  ('Adalee', 'Avelar', 4, 5);
