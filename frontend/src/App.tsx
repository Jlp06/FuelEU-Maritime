import { useState } from "react";
import { RoutesPage } from "./adapters/ui/pages/RoutesPage";
import { ComparePage } from "./adapters/ui/pages/ComparePage";
import { BankingPage } from "./adapters/ui/pages/BankingPage";
import { PoolingPage } from "./adapters/ui/pages/PoolingPage";

type Tab = "routes" | "compare" | "banking" | "pooling";

function App() {

  const [activeTab, setActiveTab] = useState<Tab>("routes");

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-7xl mx-auto px-6 py-10">

        <h1 className="text-4xl font-semibold text-gray-800 mb-10">
          FuelEU Compliance Dashboard
        </h1>

        <div className="flex gap-3 mb-10 bg-white p-2 rounded-xl shadow-sm w-fit">
          {["routes", "compare", "banking", "pooling"].map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab as Tab)}
              className={`px-5 py-2 rounded-lg text-sm font-medium transition-all
        ${activeTab === tab
                  ? "bg-blue-600 text-white shadow-md"
                  : "text-gray-600 hover:bg-gray-100"
                }`}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>

      {activeTab === "routes" && <RoutesPage />}
      {activeTab === "compare" && <ComparePage />}
      {activeTab === "banking" && <BankingPage />}
      {activeTab === "pooling" && <PoolingPage />}

     </div>
    </div>
  );
}

export default App;
