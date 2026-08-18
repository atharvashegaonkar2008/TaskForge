const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema(
  {
    // ==========================================
    // TASK TITLE
    // ==========================================
    title: {
      type: String,
      required: true,
      trim: true,
    },

    // ==========================================
    // DESCRIPTION
    // ==========================================
    description: {
      type: String,
      default: "",
      trim: true,
    },

    // ==========================================
    // STATUS
    // ==========================================
    status: {
      type: String,
      enum: [
        "To Do",
        "In Progress",
        "Completed",
      ],
      default: "To Do",
    },

    // ==========================================
    // PRIORITY
    // ==========================================
    priority: {
      type: String,
      enum: [
        "Low",
        "Medium",
        "High",
      ],
      default: "Medium",
    },

    // ==========================================
    // DUE DATE
    // ==========================================
    dueDate: {
      type: Date,
      default: null,
    },

    // ==========================================
    // PROJECT
    // ==========================================
    projectId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Project",
      required: true,
    },

    // ==========================================
    // OWNER
    // ==========================================
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Task", taskSchema);