import { pool } from "./db";

export class BankRepositoryPg {
    async bank(shipId: string, year: number, amount: number) {
        await pool.query(
            `
      INSERT INTO bank_entries (ship_id, year, amount_gco2eq)
      VALUES ($1, $2, $3)
      `,
            [shipId, year, amount]
        );
    }

    async totalBanked(shipId: string, year: number): Promise<number> {
        const res = await pool.query(
            `
      SELECT COALESCE(SUM(amount_gco2eq), 0) as total
      FROM bank_entries WHERE ship_id=$1 AND year=$2
      `,
            [shipId, year]
        );
        return Number(res.rows[0].total);
    }
}
