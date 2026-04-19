import { Link } from "react-router-dom";

export default function Sidebar() {
  return (
    <div className="h-screen w-64 bg-gray-900 text-gray-200 hidden md:flex flex-col">
      <div className="p-6 text-2xl font-bold border-b border-gray-700">
        Admin Panel
      </div>

      <nav className="flex-1 p-4 space-y-2">
        <Link className="block px-4 py-2 rounded hover:bg-gray-800" to="/admin">
          Dashboard
        </Link>
        <Link className="block px-4 py-2 rounded hover:bg-gray-800" to="/admin/notices">
          Notices
        </Link>
        <Link className="block px-4 py-2 rounded hover:bg-gray-800" to="/admin/users">
          Users
        </Link>
        <Link className="block px-4 py-2 rounded hover:bg-gray-800" to="/admin/queries">
          Student Queries
        </Link>
      </nav>
    </div>
  );
}
