import { Router } from "express";
import { BankRepositoryPg } from "../../outbound/postgres/BankRepositoryPg";
import { ComplianceRepositoryPg } from "../../outbound/postgres/ComplianceRepositoryPg";
import { ComputeComplianceBalance } from "../../../core/application/ComputeComplianceBalance";
import { RouteRepositoryPg } from "../../outbound/postgres/RouteRepositoryPg";
import { FUEL_LCV } from "../../../shared/constants";

export const bankingRouter = Router();

const routeRepo = new RouteRepositoryPg();
const computeCompliance = new ComputeComplianceBalance();
const bankRepo = new BankRepositoryPg();
const complianceRepo = new ComplianceRepositoryPg();

bankingRouter.post("/bank", async (req, res) => {
    const { shipId, year, amount } = req.body;

    if (amount <= 0) {
        return res.status(400).json({ error: "Only positive CB can be banked" });
    }

    await bankRepo.bank(shipId, year, amount);
    res.json({ message: "Banked successfully" });
});
bankingRouter.get("/records", async (req, res) => {
    const shipId = String(req.query.shipId);
    const year = Number(req.query.year);

    const total = await bankRepo.totalBanked(shipId, year);

    res.json({ total });
});
bankingRouter.post("/apply", async (req, res) => {
    const { shipId, year, amount } = req.body;

    if (amount <= 0) {
        return res.status(400).json({
            error: "Amount must be greater than zero"
        });
    }

    const totalBanked = await bankRepo.totalBanked(shipId, year);

    if (amount > totalBanked) {
        return res.status(400).json({
            error: "Cannot apply more than banked amount"
        });
    }

    await bankRepo.bank(shipId, year, -amount);

    res.json({ message: "Bank applied successfully" });
});
bankingRouter.get("/cb", async (req, res) => {
    const shipId = String(req.query.shipId);
    const year = Number(req.query.year);

    const routes = await routeRepo.findAll();
    
    const route = routes.find(
        r => r.routeId === shipId && r.year === year
    );

    if (!route) {
        return res.status(404).json({ error: "Route not found" });
    }
    
    const lcv = FUEL_LCV[route.fuelType || "HFO"];
    const result = computeCompliance.execute(
        route.ghgIntensity,
        route.fuelConsumption,
        lcv
    );

    res.json(result);
});

