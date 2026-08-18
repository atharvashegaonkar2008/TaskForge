import Modal from "../ui/Modal";
import { useTask } from "../../context/TaskContext";

function DeleteTaskDialog({
  isOpen,
  onClose,
  task,
}) {
  const { deleteTask } = useTask();

  const handleDelete = async () => {
    try {
      await deleteTask(task._id);
      onClose();
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Delete Task"
    >
      <div className="space-y-6">

        <p className="text-gray-600">
          Are you sure you want to delete
          <span className="font-bold">
            {" "}
            {task.title}
          </span>
          ?
        </p>

        <div className="flex justify-end gap-3">

          {/* Cancel */}
          <button
            onClick={onClose}
            className="px-5 py-2 border rounded-lg hover:bg-gray-100"
          >
            Cancel
          </button>

          {/* Delete */}
          <button
            onClick={handleDelete}
            className="px-5 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg"
          >
            Delete
          </button>

        </div>

      </div>
    </Modal>
  );
}

export default DeleteTaskDialog;