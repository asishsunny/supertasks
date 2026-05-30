"use client";

import { ControlsBar } from "@/components/controls/ControlsBar";

export default function ControlsBarGallery() {
  return (
    <ControlsBar
      views={[{ key: "kanban", label: "Kanban" }, { key: "list", label: "List" }]}
      activeView="list"
    />
  );
}
