import { useState, useEffect } from "react";
import { BankingApiHttp } from "../../infrastructure/BankingApiHttp";
import type { ComplianceResponse } from "../../../core/domain/Compliance";
import type { Route } from "../../../core/domain/Route";

export function BankingPage() {

    const api = new BankingApiHttp();

    const [shipId, setShipId] = useState("R001");
    const [year, setYear] = useState(2024);
    const [cbData, setCbData] = useState<ComplianceResponse | null>(null);
    const [amount, setAmount] = useState(0);
    const [routes, setRoutes] = useState<Route[]>([]);

    useEffect(() => {
        const fetchRoutes = async () => {
            try {
                const res = await fetch("http://localhost:4000/routes");
                if (!res.ok) throw new Error("Failed to fetch routes");

                const data: Route[] = await res.json();
                setRoutes(data);

                // Optional: auto-set first route
                if (data.length > 0) {
                    setShipId(data[0].routeId);
                    setYear(data[0].year);
                }

            } catch (err) {
                console.error(err);
            }
        };

        fetchRoutes();
    }, []);

    // Unique ship IDs
    const shipIds = Array.from(new Set(routes.map(r => r.routeId)));

    // Years filtered by selected ship
    const filteredYears = routes
        .filter(r => r.routeId === shipId)
        .map(r => r.year);

    const fetchCB = async () => {
        try {
            const data = await api.getCB(shipId, year);
            setCbData(data);
        } catch {
            alert("No route found for this ship and year.");
            setCbData(null);
        }
    };

    const handleBank = async () => {
        if (!cbData) return;

        await api.bank(shipId, year, cbData.cb);
        alert("Banked successfully");
    };

    const handleApply = async () => {
        if (!cbData) return;

        if (!amount || amount <= 0) {
            alert("Enter a valid positive amount");
            return;
        }

        try {
            await api.apply(shipId, year, amount);
            alert("Bank applied successfully");
        } catch (err) {
            if (err instanceof Error) {
                alert("Apply failed: " + err.message);
            } else {
                alert("Apply failed");
            }
        }
    };

    return (
        <div>
            <h2 className="text-xl font-bold mb-4">Banking</h2>

            <div className="mb-4 flex gap-4">

                {/* Ship Dropdown */}
                <select
                    value={shipId}
                    onChange={e => {
                        setShipId(e.target.value);
                        setCbData(null);
                    }}
                    className="border p-2"
                >
                    {shipIds.map(id => (
                        <option key={id} value={id}>
                            {id}
                        </option>
                    ))}
                </select>

                {/* Year Dropdown (Filtered by Ship) */}
                <select
                    value={year}
                    onChange={e => {
                        setYear(Number(e.target.value));
                        setCbData(null);
                    }}
                    className="border p-2"
                >
                    {filteredYears.map(y => (
                        <option key={y} value={y}>
                            {y}
                        </option>
                    ))}
                </select>

                <button
                    onClick={fetchCB}
                    className="bg-blue-500 text-white px-4 py-2 rounded"
                >
                    Fetch CB
                </button>
            </div>

            {cbData && (
                <div className="border p-4 mb-4">
                    <p><strong>Target:</strong> {cbData.target}</p>
                    <p><strong>Actual:</strong> {cbData.actual}</p>
                    <p><strong>Energy:</strong> {cbData.energy}</p>
                    <p><strong>CB:</strong> {cbData.cb}</p>
                    <p><strong>Status:</strong> {cbData.status}</p>

                    {cbData.cb > 0 && (
                        <button
                            onClick={handleBank}
                            className="bg-green-500 text-white px-4 py-2 mt-2 rounded"
                        >
                            Bank Surplus
                        </button>
                    )}

                    {cbData.cb < 0 && (
                        <div className="mt-2">
                            <input
                                type="number"
                                placeholder="Amount to apply"
                                value={amount}
                                onChange={e => setAmount(Number(e.target.value))}
                                className="border p-2 mr-2"
                            />
                            <button
                                onClick={handleApply}
                                className="bg-yellow-500 text-white px-4 py-2 rounded"
                            >
                                Apply Banked
                            </button>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}
