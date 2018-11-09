module.exports = {
    up: `INSERT INTO departments VALUES
            (1, 'Entertaintment', 11000),
            (2, 'Grocery', 5000),
            (3, 'Clothing', 8500),
            (4, 'Sports', 6999.99)`,
    down: "DELETE FROM departments"
}