DROP DATABASE IF EXISTS abcCompany_DB;
CREATE DATABASE abcCompany_DB;

USE abcCompany_DB;

CREATE TABLE department(
  department_id INTEGER(20) PRIMARY KEY NOT NULL AUTO_INCREMENT,
  name VARCHAR(45)
);

CREATE TABLE roles(
   role_id INTEGER(20) PRIMARY KEY NOT NULL AUTO_INCREMENT,
   title VARCHAR(30) NOT NULL,
   salary DECIMAL NULL,
   department_id INTEGER(20),
   FOREIGN KEY (department_id) REFERENCES department(department_id)
);

CREATE TABLE employee(
  employee_id INTEGER(20) PRIMARY KEY NOT NULL AUTO_INCREMENT,
  first_name VARCHAR(30) NOT NULL,
  last_name VARCHAR(30) NOT NULL,
  role_id INTEGER(20),
  manager_id INTEGER(20),
  FOREIGN KEY (role_id) REFERENCES roles(role_id)
);
USE abccompany_db;
SELECT * FROM employee;
USE abccompany_db;
SELECT * FROM department;
USE abccompany_db;
SELECT * FROM roles;