import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import ProtectedRoute from "./components/ProtectedRoute";
import Profile from "./pages/Profile";

function App() {
  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 font-sans">
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/tasks"
          element={
            <ProtectedRoute>
              <Dashboard />
              <Profile />
            </ProtectedRoute>
          }
        />

        <Route path="*" element={<Navigate to="/tasks" replace />} />
      </Routes>
    </div>
  );
}

export default App;
