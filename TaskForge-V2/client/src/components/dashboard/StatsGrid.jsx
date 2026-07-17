import {
  FaFolderOpen,
  FaTasks,
  FaCheckCircle,
  FaClock,
} from "react-icons/fa";

function StatsGrid({ projects, tasks }) {

  const completed = tasks.filter(
    (task) => task.status === "Completed"
  ).length;

  const pending = tasks.filter(
    (task) => task.status !== "Completed"
  ).length;

  const cards = [
    {
      title: "Projects",
      value: projects.length,
      icon: <FaFolderOpen />,
    },
    {
      title: "Tasks",
      value: tasks.length,
      icon: <FaTasks />,
    },
    {
      title: "Completed",
      value: completed,
      icon: <FaCheckCircle />,
    },
    {
      title: "Pending",
      value: pending,
      icon: <FaClock />,
    },
  ];

  return (
    <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-6">

      {cards.map((card) => (

        <div
          key={card.title}
          className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6"
        >

          <div className="flex justify-between items-center">

            <div>

              <p className="text-gray-500">
                {card.title}
              </p>

              <h2 className="text-3xl font-bold mt-2">
                {card.value}
              </h2>

            </div>

            <div className="text-3xl text-blue-600">
              {card.icon}
            </div>

          </div>

        </div>

      ))}

    </div>
  );
}

export default StatsGrid;