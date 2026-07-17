const STORAGE_KEY = "taskforge_files";

export const getFiles = () => {
  return JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
};

export const addFile = (file) => {
  const files = getFiles();
  files.push(file);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(files));
};

export const deleteFile = (id) => {
  const files = getFiles().filter((file) => file.id !== id);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(files));
};