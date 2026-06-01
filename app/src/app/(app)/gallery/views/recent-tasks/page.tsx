import { RecentTasks } from "@/components/blocks/RecentTasks";
import { INITIAL_TASKS, MEMBERS } from "@/lib/data";
import { STATUS_LABEL, PRIORITY_COLOR, STATUS_COLOR } from "@/lib/constants";
import { formatDueDate, isOverdue } from "@/lib/utils";
import { Badge } from "@medusajs/ui";
import type { Status, Priority } from "@/types";

interface TaskRow {
  id: number;
  title: string;
  assigneeName: string;
  status: Status;
  priority: Priority;
  due: string;
}

const rows: TaskRow[] = INITIAL_TASKS.slice(0, 8).map((t) => ({
  id: t.id,
  title: t.title,
  assigneeName: MEMBERS.find((m) => m.id === t.assignee)?.name ?? "",
  status: t.status,
  priority: t.priority,
  due: t.due,
}));

const columns = [
  {
    key: "title",
    header: "Task",
    width: "w-[280px]",
    render: (row: TaskRow) => (
      <p className="text-ui-fg-base txt-compact-small-plus">{row.title}</p>
    ),
  },
  {
    key: "assignee",
    header: "Assignee",
    width: "w-[160px]",
    render: (row: TaskRow) => (
      <p className="text-ui-fg-subtle txt-compact-small">{row.assigneeName}</p>
    ),
  },
  {
    key: "status",
    header: "Status",
    width: "w-[120px]",
    render: (row: TaskRow) => (
      <Badge size="2xsmall" color={STATUS_COLOR[row.status]}>
        {STATUS_LABEL[row.status]}
      </Badge>
    ),
  },
  {
    key: "priority",
    header: "Priority",
    width: "w-[100px]",
    render: (row: TaskRow) => (
      <Badge size="2xsmall" color={PRIORITY_COLOR[row.priority]}>
        {row.priority.charAt(0).toUpperCase() + row.priority.slice(1)}
      </Badge>
    ),
  },
  {
    key: "due",
    header: "Due",
    width: "w-[100px]",
    render: (row: TaskRow) => (
      <p
        className={`txt-compact-small ${
          isOverdue(row.due) && row.status !== "done"
            ? "text-ui-fg-error"
            : "text-ui-fg-subtle"
        }`}
      >
        {formatDueDate(row.due)}
      </p>
    ),
  },
];

export default function RecentTasksGallery() {
  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col gap-2">
        <h2 className="text-ui-fg-base txt-compact-medium-plus">Default</h2>
        <RecentTasks title="Recent Tasks" columns={columns} rows={rows} />
      </div>
    </div>
  );
}
