import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import { routesRouter } from "../../adapters/inbound/http/routes.controller";
import { complianceRouter } from "../../adapters/inbound/http/compliance.controller";
import { bankingRouter } from "../../adapters/inbound/http/banking.controller";
import { poolsRouter } from "../../adapters/inbound/http/pools.controller";

dotenv.config();

export const app = express();

app.use(cors());
app.use(express.json());

app.use("/routes", routesRouter);
app.use("/compliance", complianceRouter);
app.use("/banking", bankingRouter);
app.use("/pools", poolsRouter);

app.get("/health", (_, res) => {
    res.json({ status: "ok" });
});
