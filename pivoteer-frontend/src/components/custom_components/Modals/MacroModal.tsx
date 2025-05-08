import { useState } from "react";
import { X } from "lucide-react";
import { Button } from "../../ui/button";

export interface MacroModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const MacroModal = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
  const [activeTab, setActiveTab] = useState<"macros" | "vlookup">("macros");
    if (!isOpen) return null;

  const macroOptions = [
    {
      title: "Remove all filters",
      description: "Clear filters from all columns",
      icon: "🚫",
    },
    {
      title: "Highlight duplicates",
      description: "Find and mark repeated records",
      icon: "📌",
    },
    {
      title: "Auto-sort columns",
      description: "Automatically sort data by selected criteria",
      icon: "📊",
    },
  ];

  const vlookupOptions = [
    {
      title: "VLOOKUP by ID",
      description: "Search for values based on unique ID references",
      icon: "🔍",
    },
    {
      title: "Link to external sheet",
      description: "Match values across sheets",
      icon: "🔗",
    },
  ];

  const options = activeTab === "macros" ? macroOptions : vlookupOptions;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <div className="bg-deepIndigo p-8 rounded-lg w-[500px] relative text-white">
        <button onClick={onClose} className="absolute top-4 right-4 text-xl text-gray-400">
          <X />
        </button>
        <h2 className="text-2xl font-bold mb-4">Create Macro</h2>

        <div className="flex border-b border-gray-600 mb-4">
          <button
            className={`mr-4 pb-2 ${
              activeTab === "macros"
                ? "border-b-2 border-neonPink font-semibold"
                : "text-gray-400"
            }`}
            onClick={() => setActiveTab("macros")}
          >
            MACROS
          </button>
          <button
            className={`pb-2 ${
              activeTab === "vlookup"
                ? "border-b-2 border-neonPink font-semibold"
                : "text-gray-400"
            }`}
            onClick={() => setActiveTab("vlookup")}
          >
            VLOOKUP
          </button>
        </div>

        <div className="space-y-4">
          {options.map((option, index) => (
            <div
              key={index}
              className="flex items-start gap-3 bg-darkIndigo rounded-md p-4 border border-gray-700"
            >
              <div className="text-2xl">{option.icon}</div>
              <div>
                <h3 className="font-semibold">{option.title}</h3>
                <p className="text-gray-400 text-sm">{option.description}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="flex justify-end mt-6 gap-3">
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button> Create </Button>
        </div>
      </div>
    </div>
  );
};

export default MacroModal;
