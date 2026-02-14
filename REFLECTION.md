# REFLECTION

## Project Overview

This project implements a FuelEU Maritime compliance simulation platform with:

- Route comparison against baseline
- Compliance balance (CB) calculation
- Banking of surplus
- Application of banked surplus
- Pooling redistribution across ships
- PostgreSQL persistence
- Clean Architecture backend
- React + TypeScript frontend

The goal was to translate regulatory calculation logic into a structured, maintainable software system.

---

## Architectural Decisions

I chose a Clean Architecture approach to:

- Separate domain logic from infrastructure
- Keep business rules testable and independent
- Avoid coupling HTTP or database logic to core calculations

The structure:

- `core/domain` → business entities
- `core/application` → use cases (ComputeComplianceBalance, CreatePool)
- `ports` → repository interfaces
- `adapters` → PostgreSQL + HTTP

This made it easier to evolve logic without breaking other layers.

---

## Key Challenges

### 1. Database Design

Initially, `route_id` was unique, which prevented multi-year data.
This was corrected by using a composite constraint:

UNIQUE(route_id, year)

This aligned the database schema with real-world compliance reporting.

---

### 2. Compliance Calculation

Implementing the CB formula required:

- Correct energy conversion
- Handling surplus vs deficit logic
- Ensuring sign correctness
- Preventing invalid states

Edge cases such as zero CB and negative totals required careful handling.

---

### 3. Banking Rules

Banking required:

- Validating positive surplus only
- Preventing application beyond available balance
- Persisting both positive and negative adjustments

I implemented validation both at UI and backend levels for safety.

---

### 4. Pooling Redistribution

Pooling was the most algorithmically complex feature.

The redistribution logic required:

- Sorting surpluses and deficits
- Iteratively transferring compliance balance
- Ensuring total pool balance ≥ 0
- Preventing deficit ships from exiting worse than before

The redistribution algorithm was implemented carefully to maintain domain correctness.

---

## Frontend Improvements

The frontend evolved from simple inputs to:

- Dropdown-based selection
- Filtered year logic
- Dynamic CB fetching
- Sorted comparison tables
- Form validation
- Before → After pooling visualization
- Summary cards for analytics

UX improvements were made incrementally.

---

## AI-Assisted Development

AI was used as:

- A debugging assistant
- A code refinement tool
- A structural advisor
- A documentation helper

All logic decisions and validations were manually reviewed and tested.

The AI helped accelerate iteration but did not replace understanding of the domain.

---

## What I Would Improve With More Time

- Add automated backend unit tests
- Add integration tests for banking/pooling
- Implement pool history tracking
- Add authentication and roles
- Improve compliance reporting exports
- Deploy to a cloud platform

---

## Lessons Learned

- Domain modeling is critical before coding.
- Database schema must reflect real-world constraints.
- Validation should exist at multiple layers.
- Clean architecture improves long-term maintainability.
- UI polish significantly improves perceived quality.
- Regulatory logic requires careful unit consistency.

---

## Final Thoughts

This project demonstrates:

- Full-stack system design
- Regulatory logic implementation
- Clean architecture principles
- TypeScript strict-mode safety
- Database-backed domain modeling

It balances correctness, structure, and usability.
