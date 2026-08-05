import { useProject } from "../../context/ProjectContext";
import { useTask } from "../../context/TaskContext";
import { useAuth } from "../../context/AuthContext";

import WelcomeBanner from "../../components/dashboard/WelcomeBanner";
import StatsGrid from "../../components/dashboard/StatsGrid";
import RecentProjects from "../../components/dashboard/RecentProjects";

function Dashboard() {
  const { projects } = useProject();
  const { tasks } = useTask();
  const { user, loading } = useAuth();

  if (loading) {
    return <h2>Loading...</h2>;
  }

  return (
    <div className="space-y-8">

      <h2 className="text-2xl font-bold">
        Welcome, {user?.name} 👋
      </h2>

      <WelcomeBanner />

      <StatsGrid
        projects={projects}
        tasks={tasks}
      />

      <RecentProjects
        projects={projects}
      />

    </div>
  );
}

export default Dashboard;