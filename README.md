# FuelEU Maritime Compliance Platform 🚢

A full-stack FuelEU Maritime compliance simulation platform implementing compliance balance calculation, surplus banking, deficit application, and pooling redistribution based on regulatory methodology.

This project demonstrates clean architecture principles, domain-driven design, and full-stack integration using React, Node.js, and PostgreSQL.

---

## ✨ Features

### 📊 Route Comparison
- Compare ship routes against yearly baseline
- Compute GHG intensity differences
- Visual comparison using charts
- Sortable and structured comparison tables

### 💰 Compliance Balance (CB)
- Calculate compliance balance per ship per year
- Identify surplus or deficit status
- Persist compliance data in PostgreSQL

### 🏦 Banking System
- Bank surplus compliance balance
- Apply banked surplus to deficit ships
- Prevent invalid applications
- Track bank entries persistently

### 🔁 Pooling System
- Create compliance pools across ships
- Redistribute surplus to cover deficits
- Validate pool balance integrity
- Visualize before and after redistribution

---

## 🏗 Architecture

This project follows Clean Architecture to separate business logic from infrastructure.

```yaml
backend/
│
├── core/
│ ├── domain/ # Entities and business models
│ ├── application/ # Use cases (ComputeComplianceBalance, CreatePool)
│ └── ports/ # Repository interfaces
│
├── adapters/
│ ├── inbound/http/ # Express controllers
│ └── outbound/postgres/ # PostgreSQL repositories
│
frontend/
│
├── pages/
├── components/
├── infrastructure/
|
```

### Benefits of this approach

- Testable business logic
- Clear separation of concerns
- Maintainable structure
- Extensible design

---

## 🛠 Tech Stack

### Frontend
- React
- TypeScript
- TailwindCSS
- Recharts

### Backend
- Node.js
- Express.js
- TypeScript

### Database
- PostgreSQL

---

## 📐 Core Business Logic

### Compliance Balance Calculation


### Benefits of this approach

- Testable business logic
- Clear separation of concerns
- Maintainable structure
- Extensible design

---

## 🛠 Tech Stack

### Frontend
- React
- TypeScript
- TailwindCSS
- Recharts

### Backend
- Node.js
- Express.js
- TypeScript

### Database
- PostgreSQL

---

## 📐 Core Business Logic

### Compliance Balance Calculation

CB = (Target GHG Intensity − Actual GHG Intensity) × Energy

Where energy is derived from fuel consumption and regulatory conversion factors.

### Banking Rules

- Only surplus (positive CB) can be banked
- Banked balance can be applied to deficits
- Cannot apply more than available banked amount

### Pooling Rules

- Pool total CB must be ≥ 0
- Surplus redistributed to cover deficits
- Deficit ships cannot exit worse than before pooling

---

## 🚀 Setup Instructions

### 1. Clone Repository

```bash
git clone https://github.com/your-username/fueleu-compliance-platform.git
cd fueleu-compliance-platform
```

### 2. Backend Setup

```bash
cd backend
npm install
npm run dev
```
Backend runs on:

```arduino
http://localhost:4000

```

### 3. Frontend Setup

```bash
cd frontend
npm install
npm run dev
```
Frontend runs on:

```arduino
http://localhost:5173

```

### 4. Database Setup

Create PostgreSQL database and required tables.

Update database connection in:

```swift
backend/adapters/outbound/postgres/db.ts
```

## 🧪 Running Tests

Backend:

```bash
npm run test
```

Frontend

```bash
npm run test
```

## 📂 Project Structure Overview
```yaml
frontend/
backend/
README.md
AGENT_WORKFLOW.md
REFLECTION.md
```

## 🧠 Key Engineering Highlights

- Clean Architecture implementation

- Domain-driven design approach

- Full-stack TypeScript usage

- PostgreSQL relational modeling

- Regulatory logic implementation

- Stateful banking and pooling system

## ⚠ Known Limitations

- No authentication system

- No deployment configuration yet

- Pool history persistence can be extended

## 🔮 Future Improvements

- User authentication and roles

- Compliance reporting export

- Cloud deployment

- Automated test coverage

- Dashboard analytics

## 👨‍💻 Author

Developed as part of FuelEU Maritime compliance simulation assignment.