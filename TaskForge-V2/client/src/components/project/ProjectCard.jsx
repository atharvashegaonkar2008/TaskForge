import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaEye, FaEdit, FaTrash } from "react-icons/fa";

import EditProjectModal from "./EditProjectModal";
import DeleteProjectDialog from "./DeleteProjectDialog";

function ProjectCard({ project }) {
  const navigate = useNavigate();

  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);

  return (
    <>
      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 hover:shadow-lg transition duration-300">

        {/* Project Title */}
        <h2 className="text-xl font-bold text-gray-800">
          {project.title}
        </h2>

        {/* Description */}
        <p className="text-gray-500 mt-2">
          {project.description}
        </p>

        {/* Status */}
        <div className="mt-4">
          <span className="inline-block px-3 py-1 rounded-full bg-blue-100 text-blue-700 text-sm font-medium">
            {project.status}
          </span>
        </div>

        {/* Progress */}
        <div className="mt-6">
          <div className="flex justify-between text-sm mb-2">
            <span>Progress</span>
            <span>{project.progress}%</span>
          </div>

          <div className="w-full h-3 bg-gray-200 rounded-full overflow-hidden">
            <div
              className="h-full bg-blue-600 rounded-full transition-all duration-300"
              style={{ width: `${project.progress}%` }}
            />
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-end gap-3 mt-6">

          {/* View */}
          <button
            onClick={() => navigate(`/projects/${project.id}`)}
            className="p-2 rounded-lg bg-gray-100 hover:bg-gray-200 transition"
            title="View Project"
          >
            <FaEye />
          </button>

          {/* Edit */}
          <button
            onClick={() => setIsEditOpen(true)}
            className="p-2 rounded-lg bg-yellow-100 hover:bg-yellow-200 text-yellow-700 transition"
            title="Edit Project"
          >
            <FaEdit />
          </button>

          {/* Delete */}
          <button
            onClick={() => setIsDeleteOpen(true)}
            className="p-2 rounded-lg bg-red-100 hover:bg-red-200 text-red-700 transition"
            title="Delete Project"
          >
            <FaTrash />
          </button>

        </div>
      </div>

      {/* Edit Modal */}
      <EditProjectModal
        isOpen={isEditOpen}
        onClose={() => setIsEditOpen(false)}
        project={project}
      />

      {/* Delete Dialog */}
      <DeleteProjectDialog
        isOpen={isDeleteOpen}
        onClose={() => setIsDeleteOpen(false)}
        project={project}
      />
    </>
  );
}

export default ProjectCard;