import Modal from "../ui/Modal";
import { useProject } from "../../context/ProjectContext";

function DeleteProjectDialog({
  isOpen,
  onClose,
  project,
}) {
  const { deleteProject } = useProject();

  const handleDelete = () => {
    deleteProject(project.id);
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Delete Project"
    >
      <div className="space-y-6">

        <p className="text-gray-600">
          Are you sure you want to delete
          <span className="font-bold">
            {" "}
            {project.title}
          </span>
          ?
        </p>

        <div className="flex justify-end gap-3">

          <button
            onClick={onClose}
            className="px-5 py-2 rounded-lg border"
          >
            Cancel
          </button>

          <button
            onClick={handleDelete}
            className="px-5 py-2 rounded-lg bg-red-600 hover:bg-red-700 text-white"
          >
            Delete
          </button>

        </div>

      </div>
    </Modal>
  );
}

export default DeleteProjectDialog;