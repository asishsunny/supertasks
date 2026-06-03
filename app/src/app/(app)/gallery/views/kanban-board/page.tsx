"use client";

import { KanbanBoard } from "@/components/blocks/KanbanBoard";
import { GALLERY } from "@/lib/gallery";

export default function Page() {
  return (
    <div className="flex flex-col gap-8 p-6">
      <h2 className="txt-compact-medium-plus text-ui-fg-subtle">KanbanBoard</h2>
      <KanbanBoard {...GALLERY.kanbanBoard} />
    </div>
  );
}
