import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

import {
  getProjects,
  createProject,
  updateProject,
  deleteProject,
} from "../services/projectService";

const ProjectContext = createContext();

export const ProjectProvider = ({ children }) => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  // ==========================================
  // FETCH PROJECTS
  // ==========================================
  const fetchProjects = async () => {
    try {
      setLoading(true);

      const response = await getProjects();

      setProjects(response.projects || []);
    } catch (error) {
      console.error(
        "Error fetching projects:",
        error
      );

      setProjects([]);
    } finally {
      setLoading(false);
    }
  };

  // ==========================================
  // LOAD PROJECTS WHEN CONTEXT STARTS
  // ==========================================
  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      fetchProjects();
    } else {
      setProjects([]);
      setLoading(false);
    }
  }, []);

  // ==========================================
  // ADD PROJECT
  // ==========================================
  const addProject = async (projectData) => {
    try {
      const response = await createProject(projectData);

      if (response.project) {
        setProjects((currentProjects) => [
          response.project,
          ...currentProjects,
        ]);
      }

      return response;
    } catch (error) {
      console.error(
        "Error creating project:",
        error
      );

      throw error;
    }
  };

  // ==========================================
  // UPDATE PROJECT
  // ==========================================
  const editProject = async (id, projectData) => {
    try {
      const response = await updateProject(
        id,
        projectData
      );

      if (response.project) {
        setProjects((currentProjects) =>
          currentProjects.map((project) =>
            project._id === response.project._id
              ? response.project
              : project
          )
        );
      }

      return response;
    } catch (error) {
      console.error(
        "Error updating project:",
        error
      );

      throw error;
    }
  };

  // ==========================================
  // DELETE PROJECT
  // ==========================================
  const removeProject = async (id) => {
    try {
      const response = await deleteProject(id);

      setProjects((currentProjects) =>
        currentProjects.filter(
          (project) => project._id !== id
        )
      );

      return response;
    } catch (error) {
      console.error(
        "Error deleting project:",
        error
      );

      throw error;
    }
  };

  return (
    <ProjectContext.Provider
      value={{
        projects,
        loading,
        fetchProjects,
        addProject,
        editProject,
        removeProject,
      }}
    >
      {children}
    </ProjectContext.Provider>
  );
};

export const useProject = () =>
  useContext(ProjectContext);