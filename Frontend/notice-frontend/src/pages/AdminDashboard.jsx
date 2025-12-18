import { useEffect, useState } from "react";
import api from "../services/api";
import QueryCard from "../components/QueryCard";

const AdminDashboard = () => {
  const [queries, setQueries] = useState([]);
  const token = localStorage.getItem("token");

  const loadQueries = async () => {
    try {
      const res = await api.get("/api/queries/all", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setQueries(res.data);
    } catch (err) {
      console.error(err);
      alert("Failed to load queries");
    }
  };

  useEffect(() => {
    loadQueries();
  }, []);

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h1 className="text-2xl text-white mb-6">Admin Dashboard</h1>

      <div className="grid gap-4">
        {queries.map((q) => (
          <QueryCard key={q.id} query={q} refresh={loadQueries} />
        ))}
      </div>
    </div>
  );
};

export default AdminDashboard;
