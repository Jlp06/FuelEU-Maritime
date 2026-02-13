import { Route } from "../domain/Route";

export interface RouteRepository {
    findAll(): Promise<Route[]>;
    findBaseline(year: number): Promise<Route | null>;
    setBaseline(routeId: string): Promise<void>;
}
