import { useState } from "react";
import { createQuery } from "../services/api";
import { useNavigate } from "react-router-dom";

export default function StudentQuery() {
  const [form, setForm] = useState({ subject: "", message: "", studentName: "", studentEmail: "" });
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData();
    formData.append("data", new Blob([JSON.stringify(form)], { type: "application/json" }));
    if (file) formData.append("file", file);

    try {
      await createQuery(formData);
      alert("Query submitted successfully!");
      navigate("/student/queries");
    } catch (err) {
      alert("Failed to submit query. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const inputClass = "w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-green-500 transition-colors";

  return (
    <div className="max-w-lg space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white">New Query</h1>
        <p className="text-gray-400 mt-1">Submit a question or concern</p>
      </div>

      <form onSubmit={handleSubmit} className="bg-gray-900 border border-gray-800 rounded-xl p-6 space-y-4">
        <div>
          <label className="block text-sm text-gray-400 mb-1">Subject *</label>
          <input className={inputClass} placeholder="Brief subject of your query"
            value={form.subject} onChange={e => setForm({...form, subject: e.target.value})} required />
        </div>

        <div>
          <label className="block text-sm text-gray-400 mb-1">Message *</label>
          <textarea className={inputClass} rows={4} placeholder="Describe your query in detail"
            value={form.message} onChange={e => setForm({...form, message: e.target.value})} required />
        </div>

        <div>
          <label className="block text-sm text-gray-400 mb-1">Your Name *</label>
          <input className={inputClass} placeholder="Full name"
            value={form.studentName} onChange={e => setForm({...form, studentName: e.target.value})} required />
        </div>

        <div>
          <label className="block text-sm text-gray-400 mb-1">Email *</label>
          <input className={inputClass} type="email" placeholder="your@email.com"
            value={form.studentEmail} onChange={e => setForm({...form, studentEmail: e.target.value})} required />
        </div>

        <div>
          <label className="block text-sm text-gray-400 mb-1">Attachment (optional)</label>
          <input type="file" accept=".pdf,image/*"
            className="text-gray-400 text-sm"
            onChange={e => setFile(e.target.files[0])} />
        </div>

        <button type="submit" disabled={loading}
          className="w-full py-3 bg-green-600 hover:bg-green-700 disabled:opacity-50 text-white font-semibold rounded-lg transition-colors">
          {loading ? "Submitting..." : "Submit Query"}
        </button>
      </form>
    </div>
  );
}
