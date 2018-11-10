# Bamazon
Node JS Command Line Shopping App

This project consist of a series of command line apps for handling a store. There are three applications for different type of users.

## bamazonCustomer.js
This application allows a customer to purchase an item from the store. Users can specify how many units would they want to buy. If there are enough units to complete the order the application will process the purchase and return the amount to be paid. Inventory will be updated.

### Demo
![customer demo](https://github.com/jibm82/bamazon/raw/master/screens/bamazonCustomer.gif)

## bamazonManager.js
This application will allow managers to list all the items, list all the items that are low on inventory (Where stock units are less than 5), add units to inventory and create new products.

### Demo
![customer demo](https://github.com/jibm82/bamazon/raw/master/screens/bamazonManager.gif)

## bamazonSupervisor.js
This application will allow supervisors to see a sales report by department and to create new departments.

### Demo
![customer demo](https://github.com/jibm82/bamazon/raw/master/screens/bamazonSupervisor.gif)

## How to run
- Clone this repo
- Setup mysql and create a new database.
- Create a `.env` file at the root of the project containing the following data:

```
  DB_HOST=[Your host]
  DB_USER=[Your mysql user]
  DB_PASS=[Your mysql user's password]
  DB_NAME=[Your database name]
```

- Run `npm install` for installing dependencies.
- Run `node migrations.js` for creating the table and seeding them.

- For the customer app run: `node bamazonCustomer.js`.
- For the manager app run: `node bamazonManager.js`.
- For the supervisor app run: `node bamazonSupervisor.js`.
