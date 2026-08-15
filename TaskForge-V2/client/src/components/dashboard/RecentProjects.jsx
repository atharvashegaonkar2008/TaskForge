function RecentProjects({ projects }) {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">

      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-gray-800">
          Recent Projects
        </h2>

        <button className="text-blue-600 hover:text-blue-700 font-medium">
          View All
        </button>
      </div>

      {/* No Projects */}
      {projects.length === 0 ? (
        <div className="text-center py-10">
          <p className="text-gray-500">
            No projects available.
          </p>
        </div>
      ) : (

        /* Projects */
        <div className="space-y-4">
          {projects.map((project) => (
            <div
              key={project._id}
              className="flex items-center justify-between border rounded-xl p-4 hover:bg-gray-50 transition"
            >

              {/* Project Information */}
              <div>
                <h3 className="font-semibold text-lg">
                  {project.title}
                </h3>

                <p className="text-gray-500 text-sm mt-1">
                  {project.description}
                </p>
              </div>

              {/* Status & Progress */}
              <div className="text-right">

                <span className="inline-block px-3 py-1 rounded-full bg-blue-100 text-blue-700 text-sm font-medium">
                  {project.status}
                </span>

                <p className="text-sm text-gray-500 mt-2">
                  {project.progress}%
                </p>

              </div>

            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default RecentProjects;