"use client";

import { useState, useMemo } from "react";
import { useStore } from "@/app/(app)/store";
import { useMemberLookup } from "@/lib/hooks";
import { getReportColumns } from "./columns";
import { ControlsBar } from "@/components/controls/ControlsBar";
import { TableView } from "@/components/views/TableView";
import { FormModal } from "@/components/overlays/FormModal";
import { ViewBoundary } from "@/components/shared/ViewBoundary";
import { MODAL_CONFIGS } from "@/lib/data";

const RANGE_VIEWS = [
  { key: "90d", label: "90d" },
  { key: "30d", label: "30d" },
  { key: "7d", label: "7d" },
];

export function ReportsTable() {
  const { state } = useStore();
  const memberMap = useMemberLookup();
  const [search, setSearch] = useState("");
  const [showGenerate, setShowGenerate] = useState(false);

  const filtered = useMemo(() => {
    if (!search) return state.reports;
    const q = search.toLowerCase();
    return state.reports.filter((r) => r.report.toLowerCase().includes(q));
  }, [state.reports, search]);

  const columns = useMemo(() => getReportColumns(memberMap), [memberMap]);

  return (
    <>
      <ControlsBar
        views={RANGE_VIEWS}
        activeView="30d"
        onSearch={setSearch}
      />
      <ViewBoundary>
        <div className="bg-ui-bg-base rounded-xl shadow-elevation-card-rest overflow-clip">
          <TableView data={filtered} columns={columns} keyFn={(r) => r.id} />
        </div>
      </ViewBoundary>
      <FormModal config={MODAL_CONFIGS.generate_report} open={showGenerate} onClose={() => setShowGenerate(false)} />
    </>
  );
}
