import { useState } from "react";
import { useCompare } from "../../../core/application/useCompare";
import type { ComparisonRoute } from "../../../core/domain/Comparison";
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    Tooltip,
    CartesianGrid,
    ResponsiveContainer,
    Cell
} from "recharts";

export function ComparePage() {
    const [year, setYear] = useState(2024);
    const data = useCompare(year);

    if (!data)
        return (
            <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-600"></div>
            </div>
        );
    
    if (!data.baseline) {
        return (
            <div className="p-6">
                <div className="bg-yellow-50 border border-yellow-300 text-yellow-800 p-6 rounded-xl">
                    <h3 className="font-semibold mb-2">
                        No baseline set for {year}
                    </h3>
                    <p className="text-sm">
                        Please set a baseline route for this year.
                    </p>
                </div>
            </div>
        );
    }
    /* KPI calculations */
    const totalRoutes = data.comparison.length;

    const compliantCount = data.comparison.filter(
        (r) => r.compliant
    ).length;

    const avgGHG =
        totalRoutes === 0
            ? 0
            : data.comparison.reduce(
                (sum, r) => sum + r.ghgIntensity,
                0
            ) / totalRoutes;

    const worstRoute =
        totalRoutes === 0
            ? null
            : data.comparison.reduce((max, current) =>
                current.ghgIntensity > max.ghgIntensity ? current : max
            );

    return (
        <div className="p-6 space-y-8">

            {/* Header */}
            <div className="flex justify-between items-center">
                <h2 className="text-2xl font-semibold">
                    Route Comparison
                </h2>

                <select
                    value={year}
                    onChange={(e) =>
                        setYear(Number(e.target.value))
                    }
                    className="border rounded-lg px-3 py-2 text-sm bg-white shadow-sm"
                >
                    <option value={2024}>2024</option>
                    <option value={2025}>2025</option>
                    <option value={2026}>2026</option>
                </select>
            </div>

            {/* KPI Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="bg-white border rounded-2xl p-4">
                    <p className="text-sm text-muted-foreground">
                        Total Routes
                    </p>
                    <p className="text-2xl font-bold">
                        {totalRoutes}
                    </p>
                </div>

                <div className="bg-white border rounded-2xl p-4">
                    <p className="text-sm text-muted-foreground">
                        Compliant Routes
                    </p>
                    <p className="text-2xl font-bold text-green-600">
                        {compliantCount}
                    </p>
                </div>

                <div className="bg-white border rounded-2xl p-4">
                    <p className="text-sm text-muted-foreground">
                        Avg GHG Intensity
                    </p>
                    <p className="text-2xl font-bold">
                        {avgGHG.toFixed(2)}
                    </p>
                </div>

                <div className="bg-white border rounded-2xl p-4">
                    <p className="text-sm text-muted-foreground">
                        Worst Route
                    </p>
                    <p className="text-lg font-semibold text-red-600">
                        {worstRoute ? worstRoute.routeId : "-"}
                    </p>
                </div>
            </div>

            {/* Table (Original Order Preserved) */}
            <div className="bg-white rounded-2xl shadow-sm border overflow-hidden">
                <table className="w-full text-sm">
                    <thead className="bg-slate-50 text-left">
                        <tr>
                            <th className="px-4 py-3">Route</th>
                            <th className="px-4 py-3">GHG Intensity</th>
                            <th className="px-4 py-3">% Diff</th>
                            <th className="px-4 py-3">Compliance</th>
                        </tr>
                    </thead>

                    <tbody>
                        {data.comparison.map(
                            (r: ComparisonRoute, i: number) => (
                                <tr
                                    key={r.routeId}
                                    className={`border-t hover:bg-slate-50 transition ${i % 2 === 0
                                            ? "bg-white"
                                            : "bg-slate-50/40"
                                        }`}
                                >
                                    <td className="px-4 py-3 font-medium">
                                        {r.routeId}
                                    </td>

                                    <td className="px-4 py-3">
                                        {r.ghgIntensity.toFixed(2)}
                                    </td>

                                    <td
                                        className={`px-4 py-3 font-medium ${r.percentDiff > 0
                                                ? "text-red-600"
                                                : "text-green-600"
                                            }`}
                                    >
                                        {r.percentDiff.toFixed(2)}%
                                    </td>

                                    <td className="px-4 py-3">
                                        <span
                                            className={`px-2 py-1 text-xs rounded-full font-medium ${r.compliant
                                                    ? "bg-green-100 text-green-700"
                                                    : "bg-red-100 text-red-700"
                                                }`}
                                        >
                                            {r.compliant
                                                ? "Compliant"
                                                : "Non-Compliant"}
                                        </span>
                                    </td>
                                </tr>
                            )
                        )}
                    </tbody>
                </table>
            </div>

            {/* Chart (Automatically changes with year) */}
            <div className="bg-white rounded-2xl shadow-sm border p-6">
                <h3 className="font-medium mb-4">
                    GHG Intensity – {year}
                </h3>

                <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={data.comparison} key={year}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="routeId" />
                        <YAxis />
                        <Tooltip />
                        <Bar
                            dataKey="ghgIntensity"
                            isAnimationActive={true}
                            animationDuration={600}
                            animationEasing="ease-out"
                        >
                            {data.comparison.map(
                                (entry, index) => (
                                    <Cell
                                        key={`cell-${index}`}
                                        fill={
                                            entry.compliant
                                                ? "#16a34a"
                                                : "#dc2626"
                                        }
                                    />
                                )
                            )}
                        </Bar>
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
}