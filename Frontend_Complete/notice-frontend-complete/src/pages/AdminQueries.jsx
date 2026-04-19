import { useEffect, useState } from "react";
import { getAllQueries } from "../services/api";
import QueryCard from "../components/QueryCard";

export default function AdminQueries() {
  const [queries, setQueries] = useState([]);
  const [filter, setFilter] = useState("ALL");
  const [loading, setLoading] = useState(true);

  const load = async () => {
    try {
      const res = await getAllQueries();
      setQueries(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { load(); }, []);

  const filtered = filter === "ALL" ? queries : queries.filter(q => q.status === filter);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white">Student Queries</h1>
        <p className="text-gray-400 mt-1">Review and reply to student queries</p>
      </div>

      {/* Filter tabs */}
      <div className="flex gap-2">
        {["ALL", "OPEN", "REPLIED"].map(f => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              filter === f
                ? "bg-blue-600 text-white"
                : "bg-gray-800 text-gray-400 hover:text-white"
            }`}
          >
            {f} {f === "ALL" ? `(${queries.length})` : `(${queries.filter(q => q.status === f).length})`}
          </button>
        ))}
      </div>

      {loading ? (
        <div className="text-center py-12 text-gray-400">Loading...</div>
      ) : filtered.length === 0 ? (
        <div className="text-center py-16 text-gray-500 bg-gray-900 border border-gray-800 rounded-xl">
          No queries found
        </div>
      ) : (
        <div className="space-y-4">
          {filtered.map(q => (
            <QueryCard key={q.id} query={q} refresh={load} isAdmin />
          ))}
        </div>
      )}
    </div>
  );
}
