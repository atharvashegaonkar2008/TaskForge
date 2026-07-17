import { createContext, useContext, useEffect, useState } from "react";
import * as taskService from "../services/taskService";

const TaskContext = createContext();

export const TaskProvider = ({ children }) => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    setTasks(taskService.getTasks());
  }, []);

  const addTask = (task) => {
    taskService.addTask(task);
    setTasks(taskService.getTasks());
  };

  const updateTask = (task) => {
    taskService.updateTask(task);
    setTasks(taskService.getTasks());
  };

  const deleteTask = (id) => {
    taskService.deleteTask(id);
    setTasks(taskService.getTasks());
  };

  return (
    <TaskContext.Provider
      value={{
        tasks,
        addTask,
        updateTask,
        deleteTask,
      }}
    >
      {children}
    </TaskContext.Provider>
  );
};

export const useTask = () => useContext(TaskContext);