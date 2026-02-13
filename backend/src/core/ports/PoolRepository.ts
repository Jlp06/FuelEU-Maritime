import { Pool } from "../domain/Pool";

export interface PoolRepository {
    create(pool: Pool): Promise<void>;
}
