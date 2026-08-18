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

        // Handle MongoDB projectId
        projectId:
          initialData.projectId?._id ||
          initialData.projectId ||
          "",

        status: initialData.status || "Pending",
        priority: initialData.priority || "Medium",

        // Convert date safely for input[type="date"]
        dueDate: initialData.dueDate
          ? initialData.dueDate.substring(0, 10)
          : "",
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
    <form
      onSubmit={handleSubmit}
      className="space-y-5"
    >
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
          <option value="">
            Select Project
          </option>

          {projects.map((project) => (
            <option
              key={project._id}
              value={project._id}
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
          <option value="Pending">
            Pending
          </option>

          <option value="In Progress">
            In Progress
          </option>

          <option value="Completed">
            Completed
          </option>
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
          <option value="High">
            High
          </option>

          <option value="Medium">
            Medium
          </option>

          <option value="Low">
            Low
          </option>
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