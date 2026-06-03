"use client";

import { RecentTasks } from "@/components/blocks/RecentTasks";
import { GALLERY } from "@/lib/gallery";

export default function Page() {
  return (
    <div className="flex flex-col gap-8 p-6">
      <h2 className="txt-compact-medium-plus text-ui-fg-subtle">RecentTasks</h2>
      <RecentTasks {...GALLERY.recentTasks} />
    </div>
  );
}
