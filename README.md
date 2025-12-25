Customer Loyalty Points CLI

A simple command-line app to manage customer loyalty points. Add, redeem, and track points in-memory.

Features

Earn points for a customer

Redeem points from a customer

Prevent redeeming more than available

Warn when balance drops below 10 points

Supports multiple customers independently

Tech Stack

TypeScript

Node.js (ES Modules)

Jest for tests

Setup

Clone the repo:

git clone <https://github.com/taranchik/customer-loyalty-points-cli>
cd customer-loyalty-points-cli

Install dependencies:

npm install

Build TypeScript:

npm run build

Testing

Run all tests:

npm test

Tests cover:

Adding points

Redeeming points

Preventing over-redeem

Low balance warnings

Multiple customers

Usage

Add points:

npm start earn <customerId> <points>

# Example:

npm start earn user123 100

Redeem points:

npm start redeem <customerId> <points>

# Example:

npm start redeem user123 50
