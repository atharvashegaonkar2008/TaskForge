import Modal from "../ui/Modal";
import TaskForm from "./TaskForm";
import { useTask } from "../../context/TaskContext";

function AddTaskModal({ isOpen, onClose }) {
  const { addTask } = useTask();

  const handleAddTask = (formData) => {
    addTask({
      id: Date.now().toString(),
      ...formData,
    });

    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Create New Task"
    >
      <TaskForm
        onSubmit={handleAddTask}
      />
    </Modal>
  );
}

export default AddTaskModal;