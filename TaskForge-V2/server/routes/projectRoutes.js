const express = require("express");

const {
  createProject,
  getProjects,
  getProjectById,
  updateProject,
  deleteProject,
} = require("../controllers/projectController");

const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

// ==========================================
// CREATE PROJECT
// POST /api/projects
// ==========================================
router.post("/", authMiddleware, createProject);

// ==========================================
// GET ALL PROJECTS
// GET /api/projects
// ==========================================
router.get("/", authMiddleware, getProjects);

// ==========================================
// GET SINGLE PROJECT
// GET /api/projects/:id
// ==========================================
router.get("/:id", authMiddleware, getProjectById);

// ==========================================
// UPDATE PROJECT
// PUT /api/projects/:id
// ==========================================
router.put("/:id", authMiddleware, updateProject);

// ==========================================
// DELETE PROJECT
// DELETE /api/projects/:id
// ==========================================
router.delete("/:id", authMiddleware, deleteProject);

module.exports = router;