import { RecentTasks } from "@/components/blocks/RecentTasks";
import { RECENT_TASK_IDS } from "@/lib/gallery";
import { INITIAL_TASKS, MEMBERS } from "@/lib/data";
import { STATUS_LABEL, PRIORITY_COLOR, BAR_COLORS } from "@/lib/constants";
import { formatDueDate } from "@/lib/utils";

const taskMap = Object.fromEntries(INITIAL_TASKS.map((t) => [t.id, t]));
const memberMap = Object.fromEntries(MEMBERS.map((m) => [m.id, m]));

const rows = RECENT_TASK_IDS.map((id) => {
  const t = taskMap[id];
  const member = memberMap[t.assignee];
  return {
    title: t.title,
    assignee: { initials: member.initials, avatarBg: member.avatarBg, avatarText: member.avatarText },
    assigneeName: member.name,
    priority: t.priority.charAt(0).toUpperCase() + t.priority.slice(1),
    priorityColor: PRIORITY_COLOR[t.priority],
    dueDate: formatDueDate(t.due),
    statusLabel: STATUS_LABEL[t.status],
    statusColor: BAR_COLORS[t.status],
  };
});

export default function Page() {
  return (
    <div className="flex flex-col gap-8 p-6">
      <h2 className="txt-compact-medium-plus text-ui-fg-subtle">Recent Tasks</h2>
      <RecentTasks heading="Recent Tasks" rows={rows} />
    </div>
  );
}
