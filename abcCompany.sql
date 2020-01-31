DROP DATABASE IF EXISTS abcCompany_DB;
CREATE DATABASE abcCompany_DB;

USE abcCompany_DB;

CREATE TABLE employee(
  id INT NOT NULL AUTO_INCREMENT,
  first_name VARCHAR(30) NOT NULL,
  last_name VARCHAR(30) NOT NULL,
  role_id INT default 0,
  manager_id INT default 0,
  PRIMARY KEY (id)
);

CREATE TABLE role(
    title VARCHAR(30),
    salary DECIMAL,
    department-id INT,
);

CREATE TABLE department(
    name VARCHAR(30)
)
