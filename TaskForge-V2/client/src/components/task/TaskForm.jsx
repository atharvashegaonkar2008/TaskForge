import { useState, useEffect } from "react";
import { useProject } from "../../context/ProjectContext";

function TaskForm({
  onSubmit,
  initialData = {},
  submitText = "Create Task",
}) {
  const { projects } = useProject();

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    projectId: "",
    status: "To Do",
    priority: "Medium",
    dueDate: "",
  });

  useEffect(() => {
    if (Object.keys(initialData).length > 0) {
      setFormData({
        title: initialData.title || "",
        description: initialData.description || "",
        projectId: initialData.projectId || "",
        status: initialData.status || "To Do",
        priority: initialData.priority || "Medium",
        dueDate: initialData.dueDate || "",
      });
    }
  }, [initialData]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.title.trim()) {
      alert("Task title is required.");
      return;
    }

    if (!formData.projectId) {
      alert("Please select a project.");
      return;
    }

    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">

      {/* Task Title */}
      <div>
        <label className="block mb-2 font-medium">
          Task Title
        </label>

        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
          className="w-full border rounded-lg px-4 py-2"
          placeholder="Enter task title"
        />
      </div>

      {/* Description */}
      <div>
        <label className="block mb-2 font-medium">
          Description
        </label>

        <textarea
          rows="4"
          name="description"
          value={formData.description}
          onChange={handleChange}
          className="w-full border rounded-lg px-4 py-2"
          placeholder="Enter task description"
        />
      </div>

      {/* Project */}
      <div>
        <label className="block mb-2 font-medium">
          Project
        </label>

        <select
          name="projectId"
          value={formData.projectId}
          onChange={handleChange}
          className="w-full border rounded-lg px-4 py-2"
        >
          <option value="">Select Project</option>

          {projects.map((project) => (
            <option
              key={project.id}
              value={project.id}
            >
              {project.title}
            </option>
          ))}
        </select>
      </div>

      {/* Status */}
      <div>
        <label className="block mb-2 font-medium">
          Status
        </label>

        <select
          name="status"
          value={formData.status}
          onChange={handleChange}
          className="w-full border rounded-lg px-4 py-2"
        >
          <option>To Do</option>
          <option>In Progress</option>
          <option>Completed</option>
        </select>
      </div>

      {/* Priority */}
      <div>
        <label className="block mb-2 font-medium">
          Priority
        </label>

        <select
          name="priority"
          value={formData.priority}
          onChange={handleChange}
          className="w-full border rounded-lg px-4 py-2"
        >
          <option>High</option>
          <option>Medium</option>
          <option>Low</option>
        </select>
      </div>

      {/* Due Date */}
      <div>
        <label className="block mb-2 font-medium">
          Due Date
        </label>

        <input
          type="date"
          name="dueDate"
          value={formData.dueDate}
          onChange={handleChange}
          className="w-full border rounded-lg px-4 py-2"
        />
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg transition"
      >
        {submitText}
      </button>

    </form>
  );
}

export default TaskForm;