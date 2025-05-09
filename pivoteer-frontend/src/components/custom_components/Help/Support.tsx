import { useEffect, useState } from "react";
import { getTicketsByUser, createTicket } from "@/api/api";

const statusColorMap = {
  Open: "bg-neonPink",
  "In Progress": "bg-indigo-400",
  Closed: "bg-emerald-600",
};
type SupportTicket = {
  id: string;
  createdAt: string;
  lastUpdated?: string;
  userId: string;
  logId?: string;
  title: string;
  message: string;
  status: "Open" | "In Progress" | "Closed";
};

const Support = () => {
  const userId = "replace-with-real-user-id"; // Replace with real userId from context/session
  const [tickets, setTickets] = useState<SupportTicket[]>([]);
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (!userId) return;
    getTicketsByUser(userId)
      .then(setTickets)
      .catch(console.error);
  }, [userId]);

  const handleSubmit = async () => {
    try {
      const newTicket = await createTicket({ userId, title, message });
      setTickets([newTicket, ...tickets]);
      setTitle("");
      setMessage("");
    } catch (err) {
      console.error(err);
    }
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
            {tickets.map((ticket) => (
              <tr key={ticket.id} className="border-b border-gray-800 hover:bg-indigo-900/40">
                <td className="py-2">#{ticket.id.slice(0, 8)}</td>
                <td>{ticket.title}</td>
                <td>{new Date(ticket.lastUpdated || ticket.createdAt).toLocaleString()}</td>
                <td>
                  <span
                    className={`text-xs text-white px-3 py-1 rounded-full ${
                      statusColorMap[ticket.status] || "bg-gray-500"
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
