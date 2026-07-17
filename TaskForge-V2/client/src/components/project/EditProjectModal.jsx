import Modal from "../ui/Modal";
import ProjectForm from "./ProjectForm";
import { useProject } from "../../context/ProjectContext";

function EditProjectModal({ isOpen, onClose, project }) {
  const { updateProject } = useProject();

  const handleUpdate = (formData) => {
    updateProject({
      ...project,
      ...formData,
    });

    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Edit Project"
    >
      <ProjectForm
        initialData={project}
        onSubmit={handleUpdate}
        submitText="Save Changes"
      />
    </Modal>
  );
}

export default EditProjectModal;