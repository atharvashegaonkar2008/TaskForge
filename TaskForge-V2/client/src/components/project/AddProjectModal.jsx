import Modal from "../ui/Modal";
import ProjectForm from "./ProjectForm";
import { useProject } from "../../context/ProjectContext";

function AddProjectModal({ isOpen, onClose }) {
  const { addProject } = useProject();

  const handleCreateProject = (projectData) => {
    addProject({
      id: Date.now().toString(),
      ...projectData,
    });

    onClose();
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