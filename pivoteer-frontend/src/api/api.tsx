export const API_BASE = "/api";

// SUPPORT TICKETS
export const getTicketsByUser = async (userId: string) => {
  const res = await fetch(`${API_BASE}/support/${userId}`);
  if (!res.ok) throw new Error("Failed to fetch tickets");
  return res.json();
};

export const createTicket = async (payload: { userId: string; title: string; message: string }) => {
  const res = await fetch(`${API_BASE}/support`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  if (!res.ok) throw new Error("Failed to create ticket");
  return res.json();
};

// LOGS
export const getLogsByUser = async (
  userId: string,
  params: { keyword?: string; type?: string; success?: boolean; from?: string; to?: string; page?: number; size?: number }
) => {
  const query = new URLSearchParams();
  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== "") query.append(key, value.toString());
  });
  const res = await fetch(`/api/request-logs/${userId}?${query.toString()}`);
  if (!res.ok) throw new Error("Failed to fetch logs");
  return res.json();
};

export const createTicketFromLog = async (userId: string, logId: string) => {
  const res = await fetch(`/api/request-logs/${userId}/createTicketFromRequestLog?logId=${logId}`, {
    method: "POST",
  });
  if (!res.ok) throw new Error("Failed to create ticket from log");
  return res.json();
};
