"use client";

import { useState, useMemo } from "react";
import { useStore } from "@/app/(app)/store";
import { isOverdue } from "@/lib/utils";
import { getTeamColumns } from "./columns";
import { ControlsBar } from "@/components/controls/ControlsBar";
import { TableView } from "@/components/views/TableView";
import { FormModal } from "@/components/overlays/FormModal";
import { ViewBoundary } from "@/components/shared/ViewBoundary";
import { MODAL_CONFIGS } from "@/lib/data";
import type { Member } from "@/types";

export interface TeamRow extends Member {
  activeTasks: number;
  overdueTasks: number;
}

export function TeamSection() {
  const { state } = useStore();
  const [search, setSearch] = useState("");
  const [showInvite, setShowInvite] = useState(false);

  const rows: TeamRow[] = useMemo(() => {
    return state.members.map((m) => {
      const memberTasks = state.tasks.filter((t) => t.assignee === m.id);
      return {
        ...m,
        activeTasks: memberTasks.filter((t) => t.status !== "done").length,
        overdueTasks: memberTasks.filter((t) => isOverdue(t.due) && t.status !== "done").length,
      };
    });
  }, [state.members, state.tasks]);

  const filtered = useMemo(() => {
    if (!search) return rows;
    const q = search.toLowerCase();
    return rows.filter(
      (m) => m.name.toLowerCase().includes(q) || m.email.toLowerCase().includes(q)
    );
  }, [rows, search]);

  const columns = useMemo(() => getTeamColumns(() => {}), []);

  return (
    <div className="flex flex-col gap-6 w-full">
      <ControlsBar onSearch={setSearch} />

      <ViewBoundary>
        <div className="bg-ui-bg-base rounded-xl shadow-elevation-card-rest overflow-clip">
          <TableView data={filtered} columns={columns} keyFn={(m) => m.id} />
        </div>
      </ViewBoundary>

      <FormModal
        config={MODAL_CONFIGS.invite_member}
        open={showInvite}
        onClose={() => setShowInvite(false)}
      />
    </div>
  );
}
