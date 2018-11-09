module.exports = {
    up: `CREATE TABLE products (
        item_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
        product_name VARCHAR(100) NOT NULL,
        department_id INT NOT NULL,
        price DECIMAL(10,2) NOT NULL,
        stock_quantity INT NOT NULL,
        FOREIGN KEY fk_department(department_id)
        REFERENCES departments(department_id)
    )`,
    down: "DROP TABLE products"
}