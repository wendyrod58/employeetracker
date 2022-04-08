use employees_db; 

CREATE TABLE department (
    id INT AUTO_INCREMENT PRIMARY KEY, 
    name VARCHAR(30) NOT NULL 
);

CREATE TABLE role (
    id INT AUTO_INCREMENT PRIMARY KEY, 
    title VARCHAR(30) NOT NULL , 
    salary DECIMAL(10,2) , 
    -- Foreign key column 
    department_id INT NOT NULL, 
    FOREIGN KEY (department_id) REFERENCES department(id) ON DELETE CASCADE
);

CREATE TABLE employee (
    id INT AUTO_INCREMENT PRIMARY KEY, 
    first_name VARCHAR(30) NOT NULL , 
    last_name VARCHAR(30) NOT NULL , 
    -- Foreign key column 
    role_id INT NOT NULL, 
    manager_id INT , 
    FOREIGN KEY (role_id) REFERENCES role(id) ON DELETE CASCADE, 
    -- SELF JOIN 
    FOREIGN KEY (manager_id) REFERENCES employee(id) ON DELETE SET NULL
);