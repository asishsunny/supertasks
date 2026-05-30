"use client";

import { useState, useMemo } from "react";
import { useStore } from "@/app/(app)/store";
import { getTeamColumns } from "./columns";
import { ControlsBar } from "@/components/controls/ControlsBar";
import { TableView } from "@/components/views/TableView";
import { FormModal } from "@/components/overlays/FormModal";
import { ViewBoundary } from "@/components/shared/ViewBoundary";
import { MODAL_CONFIGS } from "@/lib/data";

export function TeamSection() {
  const { state } = useStore();
  const [search, setSearch] = useState("");
  const [showInvite, setShowInvite] = useState(false);

  const filtered = useMemo(() => {
    if (!search) return state.members;
    const q = search.toLowerCase();
    return state.members.filter(
      (m) => m.name.toLowerCase().includes(q) || m.email.toLowerCase().includes(q)
    );
  }, [state.members, search]);

  const columns = useMemo(() => getTeamColumns(() => {}), []);

  return (
    <>
      <ControlsBar onSearch={setSearch} />
      <ViewBoundary>
        <div className="bg-ui-bg-base rounded-xl shadow-elevation-card-rest overflow-clip">
          <TableView data={filtered} columns={columns} keyFn={(m) => m.id} />
        </div>
      </ViewBoundary>
      <FormModal config={MODAL_CONFIGS.invite_member} open={showInvite} onClose={() => setShowInvite(false)} />
    </>
  );
}
