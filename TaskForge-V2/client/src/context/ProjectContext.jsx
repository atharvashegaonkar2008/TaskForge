import { createContext, useContext, useEffect, useState } from "react";
import * as projectService from "../services/projectService";

const ProjectContext = createContext();

export const ProjectProvider = ({ children }) => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch all projects from MongoDB
  const fetchProjects = async () => {
    try {
      const response = await projectService.getProjects();
      setProjects(response.projects);
    } catch (error) {
      console.error("Error fetching projects:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  // Create Project
  const addProject = async (projectData) => {
    try {
      await projectService.createProject(projectData);
      await fetchProjects();
    } catch (error) {
      console.error("Error creating project:", error);
    }
  };

  return (
    <ProjectContext.Provider
      value={{
        projects,
        loading,
        addProject,
        fetchProjects,
      }}
    >
      {children}
    </ProjectContext.Provider>
  );
};

export const useProject = () => useContext(ProjectContext);