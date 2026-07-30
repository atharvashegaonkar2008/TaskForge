const express = require("express");
const cors = require("cors");
const testRoutes = require("./routes/testRoutes");

const authRoutes = require("./routes/authRoutes");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/test", testRoutes);

// Test Route
app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "Welcome to TaskForge API 🚀",
  });
});

module.exports = app;