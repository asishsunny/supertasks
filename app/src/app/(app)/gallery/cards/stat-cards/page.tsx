"use client";

import StatCards from "@/components/blocks/StatCards";

export default function Page() {
  return (
    <div className="flex flex-col gap-8 p-6">
      <section className="flex flex-col gap-3">
        <h2 className="txt-compact-medium-plus text-ui-fg-subtle">Dashboard</h2>
        <StatCards />
      </section>
      <section className="flex flex-col gap-3">
        <h2 className="txt-compact-medium-plus text-ui-fg-subtle">Reports</h2>
        <StatCards />
      </section>
    </div>
  );
}
