import { Router } from "express";
import { PoolRepositoryPg } from "../../outbound/postgres/PoolRepositoryPg";
import { CreatePool, PoolMemberInput } from "../../../core/application/CreatePool";
import { randomUUID } from "crypto";

export const poolsRouter = Router();

const poolRepo = new PoolRepositoryPg();
const createPool = new CreatePool();

poolsRouter.post("/", async (req, res) => {

    try {

        const { year, members } = req.body;

        // Validate input
        if (!year || !Array.isArray(members)) {
            return res.status(400).json({ error: "Invalid pool payload" });
        }

        // Execute pooling logic (returns adjusted members)
        const adjustedMembers = createPool.execute(members as PoolMemberInput[]);
       
        // Wrap into Pool entity expected by repository
        const pool = {
            id: randomUUID(),
            year,
            members: adjustedMembers
        };

        await poolRepo.create(pool);

        res.status(201).json(pool);

    } catch (error) {

        res.status(400).json({
            error: (error as Error).message
        });

    }
});
