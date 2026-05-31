"use client";
import { Badge } from "@medusajs/ui";
import { TaskDetailsModal } from "@/components/blocks/TaskDetailsModal";
import { ColorAvatar } from "@/components/ColorAvatar";
import { INITIAL_TASKS, MEMBERS, ACTIVITY } from "@/lib/data";
import { STATUS_LABEL, STATUS_COLOR, PRIORITY_COLOR } from "@/lib/constants";
import { formatDate, isOverdue } from "@/lib/utils";

const task = INITIAL_TASKS[0];
const member = MEMBERS.find((m) => m.id === task.assignee)!;
const memberMap = new Map(MEMBERS.map((m) => [m.id, m]));

const info = [
  { label: "Status", value: <Badge color={STATUS_COLOR[task.status]} size="2xsmall" rounded="full">{STATUS_LABEL[task.status]}</Badge> },
  { label: "Priority", value: <Badge color={PRIORITY_COLOR[task.priority]} size="2xsmall" rounded="full">{task.priority.charAt(0).toUpperCase() + task.priority.slice(1)}</Badge> },
  { label: "Assignee", value: <div className="flex gap-2 items-center"><ColorAvatar member={member} size="xsmall" /><span className="text-ui-fg-base txt-compact-small">{member.name}</span></div> },
  { label: "Due date", value: <span className={`txt-compact-small ${isOverdue(task.due) ? "text-ui-fg-error" : "text-ui-fg-base"}`}>{formatDate(task.due)}</span> },
  { label: "Created", value: <span className="text-ui-fg-base txt-compact-small">Jan 5, 2026</span> },
];

const activity = ACTIVITY.filter((a) => a.taskId === task.id).map((a) => ({
  member: memberMap.get(a.memberId)!,
  name: memberMap.get(a.memberId)!.name,
  time: a.time,
  text: a.text,
}));

export default function Page() {
  return <TaskDetailsModal heading="Task details" title={task.title} desc={task.desc} infoLabel="Info" info={info} activityLabel="Activity log" activity={activity} primaryAction="Mark complete" secondaryAction="Edit" />;
}
