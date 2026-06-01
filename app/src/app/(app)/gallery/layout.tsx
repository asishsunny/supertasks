"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { ReactNode } from "react";

interface GalleryNavGroup {
  label: string;
  items: { title: string; href: string }[];
}

const GALLERY_NAV: GalleryNavGroup[] = [
  {
    label: "Cards",
    items: [
      { title: "Stat Cards", href: "/gallery/cards/stat-cards" },
      { title: "Chart Cards", href: "/gallery/cards/chart-cards" },
    ],
  },
  {
    label: "Controls",
    items: [
      { title: "Controls", href: "/gallery/controls/controls" },
    ],
  },
  {
    label: "Views",
    items: [
      { title: "Recent Tasks", href: "/gallery/views/recent-tasks" },
      { title: "Kanban Board", href: "/gallery/views/kanban-board" },
      { title: "Settings", href: "/gallery/views/settings" },
    ],
  },
  {
    label: "Overlays",
    items: [
      { title: "Create Task Modal", href: "/gallery/overlays/create-task-modal" },
      { title: "Task Details Modal", href: "/gallery/overlays/task-details-modal" },
    ],
  },
];

export default function GalleryLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname();

  return (
    <div className="flex gap-6 w-full">
      {/* Sidebar */}
      <aside className="shrink-0 w-[200px]">
        <div className="bg-ui-bg-base flex flex-col overflow-clip py-2 rounded-lg shadow-elevation-card-rest sticky top-4">
          <div className="px-4 py-2">
            <p className="text-ui-fg-base txt-compact-medium-plus">Gallery</p>
          </div>
          {GALLERY_NAV.map((group) => (
            <div key={group.label} className="flex flex-col">
              <p className="px-4 pt-4 pb-1 text-ui-fg-muted txt-compact-xsmall-plus uppercase tracking-wider">
                {group.label}
              </p>
              {group.items.map((item) => {
                const active = pathname === item.href;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`flex items-center px-4 py-2 w-full ${
                      active
                        ? "bg-ui-bg-subtle border-l-2 border-ui-fg-base text-ui-fg-base txt-compact-small-plus"
                        : "text-ui-fg-subtle txt-compact-small hover:bg-ui-bg-subtle-hover"
                    }`}
                  >
                    {item.title}
                  </Link>
                );
              })}
            </div>
          ))}
        </div>
      </aside>

      {/* Content */}
      <div className="flex-1 min-w-0">{children}</div>
    </div>
  );
}
