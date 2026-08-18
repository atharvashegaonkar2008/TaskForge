import Modal from "../ui/Modal";

function DeleteProjectDialog({
  isOpen,
  onClose,
  project,
  onDelete,
  loading = false,
}) {
  if (!project) {
    return null;
  }

  const handleDelete = async () => {
    try {
      await onDelete();
    } catch (error) {
      console.error(
        "Error deleting project:",
        error
      );
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Delete Project"
    >
      <div className="space-y-6">

        {/* Warning */}
        <div>
          <p className="text-gray-700">
            Are you sure you want to delete
            this project?
          </p>

          <p className="font-semibold text-gray-900 mt-2">
            "{project.title}"
          </p>

          <p className="text-sm text-gray-500 mt-2">
            This action cannot be undone.
          </p>
        </div>

        {/* Buttons */}
        <div className="flex gap-3">

          {/* Cancel */}
          <button
            type="button"
            onClick={onClose}
            disabled={loading}
            className="flex-1 border border-gray-300 text-gray-700 py-3 rounded-lg font-semibold hover:bg-gray-100 transition disabled:opacity-50"
          >
            Cancel
          </button>

          {/* Delete */}
          <button
            type="button"
            onClick={handleDelete}
            disabled={loading}
            className="flex-1 bg-red-600 hover:bg-red-700 disabled:bg-gray-400 text-white py-3 rounded-lg font-semibold transition"
          >
            {loading
              ? "Deleting..."
              : "Delete Project"}
          </button>

        </div>
      </div>
    </Modal>
  );
}

export default DeleteProjectDialog;