USE abccompany_db;

INSERT INTO department (department_name) VALUE('Sales');
INSERT INTO department (department_name) VALUE('Finance');
INSERT INTO department (department_name) VALUE('Engineering');
INSERT INTO department (department_name) VALUE('Legal');
INSERT INTO department (department_name) VALUE('Accounting');

INSERT INTO roles (title, salary, department_id) VALUE('Sales Lead', '150000', 1);
INSERT INTO roles (title, salary, department_id) VALUE('Salesperson', '125000', 1);
INSERT INTO roles (title, salary, department_id) VALUE('Accountant', '175000', 5);
INSERT INTO roles (title, salary, department_id) VALUE('Lawyer', '180000', 4);
INSERT INTO roles (title, salary, department_id) VALUE('Engineer', '180000', 3);
INSERT INTO roles (title, salary, department_id) VALUE('Software Engineer', '185000', 3);
INSERT INTO roles (title, salary, department_id) VALUE('Loan Specialist', '165000', 2);

INSERT INTO employee (first_name, last_name, role_id) VALUES('Daisy', 'Duck', 1);
INSERT INTO employee (first_name, last_name, role_id) VALUES('Donald', 'Duck', 3);
INSERT INTO employee (first_name, last_name, role_id) VALUES('Captain', 'Hook', 5);
INSERT INTO employee (first_name, last_name, role_id) VALUES('Cinder', 'Ella', 4);
INSERT INTO employee (first_name, last_name, role_id) VALUES('Peter', 'Pan', 6);
INSERT INTO employee (first_name, last_name, role_id) VALUES('Mary', 'Poppins', 2);
INSERT INTO employee (first_name, last_name, role_id) VALUES('Prince', 'Charming', 3);



