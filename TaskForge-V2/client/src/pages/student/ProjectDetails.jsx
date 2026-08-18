import { useParams, useNavigate } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";

import { useProject } from "../../context/ProjectContext";
import { useTask } from "../../context/TaskContext";

import TaskCard from "../../components/task/TaskCard";

function ProjectDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const { projects } = useProject();
  const { tasks } = useTask();

  // Find project using MongoDB _id
  const project = projects.find(
    (p) => p._id === id
  );

  // Project not found
  if (!project) {
    return (
      <div className="text-center mt-10">
        <h2 className="text-2xl font-bold text-red-600">
          Project Not Found
        </h2>

        <button
          onClick={() => navigate("/projects")}
          className="mt-5 bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg"
        >
          Back to Projects
        </button>
      </div>
    );
  }

  // Get tasks belonging to this project
  const projectTasks = tasks.filter(
    (task) =>
      task.projectId === project._id ||
      task.projectId?._id === project._id
  );

  // Statistics
  const completedTasks = projectTasks.filter(
    (task) => task.status === "Completed"
  ).length;

  const pendingTasks = projectTasks.filter(
    (task) => task.status !== "Completed"
  ).length;

  return (
    <div className="space-y-8">

      {/* ========================= */}
      {/* HEADER */}
      {/* ========================= */}

      <div className="flex items-center gap-4">

        <button
          onClick={() => navigate("/projects")}
          className="p-3 rounded-lg bg-gray-100 hover:bg-gray-200 transition"
          title="Back to Projects"
        >
          <FaArrowLeft />
        </button>

        <div>
          <h1 className="text-3xl font-bold text-gray-800">
            {project.title}
          </h1>

          <p className="text-gray-500 mt-1">
            Project Details
          </p>
        </div>

      </div>


      {/* ========================= */}
      {/* PROJECT INFORMATION */}
      {/* ========================= */}

      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8">

        <h2 className="text-xl font-semibold mb-4">
          Description
        </h2>

        <p className="text-gray-600">
          {project.description}
        </p>


        <div className="grid md:grid-cols-2 gap-8 mt-8">

          {/* Status */}

          <div>
            <h3 className="font-semibold mb-2">
              Status
            </h3>

            <span className="inline-block px-3 py-1 rounded-full bg-blue-100 text-blue-700 text-sm font-medium">
              {project.status}
            </span>
          </div>


          {/* Progress */}

          <div>

            <h3 className="font-semibold mb-2">
              Progress
            </h3>

            <div className="w-full h-3 bg-gray-200 rounded-full overflow-hidden">

              <div
                className="bg-blue-600 h-full rounded-full transition-all duration-300"
                style={{
                  width: `${project.progress}%`,
                }}
              />

            </div>

            <p className="mt-2 text-gray-600">
              {project.progress}%
            </p>

          </div>

        </div>

      </div>


      {/* ========================= */}
      {/* STATISTICS */}
      {/* ========================= */}

      <div className="grid md:grid-cols-3 gap-6">

        {/* Total */}

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">

          <h3 className="text-gray-500">
            Total Tasks
          </h3>

          <p className="text-3xl font-bold mt-2">
            {projectTasks.length}
          </p>

        </div>


        {/* Completed */}

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">

          <h3 className="text-gray-500">
            Completed Tasks
          </h3>

          <p className="text-3xl font-bold mt-2 text-green-600">
            {completedTasks}
          </p>

        </div>


        {/* Pending */}

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">

          <h3 className="text-gray-500">
            Pending Tasks
          </h3>

          <p className="text-3xl font-bold mt-2 text-orange-500">
            {pendingTasks}
          </p>

        </div>

      </div>


      {/* ========================= */}
      {/* PROJECT TASKS */}
      {/* ========================= */}

      <div>

        <div className="flex items-center justify-between mb-5">

          <h2 className="text-2xl font-bold">
            Project Tasks
          </h2>

          <button
            onClick={() => navigate("/tasks")}
            className="text-blue-600 hover:text-blue-700 font-medium"
          >
            View All Tasks
          </button>

        </div>


        {projectTasks.length === 0 ? (

          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-10 text-center">

            <p className="text-gray-500">
              No tasks available for this project.
            </p>

          </div>

        ) : (

          <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">

            {projectTasks.map((task) => (

              <TaskCard
                key={task._id || task.id}
                task={task}
              />

            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default ProjectDetails;