import { useEffect, useState } from "react";
import { getAllQueries, getNotices } from "../services/api";
import QueryCard from "../components/QueryCard";

export default function AdminDashboard() {
  const [queries, setQueries] = useState([]);
  const [notices, setNotices] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadData = async () => {
    try {
      const [qRes, nRes] = await Promise.all([getAllQueries(), getNotices()]);
      setQueries(qRes.data);
      setNotices(nRes.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { loadData(); }, []);

  const openQueries = queries.filter(q => q.status === "OPEN").length;
  const repliedQueries = queries.filter(q => q.status === "REPLIED").length;

  if (loading) return <div className="text-gray-400 text-center py-20">Loading...</div>;

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-white">Dashboard</h1>
        <p className="text-gray-400 mt-1">Overview of your notice board</p>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-gray-900 border border-gray-800 rounded-xl p-6">
          <p className="text-gray-400 text-sm">Total Notices</p>
          <h2 className="text-4xl font-bold text-blue-400 mt-2">{notices.length}</h2>
        </div>
        <div className="bg-gray-900 border border-gray-800 rounded-xl p-6">
          <p className="text-gray-400 text-sm">Open Queries</p>
          <h2 className="text-4xl font-bold text-red-400 mt-2">{openQueries}</h2>
        </div>
        <div className="bg-gray-900 border border-gray-800 rounded-xl p-6">
          <p className="text-gray-400 text-sm">Replied Queries</p>
          <h2 className="text-4xl font-bold text-green-400 mt-2">{repliedQueries}</h2>
        </div>
      </div>

      {/* Pending Queries */}
      <div>
        <h2 className="text-lg font-semibold text-white mb-4">
          Pending Queries ({openQueries})
        </h2>
        {queries.filter(q => q.status === "OPEN").length === 0 ? (
          <div className="text-center py-12 text-gray-500 bg-gray-900 border border-gray-800 rounded-xl">
            No pending queries 🎉
          </div>
        ) : (
          <div className="space-y-4">
            {queries
              .filter(q => q.status === "OPEN")
              .map(q => (
                <QueryCard key={q.id} query={q} refresh={loadData} />
              ))}
          </div>
        )}
      </div>
    </div>
  );
}
