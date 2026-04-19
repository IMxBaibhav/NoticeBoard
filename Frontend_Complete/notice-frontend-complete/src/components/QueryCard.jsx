import { useState } from "react";
import { replyToQuery } from "../services/api";

export default function QueryCard({ query, refresh, isAdmin }) {
  const [reply, setReply] = useState("");
  const [sending, setSending] = useState(false);

  const sendReply = async () => {
    if (!reply.trim()) return;
    setSending(true);
    try {
      await replyToQuery(query.id, reply);
      setReply("");
      refresh();
    } catch (err) {
      alert("Failed to send reply");
    } finally {
      setSending(false);
    }
  };

  const statusColor = {
    OPEN: "bg-red-900/40 text-red-400 border-red-800",
    REPLIED: "bg-green-900/40 text-green-400 border-green-800",
    ANSWERED: "bg-blue-900/40 text-blue-400 border-blue-800",
  };

  return (
    <div className="bg-gray-900 border border-gray-800 rounded-xl p-5">
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1">
          <h3 className="text-white font-semibold">{query.subject}</h3>
          <p className="text-gray-300 mt-2 text-sm">{query.message}</p>

          <div className="mt-3 flex flex-wrap gap-3 text-xs text-gray-500">
            {isAdmin && (
              <>
                <span>👤 {query.studentName}</span>
                <span>📧 {query.studentEmail}</span>
              </>
            )}
            <span>🕐 {new Date(query.createdAt).toLocaleDateString("en-IN")}</span>
          </div>
        </div>

        <span className={`px-2.5 py-1 rounded-full text-xs font-medium border ${statusColor[query.status] || statusColor.OPEN} shrink-0`}>
          {query.status}
        </span>
      </div>

      {/* Attachment */}
      {query.attachmentPath && (
        <div className="mt-3">
          <span className="text-xs text-gray-500">📎 {query.attachmentName}</span>
        </div>
      )}

      {/* Reply shown */}
      {query.replyMessage && (
        <div className="mt-4 p-3 bg-green-900/20 border border-green-900/40 rounded-lg">
          <p className="text-xs text-green-400 font-semibold mb-1">
            Reply from {query.repliedBy || "Admin"}:
          </p>
          <p className="text-gray-300 text-sm">{query.replyMessage}</p>
        </div>
      )}

      {/* Reply form - only admin, only if OPEN */}
      {isAdmin && query.status === "OPEN" && (
        <div className="mt-4 space-y-2">
          <textarea
            className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white text-sm placeholder-gray-500 focus:outline-none focus:border-blue-500"
            placeholder="Write a reply..."
            rows={3}
            value={reply}
            onChange={e => setReply(e.target.value)}
          />
          <button
            onClick={sendReply}
            disabled={sending || !reply.trim()}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white text-sm rounded-lg transition-colors"
          >
            {sending ? "Sending..." : "Send Reply"}
          </button>
        </div>
      )}
    </div>
  );
}
