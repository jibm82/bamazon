module.exports = {
    up: `CREATE TABLE products (
        item_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
        product_name VARCHAR(100) NOT NULL,
        department_id INT NOT NULL,
        price DECIMAL(10,2) NOT NULL,
        stock_quantity INT NOT NULL,
        product_sales DECIMAL(10,2) NOT NULL DEFAULT 0,
        FOREIGN KEY fk_department(department_id)
        REFERENCES departments(department_id)
    )`,
    down: "DROP TABLE products"
}