import { pool } from "./db";

export class ComplianceRepositoryPg {
    async save(shipId: string, year: number, balance: number) {
        await pool.query(
            `
      INSERT INTO ship_compliance (ship_id, year, cb_gco2eq)
      VALUES ($1, $2, $3)
      `,
            [shipId, year, balance]
        );
    }

    async find(shipId: string, year: number): Promise<number | null> {
        const res = await pool.query(
            "SELECT cb_gco2eq FROM ship_compliance WHERE ship_id=$1 AND year=$2",
            [shipId, year]
        );
        return res.rows[0]?.cb_gco2eq ?? null;
    }
}
