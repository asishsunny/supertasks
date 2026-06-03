"use client";

import StatCards from "@/components/blocks/StatCards";
import { GALLERY } from "@/lib/gallery";

export default function Page() {
  return (
    <div className="flex flex-col gap-8 p-6">
      <h2 className="txt-compact-medium-plus text-ui-fg-subtle">StatCards</h2>
      <StatCards {...GALLERY.statCards} />
    </div>
  );
}
