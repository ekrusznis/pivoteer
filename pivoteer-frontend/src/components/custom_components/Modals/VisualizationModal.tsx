import React from "react";
import { Dialog } from "@headlessui/react";

export interface VisualizationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectChart: (chart: string) => void;
}

const chartTypes = [
  { name: "Bar Chart", src: "/assets/bar_chart.png" },
  { name: "Line Chart", src: "/assets/line_chart.png" },
  { name: "Histogram", src: "/assets/histogram_chart.png" },
  { name: "Pie Chart", src: "/assets/pie_chart.png" },
  { name: "Scatter Plot", src: "/assets/scatter_plot.png" },
  { name: "Stacked Bar Chart", src: "/assets/stacked_bar_chart.png" },
];

const VisualizationModal: React.FC<VisualizationModalProps> = ({ isOpen, onClose, onSelectChart }) => {
  return (
    <Dialog open={isOpen} onClose={onClose} className="fixed z-50 inset-0 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen bg-black bg-opacity-40">
        <Dialog.Panel className="bg-deepIndigo text-white p-8 rounded-lg w-full max-w-4xl">
          <div className="flex justify-between items-center mb-6">
            <Dialog.Title className="text-2xl font-bold">Choose Visualization</Dialog.Title>
            <button onClick={onClose} className="text-gray-400 hover:text-white text-xl">✕</button>
          </div>
          <div className="grid grid-cols-3 gap-6">
            {chartTypes.map(({ name, src }) => (
              <button
                key={name}
                onClick={() => onSelectChart(name)}
                className="bg-darkIndigo hover:bg-indigo-800 p-4 rounded-lg text-center border border-transparent hover:border-neonPink transition-colors"
              >
                <img src={src} alt={name} className="mx-auto h-24 mb-2" />
                <p className="text-white font-medium">{name}</p>
              </button>
            ))}
          </div>
          <div className="mt-8 text-right">
            <button onClick={onClose} className="bg-purple-700 hover:bg-purple-800 px-4 py-2 rounded text-white">
              Cancel
            </button>
          </div>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
};

export default VisualizationModal;
