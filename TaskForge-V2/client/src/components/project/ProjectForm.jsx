import { useState } from "react";

function ProjectForm({ onSubmit, loading = false }) {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    status: "Planning",
    progress: 0,
  });

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

    await onSubmit(formData);

    // Clear form after successful submission
    setFormData({
      title: "",
      description: "",
      status: "Planning",
      progress: 0,
    });
  };

  return (
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
          placeholder="Enter project title"
          disabled={loading}
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
          placeholder="Enter project description"
          rows="4"
          disabled={loading}
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

      {/* Submit */}
      <button
        type="submit"
        disabled={loading}
        className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white py-3 rounded-lg font-semibold transition"
      >
        {loading
          ? "Creating Project..."
          : "Create Project"}
      </button>
    </form>
  );
}

export default ProjectForm;