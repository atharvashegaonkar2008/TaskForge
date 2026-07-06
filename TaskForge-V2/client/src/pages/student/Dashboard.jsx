import { useProject } from "../../context/ProjectContext";
import WelcomeBanner from "../../components/dashboard/WelcomeBanner";
import StatsGrid from "../../components/dashboard/StatsGrid";
import RecentProjects from "../../components/dashboard/RecentProjects";
import RecentTasks from "../../components/dashboard/RecentTasks";

function Dashboard() {
  const { projects } = useProject();

  return (
    <div className="space-y-8">
      <WelcomeBanner />

      <StatsGrid projects={projects} />

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
        <RecentProjects projects={projects} />
        <RecentTasks />
      </div>
    </div>
  );
}

export default Dashboard;