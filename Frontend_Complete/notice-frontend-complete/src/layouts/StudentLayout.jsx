import { Link, useNavigate, useLocation } from "react-router-dom";
import { logout } from "../utils/auth";

const navItems = [
  { path: "/student", label: "🏠 Home", exact: true },
  { path: "/student/notices", label: "📋 Notices" },
  { path: "/student/queries", label: "❓ My Queries" },
  { path: "/student/query/new", label: "✏️ New Query" },
];

export default function StudentLayout({ children }) {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <div className="flex h-screen bg-gray-950 text-white overflow-hidden">
      <aside className="w-64 bg-gray-900 border-r border-gray-800 flex flex-col shrink-0">
        <div className="p-6 border-b border-gray-800">
          <h1 className="text-xl font-bold text-green-400">📌 Notice Board</h1>
          <p className="text-xs text-gray-500 mt-1">Student Portal</p>
        </div>

        <nav className="flex-1 p-4 space-y-1">
          {navItems.map((item) => {
            const isActive = item.exact
              ? location.pathname === item.path
              : location.pathname.startsWith(item.path);

            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center px-4 py-2.5 rounded-lg text-sm font-medium transition-all ${
                  isActive
                    ? "bg-green-600 text-white"
                    : "text-gray-400 hover:bg-gray-800 hover:text-white"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="p-4 border-t border-gray-800">
          <button
            onClick={() => { logout(); navigate("/"); }}
            className="w-full px-4 py-2 bg-red-600 hover:bg-red-700 rounded-lg text-sm font-medium transition-colors"
          >
            🚪 Logout
          </button>
        </div>
      </aside>

      <main className="flex-1 overflow-y-auto">
        <div className="p-8">{children}</div>
      </main>
    </div>
  );
}
