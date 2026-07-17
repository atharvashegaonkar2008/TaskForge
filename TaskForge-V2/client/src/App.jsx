import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import DashboardLayout from "./components/layout/DashboardLayout";

// Dashboard Pages
import Dashboard from "./pages/student/Dashboard";
import Projects from "./pages/student/Projects";
import ProjectDetails from "./pages/student/ProjectDetails";
import Tasks from "./pages/student/Tasks";
import TaskDetails from "./pages/student/TaskDetails";
import Files from "./pages/student/Files";
import Settings from "./pages/student/Settings";

// Auth Pages
import Login from "./pages/auth/Login";
import Signup from "./pages/auth/Signup";
import ForgotPassword from "./pages/auth/ForgotPassword";

function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* Authentication Routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route
          path="/forgot-password"
          element={<ForgotPassword />}
        />

        {/* Dashboard Routes */}
        <Route path="/" element={<DashboardLayout />}>
          <Route index element={<Navigate to="/dashboard" replace />} />

          <Route path="dashboard" element={<Dashboard />} />

          <Route path="projects" element={<Projects />} />
          <Route path="projects/:id" element={<ProjectDetails />} />

          <Route path="tasks" element={<Tasks />} />
          <Route path="tasks/:id" element={<TaskDetails />} />

          <Route path="files" element={<Files />} />
          <Route path="settings" element={<Settings />} />
        </Route>

      </Routes>
    </BrowserRouter>
  );
}

export default App;