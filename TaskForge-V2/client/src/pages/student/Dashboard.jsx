import { useProject } from "../../context/ProjectContext";
import { useTask } from "../../context/TaskContext";

import WelcomeBanner from "../../components/dashboard/WelcomeBanner";
import StatsGrid from "../../components/dashboard/StatsGrid";
import RecentProjects from "../../components/dashboard/RecentProjects";

function Dashboard() {
  const { projects } = useProject();
  const { tasks } = useTask();

  return (
    <div className="space-y-8">

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