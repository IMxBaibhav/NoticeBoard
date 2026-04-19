import { useEffect, useState } from "react";
import { getNotices, getMyQueries } from "../../services/api";
import { Link } from "react-router-dom";

export default function StudentHome() {
  const [notices, setNotices] = useState([]);
  const [queries, setQueries] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([getNotices(), getMyQueries()])
      .then(([nRes, qRes]) => {
        setNotices(nRes.data.slice(0, 3));
        setQueries(qRes.data);
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div className="text-gray-400 text-center py-20">Loading...</div>;

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-white">Welcome! 👋</h1>
        <p className="text-gray-400 mt-1">Here's what's happening today</p>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="bg-gray-900 border border-gray-800 rounded-xl p-6">
          <p className="text-gray-400 text-sm">My Queries</p>
          <h2 className="text-4xl font-bold text-green-400 mt-2">{queries.length}</h2>
        </div>
        <div className="bg-gray-900 border border-gray-800 rounded-xl p-6">
          <p className="text-gray-400 text-sm">Open Queries</p>
          <h2 className="text-4xl font-bold text-red-400 mt-2">
            {queries.filter(q => q.status === "OPEN").length}
          </h2>
        </div>
      </div>

      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-white">Latest Notices</h2>
          <Link to="/student/notices" className="text-sm text-blue-400 hover:underline">View all →</Link>
        </div>
        {notices.length === 0 ? (
          <p className="text-gray-500">No notices yet</p>
        ) : (
          <div className="space-y-3">
            {notices.map(n => (
              <div key={n.id} className="bg-gray-900 border border-gray-800 rounded-xl p-4">
                <h3 className="text-white font-medium">{n.title}</h3>
                <p className="text-gray-400 text-sm mt-1 line-clamp-2">{n.content}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
