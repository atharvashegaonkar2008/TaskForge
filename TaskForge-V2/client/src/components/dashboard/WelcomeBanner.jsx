import { Plus } from "lucide-react";

function WelcomeBanner() {
  return (
    <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl p-8 text-white">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div>
          <h1 className="text-3xl font-bold">
            Welcome back, Atharv 👋
          </h1>

          <p className="mt-2 text-blue-100">
            Manage your projects, tasks and collaborate with your team from one place.
          </p>
        </div>

        <button className="flex items-center gap-2 bg-white text-blue-700 px-5 py-3 rounded-xl font-semibold hover:bg-blue-50 transition">
          <Plus size={18} />
          New Project
        </button>
      </div>
    </div>
  );
}

export default WelcomeBanner;