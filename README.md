# FuelEU Maritime Compliance Platform – Backend

## Overview

This backend implements FuelEU Maritime compliance calculations according to Regulation (EU) 2023/1805 and the European Sustainable Shipping Forum (ESSF) WS1 FuelEU Calculation Methodologies document.

The system calculates a ship’s compliance balance based on greenhouse gas (GHG) intensity, fuel consumption, and fuel-specific energy content using officially defined Annex II constants.

It also implements FuelEU flexibility mechanisms including banking and pooling of compliance balance.

---

## FuelEU Regulatory Background

FuelEU Maritime requires ships to maintain GHG intensity below defined regulatory targets. Compliance is evaluated annually based on the energy used onboard ships.

For reporting year 2025:

Target GHG intensity: 89.3368 gCO₂eq/MJ

Ships exceeding this threshold generate a compliance deficit, while ships below the threshold generate a compliance surplus.

---

## Compliance Balance Calculation

The compliance balance (CB) is calculated according to FuelEU Annex IV:

CB = (Target GHG Intensity − Actual GHG Intensity) × Energy Used

Where:

Energy Used = Fuel Mass × Lower Calorific Value (LCV)

Fuel mass is converted from tonnes to grams:

Fuel Mass (g) = Fuel Mass (tonnes) × 1,000,000

LCV values are retrieved from Annex II of the FuelEU regulation.

Example:

Fuel Type: HFO  
Fuel Consumption: 100 tonnes  
LCV: 0.0405 MJ/g  

Energy = 100 × 1,000,000 × 0.0405 = 4,050,000 MJ

Compliance Balance = (89.3368 − ActualIntensity) × 4,050,000

---

## Flexibility Mechanisms Implemented

### Banking

Ships with surplus compliance balance may bank surplus for future reporting periods.

Conditions:

- Only positive compliance balance may be banked
- Banked surplus can be applied to future deficits

### Applying Banked Surplus

Ships with compliance deficit may offset deficit using previously banked surplus.

Conditions:

- Cannot apply more surplus than available
- Surplus reduces deficit proportionally

### Pooling

Multiple ships may pool compliance balance.

Conditions:

- Total pool compliance balance must be ≥ 0
- Surplus ships offset deficit ships
- No ship exits pooling with worse compliance balance

---

## Architecture

This backend follows Clean Architecture principles.

Directory structure:

```yaml
backend/
src/
core/
application/
domain/
ports/
adapters/
inbound/http/
outbound/postgres/
infrastructure/
db/
server/
shared/
index.ts
```

Layers:

Domain Layer  
Contains core entities such as Route.

Application Layer  
Contains compliance calculation use cases.

Adapters Layer  
Handles HTTP requests and database interaction.

Infrastructure Layer  
Handles PostgreSQL connection and server setup.

Shared Layer  
Contains FuelEU constants including LCV values.

---

## Constants Used

Fuel-specific Lower Calorific Values (MJ/g):

HFO: 0.0405  
LNG: 0.0491  
Methanol: 0.0199  
Hydrogen: 0.1200  
Ammonia: 0.0186  

Target GHG Intensity (2025):

89.3368 gCO₂eq/MJ

These values are sourced directly from FuelEU Annex II.

---

## API Endpoints

### Get Compliance Balance

GET /compliance/cb?shipId=SHIP001&year=2025

Response:

{
target: 89.3368,
actual: 85.1,
energyMJ: 4050000,
cb: 17290800,
status: "SURPLUS"
}

### Bank Surplus

POST /banking/bank

### Apply Banked Surplus

POST /banking/apply

### Get Bank Records

GET /banking/records

---

## Installation

Install dependencies:

```bash
npm install
```
---

## Run development server
```bash
npm run dev
```

---

## Run tests

```bash
npm run test
```

---

## Technologies Used

Node.js  
TypeScript  
Express.js  
PostgreSQL  
Clean Architecture  

---

## Compliance Statement

This implementation follows:

FuelEU Annex I – Energy calculation methodology  
FuelEU Annex II – Fuel energy constants  
FuelEU Annex IV – Compliance balance formula  
FuelEU Chapter 4 – Banking and pooling flexibility mechanisms  

---

## Author

FuelEU Maritime Compliance Backend Implementation