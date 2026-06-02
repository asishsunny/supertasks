"use client";

import { Controls } from "@/components/blocks/Controls";

export default function Page() {
  return (
    <div className="flex flex-col gap-8 p-6">
      <section className="flex flex-col gap-3">
        <h2 className="txt-compact-medium-plus text-ui-fg-subtle">Tasks</h2>
        <Controls />
      </section>
      <section className="flex flex-col gap-3">
        <h2 className="txt-compact-medium-plus text-ui-fg-subtle">Reports</h2>
        <Controls />
      </section>
    </div>
  );
}
