import type { ComplianceResponse } from "../../core/domain/Compliance";

const API_URL = "http://localhost:4000";

export class BankingApiHttp {

    async getCB(shipId: string, year: number): Promise<ComplianceResponse> {
        const res = await fetch(
            `${API_URL}/banking/cb?shipId=${shipId}&year=${year}`
        );

        if (!res.ok) throw new Error("Failed to fetch CB");
        return res.json();
    }

    async bank(shipId: string, year: number, amount: number) {
        const res = await fetch(`${API_URL}/banking/bank`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ shipId, year, amount })
        });

        if (!res.ok) throw new Error("Bank failed");
        return res.json();
    }

    async apply(shipId: string, year: number, amount: number) {
        const res = await fetch(`${API_URL}/banking/apply`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ shipId, year, amount })
        });

        if (!res.ok) throw new Error("Apply failed");
        return res.json();
    }
}