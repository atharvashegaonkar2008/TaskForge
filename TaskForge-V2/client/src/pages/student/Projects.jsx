import { useProject } from "../../context/ProjectContext";

function Projects() {
  const { projects, addProject } = useProject();

  const handleAdd = () => {
    addProject({
      id: Date.now().toString(),
      title: "TaskForge",
      description: "My First Project",
      status: "In Progress",
      progress: 0,
    });
  };

  return (
    <div>
      <h1>Projects</h1>

      <button onClick={handleAdd}>Add Dummy Project</button>

      <hr />

      {projects.length === 0 ? (
        <p>No projects found.</p>
      ) : (
        projects.map((project) => (
          <div key={project.id}>
            <h3>{project.title}</h3>
            <p>{project.description}</p>
            <p>Status: {project.status}</p>
            <p>Progress: {project.progress}%</p>
          </div>
        ))
      )}
    </div>
  );
}

export default Projects;