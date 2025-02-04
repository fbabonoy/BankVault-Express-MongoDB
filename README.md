# BankVault Express using MongoDB

BankVault Express is a simple banking application built with Node.js and Express. It allows users to create accounts, deposit money, withdraw money, and view transaction history. The project is being transitioned from using an object for data storage to using MongoDB with Mongoose.

## Features

### Core Features
- Create a new bank account
- Deposit money into an account
- Withdraw money from an account
- View transaction history for each account

## Technologies Used
- **Backend**: Node.js, Express
- **Database**: MongoDB, Mongoose

## API Endpoints

### Routes
- `GET /accounts` - Explains data.
- `GET /accounts/:id` - Get account details.
- `PATCH /accounts/:id` - Update an account.
- `DELETE /accounts/:id` - Delete an account.
- `GET /accounts/:id/transactions` - View transaction history for an account.


### Authentication (Bonus)
- Authentication is not fully implemented. A token system needs to be added and expired after a period of time.
- A registration form is missing; a simple link was used for testing.
- `GET /auth` - creates about 30 users for authentication
- `POST /auth` - check if user and passwor dare correct authentication.
- `GET /register` - geggister new account and checks if email is not in use already

