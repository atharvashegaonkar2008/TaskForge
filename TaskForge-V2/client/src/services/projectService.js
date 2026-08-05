import api from "./api";

// Get all projects
export const getProjects = async () => {
  const response = await api.get("/projects");
  return response.data;
};

// Create project
export const createProject = async (projectData) => {
  const response = await api.post("/projects", projectData);
  return response.data;
};

// Get single project
export const getProjectById = async (id) => {
  const response = await api.get(`/projects/${id}`);
  return response.data;
};

// Update project
export const updateProject = async (id, projectData) => {
  const response = await api.put(`/projects/${id}`, projectData);
  return response.data;
};

// Delete project
export const deleteProject = async (id) => {
  const response = await api.delete(`/projects/${id}`);
  return response.data;
};