import { useState, useEffect } from "react";

function ProjectForm({ onSubmit, initialData = {}, submitText = "Create Project" }) {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    status: "In Progress",
    progress: 0,
  });

  useEffect(() => {
    if (initialData && Object.keys(initialData).length > 0) {
      setFormData({
        title: initialData.title || "",
        description: initialData.description || "",
        status: initialData.status || "In Progress",
        progress: initialData.progress || 0,
      });
    }
  }, [initialData]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]:
        e.target.name === "progress"
          ? Number(e.target.value)
          : e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.title.trim()) {
      alert("Project title is required.");
      return;
    }

    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">

      <div>
        <label className="block mb-2 font-medium">Project Title</label>
        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
          className="w-full border rounded-lg px-4 py-2"
        />
      </div>

      <div>
        <label className="block mb-2 font-medium">Description</label>
        <textarea
          name="description"
          rows="4"
          value={formData.description}
          onChange={handleChange}
          className="w-full border rounded-lg px-4 py-2"
        />
      </div>

      <div>
        <label className="block mb-2 font-medium">Status</label>
        <select
          name="status"
          value={formData.status}
          onChange={handleChange}
          className="w-full border rounded-lg px-4 py-2"
        >
          <option>In Progress</option>
          <option>Completed</option>
          <option>Pending</option>
        </select>
      </div>

      <div>
        <label className="block mb-2 font-medium">Progress (%)</label>
        <input
          type="number"
          min="0"
          max="100"
          name="progress"
          value={formData.progress}
          onChange={handleChange}
          className="w-full border rounded-lg px-4 py-2"
        />
      </div>

      <button
        type="submit"
        className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg"
      >
        {submitText}
      </button>

    </form>
  );
}

export default ProjectForm;