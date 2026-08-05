import { useState } from "react";
import { FaPlus } from "react-icons/fa";

import { useProject } from "../../context/ProjectContext";
import ProjectCard from "../../components/project/ProjectCard";
import AddProjectModal from "../../components/project/AddProjectModal";

function Projects() {
  const { projects, loading } = useProject();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <h2 className="text-xl font-semibold text-gray-600">
          Loading projects...
        </h2>
      </div>
    );
  }

  const filteredProjects = projects.filter((project) => {
    const matchesSearch = project.title
      .toLowerCase()
      .includes(searchTerm.toLowerCase());

    const matchesStatus =
      statusFilter === "All" || project.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-6">

      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-center gap-4">
        <h1 className="text-3xl font-bold text-gray-800">
          Projects
        </h1>

        <button
          onClick={() => setIsModalOpen(true)}
          className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-5 py-3 rounded-lg transition"
        >
          <FaPlus />
          New Project
        </button>
      </div>

      {/* Search & Filter */}
      <div className="flex flex-col md:flex-row gap-4">

        <input
          type="text"
          placeholder="Search projects..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="flex-1 border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option>All</option>
          <option>Planning</option>
          <option>In Progress</option>
          <option>Review</option>
          <option>Completed</option>
        </select>

      </div>

      {/* Add Project Modal */}
      <AddProjectModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />

      {/* Project Grid */}
      {filteredProjects.length === 0 ? (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-12 text-center">

          <h2 className="text-xl font-semibold text-gray-700">
            No Projects Found
          </h2>

          <p className="text-gray-500 mt-2">
            Create your first project to get started.
          </p>

        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {filteredProjects.map((project) => (
            <ProjectCard
              key={project._id}
              project={project}
            />
          ))}
        </div>
      )}

    </div>
  );
}

export default Projects;