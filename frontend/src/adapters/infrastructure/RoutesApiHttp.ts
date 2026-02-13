import type { RoutesApi } from "../../core/ports/RoutesApi";
import type { Route } from "../../core/domain/Route";

const API_URL = "http://localhost:4000";

export class RoutesApiHttp implements RoutesApi {

    async getRoutes(): Promise<Route[]> {
        const res = await fetch(`${API_URL}/routes`);
        if (!res.ok) throw new Error("Failed to fetch routes");
        return res.json();
    }

    async setBaseline(routeId: string): Promise<void> {
        const res = await fetch(`${API_URL}/routes/${routeId}/baseline`, {
            method: "POST"
        });

        if (!res.ok) throw new Error("Failed to set baseline");
    }

    async getComparison(year: number) {
        const res = await fetch(`${API_URL}/routes/comparison?year=${year}`);

        if (!res.ok) throw new Error("Failed to fetch comparison");

        return res.json();
    }
}
