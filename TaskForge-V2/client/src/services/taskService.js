const STORAGE_KEY = "taskforge_tasks";

export const getTasks = () => {
  const tasks = localStorage.getItem(STORAGE_KEY);
  return tasks ? JSON.parse(tasks) : [];
};

export const addTask = (task) => {
  const tasks = getTasks();
  tasks.push(task);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
};

export const updateTask = (updatedTask) => {
  const tasks = getTasks().map((task) =>
    task.id === updatedTask.id ? updatedTask : task
  );

  localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
};

export const deleteTask = (id) => {
  const tasks = getTasks().filter((task) => task.id !== id);

  localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
};