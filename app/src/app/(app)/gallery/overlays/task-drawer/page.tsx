"use client";
import { TaskDetailsModal } from "@/components/blocks/TaskDetailsModal";
import { INITIAL_TASKS, MEMBERS, ACTIVITY } from "@/lib/data";
import { STATUS_LABEL, STATUS_COLOR, PRIORITY_COLOR } from "@/lib/constants";
import { formatDate, isOverdue } from "@/lib/utils";

const task = INITIAL_TASKS[0];
const member = MEMBERS.find((m) => m.id === task.assignee)!;
const memberMap = new Map(MEMBERS.map((m) => [m.id, m]));

const info = [
  { label: "Status", value: STATUS_LABEL[task.status], badge: { color: STATUS_COLOR[task.status] as any } },
  { label: "Priority", value: task.priority.charAt(0).toUpperCase() + task.priority.slice(1), badge: { color: PRIORITY_COLOR[task.priority] as any } },
  { label: "Assignee", value: member.name, assignee: member },
  { label: "Due date", value: formatDate(task.due), error: isOverdue(task.due) },
];

const activity = ACTIVITY.filter((a) => a.taskId === task.id).map((a) => ({
  member: memberMap.get(a.memberId)!,
  time: a.time,
  text: a.text,
}));

export default function Page() {
  return <TaskDetailsModal heading="Task details" title={task.title} desc={task.desc} infoLabel="Info" info={info} activityLabel="Activity log" activity={activity} primaryAction="Mark complete" secondaryAction="Edit" />;
}
