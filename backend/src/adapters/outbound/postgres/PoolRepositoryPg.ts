import { pool } from "./db";
import { Pool } from "../../../core/domain/Pool";

export class PoolRepositoryPg {
    async create(poolData: Pool) {
        const poolRes = await pool.query(
            "INSERT INTO pools (year) VALUES ($1) RETURNING id",
            [poolData.year]
        );

        const poolId = poolRes.rows[0].id;

        for (const member of poolData.members) {
            await pool.query(
                `
        INSERT INTO pool_members (pool_id, ship_id, cb_before, cb_after)
        VALUES ($1, $2, $3, $4)
        `,
                [poolId, member.shipId, member.cbBefore, member.cbAfter]
            );
        }
    }
}
