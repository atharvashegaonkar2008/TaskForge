import api from "./api";

// ==========================================
// GET ALL PROJECTS
// ==========================================
export const getProjects = async () => {
  const response = await api.get("/projects");

  return response.data;
};


// ==========================================
// GET SINGLE PROJECT
// ==========================================
export const getProjectById = async (id) => {
  const response = await api.get(`/projects/${id}`);

  return response.data;
};


// ==========================================
// CREATE PROJECT
// ==========================================
export const createProject = async (projectData) => {
  const response = await api.post(
    "/projects",
    projectData
  );

  return response.data;
};


// ==========================================
// UPDATE PROJECT
// ==========================================
export const updateProject = async (id, projectData) => {
  const response = await api.put(
    `/projects/${id}`,
    projectData
  );

  return response.data;
};


// ==========================================
// DELETE PROJECT
// ==========================================
export const deleteProject = async (id) => {
  const response = await api.delete(
    `/projects/${id}`
  );

  return response.data;
};