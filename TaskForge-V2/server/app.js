const express = require("express");
const cors = require("cors");

const authRoutes = require("./routes/authRoutes");
const profileRoutes = require("./routes/profileRoutes");
const projectRoutes = require("./routes/projectRoutes");

const app = express();

// ================================
// Middleware
// ================================
app.use(cors());
app.use(express.json());

// ================================
// API Routes
// ================================
app.use("/api/auth", authRoutes);
app.use("/api/profile", profileRoutes);
app.use("/api/projects", projectRoutes);

// ================================
// Test Route
// ================================
app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "🚀 TaskForge API Running Successfully",
  });
});

module.exports = app;