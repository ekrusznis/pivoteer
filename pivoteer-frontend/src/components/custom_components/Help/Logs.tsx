import { useState, useEffect } from "react";
import { getLogsByUser, createTicketFromLog } from "@/api/api";
import { FaEllipsisV } from "react-icons/fa";

type RequestLog = {
  id: string;
  requestType: string;
  message: string;
  success: boolean;
  timestamp: string;
  fileName?: string;
};

const Logs = () => {
  const userId = "replace-with-real-user-id"; // Replace with real user context
  const [logs, setLogs] = useState<RequestLog[]>([]);
  const [loading, setLoading] = useState(false);

  const [keyword, setKeyword] = useState("");
  const [type, setType] = useState("");
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [successFilter, setSuccessFilter] = useState("");

  const fetchLogs = async () => {
    setLoading(true);
    try {
      const data = await getLogsByUser(userId, {
        keyword,
        type,
        success: successFilter === "" ? undefined : successFilter === "true",
        from: fromDate,
        to: toDate,
        page: 0,
        size: 10,
      });
      setLogs(data.data.content);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (userId) fetchLogs();
  }, [userId]);

  const handleCreateTicket = async (logId: string) => {
    try {
      await createTicketFromLog(userId, logId);
      alert("Support ticket created from log.");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="flex flex-col gap-8">
      <h2 className="text-2xl font-bold mb-4">Request Logs</h2>

      {/* Filters */}
      <div className="bg-darkIndigo border border-gray-700 rounded-md p-4 grid grid-cols-1 md:grid-cols-6 gap-4 text-sm">
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
        <button onClick={fetchLogs} className="px-3 py-2 bg-neonPink rounded-md text-white hover:opacity-90">
          Refresh
        </button>
      </div>

      {/* Log Table */}
      <div className="overflow-x-auto rounded-md border border-gray-700">
        {loading ? (
          <div className="text-center py-10 text-gray-400">Loading logs...</div>
        ) : (
          <table className="min-w-full text-sm text-left text-gray-300">
            <thead className="bg-deepIndigo border-b border-gray-700">
              <tr>
                <th className="px-4 py-3">Date</th>
                <th className="px-4 py-3">Request Type</th>
                <th className="px-4 py-3">Message</th>
                <th className="px-4 py-3">File Name</th>
                <th className="px-4 py-3">Success</th>
                <th className="px-4 py-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {logs.map((log) => (
                <tr key={log.id} className="border-b border-gray-700 hover:bg-darkIndigo">
                  <td className="px-4 py-2">{new Date(log.timestamp).toLocaleString()}</td>
                  <td className="px-4 py-2">{log.requestType}</td>
                  <td className="px-4 py-2">{log.message}</td>
                  <td className="px-4 py-2">{log.fileName || "—"}</td>
                  <td className="px-4 py-2">
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-semibold ${
                        log.success ? "bg-green-700 text-white" : "bg-red-700 text-white"
                      }`}
                    >
                      {log.success ? "True" : "False"}
                    </span>
                  </td>
                  <td className="px-4 py-2 relative">
                    <button
                      onClick={() => handleCreateTicket(log.id)}
                      className="text-white hover:text-neonPink transition flex items-center gap-1"
                    >
                      <FaEllipsisV />
                      <span className="sr-only">Actions</span>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default Logs;
