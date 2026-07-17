import { useParams, useNavigate } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";
import { useTask } from "../../context/TaskContext";

function TaskDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { tasks } = useTask();

  const task = tasks.find((t) => t.id === id);

  if (!task) {
    return (
      <div className="text-center mt-10">
        <h2 className="text-2xl font-bold text-red-600">
          Task Not Found
        </h2>

        <button
          onClick={() => navigate("/tasks")}
          className="mt-5 bg-blue-600 text-white px-5 py-2 rounded-lg"
        >
          Back to Tasks
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-8">

      <div className="flex items-center gap-4">
        <button
          onClick={() => navigate("/tasks")}
          className="p-3 rounded-lg bg-gray-100 hover:bg-gray-200"
        >
          <FaArrowLeft />
        </button>

        <div>
          <h1 className="text-3xl font-bold">
            {task.title}
          </h1>

          <p className="text-gray-500">
            Task Details
          </p>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8">

        <h2 className="text-xl font-semibold mb-3">
          Description
        </h2>

        <p className="text-gray-600">
          {task.description}
        </p>

        <div className="grid md:grid-cols-3 gap-6 mt-8">

          <div>
            <h3 className="font-semibold">Status</h3>
            <p>{task.status}</p>
          </div>

          <div>
            <h3 className="font-semibold">Priority</h3>
            <p>{task.priority}</p>
          </div>

          <div>
            <h3 className="font-semibold">Due Date</h3>
            <p>{task.dueDate || "Not Set"}</p>
          </div>

        </div>

      </div>

    </div>
  );
}

export default TaskDetails;