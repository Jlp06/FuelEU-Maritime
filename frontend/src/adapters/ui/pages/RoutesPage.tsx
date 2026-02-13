import { useRoutes } from "../../../core/application/useRoutes";
import { RoutesApiHttp } from "../../infrastructure/RoutesApiHttp";

export function RoutesPage() {

    const api = new RoutesApiHttp();
    const { routes, loading } = useRoutes(api);

    const handleBaseline = async (routeId: string) => {
        await api.setBaseline(routeId);
        alert("Baseline set successfully");
    };

    if (loading) return <div>Loading...</div>;

    return (
        <div className="bg-white rounded-2xl shadow-sm p-8">
            <h2 className="text-2xl font-semibold mb-6 text-gray-800">
                Routes
            </h2>

            <table className="w-full text-sm">
                <thead className="text-left text-gray-500 uppercase text-xs tracking-wider border-b">
                    <tr>
                        <th className="py-3">Route</th>
                        <th>Vessel</th>
                        <th>Fuel</th>
                        <th>Year</th>
                        <th>GHG</th>
                        <th>Baseline</th>
                    </tr>
                </thead>

                <tbody>
                    {routes.map(r => (
                        <tr key={r.routeId} className="border-b hover:bg-gray-50 transition">
                            <td className="py-4">{r.routeId}</td>
                            <td>{r.vesselType}</td>
                            <td>{r.fuelType}</td>
                            <td>{r.year}</td>
                            <td>{r.ghgIntensity}</td>
                            <td>
                                <button
                                    onClick={() => handleBaseline(r.routeId)}
                                    className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm transition shadow-sm"
                                >
                                    Set Baseline
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}