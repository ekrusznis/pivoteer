import { useState } from "react";
import Support from "./Support";
import Help from "./Help";
import Logs from "./Logs";

const HelpCenter = () => {
  const [activeTab, setActiveTab] = useState<"help" | "support" | "logs">("help");

  const tabStyle = (tab: string) =>
    `px-4 py-2 cursor-pointer text-lg font-medium ${
      activeTab === tab ? "text-white border-b-2 border-neonPink" : "text-gray-400"
    }`;

  return (
    <div className="min-h-screen bg-darkIndigo text-brightWhite p-6">
      <h1 className="text-3xl font-bold mb-6">Help & Support</h1>

      {/* Tab Navigation */}
      <div className="flex border-b border-gray-700 mb-6 space-x-6">
        <span className={tabStyle("help")} onClick={() => setActiveTab("help")}>Help</span>
        <span className={tabStyle("support")} onClick={() => setActiveTab("support")}>Support</span>
        <span className={tabStyle("logs")} onClick={() => setActiveTab("logs")}>Logs</span>
      </div>

      {/* Tab Content */}
      <div className="bg-deepIndigo p-6 rounded-lg shadow-md">
        {activeTab === "help" && <Help />}

        {activeTab === "support" && <Support />}

        {activeTab === "logs" && <Logs />}
      </div>
    </div>
  );
};

export default HelpCenter;
