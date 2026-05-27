import { Navigate, Route, Routes } from "react-router-dom";
import MainLayout from "./components/layout/MainLayout";
import ProtectedRoute from "./components/ProtectedRoute";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { Tasks } from "./pages/Tasks";

function App() {
  return (
    <div className="min-h-screen">
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route element={<ProtectedRoute />}>
          <Route element={<MainLayout />}>
            <Route path="/tasks" element={<Tasks />} />
            <Route path="/profile" element={<div>Profile Page</div>} />
            <Route path="/settings" element={<div>Settings Page</div>} />
          </Route>
        </Route>

        <Route path="*" element={<Navigate to="/tasks" replace />} />
      </Routes>
    </div>
  );
}

export default App;
