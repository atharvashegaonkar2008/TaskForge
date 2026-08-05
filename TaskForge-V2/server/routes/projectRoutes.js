const express = require("express");

const {
  createProject,
  getProjects,
} = require("../controllers/projectController");

const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

// Create Project
router.post("/", authMiddleware, createProject);

// Get All Projects
router.get("/", authMiddleware, getProjects);

module.exports = router;