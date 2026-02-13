import { RouteRepository } from "../../../core/ports/RouteRepository";
import { Route } from "../../../core/domain/Route";
import { pool } from "./db";

export class RouteRepositoryPg implements RouteRepository {

    async findAll(): Promise<Route[]> {
        const res = await pool.query("SELECT * FROM routes");
        return res.rows.map(this.toDomain);
    }

    async findByYear(year: number): Promise<Route[]> {
        const res = await pool.query(
            "SELECT * FROM routes WHERE year=$1",
            [year]
        );
        return res.rows.map(this.toDomain);
    }

    async findBaseline(year: number): Promise<Route | null> {
        const res = await pool.query(
            "SELECT * FROM routes WHERE year=$1 AND is_baseline=true LIMIT 1",
            [year]
        );
        return res.rows[0] ? this.toDomain(res.rows[0]) : null;
    }

    async setBaseline(routeId: string): Promise<void> {
        await pool.query("UPDATE routes SET is_baseline=false");
        await pool.query(
            "UPDATE routes SET is_baseline=true WHERE route_id=$1",
            [routeId]
        );
    }

    private toDomain(row: any): Route {
        return {
            id: row.id,
            routeId: row.route_id,
            vesselType: row.vessel_type,
            fuelType: row.fuel_type,
            year: row.year,
            ghgIntensity: row.ghg_intensity,
            fuelConsumption: row.fuel_consumption,
            distance: row.distance,
            totalEmissions: row.total_emissions,
            isBaseline: row.is_baseline
        };
    }
}
