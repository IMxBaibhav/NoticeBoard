import { useEffect, useState } from "react";
import { getNotices, createNotice, deleteNotice, uploadAttachment, getAttachments } from "../services/api";

export default function Notices() {
  const [notices, setNotices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [showForm, setShowForm] = useState(false);

  const load = async () => {
    try {
      const res = await getNotices();
      setNotices(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { load(); }, []);

  const handleCreate = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      await createNotice({ title, content, postedBy: "admin" });
      setTitle(""); setContent(""); setShowForm(false);
      load();
    } catch (err) {
      alert("Failed to create notice");
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm("Delete this notice?")) return;
    try {
      await deleteNotice(id);
      load();
    } catch (err) {
      alert("Failed to delete");
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Notices</h1>
          <p className="text-gray-400 mt-1">Manage and publish notices</p>
        </div>
        <button
          onClick={() => setShowForm(!showForm)}
          className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-medium transition-colors"
        >
          {showForm ? "✕ Cancel" : "+ New Notice"}
        </button>
      </div>

      {/* Create form */}
      {showForm && (
        <form onSubmit={handleCreate} className="bg-gray-900 border border-gray-800 rounded-xl p-6 space-y-4">
          <h2 className="text-lg font-semibold text-white">Create New Notice</h2>
          <input
            className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-blue-500"
            placeholder="Notice title"
            value={title}
            onChange={e => setTitle(e.target.value)}
            required
          />
          <textarea
            className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-blue-500"
            placeholder="Notice content"
            rows={4}
            value={content}
            onChange={e => setContent(e.target.value)}
            required
          />
          <button
            type="submit"
            disabled={submitting}
            className="px-6 py-2 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white rounded-lg font-medium transition-colors"
          >
            {submitting ? "Publishing..." : "Publish Notice"}
          </button>
        </form>
      )}

      {/* Notices list */}
      {loading ? (
        <div className="text-center py-12 text-gray-400">Loading...</div>
      ) : notices.length === 0 ? (
        <div className="text-center py-16 text-gray-500 bg-gray-900 border border-gray-800 rounded-xl">
          No notices yet. Create one above!
        </div>
      ) : (
        <div className="space-y-4">
          {notices.map(notice => (
            <NoticeItem key={notice.id} notice={notice} onDelete={handleDelete} />
          ))}
        </div>
      )}
    </div>
  );
}

function NoticeItem({ notice, onDelete }) {
  const [attachments, setAttachments] = useState([]);
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [expanded, setExpanded] = useState(false);

  const loadAttachments = async () => {
    try {
      const res = await getAttachments(notice.id);
      setAttachments(res.data);
    } catch {}
  };

  const handleUpload = async () => {
    if (!file) return;
    setUploading(true);
    try {
      await uploadAttachment(notice.id, file);
      setFile(null);
      loadAttachments();
    } catch {
      alert("Upload failed");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="bg-gray-900 border border-gray-800 rounded-xl p-6">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-white">{notice.title}</h3>
          <p className="text-gray-400 mt-1 text-sm">
            {new Date(notice.createdAt).toLocaleDateString("en-IN", {
              day: "numeric", month: "short", year: "numeric"
            })}
            {notice.postedBy && ` • ${notice.postedBy}`}
          </p>
          <p className="text-gray-300 mt-3">{notice.content}</p>
        </div>
        <div className="flex gap-2 ml-4">
          <button
            onClick={() => { setExpanded(!expanded); if (!expanded) loadAttachments(); }}
            className="px-3 py-1.5 bg-gray-800 hover:bg-gray-700 text-gray-300 rounded-lg text-sm transition-colors"
          >
            📎 Files
          </button>
          <button
            onClick={() => onDelete(notice.id)}
            className="px-3 py-1.5 bg-red-900/40 hover:bg-red-900/60 text-red-400 rounded-lg text-sm transition-colors"
          >
            Delete
          </button>
        </div>
      </div>

      {expanded && (
        <div className="mt-4 pt-4 border-t border-gray-800">
          {attachments.length > 0 && (
            <div className="space-y-2 mb-4">
              {attachments.map(att => (
                <div key={att.id} className="flex items-center gap-2 text-sm text-gray-300">
                  <span>📄</span>
                  <a
                    href={`http://localhost:8080/api/attachments/${att.id}`}
                    target="_blank"
                    rel="noreferrer"
                    className="text-blue-400 hover:underline"
                  >
                    {att.filename}
                  </a>
                </div>
              ))}
            </div>
          )}
          <div className="flex gap-3">
            <input
              type="file"
              onChange={e => setFile(e.target.files[0])}
              className="text-gray-400 text-sm flex-1"
            />
            <button
              onClick={handleUpload}
              disabled={!file || uploading}
              className="px-4 py-1.5 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white text-sm rounded-lg"
            >
              {uploading ? "Uploading..." : "Upload"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
