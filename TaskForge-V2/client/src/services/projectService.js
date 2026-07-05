const STORAGE_KEY = "taskforge_projects";

// Get all projects
export const getProjects = () => {
  return JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
};

// Save all projects
export const saveProjects = (projects) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(projects));
};

// Add project
export const addProject = (project) => {
  const projects = getProjects();
  projects.push(project);
  saveProjects(projects);
};

// Update project
export const updateProject = (updatedProject) => {
  const projects = getProjects().map((project) =>
    project.id === updatedProject.id ? updatedProject : project
  );

  saveProjects(projects);
};

// Delete project
export const deleteProject = (id) => {
  const projects = getProjects().filter(
    (project) => project.id !== id
  );

  saveProjects(projects);
};

// Get project by ID
export const getProjectById = (id) => {
  return getProjects().find((project) => project.id === id);
};