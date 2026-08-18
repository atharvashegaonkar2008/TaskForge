const Project = require("../models/Project");

// ==========================================
// CREATE PROJECT
// POST /api/projects
// ==========================================
const createProject = async (req, res) => {
  try {
    console.log("CREATE PROJECT REQUEST");
    console.log("User:", req.user);
    console.log("Body:", req.body);

    const {
      title,
      description,
      status,
      progress,
    } = req.body;

    // Validation
    if (!title || !description) {
      return res.status(400).json({
        success: false,
        message:
          "Title and description are required.",
      });
    }

    // Create project
    const project = await Project.create({
      title,
      description,
      status: status || "Planning",
      progress:
        progress !== undefined
          ? progress
          : 0,
      owner: req.user.id,
    });

    console.log(
      "PROJECT CREATED:",
      project
    );

    return res.status(201).json({
      success: true,
      message:
        "Project created successfully.",
      project,
    });

  } catch (error) {
    console.error(
      "CREATE PROJECT ERROR:",
      error
    );

    return res.status(500).json({
      success: false,
      message: "Server Error",
      error: error.message,
    });
  }
};


// ==========================================
// GET ALL PROJECTS
// GET /api/projects
// ==========================================
const getProjects = async (req, res) => {
  try {
    console.log(
      "GET PROJECTS REQUEST"
    );

    const projects =
      await Project.find({
        owner: req.user.id,
      }).sort({
        createdAt: -1,
      });

    return res.status(200).json({
      success: true,
      count: projects.length,
      projects,
    });

  } catch (error) {
    console.error(
      "GET PROJECTS ERROR:",
      error
    );

    return res.status(500).json({
      success: false,
      message: "Server Error",
      error: error.message,
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

    const {
      title,
      description,
      status,
      progress,
    } = req.body;

    console.log(
      "UPDATE PROJECT REQUEST"
    );

    console.log("Project ID:", id);
    console.log("User:", req.user);
    console.log("Body:", req.body);

    // Find project belonging to logged-in user
    const project =
      await Project.findOne({
        _id: id,
        owner: req.user.id,
      });

    if (!project) {
      return res.status(404).json({
        success: false,
        message:
          "Project not found.",
      });
    }

    // Update only provided fields
    if (title !== undefined) {
      project.title = title;
    }

    if (description !== undefined) {
      project.description =
        description;
    }

    if (status !== undefined) {
      project.status = status;
    }

    if (progress !== undefined) {
      project.progress = progress;
    }

    // Save updated project
    const updatedProject =
      await project.save();

    console.log(
      "PROJECT UPDATED:",
      updatedProject
    );

    return res.status(200).json({
      success: true,
      message:
        "Project updated successfully.",
      project: updatedProject,
    });

  } catch (error) {
    console.error(
      "UPDATE PROJECT ERROR:",
      error
    );

    return res.status(500).json({
      success: false,
      message: "Server Error",
      error: error.message,
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

    console.log(
      "DELETE PROJECT REQUEST"
    );

    console.log("Project ID:", id);
    console.log("User:", req.user);

    // Find project belonging to logged-in user
    const project =
      await Project.findOne({
        _id: id,
        owner: req.user.id,
      });

    if (!project) {
      return res.status(404).json({
        success: false,
        message:
          "Project not found.",
      });
    }

    // Delete project
    await Project.deleteOne({
      _id: id,
      owner: req.user.id,
    });

    console.log(
      "PROJECT DELETED:",
      id
    );

    return res.status(200).json({
      success: true,
      message:
        "Project deleted successfully.",
    });

  } catch (error) {
    console.error(
      "DELETE PROJECT ERROR:",
      error
    );

    return res.status(500).json({
      success: false,
      message: "Server Error",
      error: error.message,
    });
  }
};


// ==========================================
// EXPORT
// ==========================================
module.exports = {
  createProject,
  getProjects,
  updateProject,
  deleteProject,
};