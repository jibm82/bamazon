module.exports = {
    "up": `CREATE TABLE products (
        item_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
        product_name VARCHAR(100) NOT NULL,
        department_name VARCHAR(100) NOT NULL,
        price DECIMAL(10,2) NOT NULL,
        stock_quantity INT NOT NULL
    )`,
    "down": "DROP TABLE products"
}