import { useEffect, useState } from "react";
import { getNotices, getAttachments } from "../../services/api";

export default function StudentNotices() {
  const [notices, setNotices] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getNotices().then(res => setNotices(res.data)).catch(console.error).finally(() => setLoading(false));
  }, []);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white">Notices</h1>
        <p className="text-gray-400 mt-1">All published notices</p>
      </div>

      {loading ? (
        <div className="text-center py-12 text-gray-400">Loading...</div>
      ) : notices.length === 0 ? (
        <div className="text-center py-16 text-gray-500 bg-gray-900 border border-gray-800 rounded-xl">
          No notices published yet
        </div>
      ) : (
        <div className="space-y-4">
          {notices.map(n => <NoticeItem key={n.id} notice={n} />)}
        </div>
      )}
    </div>
  );
}

function NoticeItem({ notice }) {
  const [attachments, setAttachments] = useState([]);
  const [expanded, setExpanded] = useState(false);

  const toggle = async () => {
    if (!expanded) {
      try {
        const res = await getAttachments(notice.id);
        setAttachments(res.data);
      } catch {}
    }
    setExpanded(!expanded);
  };

  return (
    <div className="bg-gray-900 border border-gray-800 rounded-xl p-5">
      <h3 className="text-white font-semibold text-lg">{notice.title}</h3>
      <p className="text-xs text-gray-500 mt-1">
        {new Date(notice.createdAt).toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" })}
        {notice.postedBy && ` • Posted by ${notice.postedBy}`}
      </p>
      <p className="text-gray-300 mt-3">{notice.content}</p>

      <button onClick={toggle} className="mt-3 text-sm text-blue-400 hover:underline">
        {expanded ? "Hide attachments" : "View attachments"}
      </button>

      {expanded && (
        <div className="mt-3 space-y-2">
          {attachments.length === 0 ? (
            <p className="text-gray-500 text-sm">No attachments</p>
          ) : (
            attachments.map(att => (
              <a key={att.id}
                href={`http://localhost:8080/api/attachments/${att.id}`}
                target="_blank" rel="noreferrer"
                className="flex items-center gap-2 text-sm text-blue-400 hover:underline">
                📄 {att.filename}
              </a>
            ))
          )}
        </div>
      )}
    </div>
  );
}
