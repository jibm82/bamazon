module.exports = {
    up: `CREATE TABLE departments (
        department_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
        department_name VARCHAR(100) NOT NULL,
        over_head_costs DECIMAL(10,2) NOT NULL
    )`,
    down: "DROP TABLE departments"
}