# BankVault Express using MongoDB

BankVault Express is a simple banking application built with Node.js and Express. It allows users to create accounts, deposit money, withdraw money, and view transaction history. The project is being transitioned from using an object for data storage to using MongoDB with Mongoose.

## Table of Contents
- [Features](#features)
- [Technologies Used](#technologies-used)
- [API Endpoints](#api-endpoints)

## Features

### Core Features
- Create a new bank account
- Deposit money into an account
- Withdraw money from an account
- View transaction history for each account

### Optional Bonus Feature
- Authentication: Secure login system to ensure only authorized users can access their accounts.

## Technologies Used
- **Backend**: Node.js, Express
- **Database**: MongoDB, Mongoose

## API Endpoints

### Routes
- `GET /accounts` - Explains data.
<!-- - `POST /accounts` - Create a new account. -->
<!-- - `GET /transactions` - View all transaction history. -->
- `GET /accounts/:id` - Get account details.
- `PATCH /accounts/:id` - Update an account.
- `DELETE /accounts/:id` - Delete an account.
<!-- - `POST /accounts/:id/deposit` - Deposit money into an account.
- `POST /accounts/:id/withdraw` - Withdraw money from an account.
- `GET /accounts/:id/transactions` - View transaction history for an account.
- `GET /accounts/:id/transactions/:transactionId` - View a specific transaction detail.
- `DELETE /accounts/:id/transactions/:transactionId` - Delete a specific transaction. -->

### Authentication (Bonus)
- Authentication is not fully implemented. A token system needs to be added and expired after a period of time.
- A registration form is missing; a simple link was used for testing.
- `GET /auth` - Sends a file with the form.
- `POST /auth` - Redirects after authentication.

