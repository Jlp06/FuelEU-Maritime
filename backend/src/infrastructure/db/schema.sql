CREATE TABLE routes (
  id SERIAL PRIMARY KEY,
  route_id VARCHAR(50) UNIQUE NOT NULL,
  vessel_type VARCHAR(50),
  fuel_type VARCHAR(50),
  year INT,
  ghg_intensity FLOAT,
  fuel_consumption FLOAT,
  distance FLOAT,
  total_emissions FLOAT,
  is_baseline BOOLEAN DEFAULT FALSE
);

CREATE TABLE ship_compliance (
  id SERIAL PRIMARY KEY,
  ship_id VARCHAR(50),
  year INT,
  cb_gco2eq DOUBLE PRECISION
);

CREATE TABLE bank_entries (
  id SERIAL PRIMARY KEY,
  ship_id VARCHAR(50),
  year INT,
  amount_gco2eq DOUBLE PRECISION
);

CREATE TABLE pools (
  id SERIAL PRIMARY KEY,
  year INT,
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE pool_members (
  pool_id INT REFERENCES pools(id),
  ship_id VARCHAR(50),
  cb_before DOUBLE PRECISION,
  cb_after DOUBLE PRECISION
);
