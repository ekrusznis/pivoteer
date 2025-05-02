import { useState } from "react";

const mockLogs = [
  {
    date: "2024-04-21",
    type: "UPLOAD_FILE",
    userId: "1055678901234567880",
    fileId: "1055678901234567880",
    success: true,
  },
  {
    date: "2024-04-21",
    type: "GENERATE_PIVOT",
    userId: "1055678901234567880",
    fileId: "1055678901234567880",
    success: true,
  },
  {
    date: "2024-04-21",
    type: "GENERATE_VIS",
    userId: "056789001234567890",
    fileId: "056789001234567890",
    success: true,
  },
];

const logCategories = [
  "Getting Started",
  "Generate Pivot Tables",
  "Using Macros",
  "Generation Vis",
  "File Exporting",
];

const Logs = () => {
  const [selectedCategory, setSelectedCategory] = useState(logCategories[0]);

  const [keyword, setKeyword] = useState("");
  const [type, setType] = useState("");
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [successFilter, setSuccessFilter] = useState("");

  return (
    <div className="flex flex-col md:flex-row gap-8">
      {/* Sidebar */}
      <div className="w-full md:w-1/4">
        <h3 className="text-lg font-semibold mb-4">Request Logs</h3>
        <ul className="space-y-2">
          {logCategories.map((cat) => (
            <li
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`cursor-pointer px-4 py-2 rounded-md transition-all ${
                selectedCategory === cat
                  ? "bg-purple-900 text-white"
                  : "text-gray-300 hover:bg-purple-800"
              }`}
            >
              {cat}
            </li>
          ))}
        </ul>
      </div>

      {/* Main Content */}
      <div className="w-full md:w-3/4">
        <h2 className="text-2xl font-bold mb-4">Request Logs</h2>

        {/* Filters */}
        <div className="bg-darkIndigo border border-gray-700 rounded-md p-4 mb-6 grid grid-cols-1 md:grid-cols-5 gap-4 text-sm">
          <input
            type="text"
            placeholder="Search keyword..."
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            className="px-3 py-2 bg-deepIndigo border border-gray-600 rounded-md text-white"
          />
          <select
            value={type}
            onChange={(e) => setType(e.target.value)}
            className="px-3 py-2 bg-deepIndigo border border-gray-600 rounded-md text-white"
          >
            <option value="">All Types</option>
            <option value="UPLOAD_FILE">UPLOAD_FILE</option>
            <option value="GENERATE_PIVOT">GENERATE_PIVOT</option>
            <option value="GENERATE_VIS">GENERATE_VIS</option>
          </select>
          <input
            type="date"
            value={fromDate}
            onChange={(e) => setFromDate(e.target.value)}
            className="px-3 py-2 bg-deepIndigo border border-gray-600 rounded-md text-white"
          />
          <input
            type="date"
            value={toDate}
            onChange={(e) => setToDate(e.target.value)}
            className="px-3 py-2 bg-deepIndigo border border-gray-600 rounded-md text-white"
          />
          <select
            value={successFilter}
            onChange={(e) => setSuccessFilter(e.target.value)}
            className="px-3 py-2 bg-deepIndigo border border-gray-600 rounded-md text-white"
          >
            <option value="">All</option>
            <option value="true">Success</option>
            <option value="false">Failed</option>
          </select>
        </div>

        {/* Log Table */}
        <div className="overflow-x-auto rounded-md border border-gray-700">
          <table className="min-w-full text-sm text-left text-gray-300">
            <thead className="bg-deepIndigo border-b border-gray-700">
              <tr>
                <th className="px-4 py-3">Date</th>
                <th className="px-4 py-3">Request Type</th>
                <th className="px-4 py-3">User ID</th>
                <th className="px-4 py-3">File ID</th>
                <th className="px-4 py-3">Success</th>
              </tr>
            </thead>
            <tbody>
              {mockLogs.map((log, idx) => (
                <tr
                  key={idx}
                  className="border-b border-gray-700 hover:bg-darkIndigo"
                >
                  <td className="px-4 py-2">{log.date}</td>
                  <td className="px-4 py-2">{log.type}</td>
                  <td className="px-4 py-2">{log.userId}</td>
                  <td className="px-4 py-2">{log.fileId}</td>
                  <td className="px-4 py-2">
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-semibold ${
                        log.success
                          ? "bg-green-700 text-white"
                          : "bg-red-700 text-white"
                      }`}
                    >
                      {log.success ? "True" : "False"}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination Footer */}
        <div className="flex justify-between items-center text-gray-400 text-sm mt-4">
          <span>1–10 of 45</span>
          <div className="space-x-2">
            <button className="px-3 py-1 rounded-md bg-deepIndigo hover:bg-purple-800">‹</button>
            <button className="px-3 py-1 rounded-md bg-deepIndigo hover:bg-purple-800">›</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Logs;
