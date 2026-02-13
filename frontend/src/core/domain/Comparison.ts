import type { Route } from "./Route";

export interface ComparisonRoute {
    routeId: string;
    ghgIntensity: number;
    percentDiff: number;
    compliant: boolean;
}

export interface ComparisonResponse {
    baseline: Route;
    comparison: ComparisonRoute[];
}
