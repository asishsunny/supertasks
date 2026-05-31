"use client";

import { useState, useMemo, useCallback } from "react";
import { useQueryState } from "nuqs";
import { useStore } from "@/app/(app)/store";
import { useMemberLookup } from "@/lib/hooks";
import { STATUS_LABEL, PRIORITY_COLOR } from "@/lib/constants";
import { formatDueDate, isOverdue } from "@/lib/utils";
import { useTaskFilters, useFilteredTasks, usePagination } from "./hooks";
import { getTaskColumns } from "./columns";
import { KanbanCard } from "@/components/blocks/KanbanCard";
import { ControlsBar } from "@/components/controls/ControlsBar";
import { Pagination } from "@/components/controls/Pagination";
import { TableView } from "@/components/views/TableView";
import { KanbanView, type KanbanColumnData } from "@/components/views/KanbanView";
import { TaskDetailDrawer } from "@/components/overlays/TaskDetailDrawer";
import { FormModal } from "@/components/overlays/FormModal";
import { ViewBoundary } from "@/components/shared/ViewBoundary";
import { StatusDot } from "@/components/shared/StatusDot";
import { MODAL_CONFIGS, ACTIVITY, MEMBERS } from "@/lib/data";
import type { Task, Status } from "@/types";

const VIEWS = [
  { key: "kanban", label: "Kanban" },
  { key: "list", label: "List" },
];

const STATUSES: Status[] = ["todo", "in_progress", "in_review", "done"];

export function TasksSection() {
  const { dispatch } = useStore();
  const memberMap = useMemberLookup();
  const { filters, setSearch, setStatus, setPriority } = useTaskFilters();
  const filtered = useFilteredTasks(filters);
  const { page, pageSize, paginate, setPage } = usePagination(filtered.length);

  const [view, setView] = useQueryState("view", { defaultValue: "kanban" });
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [showCreate, setShowCreate] = useState(false);

  const columns = useMemo(
    () => getTaskColumns(memberMap, setSelectedTask),
    [memberMap]
  );

  const kanbanColumns: KanbanColumnData<Task>[] = useMemo(
    () => STATUSES.map((s) => {
      const items = filtered.filter((t) => t.status === s);
      return {
        key: s,
        label: STATUS_LABEL[s],
        count: items.length,
        dotIcon: <StatusDot status={s} />,
        items,
      };
    }),
    [filtered]
  );

  const selectedMember = selectedTask ? memberMap.get(selectedTask.assignee) : undefined;
  const selectedActivity = selectedTask
    ? ACTIVITY.filter((a) => a.taskId === selectedTask.id).map((a) => ({
        ...a,
        member: MEMBERS.find((m) => m.id === a.memberId)!,
      }))
    : [];

  return (
    <>
      <ControlsBar
        views={VIEWS}
        activeView={view ?? "kanban"}
        onViewChange={(v) => setView(v)}
        onSearch={(q) => setSearch(q || null)}
      />

      <ViewBoundary>
        {view === "list" ? (
          <>
            <div className="bg-ui-bg-base rounded-xl shadow-elevation-card-rest overflow-clip">
              <TableView data={paginate(filtered)} columns={columns} keyFn={(t) => t.id} />
            </div>
            <Pagination page={page} pageSize={pageSize} total={filtered.length} onPageChange={setPage} />
          </>
        ) : (
          <KanbanView
            columns={kanbanColumns}
            renderCard={(t) => {
              const m = memberMap.get(t.assignee)!;
              return (
                <KanbanCard
                  title={t.title}
                  desc={t.desc}
                  member={m}
                  name={m.name.split(" ")[0]}
                  dueDate={formatDueDate(t.due)}
                  overdue={isOverdue(t.due)}
                  priorityLabel={t.priority.charAt(0).toUpperCase() + t.priority.slice(1)}
                  priorityColor={PRIORITY_COLOR[t.priority]}
                  onClick={() => setSelectedTask(t)}
                />
              );
            }}
            keyFn={(t) => t.id}
          />
        )}
      </ViewBoundary>

      {selectedTask && selectedMember && (
        <TaskDetailDrawer
          task={selectedTask}
          member={selectedMember}
          activity={selectedActivity}
          open
          onClose={() => setSelectedTask(null)}
          onComplete={() => {
            dispatch({ type: "MOVE_TASK", id: selectedTask.id, status: "done" });
            setSelectedTask(null);
          }}
        />
      )}

      <FormModal
        config={MODAL_CONFIGS.create_task}
        open={showCreate}
        onClose={() => setShowCreate(false)}
      />
    </>
  );
}
