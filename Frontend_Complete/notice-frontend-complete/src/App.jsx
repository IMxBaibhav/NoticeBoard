import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute";

// Layouts
import AdminLayout from "./layouts/AdminLayout";
import StudentLayout from "./layouts/StudentLayout";

// Pages
import Login from "./pages/Login";
import AdminDashboard from "./pages/AdminDashboard";
import AdminQueries from "./pages/AdminQueries";
import AdminUsers from "./pages/AdminUsers";
import Notices from "./pages/Notices";
import StudentQuery from "./pages/StudentQuery";

// Student pages
import StudentHome from "./pages/student/StudentHome";
import StudentNotices from "./pages/student/StudentNotices";
import StudentQueries from "./pages/student/StudentQueries";

// Admin wrapper
function AdminPage({ children }) {
  return (
    <ProtectedRoute allowedRoles={["ADMIN", "MODERATOR"]}>
      <AdminLayout>{children}</AdminLayout>
    </ProtectedRoute>
  );
}

// Student wrapper
function StudentPage({ children }) {
  return (
    <ProtectedRoute allowedRoles={["USER"]}>
      <StudentLayout>{children}</StudentLayout>
    </ProtectedRoute>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public */}
        <Route path="/" element={<Login />} />

        {/* Admin routes */}
        <Route path="/admin" element={<AdminPage><AdminDashboard /></AdminPage>} />
        <Route path="/admin/notices" element={<AdminPage><Notices /></AdminPage>} />
        <Route path="/admin/queries" element={<AdminPage><AdminQueries /></AdminPage>} />
        <Route path="/admin/users" element={<AdminPage><AdminUsers /></AdminPage>} />

        {/* Student routes */}
        <Route path="/student" element={<StudentPage><StudentHome /></StudentPage>} />
        <Route path="/student/notices" element={<StudentPage><StudentNotices /></StudentPage>} />
        <Route path="/student/queries" element={<StudentPage><StudentQueries /></StudentPage>} />
        <Route path="/student/query/new" element={<StudentPage><StudentQuery /></StudentPage>} />

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
