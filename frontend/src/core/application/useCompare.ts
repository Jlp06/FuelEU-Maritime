import { useEffect, useState } from "react";
import { RoutesApiHttp } from "../../adapters/infrastructure/RoutesApiHttp";
import type { ComparisonResponse } from "../domain/Comparison";

export function useCompare(year: number) {

    const [data, setData] = useState<ComparisonResponse | null>(null);

    useEffect(() => {
        const api = new RoutesApiHttp();

        api.getComparison(year)
            .then(setData)
            .catch(console.error);

    }, [year]);

    return data;
}
