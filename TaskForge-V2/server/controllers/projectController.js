const Project = require("../models/Project");

// Create Project
const createProject = async (req, res) => {
  try {
    const { title, description, status, progress } = req.body;

    // Validation
    if (!title || !description) {
      return res.status(400).json({
        success: false,
        message: "Title and description are required.",
      });
    }

    // Create Project
    const project = await Project.create({
      title,
      description,
      status,
      progress,
      owner: req.user.id,
    });

    res.status(201).json({
      success: true,
      message: "Project created successfully.",
      project,
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

// Get All Projects
const getProjects = async (req, res) => {
  try {
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
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

module.exports = {
  createProject,
  getProjects,
};