import Modal from "../ui/Modal";
import TaskForm from "./TaskForm";
import { useTask } from "../../context/TaskContext";

function AddTaskModal({ isOpen, onClose }) {
  const { addTask } = useTask();

  const handleAddTask = async (formData) => {
    try {
      await addTask(formData);
      onClose();
    } catch (error) {
      console.error(
        "Error creating task:",
        error
      );
    }
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