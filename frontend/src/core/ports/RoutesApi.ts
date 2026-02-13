import type { Route } from "../domain/Route";
import type { ComparisonResponse } from "../domain/Comparison";

export interface RoutesApi {
    getRoutes(): Promise<Route[]>;
    setBaseline(routeId: string): Promise<void>;
    getComparison(year: number): Promise<ComparisonResponse>;
}
