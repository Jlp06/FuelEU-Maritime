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

This project follows a Clean Architecture pattern to separate business logic from infrastructure and UI.

The system is divided into four main layers:
```scss
Frontend (React)
    ↓
HTTP Controllers (Express)
    ↓
Application Layer (Use Cases)
    ↓
Domain Layer (Business Logic)
    ↓
Infrastructure Layer (PostgreSQL Repositories)
```

### Backend Structure

```bash
backend/
│
├── core/
│   ├── domain/
│   │   ├── Route.ts
│   │   ├── Comparison.ts
│   │   └── Compliance.ts
│   │
│   ├── application/
│   │   ├── ComputeComplianceBalance.ts
│   │   ├── CompareRoutes.ts
│   │   └── CreatePool.ts
│   │
│   └── ports/
│       ├── RouteRepository.ts
│       ├── BankRepository.ts
│       └── ComplianceRepository.ts
│
├── adapters/
│   ├── inbound/http/
│   │   ├── routes.controller.ts
│   │   ├── banking.controller.ts
│   │   └── pools.controller.ts
│   │
│   └── outbound/postgres/
│       ├── RouteRepositoryPg.ts
│       ├── BankRepositoryPg.ts
│       ├── ComplianceRepositoryPg.ts
│       └── db.ts
```

### Frontend Structure

```bash
frontend/
│
├── pages/
│   ├── ComparePage.tsx
│   ├── BankingPage.tsx
│   └── PoolingPage.tsx
│
├── infrastructure/
│   ├── BankingApiHttp.ts
│   └── PoolApiHttp.ts
│
└── core/
    ├── domain/
    └── application/
```
### Layer Responsibilities
#### Domain Layer (core/domain)

Contains business entities and models.

Examples:

- Route

- Compliance Balance

- Pool Member

This layer contains no database or HTTP logic.

#### Application Layer (core/application)

Contains use cases implementing business logic.

Examples:

- ComputeComplianceBalance

- CompareRoutes

- CreatePool

This layer orchestrates domain logic.

#### Ports Layer (core/ports)

Defines repository interfaces.

Examples:

- RouteRepository

- BankRepository

This allows infrastructure to be replaced without changing domain logic.

#### Infrastructure Layer (adapters/outbound/postgres)

Implements repository interfaces using PostgreSQL.

Examples:

- RouteRepositoryPg

- BankRepositoryPg

Handles database access.

#### Inbound Layer (adapters/inbound/http)

Handles HTTP requests using Express.

Examples:

- banking.controller.ts

- pools.controller.ts

Calls application use cases.

#### Frontend Layer

Provides UI and interacts with backend via REST API.

Implements:

- Comparison UI

- Banking UI

- Pooling UI

Data Flow Example (Pooling)

```bash
React UI
  ↓
POST /pools
  ↓
pools.controller.ts
  ↓
CreatePool use case
  ↓
PoolRepositoryPg
  ↓
PostgreSQL
```

### Benefits of This Architecture

Separation of concerns

Testable business logic

Maintainable structure

Clear domain modeling

Infrastructure independence

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
