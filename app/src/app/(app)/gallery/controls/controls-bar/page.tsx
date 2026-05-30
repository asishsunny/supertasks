"use client";
import { Controls } from "@/components/blocks/Controls";
export default function Page() {
  return <Controls views={[{ key: "kanban", label: "Kanban" }, { key: "list", label: "List" }]} activeView="list" />;
}
