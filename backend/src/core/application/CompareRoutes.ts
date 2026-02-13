import { Route } from "../domain/Route";
import { TARGET_GHG_INTENSITY_2025 } from "../../shared/constants";

export interface RouteComparison {
    routeId: string;
    ghgIntensity: number;
    percentDiff: number;
    compliant: boolean;
}

export class CompareRoutes {
    execute(baseline: Route, routes: Route[]): RouteComparison[] {
        return routes.map(route => {
            const percentDiff =
                ((route.ghgIntensity / baseline.ghgIntensity) - 1) * 100;

            return {
                routeId: route.routeId,
                ghgIntensity: route.ghgIntensity,
                percentDiff,
                compliant: route.ghgIntensity <= TARGET_GHG_INTENSITY_2025
            };
        });
    }
}
