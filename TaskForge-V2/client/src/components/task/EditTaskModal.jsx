import Modal from "../ui/Modal";
import TaskForm from "./TaskForm";
import { useTask } from "../../context/TaskContext";

function EditTaskModal({ isOpen, onClose, task }) {
  const { updateTask } = useTask();

  const handleUpdate = (formData) => {
    updateTask({
      ...task,
      ...formData,
    });

    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Edit Task"
    >
      <TaskForm
        initialData={task}
        onSubmit={handleUpdate}
        submitText="Save Changes"
      />
    </Modal>
  );
}

export default EditTaskModal;