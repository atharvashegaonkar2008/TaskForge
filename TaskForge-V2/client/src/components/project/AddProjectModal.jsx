import { useState } from "react";

import Modal from "../ui/Modal";
import ProjectForm from "./ProjectForm";
import { useProject } from "../../context/ProjectContext";

function AddProjectModal({ isOpen, onClose }) {
  const { addProject } = useProject();

  const [loading, setLoading] = useState(false);

  const handleCreateProject = async (projectData) => {
    try {
      setLoading(true);

      await addProject(projectData);

      // Close modal after successful creation
      onClose();
    } catch (error) {
      console.error(
        "Error creating project:",
        error
      );

      alert(
        error.response?.data?.message ||
          "Failed to create project."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Create New Project"
    >
      <ProjectForm
        onSubmit={handleCreateProject}
        loading={loading}
      />
    </Modal>
  );
}

export default AddProjectModal;