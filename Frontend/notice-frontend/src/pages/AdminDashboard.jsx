import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";
import StatCard from "../components/StatCard";

export default function AdminDashboard() {
  return (
    <div className="flex bg-gray-950 text-white min-h-screen">
      
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        
        {/* Topbar */}
        <Topbar />

        {/* Content */}
        <div className="p-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatCard title="Total Notices" value="12" />
          <StatCard title="Teachers" value="5" />
          <StatCard title="Students" value="120" />
          <StatCard title="Pending Queries" value="7" />
        </div>

      </div>
    </div>
  );
}
