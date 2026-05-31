"use client";

import { StatCards } from "./StatCards";
import { ChartCards } from "./ChartCards";
import { RecentTasks } from "./RecentTasks";
import { ViewBoundary } from "@/components/shared/ViewBoundary";

export function DashboardSection() {
  return (
    <ViewBoundary>
      <div className="flex flex-col gap-6 w-full">
        <StatCards />
        <ChartCards />
        <RecentTasks />
      </div>
    </ViewBoundary>
  );
}
