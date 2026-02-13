# FuelEU Maritime Compliance Platform 🚢

A full-stack FuelEU Maritime compliance simulation platform built with:

- React + TypeScript (Frontend)
- Node.js + Express (Backend)
- PostgreSQL (Database)
- Clean Architecture (Domain-Driven Design style)

---

## ✨ Features

### 🚢 Routes
- Store vessel fuel data
- Track GHG intensity
- Define yearly baselines

### 📊 Comparison
- Compare routes against baseline
- Compliance percentage difference
- Visual bar chart
- Sortable comparison table

### 💰 Banking
- Compute Compliance Balance (CB)
- Bank surplus
- Apply banked surplus to deficits
- Persist bank entries in PostgreSQL

### 🔁 Pooling
- Create compliance pools across ships
- Redistribute surplus to cover deficits
- Validate total pool balance
- Before → After redistribution tracking
- Pool summary analytics

---

## 🏗 Architecture
This project follows a layered clean architecture:
backend/
├── core/
│ ├── domain/
│ ├── application/
│ └── ports/
├── adapters/
│ ├── inbound/http/
│ └── outbound/postgres/

- Domain contains pure business logic
- Application contains use cases
- Adapters connect HTTP and PostgreSQL
- Frontend consumes REST APIs

---

## 🛠 Tech Stack

- React + TypeScript
- Express.js
- PostgreSQL
- TailwindCSS
- Recharts

---

## 🚀 How to Run

### Backend

```bash
cd backend
npm install
npm run dev
```
Server runs on:
```arduino
http://localhost:4000
```
### Frontend
```bash
cd frontend
npm install
npm run dev
```
App runs on:
```arduino
http://localhost:5173
```
# 🧠 Key Concepts Implemented

- FuelEU compliance balance calculation

- Surplus banking and deficit application

- Pool redistribution algorithm

- Clean architecture separation

- Domain-first logic modeling

# 📌 Future Improvements

- Pool history tracking

- Authentication & role management

- Export compliance reports

- Dashboard analytics overview

- Deployment to cloud

# 👩‍💻 Author

Built as a full-stack maritime compliance simulation project.
