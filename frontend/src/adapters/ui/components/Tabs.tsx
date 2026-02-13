import { useState } from "react";
import { RoutesPage } from "../pages/RoutesPage";
import { ComparePage } from "../pages/ComparePage";
import { BankingPage } from "../pages/BankingPage";
import { PoolingPage } from "../pages/PoolingPage";

type Tab = "routes" | "compare" | "banking" | "pooling";

export function Tabs() {
    const [active, setActive] = useState<Tab>("routes");

    const renderTab = () => {
        switch (active) {
            case "routes":
                return <RoutesPage />;
            case "compare":
                return <ComparePage />;
            case "banking":
                return <BankingPage />;
            case "pooling":
                return <PoolingPage />;
        }
    };

    return (
        <div>
            <div className="flex gap-4 mb-6">
                <button
                    onClick={() => setActive("routes")}
                    className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
                >
                    Routes
                </button>
                <button onClick={() => setActive("compare")} className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300">
                    Compare
                </button>
                <button onClick={() => setActive("banking")} className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300">
                    Banking
                </button>
                <button onClick={() => setActive("pooling")} className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300">
                    Pooling
                </button>
            </div>

            {renderTab()}
        </div>
    );
}
