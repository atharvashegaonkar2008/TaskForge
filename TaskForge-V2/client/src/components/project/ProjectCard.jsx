function ProjectCard({ project }) {
  return (
    <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-all duration-300">

      <h2 className="text-xl font-bold">
        {project.title}
      </h2>

      <p className="text-gray-500 mt-2">
        {project.description}
      </p>

      <div className="mt-5 flex justify-between items-center">

        <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm">
          {project.status}
        </span>

        <span className="font-semibold">
          {project.progress}%
        </span>

      </div>

    </div>
  );
}

export default ProjectCard;