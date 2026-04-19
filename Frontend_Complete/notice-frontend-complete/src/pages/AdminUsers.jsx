import { useState } from "react";
import { createUser } from "../services/api";

export default function AdminUsers() {
  const [form, setForm] = useState({
    username: "", password: "", fullName: "", email: "", role: "USER",
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const submit = async (e) => {
    e.preventDefault();
    setLoading(true); setSuccess(""); setError("");
    try {
      await createUser(form);
      setSuccess(`User "${form.username}" created successfully!`);
      setForm({ username: "", password: "", fullName: "", email: "", role: "USER" });
    } catch (err) {
      setError(err.response?.data || "Failed to create user");
    } finally {
      setLoading(false);
    }
  };

  const inputClass = "w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 transition-colors";

  return (
    <div className="max-w-lg space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white">Create User</h1>
        <p className="text-gray-400 mt-1">Add a new moderator or student account</p>
      </div>

      <form onSubmit={submit} className="bg-gray-900 border border-gray-800 rounded-xl p-6 space-y-4">
        {success && (
          <div className="bg-green-900/30 border border-green-700 text-green-300 px-4 py-3 rounded-lg text-sm">
            ✅ {success}
          </div>
        )}
        {error && (
          <div className="bg-red-900/30 border border-red-700 text-red-300 px-4 py-3 rounded-lg text-sm">
            ❌ {error}
          </div>
        )}

        <div>
          <label className="block text-sm text-gray-400 mb-1">Username</label>
          <input className={inputClass} placeholder="username"
            value={form.username} onChange={e => setForm({...form, username: e.target.value})} required />
        </div>

        <div>
          <label className="block text-sm text-gray-400 mb-1">Password</label>
          <input className={inputClass} type="password" placeholder="••••••••"
            value={form.password} onChange={e => setForm({...form, password: e.target.value})} required />
        </div>

        <div>
          <label className="block text-sm text-gray-400 mb-1">Full Name</label>
          <input className={inputClass} placeholder="John Doe"
            value={form.fullName} onChange={e => setForm({...form, fullName: e.target.value})} required />
        </div>

        <div>
          <label className="block text-sm text-gray-400 mb-1">Email</label>
          <input className={inputClass} type="email" placeholder="user@example.com"
            value={form.email} onChange={e => setForm({...form, email: e.target.value})} required />
        </div>

        <div>
          <label className="block text-sm text-gray-400 mb-1">Role</label>
          <select className={inputClass}
            value={form.role} onChange={e => setForm({...form, role: e.target.value})}>
            <option value="USER">Student (USER)</option>
            <option value="MODERATOR">Moderator</option>
            <option value="ADMIN">Admin</option>
          </select>
        </div>

        <button type="submit" disabled={loading}
          className="w-full py-3 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white font-semibold rounded-lg transition-colors">
          {loading ? "Creating..." : "Create User"}
        </button>
      </form>
    </div>
  );
}
