import { createContext, useContext, useEffect, useState } from "react";
import * as projectService from "../services/projectService";

const ProjectContext = createContext();

export const ProjectProvider = ({ children }) => {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    setProjects(projectService.getProjects());
  }, []);

  const addProject = (project) => {
    projectService.addProject(project);
    setProjects(projectService.getProjects());
  };

  const updateProject = (project) => {
    projectService.updateProject(project);
    setProjects(projectService.getProjects());
  };

  const deleteProject = (id) => {
    projectService.deleteProject(id);
    setProjects(projectService.getProjects());
  };

  return (
    <ProjectContext.Provider
      value={{
        projects,
        addProject,
        updateProject,
        deleteProject,
      }}
    >
      {children}
    </ProjectContext.Provider>
  );
};

export const useProject = () => useContext(ProjectContext);