import TaskDetailsModal from "@/components/blocks/TaskDetailsModal";
import { INITIAL_TASKS, MEMBERS, ACTIVITY } from "@/lib/data";
import { STATUS_LABEL, STATUS_COLOR, PRIORITY_COLOR } from "@/lib/constants";
import { formatDueDate, isOverdue } from "@/lib/utils";

const task = INITIAL_TASKS[0]; // Task #1: "Update onboarding flow"
const memberMap = Object.fromEntries(MEMBERS.map((m) => [m.id, m]));
const assignee = memberMap[task.assignee];

const infoRows = [
  {
    label: "Status",
    type: "status" as const,
    value: STATUS_LABEL[task.status],
    color: STATUS_COLOR[task.status],
  },
  {
    label: "Priority",
    type: "priority" as const,
    value: task.priority.charAt(0).toUpperCase() + task.priority.slice(1),
    color: PRIORITY_COLOR[task.priority],
  },
  {
    label: "Assignee",
    type: "assignee" as const,
    value: assignee.name,
    member: { initials: assignee.initials, avatarBg: assignee.avatarBg, avatarText: assignee.avatarText },
  },
  {
    label: "Due date",
    type: "date" as const,
    value: formatDueDate(task.due),
    isOverdue: isOverdue(task.due),
  },
];

const taskActivity = ACTIVITY.filter((a) => a.taskId === task.id);
const activityEntries = taskActivity.map((a) => {
  const member = memberMap[a.memberId];
  return {
    member: { initials: member.initials, avatarBg: member.avatarBg, avatarText: member.avatarText, name: member.name },
    time: a.time,
    text: a.text,
  };
});

export default function Page() {
  return (
    <div className="flex flex-col gap-8 p-6">
      <h2 className="txt-compact-medium-plus text-ui-fg-subtle">Task Details Modal</h2>
      <div className="flex justify-center">
        <TaskDetailsModal
          title={task.title}
          description={task.desc}
          infoHeading="Info"
          activityHeading="Activity log"
          infoRows={infoRows}
          activityEntries={activityEntries}
          primaryAction="Mark complete"
          secondaryAction="Edit"
        />
      </div>
    </div>
  );
}
