import { Router, Request, Response } from "express";
import { ComputeComplianceBalance } from "../../../core/application/ComputeComplianceBalance";

export const complianceRouter = Router();

const computeComplianceBalance = new ComputeComplianceBalance();

complianceRouter.post("/cb", (req: Request, res: Response) => {

    const { actualIntensity, fuelConsumption } = req.body;

    try {

        const result = computeComplianceBalance.execute(
            Number(actualIntensity),
            Number(fuelConsumption)
        );

        res.status(200).json(result);

    } catch (error) {

        res.status(400).json({
            error: (error as Error).message
        });

    }
});
