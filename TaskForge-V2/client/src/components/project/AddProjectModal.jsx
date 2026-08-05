import Modal from "../ui/Modal";
import ProjectForm from "./ProjectForm";
import { useProject } from "../../context/ProjectContext";

function AddProjectModal({ isOpen, onClose }) {
  const { addProject } = useProject();

  const handleCreateProject = async (projectData) => {
    try {
      await addProject(projectData);
      onClose();
    } catch (error) {
      console.error(error);
      alert("Failed to create project.");
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Create New Project"
    >
      <ProjectForm onSubmit={handleCreateProject} />
    </Modal>
  );
}

export default AddProjectModal;