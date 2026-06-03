"use client";

import { ChartCards } from "@/components/blocks/ChartCards";
import { GALLERY } from "@/lib/gallery";

export default function Page() {
  return (
    <div className="flex flex-col gap-8 p-6">
      <h2 className="txt-compact-medium-plus text-ui-fg-subtle">ChartCards</h2>
      <ChartCards {...GALLERY.chartCards} />
    </div>
  );
}
