import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  FaEye,
  FaEdit,
  FaTrash,
  FaCalendarAlt,
} from "react-icons/fa";

import { useProject } from "../../context/ProjectContext";

import EditTaskModal from "./EditTaskModal";
import DeleteTaskDialog from "./DeleteTaskDialog";

function TaskCard({ task }) {
  const navigate = useNavigate();

  const { projects } = useProject();

  const project = projects.find(
    (p) => p.id === task.projectId
  );

  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);

  const getStatusColor = (status) => {
    switch (status) {
      case "Completed":
        return "bg-green-100 text-green-700";
      case "In Progress":
        return "bg-blue-100 text-blue-700";
      case "To Do":
        return "bg-yellow-100 text-yellow-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case "High":
        return "bg-red-100 text-red-700";
      case "Medium":
        return "bg-orange-100 text-orange-700";
      case "Low":
        return "bg-green-100 text-green-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  return (
    <>
      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 hover:shadow-lg transition duration-300">

        {/* Task Title */}
        <h2 className="text-xl font-bold text-gray-800">
          {task.title}
        </h2>

        {/* Description */}
        <p className="text-gray-500 mt-2">
          {task.description}
        </p>

        {/* Project */}
        <p className="text-sm text-blue-600 font-medium mt-3">
          📁 {project ? project.title : "No Project"}
        </p>

        {/* Status & Priority */}
        <div className="flex gap-3 mt-4 flex-wrap">

          <span
            className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(
              task.status
            )}`}
          >
            {task.status}
          </span>

          <span
            className={`px-3 py-1 rounded-full text-sm font-medium ${getPriorityColor(
              task.priority
            )}`}
          >
            {task.priority}
          </span>

        </div>

        {/* Due Date */}
        <div className="flex items-center gap-2 mt-5 text-gray-500">

          <FaCalendarAlt />

          <span>
            {task.dueDate || "No Due Date"}
          </span>

        </div>

        {/* Action Buttons */}
        <div className="flex justify-end gap-3 mt-6">

          {/* View */}
          <button
            onClick={() => navigate(`/tasks/${task.id}`)}
            className="p-2 rounded-lg bg-gray-100 hover:bg-gray-200 transition"
            title="View Task"
          >
            <FaEye />
          </button>

          {/* Edit */}
          <button
            onClick={() => setIsEditOpen(true)}
            className="p-2 rounded-lg bg-yellow-100 hover:bg-yellow-200 text-yellow-700 transition"
            title="Edit Task"
          >
            <FaEdit />
          </button>

          {/* Delete */}
          <button
            onClick={() => setIsDeleteOpen(true)}
            className="p-2 rounded-lg bg-red-100 hover:bg-red-200 text-red-700 transition"
            title="Delete Task"
          >
            <FaTrash />
          </button>

        </div>

      </div>

      {/* Edit Modal */}
      <EditTaskModal
        isOpen={isEditOpen}
        onClose={() => setIsEditOpen(false)}
        task={task}
      />

      {/* Delete Dialog */}
      <DeleteTaskDialog
        isOpen={isDeleteOpen}
        onClose={() => setIsDeleteOpen(false)}
        task={task}
      />
    </>
  );
}

export default TaskCard;