# 🎉 Customer Loyalty Points CLI

A simple command-line app to manage customer loyalty points. Add, redeem, and track points **in-memory**.

## ✨ Features

- Earn points for a customer
- Redeem points from a customer
- Prevent redeeming more than available
- Warn when balance drops below 10 points
- Supports multiple customers independently

---

## 🛠 Tech Stack

- **TypeScript**
- **Node.js** (ES Modules)
- **Jest** for tests

---

## ⚡ Setup

**Clone the repo:**

```bash
git clone https://github.com/taranchik/customer-loyalty-points-cli
cd customer-loyalty-points-cli
```

**Install dependencies:**

```bash
npm install
```

**Build the project:**

```bash
npm run build
```

---

## 🚀 Usage

**Add points to a customer:**

```bash
npm start earn <customerId> <points>
# Example:
npm start earn user123 100
```

**Redeem points from a customer:**

```bash
npm start redeem <customerId> <points>
# Example:
npm start redeem user123 50
```

---

## 🧪 Testing

**Run all tests:**

```bash
npm test
```
