import { useState } from "react";
import { Dialog } from "@headlessui/react";
import { Button } from "../../ui/button";

const PivotModal = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
  const [selectedRow, setSelectedRow] = useState("Product");
  const [selectedValue, setSelectedValue] = useState("Total Revenue");

  const rowOptions = ["Product", "Region", "Category"];
  const valueOptions = ["Total Revenue", "Units Sold", "Profit"];

  const sampleData = [
    { product: "Product A", revenue: "$23,000" },
    { product: "Product B", revenue: "$15,500" },
    { product: "Product C", revenue: "$35,000" },
    { product: "Grand Total", revenue: "$73,500" },
  ];

  return (
    <Dialog open={isOpen} onClose={onClose} className="relative z-50">
      <div className="fixed inset-0 bg-black bg-opacity-60" aria-hidden="true" />
      <div className="fixed inset-0 flex items-center justify-center p-4">
        <Dialog.Panel className="bg-deepIndigo rounded-xl p-6 w-full max-w-md text-white">
          <Dialog.Title className="text-2xl font-bold mb-4">Generate Pivot Table</Dialog.Title>

          <div className="mb-4">
            <label className="block mb-1">Rows:</label>
            <select
              className="w-full rounded p-2 bg-darkIndigo text-white"
              value={selectedRow}
              onChange={(e) => setSelectedRow(e.target.value)}
            >
              {rowOptions.map((row) => (
                <option key={row} value={row}>
                  {row}
                </option>
              ))}
            </select>
          </div>

          <div className="mb-6">
            <label className="block mb-1">Values:</label>
            <select
              className="w-full rounded p-2 bg-darkIndigo text-white"
              value={selectedValue}
              onChange={(e) => setSelectedValue(e.target.value)}
            >
              {valueOptions.map((val) => (
                <option key={val} value={val}>
                  {val}
                </option>
              ))}
            </select>
          </div>

          <table className="w-full mb-6 border-t border-gray-700">
            <thead>
              <tr>
                <th className="text-left p-2 border-b border-gray-700">Product</th>
                <th className="text-left p-2 border-b border-gray-700">Sum of Total Revenue</th>
              </tr>
            </thead>
            <tbody>
              {sampleData.map((item, idx) => (
                <tr key={idx}>
                  <td className={`p-2 ${item.product === "Grand Total" ? "font-bold" : ""}`}>{item.product}</td>
                  <td className={`p-2 ${item.product === "Grand Total" ? "font-bold" : ""}`}>{item.revenue}</td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="flex justify-end gap-4">
            <Button variant="secondary" onClick={onClose}>
              Cancel
            </Button>
            <Button variant="default">Generate</Button>
          </div>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
};

export default PivotModal;
