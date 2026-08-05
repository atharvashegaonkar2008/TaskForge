import React from "react";
import ReactDOM from "react-dom/client";

import App from "./App";

import "./index.css";

import { ProjectProvider } from "./context/ProjectContext";
import { TaskProvider } from "./context/TaskContext";
import { AuthProvider } from "./context/AuthContext";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthProvider>
      <ProjectProvider>
        <TaskProvider>
          <App />
        </TaskProvider>
      </ProjectProvider>
    </AuthProvider>
  </React.StrictMode>
);