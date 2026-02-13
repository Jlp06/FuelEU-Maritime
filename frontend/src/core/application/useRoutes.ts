import { useEffect, useState } from "react";
import type { Route } from "../domain/Route";
import type { RoutesApi } from "../ports/RoutesApi";
import { RoutesApiHttp } from "../../adapters/infrastructure/RoutesApiHttp";

export function useRoutes(api: RoutesApi = new RoutesApiHttp()) {

    const [routes, setRoutes] = useState<Route[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        api.getRoutes()
            .then(setRoutes)
            .finally(() => setLoading(false));
    }, []);

    return { routes, loading };
}
