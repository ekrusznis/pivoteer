import { useState } from "react";

const dummyTickets = [
  { id: 1021, title: "Cannot generate pivot table", updated: "2 hours ago", status: "Open" },
  { id: 1020, title: "Issue with file upload", updated: "2 days ago", status: "In Progress" },
  { id: 1019, title: "Error exdata lucc bcoes", updated: "2 hours ago", status: "Closed" },
  { id: 1018, title: "Issue with file errors", updated: "21 hours ago", status: "Open" },
  { id: 1017, title: "Check update simar erro", updated: "3 days ago", status: "Closed" },
];

const statusColorMap = {
  Open: "bg-neonPink",
  "In Progress": "bg-indigo-400",
  Closed: "bg-emerald-600",
};

const Support = () => {
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = () => {
    // Replace with actual form logic
    console.log("Submitted:", { title, message });
    setTitle("");
    setMessage("");
  };

  return (
    <div className="text-brightWhite p-8 space-y-8">
      <div>
        <h2 className="text-2xl font-semibold mb-4">Submit a Support Ticket</h2>
        <div className="flex flex-col gap-4 max-w-xl">
          <input
            className="bg-deepIndigo border border-gray-700 rounded px-4 py-2"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <textarea
            className="bg-deepIndigo border border-gray-700 rounded px-4 py-2"
            rows={4}
            placeholder="Message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          <button
            onClick={handleSubmit}
            className="bg-neonPink text-white px-5 py-2 rounded hover:opacity-90 transition"
          >
            Submit Ticket
          </button>
        </div>
      </div>

      <div>
        <table className="w-full text-sm table-auto border-collapse mt-8">
          <thead>
            <tr className="text-left border-b border-gray-700">
              <th className="pb-2">ID</th>
              <th className="pb-2">Title</th>
              <th className="pb-2">Last Updated</th>
              <th className="pb-2">Status</th>
            </tr>
          </thead>
          <tbody>
            {dummyTickets.map((ticket) => (
              <tr key={ticket.id} className="border-b border-gray-800 hover:bg-indigo-900/40">
                <td className="py-2">#{ticket.id}</td>
                <td>{ticket.title}</td>
                <td>{ticket.updated}</td>
                <td>
                  <span
                    className={`text-xs text-white px-3 py-1 rounded-full ${
                      statusColorMap[ticket.status as keyof typeof statusColorMap]
                    }`}
                  >
                    {ticket.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Support;
