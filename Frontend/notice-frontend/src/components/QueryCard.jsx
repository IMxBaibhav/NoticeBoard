import { useState } from "react";
import api from "../services/api";

const QueryCard = ({ query, refresh }) => {
  const [reply, setReply] = useState("");
  const token = localStorage.getItem("token");

  const sendReply = async () => {
    try {
      await api.put(
        `/api/queries/${query.id}/reply`,
        { replyMessage: reply },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      alert("Reply sent ✅");
      setReply("");
      refresh();
    } catch (err) {
      alert("Failed to reply ❌");
      console.error(err);
    }
  };

  return (
    <div className="bg-zinc-900 p-4 rounded-lg text-white">
      <div className="flex justify-between">
        <h3 className="text-lg font-semibold">{query.subject}</h3>
        <span
          className={`px-2 py-1 rounded text-sm ${
            query.status === "OPEN"
              ? "bg-red-600"
              : "bg-green-600"
          }`}
        >
          {query.status}
        </span>
      </div>

      <p className="mt-2 text-gray-300">{query.message}</p>

      <div className="mt-2 text-sm text-gray-400">
        <p>👤 {query.studentName}</p>
        <p>📧 {query.studentEmail}</p>
      </div>

      {/* FILE DOWNLOAD */}
      {query.attachmentUrl && (
        <a
          href={query.attachmentUrl}
          target="_blank"
          rel="noreferrer"
          className="inline-block mt-2 text-indigo-400 underline"
        >
          Download Attachment
        </a>
      )}

      {/* REPLY */}
      {query.status === "OPEN" && (
        <div className="mt-4">
          <textarea
            className="w-full p-2 rounded bg-zinc-800 text-white"
            placeholder="Write reply..."
            value={reply}
            onChange={(e) => setReply(e.target.value)}
          />

          <button
            onClick={sendReply}
            className="mt-2 bg-indigo-600 hover:bg-indigo-700 px-4 py-2 rounded"
          >
            Send Reply
          </button>
        </div>
      )}

      {/* SHOW REPLY */}
      {query.status === "REPLIED" && (
        <div className="mt-4 p-3 bg-zinc-800 rounded">
          <p className="text-green-400 font-semibold">Reply:</p>
          <p>{query.replyMessage}</p>
        </div>
      )}
    </div>
  );
};

export default QueryCard;
