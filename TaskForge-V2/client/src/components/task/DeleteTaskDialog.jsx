import Modal from "../ui/Modal";
import { useTask } from "../../context/TaskContext";

function DeleteTaskDialog({
  isOpen,
  onClose,
  task,
}) {
  const { deleteTask } = useTask();

  const handleDelete = () => {
    deleteTask(task.id);
    onClose();
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

          <button
            onClick={onClose}
            className="px-5 py-2 border rounded-lg"
          >
            Cancel
          </button>

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