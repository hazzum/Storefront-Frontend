# Storefront Client Side Application

This is an e-commerce client side application project for Udacity's Course on Angular.
This project is meant to be integrated with my server side application [Storefront-App](https://github.com/hazzum/Storefront-App). You should set up and run this project first in order to make this application work properly.

## Features and functionalities
* **Functionalites:**<br />
    * View all products in the main page (no signing in or authentication required for this function).
    * View single product details (no signing in or authentication required for this function).
    * Sign up page for a new account with proper form validation.
    * Sign in page to enter valid credentials with proper form validation.
    * Authentication is implemented using JSON web tokens following the OAuth specifications. All http requests are intercepted by an interceptor service where authorization header is injected into the request.
    * Add items to cart
    * View items in cart
    * Remove or update items in cart
    * Clear cart items
    * Complete a purchase with credit card information, proper form validation is applied
    * View past orders history
    * Invalid paths lead to 404 error

## Getting Started

### To run the application, you must follow the following instructions:
#### 1- In the project directory, run the command `npm i` to install necessary packages.
#### 2- Set up and run the server side application from this repository: [Storefront-App](https://github.com/hazzum/Storefront-App).
#### 2- Run the following SQL script on the current database connection you're running to fill out the table `product` with some data
You can also find that script under `src\assets\starter.sql`
```
INSERT INTO products(name,price,url,description) VALUES ('Book',9.99,'https://images.unsplash.com/photo-1544947950-fa07a98d237f?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80','You can read it!');
INSERT INTO products(name,price,url,description) VALUES ('Headphones',249.99,'https://images.unsplash.com/photo-1583394838336-acd977736f90?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80','Listen to stuff!');
INSERT INTO products(name,price,url,description) VALUES ('Backpack',79.99,'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80','Carry things around town!');
INSERT INTO products(name,price,url,description) VALUES ('Glasses',129.99,'https://images.unsplash.com/photo-1591076482161-42ce6da69f67?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80','Now you can see!');
INSERT INTO products(name,price,url,description) VALUES ('Cup',4.99,'https://images.unsplash.com/photo-1517256064527-09c73fc73e38?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80','Drink anything with it!');
INSERT INTO products(name,price,url,description) VALUES ('Shirt',29.99,'https://images.unsplash.com/photo-1581655353564-df123a1eb820?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=800&q=80','Wear it with style!');
```
#### 3- Run the application using script `ng serve` or `npm start` and give it a test drive!
Try signing up for an account, add items to cart, make orders, view past orders history, and more.
#### 4- Play around with the application
- This Angular application runs on port `4200`<br />
Run any of the scripts included in the `package.json` file:<br />
- Build script:                   `npm run build` <br />
- Running dev version script:     `npm start` <br />
- Testing script:                 `npm run test` <br />
