import ProjectCard from "../../components/project/ProjectCard";
import { useProject } from "../../context/ProjectContext";
import { FaPlus } from "react-icons/fa";

function Projects() {
  const { projects, addProject } = useProject();

  const handleAddProject = () => {
    addProject({
      id: Date.now().toString(),
      title: "TaskForge",
      description: "My First MERN Project",
      status: "In Progress",
      progress: 0,
    });
  };

  return (
    <div>
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">
          Projects
        </h1>

        <button
          onClick={handleAddProject}
          className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg transition"
        >
          <FaPlus />
          Add Project
        </button>

      </div>

      {/* Project List */}
      {projects.length === 0 ? (
        <div className="bg-white shadow rounded-xl p-8 text-center">
          <p className="text-gray-500">
            No projects found.
          </p>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project) => (
            <ProjectCard
              key={project.id}
              project={project}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default Projects;