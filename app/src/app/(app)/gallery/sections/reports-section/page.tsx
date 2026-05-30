"use client";

import { ReportsStatCards } from "@/features/reports/ReportsStatCards";
import { ReportsTable } from "@/features/reports/ReportsSection";

export default function ReportsSectionGallery() {
  return (
    <>
      <ReportsStatCards />
      <ReportsTable />
    </>
  );
}
