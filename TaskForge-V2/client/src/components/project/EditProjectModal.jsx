import { useEffect, useState } from "react";

import Modal from "../ui/Modal";
import ProjectForm from "./ProjectForm";

function EditProjectModal({
  isOpen,
  onClose,
  project,
  onUpdate,
  loading = false,
}) {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    status: "Planning",
    progress: 0,
  });

  // Load project data when modal opens
  useEffect(() => {
    if (project) {
      setFormData({
        title: project.title || "",
        description: project.description || "",
        status: project.status || "Planning",
        progress: project.progress ?? 0,
      });
    }
  }, [project]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((previous) => ({
      ...previous,
      [name]:
        name === "progress"
          ? Number(value)
          : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.title.trim()) {
      alert("Please enter a project title.");
      return;
    }

    if (!formData.description.trim()) {
      alert("Please enter a project description.");
      return;
    }

    try {
      await onUpdate(formData);
    } catch (error) {
      console.error(
        "Error updating project:",
        error
      );
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Edit Project"
    >
      <form
        onSubmit={handleSubmit}
        className="space-y-5"
      >
        {/* Project Title */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Project Title
          </label>

          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            disabled={loading}
            placeholder="Enter project title"
            className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100"
          />
        </div>

        {/* Description */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Description
          </label>

          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            disabled={loading}
            placeholder="Enter project description"
            rows="4"
            className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100"
          />
        </div>

        {/* Status */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Status
          </label>

          <select
            name="status"
            value={formData.status}
            onChange={handleChange}
            disabled={loading}
            className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100"
          >
            <option value="Planning">
              Planning
            </option>

            <option value="In Progress">
              In Progress
            </option>

            <option value="Completed">
              Completed
            </option>

            <option value="On Hold">
              On Hold
            </option>
          </select>
        </div>

        {/* Progress */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Progress: {formData.progress}%
          </label>

          <input
            type="range"
            name="progress"
            min="0"
            max="100"
            value={formData.progress}
            onChange={handleChange}
            disabled={loading}
            className="w-full"
          />
        </div>

        {/* Buttons */}
        <div className="flex gap-3">

          <button
            type="button"
            onClick={onClose}
            disabled={loading}
            className="flex-1 border border-gray-300 text-gray-700 py-3 rounded-lg font-semibold hover:bg-gray-100 transition disabled:opacity-50"
          >
            Cancel
          </button>

          <button
            type="submit"
            disabled={loading}
            className="flex-1 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white py-3 rounded-lg font-semibold transition"
          >
            {loading
              ? "Updating..."
              : "Update Project"}
          </button>

        </div>
      </form>
    </Modal>
  );
}

export default EditProjectModal;