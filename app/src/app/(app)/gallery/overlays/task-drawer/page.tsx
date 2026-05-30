"use client";

import { TaskDetailDrawer } from "@/components/overlays/TaskDetailDrawer";
import { INITIAL_TASKS, MEMBERS, ACTIVITY } from "@/lib/data";

const task = INITIAL_TASKS[0];
const member = MEMBERS.find((m) => m.id === task.assignee)!;
const memberMap = new Map(MEMBERS.map((m) => [m.id, m]));
const activity = ACTIVITY.filter((a) => a.taskId === task.id).map((a) => ({
  ...a,
  member: memberMap.get(a.memberId)!,
}));

export default function TaskDrawerGallery() {
  return <TaskDetailDrawer task={task} member={member} activity={activity} open onClose={() => {}} />;
}
