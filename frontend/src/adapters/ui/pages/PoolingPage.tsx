import { useEffect, useState } from "react";
import { PoolApiHttp } from "../../infrastructure/PoolApiHttp";
import type { PoolMemberInput, PoolResult } from "../../infrastructure/PoolApiHttp";
import type { Route } from "../../../core/domain/Route";

const API_URL = "http://localhost:4000";

export function PoolingPage() {

    const api = new PoolApiHttp();

    const [routes, setRoutes] = useState<Route[]>([]);
    const [year, setYear] = useState(2024);
    const [members, setMembers] = useState<PoolMemberInput[]>([]);
    const [shipId, setShipId] = useState("");
    const [cb, setCb] = useState(0);
    const [result, setResult] = useState<PoolResult | null>(null);

    /* Fetch routes */
    useEffect(() => {
        const fetchRoutes = async () => {
            const res = await fetch(`${API_URL}/routes`);
            const data: Route[] = await res.json();
            setRoutes(data);
        };
        fetchRoutes();
    }, []);

    const years = Array.from(new Set(routes.map(r => r.year)));

    const shipsForYear = routes
        .filter(r => r.year === year)
        .map(r => r.routeId);

    const fetchCB = async (selectedShip: string) => {
        const res = await fetch(
            `${API_URL}/banking/cb?shipId=${selectedShip}&year=${year}`
        );
        if (!res.ok) return;

        const data = await res.json();
        setCb(data.cb);
    };

    const addMember = () => {
        if (!shipId) return;

        const exists = members.some(m => m.shipId === shipId);
        if (exists) {
            alert("Ship already added to pool");
            return;
        }

        setMembers([...members, { shipId, cb }]);
        setShipId("");
        setCb(0);
        setResult(null);
    };

    const removeMember = (id: string) => {
        setMembers(members.filter(m => m.shipId !== id));
        setResult(null);
    };

    const total = members.reduce((sum, m) => sum + m.cb, 0);

    const createPool = async () => {
        const data = await api.createPool(year, members);
        setResult(data);
    };

    return (
        <div>
            <h2 className="text-xl font-bold mb-6">Pooling</h2>

            {/* Controls */}
            <div className="flex gap-3 mb-6">
                <select
                    value={year}
                    onChange={e => {
                        setYear(Number(e.target.value));
                        setMembers([]);
                        setResult(null);
                    }}
                    className="border px-3 py-2 rounded"
                >
                    {years.map(y => (
                        <option key={y} value={y}>{y}</option>
                    ))}
                </select>

                <select
                    value={shipId}
                    onChange={e => {
                        const selected = e.target.value;
                        setShipId(selected);
                        fetchCB(selected);
                    }}
                    className="border px-3 py-2 rounded"
                >
                    <option value="">Select Ship</option>
                    {shipsForYear.map(id => (
                        <option key={id} value={id}>{id}</option>
                    ))}
                </select>

                <input
                    type="number"
                    value={cb}
                    readOnly
                    className="border px-3 py-2 rounded bg-gray-100"
                />

                <button
                    onClick={addMember}
                    className="bg-blue-600 text-white px-5 py-2 rounded shadow-sm"
                >
                    Add
                </button>
            </div>

            {/* Total Summary */}
            {members.length > 0 && (
                <div className="mb-4 flex items-center gap-3">
                    <strong>Total CB:</strong>
                    <span className="font-semibold">
                        {total.toLocaleString(undefined, {
                            maximumFractionDigits: 2
                        })}
                    </span>

                    {total >= 0 ? (
                        <span className="text-green-600 font-semibold">
                            ✓ Valid Pool
                        </span>
                    ) : (
                        <span className="text-red-600 font-semibold">
                            ✗ Invalid Pool
                        </span>
                    )}
                </div>
            )}

            {/* Members Table */}
            {members.length > 0 && (
                <div className="bg-white border border-gray-300 rounded overflow-hidden mb-6">
                    <table className="w-full table-fixed text-sm">
                        <thead className="bg-gray-100">
                            <tr>
                                <th className="w-2/5 px-4 py-3 text-left font-semibold">
                                    Ship
                                </th>
                                <th className="w-2/5 px-4 py-3 text-right font-semibold">
                                    CB
                                </th>
                                <th className="w-1/5 px-4 py-3 text-center font-semibold">
                                    Action
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {members.map((m, i) => (
                                <tr
                                    key={i}
                                    className={`border-t ${i % 2 === 0 ? "bg-white" : "bg-gray-50"
                                        } hover:bg-gray-100 transition`}
                                >
                                    <td className="px-4 py-3 font-medium">
                                        {m.shipId}
                                    </td>

                                    <td
                                        className={`px-4 py-3 text-right font-semibold ${m.cb > 0
                                                ? "text-green-600"
                                                : m.cb < 0
                                                    ? "text-red-600"
                                                    : ""
                                            }`}
                                    >
                                        {m.cb.toLocaleString(undefined, {
                                            maximumFractionDigits: 2
                                        })}
                                    </td>

                                    <td className="px-4 py-3 text-center">
                                        <button
                                            onClick={() => removeMember(m.shipId)}
                                            className="text-red-500 hover:underline text-sm"
                                        >
                                            Remove
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}

            {/* Create Pool Button */}
            {members.length > 0 && (
                <button
                    onClick={createPool}
                    disabled={total < 0}
                    className="bg-green-600 text-white px-6 py-2 rounded shadow-sm disabled:bg-gray-400"
                >
                    Create Pool
                </button>
            )}

            {/* Result Section */}
            {result && (
                <div className="mt-8">
                    <h3 className="font-bold mb-4 text-lg">Pool Result</h3>

                    {/* Summary Card */}
                    <div className="bg-white border rounded p-4 mb-4 shadow-sm">
                        <div className="grid grid-cols-3 gap-4 text-sm">
                            <div>
                                <p className="text-gray-500">Surplus Ships</p>
                                <p className="text-green-600 font-semibold">
                                    {result.members.filter(m => m.cbAfter > 0).length}
                                </p>
                            </div>

                            <div>
                                <p className="text-gray-500">Deficit Ships</p>
                                <p className="text-red-600 font-semibold">
                                    {result.members.filter(m => m.cbAfter < 0).length}
                                </p>
                            </div>

                            <div>
                                <p className="text-gray-500">Adjusted Ships</p>
                                <p className="text-blue-600 font-semibold">
                                    {
                                        result.members.filter(
                                            m => m.cbBefore !== m.cbAfter
                                        ).length
                                    }
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Result Table */}
                    <div className="bg-white border border-gray-300 rounded overflow-hidden">
                        <table className="w-full table-fixed text-sm">
                            <thead className="bg-gray-100">
                                <tr>
                                    <th className="w-2/5 px-4 py-3 text-left font-semibold">
                                        Ship
                                    </th>
                                    <th className="w-2/5 px-4 py-3 text-right font-semibold">
                                        CB (Before → After)
                                    </th>
                                    <th className="w-1/5 px-4 py-3 text-center font-semibold">
                                        Action
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {result.members.map((m, i) => {
                                    const changed = m.cbBefore !== m.cbAfter;

                                    return (
                                        <tr
                                            key={i}
                                            className={`border-t ${i % 2 === 0
                                                    ? "bg-white"
                                                    : "bg-gray-50"
                                                } hover:bg-gray-100 transition`}
                                        >
                                            <td className="px-4 py-3 font-medium">
                                                {m.shipId}
                                            </td>

                                            <td className="px-4 py-3 text-right font-semibold">
                                                <span className="text-gray-500">
                                                    {m.cbBefore.toLocaleString(
                                                        undefined,
                                                        { maximumFractionDigits: 2 }
                                                    )}
                                                </span>

                                                <span className="mx-2">→</span>

                                                <span
                                                    className={
                                                        changed
                                                            ? "text-blue-600 font-bold"
                                                            : "text-green-600"
                                                    }
                                                >
                                                    {m.cbAfter.toLocaleString(
                                                        undefined,
                                                        { maximumFractionDigits: 2 }
                                                    )}
                                                </span>
                                            </td>

                                            <td className="px-4 py-3 text-center">
                                                <button
                                                    onClick={() =>
                                                        removeMember(m.shipId)
                                                    }
                                                    className="text-red-500 hover:underline text-sm"
                                                >
                                                    Remove
                                                </button>
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}
        </div>
    );
}