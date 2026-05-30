"use client";

import { useState, useMemo, useCallback } from "react";
import { useQueryState } from "nuqs";
import { useStore } from "@/app/(app)/store";
import { useMemberLookup } from "@/lib/hooks";
import { STATUS_LABEL } from "@/lib/constants";
import { useTaskFilters, useFilteredTasks, usePagination } from "./hooks";
import { getTaskColumns } from "./columns";
import { KanbanCard } from "./KanbanCard";
import { ControlsBar } from "@/components/controls/ControlsBar";
import { Pagination } from "@/components/controls/Pagination";
import { TableView } from "@/components/views/TableView";
import { KanbanView, type KanbanColumn } from "@/components/views/KanbanView";
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

  const kanbanColumns: KanbanColumn<Task>[] = useMemo(
    () => STATUSES.map((s) => ({
      key: s,
      label: STATUS_LABEL[s],
      color: s,
      dotIcon: <StatusDot status={s} />,
      items: filtered.filter((t) => t.status === s),
    })),
    [filtered]
  );

  const handleMove = useCallback(
    (itemKey: string | number, _from: string, to: string) => {
      dispatch({ type: "MOVE_TASK", id: Number(itemKey), status: to as Status });
    },
    [dispatch]
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
        statusFilter={filters.status}
        priorityFilter={filters.priority}
        onStatusFilter={(s) => setStatus(s === "all" ? null : s)}
        onPriorityFilter={(p) => setPriority(p === "all" ? null : p)}
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
            renderCard={(t) => (
              <KanbanCard
                task={t}
                member={memberMap.get(t.assignee)!}
                onClick={() => setSelectedTask(t)}
              />
            )}
            keyFn={(t) => t.id}
            onMove={handleMove}
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
