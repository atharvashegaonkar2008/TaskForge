const Task = require("../models/Task");
const mongoose = require("mongoose");

// ==========================================
// CREATE TASK
// POST /api/tasks
// ==========================================
const createTask = async (req, res) => {
  try {
    console.log("CREATE TASK REQUEST");
    console.log("User:", req.user);
    console.log("Body:", req.body);

    const {
      title,
      description,
      status,
      priority,
      dueDate,
      projectId,
    } = req.body;

    // Validate required fields
    if (!title || !title.trim() || !projectId) {
      return res.status(400).json({
        success: false,
        message: "Title and project are required.",
      });
    }

    // Validate project ID
    if (!mongoose.Types.ObjectId.isValid(projectId)) {
      return res.status(400).json({
        success: false,
        message: "Invalid project ID.",
      });
    }

    // Create task
    const task = await Task.create({
      title: title.trim(),
      description: description || "",
      status: status || "To Do",
      priority: priority || "Medium",
      dueDate: dueDate || null,
      projectId,
      owner: req.user.id,
    });

    console.log("TASK CREATED:", task);

    return res.status(201).json({
      success: true,
      message: "Task created successfully.",
      task,
    });

  } catch (error) {
    console.error("CREATE TASK ERROR:", error);

    return res.status(500).json({
      success: false,
      message: "Server Error",
      error: error.message,
    });
  }
};


// ==========================================
// GET ALL TASKS
// GET /api/tasks
// ==========================================
const getTasks = async (req, res) => {
  try {
    console.log("GET TASKS REQUEST");

    const tasks = await Task.find({
      owner: req.user.id,
    })
      .populate("projectId", "title")
      .sort({
        createdAt: -1,
      });

    return res.status(200).json({
      success: true,
      count: tasks.length,
      tasks,
    });

  } catch (error) {
    console.error("GET TASKS ERROR:", error);

    return res.status(500).json({
      success: false,
      message: "Server Error",
      error: error.message,
    });
  }
};


// ==========================================
// GET SINGLE TASK
// GET /api/tasks/:id
// ==========================================
const getTaskById = async (req, res) => {
  try {
    const { id } = req.params;

    console.log("GET TASK REQUEST");
    console.log("Task ID:", id);

    // Validate task ID
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid task ID.",
      });
    }

    // Find only user's task
    const task = await Task.findOne({
      _id: id,
      owner: req.user.id,
    }).populate("projectId", "title");

    if (!task) {
      return res.status(404).json({
        success: false,
        message: "Task not found.",
      });
    }

    return res.status(200).json({
      success: true,
      task,
    });

  } catch (error) {
    console.error("GET TASK ERROR:", error);

    return res.status(500).json({
      success: false,
      message: "Server Error",
      error: error.message,
    });
  }
};


// ==========================================
// UPDATE TASK
// PUT /api/tasks/:id
// ==========================================
const updateTask = async (req, res) => {
  try {
    const { id } = req.params;

    const {
      title,
      description,
      status,
      priority,
      dueDate,
      projectId,
    } = req.body;

    console.log("UPDATE TASK REQUEST");
    console.log("Task ID:", id);
    console.log("User:", req.user);
    console.log("Body:", req.body);

    // Validate task ID
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid task ID.",
      });
    }

    // Validate project ID if provided
    if (
      projectId !== undefined &&
      !mongoose.Types.ObjectId.isValid(projectId)
    ) {
      return res.status(400).json({
        success: false,
        message: "Invalid project ID.",
      });
    }

    // Find task belonging to logged-in user
    const task = await Task.findOne({
      _id: id,
      owner: req.user.id,
    });

    if (!task) {
      return res.status(404).json({
        success: false,
        message: "Task not found.",
      });
    }

    // Update fields only when provided
    if (title !== undefined) {
      if (!title.trim()) {
        return res.status(400).json({
          success: false,
          message: "Task title cannot be empty.",
        });
      }

      task.title = title.trim();
    }

    if (description !== undefined) {
      task.description = description;
    }

    if (status !== undefined) {
      task.status = status;
    }

    if (priority !== undefined) {
      task.priority = priority;
    }

    if (dueDate !== undefined) {
      task.dueDate = dueDate || null;
    }

    if (projectId !== undefined) {
      task.projectId = projectId;
    }

    const updatedTask = await task.save();

    console.log("TASK UPDATED:", updatedTask);

    return res.status(200).json({
      success: true,
      message: "Task updated successfully.",
      task: updatedTask,
    });

  } catch (error) {
    console.error("UPDATE TASK ERROR:", error);

    return res.status(500).json({
      success: false,
      message: "Server Error",
      error: error.message,
    });
  }
};


// ==========================================
// DELETE TASK
// DELETE /api/tasks/:id
// ==========================================
const deleteTask = async (req, res) => {
  try {
    const { id } = req.params;

    console.log("DELETE TASK REQUEST");
    console.log("Task ID:", id);
    console.log("User:", req.user);

    // Validate task ID
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid task ID.",
      });
    }

    // Find only user's task
    const task = await Task.findOne({
      _id: id,
      owner: req.user.id,
    });

    if (!task) {
      return res.status(404).json({
        success: false,
        message: "Task not found.",
      });
    }

    await Task.deleteOne({
      _id: id,
      owner: req.user.id,
    });

    console.log("TASK DELETED:", id);

    return res.status(200).json({
      success: true,
      message: "Task deleted successfully.",
    });

  } catch (error) {
    console.error("DELETE TASK ERROR:", error);

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
  createTask,
  getTasks,
  getTaskById,
  updateTask,
  deleteTask,
};