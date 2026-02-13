import { Router } from "express";
import { RouteRepositoryPg } from "../../outbound/postgres/RouteRepositoryPg";
import { CompareRoutes } from "../../../core/application/CompareRoutes";

export const routesRouter = Router();
const repo = new RouteRepositoryPg();
const compareRoutes = new CompareRoutes();

routesRouter.get("/", async (_, res) => {
    const routes = await repo.findAll();
    res.json(routes);
});

routesRouter.post("/:id/baseline", async (req, res) => {
    await repo.setBaseline(req.params.id);
    res.json({ message: "Baseline set" });
});

routesRouter.get("/comparison", async (req, res) => {
    const year = Number(req.query.year);

    const baseline = await repo.findBaseline(year);

    if (!baseline) {
        return res.json({
            baseline: null,
            comparison: []
        });
    }

    const routes = await repo.findByYear(year);

    const comparison = compareRoutes.execute(baseline, routes);

    res.json({
        baseline,
        comparison
    });
});
