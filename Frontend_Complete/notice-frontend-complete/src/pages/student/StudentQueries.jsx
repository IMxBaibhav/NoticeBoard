import { useEffect, useState } from "react";
import { getMyQueries } from "../../services/api";
import { Link } from "react-router-dom";

export default function StudentQueries() {
  const [queries, setQueries] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getMyQueries().then(res => setQueries(res.data)).catch(console.error).finally(() => setLoading(false));
  }, []);

  const statusColor = {
    OPEN: "bg-red-900/40 text-red-400",
    REPLIED: "bg-green-900/40 text-green-400",
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">My Queries</h1>
          <p className="text-gray-400 mt-1">Track your submitted queries</p>
        </div>
        <Link to="/student/query/new"
          className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg text-sm font-medium transition-colors">
          + New Query
        </Link>
      </div>

      {loading ? (
        <div className="text-center py-12 text-gray-400">Loading...</div>
      ) : queries.length === 0 ? (
        <div className="text-center py-16 text-gray-500 bg-gray-900 border border-gray-800 rounded-xl">
          No queries submitted yet.<br />
          <Link to="/student/query/new" className="text-green-400 hover:underline mt-2 inline-block">
            Submit your first query →
          </Link>
        </div>
      ) : (
        <div className="space-y-4">
          {queries.map(q => (
            <div key={q.id} className="bg-gray-900 border border-gray-800 rounded-xl p-5">
              <div className="flex items-start justify-between">
                <h3 className="text-white font-medium">{q.subject}</h3>
                <span className={`px-2 py-1 rounded text-xs font-medium ${statusColor[q.status] || statusColor.OPEN}`}>
                  {q.status}
                </span>
              </div>
              <p className="text-gray-300 text-sm mt-2">{q.message}</p>
              {q.replyMessage && (
                <div className="mt-3 p-3 bg-green-900/20 border border-green-900/30 rounded-lg">
                  <p className="text-xs text-green-400 font-semibold mb-1">Reply:</p>
                  <p className="text-gray-300 text-sm">{q.replyMessage}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
