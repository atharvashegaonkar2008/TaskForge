const Project = require("../models/Project");
const mongoose = require("mongoose");

// ==========================================
// CREATE PROJECT
// POST /api/projects
// ==========================================
const createProject = async (req, res) => {
  try {
    const { title, description, status, progress } = req.body;

    if (!req.user || !req.user.id) {
      return res.status(401).json({
        success: false,
        message: "User not authenticated.",
      });
    }

    if (!title || !description) {
      return res.status(400).json({
        success: false,
        message: "Title and description are required.",
      });
    }

    const project = await Project.create({
      title,
      description,
      status: status || "Planning",
      progress: progress ?? 0,
      owner: req.user.id,
    });

    res.status(201).json({
      success: true,
      message: "Project created successfully.",
      project,
    });
  } catch (error) {
    console.error("CREATE PROJECT ERROR:", error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};


// ==========================================
// GET ALL PROJECTS
// GET /api/projects
// ==========================================
const getProjects = async (req, res) => {
  try {
    if (!req.user || !req.user.id) {
      return res.status(401).json({
        success: false,
        message: "User not authenticated.",
      });
    }

    const projects = await Project.find({
      owner: req.user.id,
    }).sort({
      createdAt: -1,
    });

    res.status(200).json({
      success: true,
      count: projects.length,
      projects,
    });
  } catch (error) {
    console.error("GET PROJECTS ERROR:", error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};


// ==========================================
// GET SINGLE PROJECT
// GET /api/projects/:id
// ==========================================
const getProjectById = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid project ID.",
      });
    }

    const project = await Project.findOne({
      _id: id,
      owner: req.user.id,
    });

    if (!project) {
      return res.status(404).json({
        success: false,
        message: "Project not found.",
      });
    }

    res.status(200).json({
      success: true,
      project,
    });
  } catch (error) {
    console.error("GET PROJECT BY ID ERROR:", error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};


// ==========================================
// UPDATE PROJECT
// PUT /api/projects/:id
// ==========================================
const updateProject = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, status, progress } = req.body;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid project ID.",
      });
    }

    const project = await Project.findOne({
      _id: id,
      owner: req.user.id,
    });

    if (!project) {
      return res.status(404).json({
        success: false,
        message: "Project not found.",
      });
    }

    if (title !== undefined) {
      project.title = title;
    }

    if (description !== undefined) {
      project.description = description;
    }

    if (status !== undefined) {
      project.status = status;
    }

    if (progress !== undefined) {
      project.progress = progress;
    }

    const updatedProject = await project.save();

    res.status(200).json({
      success: true,
      message: "Project updated successfully.",
      project: updatedProject,
    });
  } catch (error) {
    console.error("UPDATE PROJECT ERROR:", error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};


// ==========================================
// DELETE PROJECT
// DELETE /api/projects/:id
// ==========================================
const deleteProject = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid project ID.",
      });
    }

    const project = await Project.findOneAndDelete({
      _id: id,
      owner: req.user.id,
    });

    if (!project) {
      return res.status(404).json({
        success: false,
        message: "Project not found.",
      });
    }

    res.status(200).json({
      success: true,
      message: "Project deleted successfully.",
    });
  } catch (error) {
    console.error("DELETE PROJECT ERROR:", error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};


// ==========================================
// EXPORTS
// ==========================================
module.exports = {
  createProject,
  getProjects,
  getProjectById,
  updateProject,
  deleteProject,
};