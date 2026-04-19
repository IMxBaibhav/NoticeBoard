import { logout } from "../utils/auth";
import { useNavigate } from "react-router-dom";

export default function Topbar() {
  const navigate = useNavigate();

  return (
    <div className="h-16 bg-gray-800 flex items-center justify-between px-6">
      <h1 className="text-xl font-semibold text-white">
        Dashboard
      </h1>

      <button
        onClick={() => {
          logout();
          navigate("/");
        }}
        className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded"
      >
        Logout
      </button>
    </div>
  );
}
