module.exports = {
    up: `INSERT INTO products(product_name, department_id, price, stock_quantity)
          VALUES 
            ('Uncharted 4', 1, 49.95, 150),
            ('DOOM', 1, 59.99, 200),
            ('Crate of Spam', 2, 24.50, 50),
            ('Cool Shades', 3, 75.00, 5),
            ('Worn Denim Jeans', 3, 54.25, 35),
            ('Survival Towel', 4, 42.42, 42),
            ('Back to the Future', 1, 15.00, 25),
            ('Mad Max: Fury Road', 1, 25.50, 57),
            ('Monopoly', 1, 30.50, 35),
            ('Yahtzee', 1, 19.95, 23)`,
    down: "DELETE FROM products"
}