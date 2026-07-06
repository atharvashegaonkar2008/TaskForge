import {
  FolderKanban,
  ListTodo,
  CheckCircle2,
  Clock3,
} from "lucide-react";

import StatsCard from "./StatsCard";

function StatsGrid({ projects }) {
  return (
    <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
      <StatsCard
        title="Projects"
        value={projects.length}
        icon={<FolderKanban className="w-6 h-6 text-blue-600" />}
        color="bg-blue-100"
      />

      <StatsCard
        title="Tasks"
        value="0"
        icon={<ListTodo className="w-6 h-6 text-purple-600" />}
        color="bg-purple-100"
      />

      <StatsCard
        title="Completed"
        value="0"
        icon={<CheckCircle2 className="w-6 h-6 text-green-600" />}
        color="bg-green-100"
      />

      <StatsCard
        title="Pending"
        value="0"
        icon={<Clock3 className="w-6 h-6 text-orange-600" />}
        color="bg-orange-100"
      />
    </div>
  );
}

export default StatsGrid;