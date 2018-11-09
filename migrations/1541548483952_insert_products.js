module.exports = {
    "up": `INSERT INTO products(product_name, department_name, price, stock_quantity)
        VALUES 
            ('Uncharted 4','Entertainment',49.95,150),
            ('DOOM','Entertainment',59.99,200),
            ('Crate of Spam','Grocery',24.50,50),
            ('Cool Shades','Clothing',75.00,5),
            ('Worn Denim Jeans','Clothing',54.25,35),
            ('Survival Towel','Sports',42.42,42),
            ('Back to the Future','Entertainment',15.00,25),
            ('Mad Max: Fury Road','Entertainment',25.50,57),
            ('Monopoly','Entertainment',30.50,35),
            ('Yahtzee','Entertainment',19.95,23);
    `,
    "down": "DELETE FROM products"
}