import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

import * as taskService from "../services/taskService";

// ==========================================
// CREATE CONTEXT
// ==========================================
const TaskContext = createContext(null);

// ==========================================
// TASK PROVIDER
// ==========================================
export const TaskProvider = ({ children }) => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  // ==========================================
  // FETCH TASKS
  // ==========================================
  const fetchTasks = async () => {
    try {
      setLoading(true);

      const response = await taskService.getTasks();

      setTasks(response.tasks || []);
    } catch (error) {
      console.error("Error fetching tasks:", error);

      // If request fails, keep tasks empty
      setTasks([]);
    } finally {
      setLoading(false);
    }
  };

  // ==========================================
  // LOAD TASKS WHEN APP STARTS
  // ==========================================
  useEffect(() => {
    fetchTasks();
  }, []);

  // ==========================================
  // ADD TASK
  // ==========================================
  const addTask = async (taskData) => {
    try {
      const response = await taskService.createTask(taskData);

      setTasks((prevTasks) => [
        response.task,
        ...prevTasks,
      ]);

      return response.task;
    } catch (error) {
      console.error("Error creating task:", error);
      throw error;
    }
  };

  // ==========================================
  // UPDATE TASK
  // ==========================================
  const updateTask = async (task) => {
    try {
      if (!task || !task._id) {
        throw new Error("Invalid task data.");
      }

      const id = task._id;

      const response = await taskService.updateTask(
        id,
        task
      );

      setTasks((prevTasks) =>
        prevTasks.map((existingTask) =>
          existingTask._id === id
            ? response.task
            : existingTask
        )
      );

      return response.task;
    } catch (error) {
      console.error("Error updating task:", error);
      throw error;
    }
  };

  // ==========================================
  // DELETE TASK
  // ==========================================
  const deleteTask = async (id) => {
    try {
      if (!id) {
        throw new Error("Task ID is required.");
      }

      await taskService.deleteTask(id);

      setTasks((prevTasks) =>
        prevTasks.filter(
          (task) => task._id !== id
        )
      );
    } catch (error) {
      console.error("Error deleting task:", error);
      throw error;
    }
  };

  // ==========================================
  // CONTEXT VALUE
  // ==========================================
  const contextValue = {
    tasks,
    loading,
    addTask,
    updateTask,
    deleteTask,
    fetchTasks,
  };

  // ==========================================
  // PROVIDER
  // ==========================================
  return (
    <TaskContext.Provider value={contextValue}>
      {children}
    </TaskContext.Provider>
  );
};

// ==========================================
// USE TASK HOOK
// ==========================================
export const useTask = () => {
  const context = useContext(TaskContext);

  if (!context) {
    throw new Error(
      "useTask must be used inside a TaskProvider."
    );
  }

  return context;
};