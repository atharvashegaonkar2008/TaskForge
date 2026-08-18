import api from "./api";

// ==========================================
// GET ALL TASKS
// ==========================================
export const getTasks = async () => {
  const response = await api.get("/tasks");

  return response.data;
};


// ==========================================
// GET SINGLE TASK
// ==========================================
export const getTaskById = async (id) => {
  const response = await api.get(`/tasks/${id}`);

  return response.data;
};


// ==========================================
// CREATE TASK
// ==========================================
export const createTask = async (taskData) => {
  const response = await api.post(
    "/tasks",
    taskData
  );

  return response.data;
};


// ==========================================
// UPDATE TASK
// ==========================================
export const updateTask = async (id, taskData) => {
  const response = await api.put(
    `/tasks/${id}`,
    taskData
  );

  return response.data;
};


// ==========================================
// DELETE TASK
// ==========================================
export const deleteTask = async (id) => {
  const response = await api.delete(
    `/tasks/${id}`
  );

  return response.data;
};