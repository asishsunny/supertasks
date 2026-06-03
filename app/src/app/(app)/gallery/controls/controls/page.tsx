"use client";

import { Controls } from "@/components/blocks/Controls";
import { GALLERY } from "@/lib/gallery";

export default function Page() {
  return (
    <div className="flex flex-col gap-8 p-6">
      <h2 className="txt-compact-medium-plus text-ui-fg-subtle">Controls</h2>
      <Controls {...GALLERY.controls} />
    </div>
  );
}
