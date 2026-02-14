import { Router } from "express";
import { RouteRepositoryPg } from "../../outbound/postgres/RouteRepositoryPg";
import { ComputeComplianceBalance } from "../../../core/application/ComputeComplianceBalance";
import { FUEL_LCV } from "../../../shared/constants";

export const complianceRouter = Router();

const routeRepo = new RouteRepositoryPg();
const computeCompliance = new ComputeComplianceBalance();

complianceRouter.get("/cb", async (req, res) => {

    const shipId = String(req.query.shipId);
    const year = Number(req.query.year);

    const routes = await routeRepo.findAll();

    const route = routes.find(
        r => r.routeId === shipId && r.year === year
    );

    if (!route) {
        return res.status(404).json({ error: "Route not found" });
    }

    const lcv = FUEL_LCV[route.fuelType];

    if (!lcv) {
        return res.status(400).json({
            error: `Unsupported fuel type: ${route.fuelType}`
        });
    }

    const result = computeCompliance.execute(
        route.ghgIntensity,
        route.fuelConsumption,
        lcv
    );

    res.json(result);
});