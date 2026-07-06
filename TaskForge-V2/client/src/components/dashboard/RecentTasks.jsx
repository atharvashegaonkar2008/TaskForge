import { CheckCircle2 } from "lucide-react";

function RecentTasks() {
  const tasks = [
    {
      id: 1,
      title: "Design Dashboard UI",
      priority: "High",
      status: "In Progress",
    },
    {
      id: 2,
      title: "Create Project Context",
      priority: "Medium",
      status: "Completed",
    },
    {
      id: 3,
      title: "Implement Login Page",
      priority: "Low",
      status: "Pending",
    },
  ];

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-gray-800">
          Recent Tasks
        </h2>

        <button className="text-blue-600 hover:text-blue-700 font-medium">
          View All
        </button>
      </div>

      <div className="space-y-4">
        {tasks.map((task) => (
          <div
            key={task.id}
            className="flex justify-between items-center border rounded-xl p-4 hover:bg-gray-50 transition"
          >
            <div className="flex items-center gap-3">
              <CheckCircle2 className="text-green-500" size={20} />

              <div>
                <h3 className="font-medium">{task.title}</h3>

                <p className="text-sm text-gray-500">
                  {task.priority} Priority
                </p>
              </div>
            </div>

            <span className="px-3 py-1 rounded-full bg-blue-100 text-blue-700 text-sm">
              {task.status}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default RecentTasks;