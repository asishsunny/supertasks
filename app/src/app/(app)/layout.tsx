"use client";

import { useState, useEffect, useCallback, type ReactNode, type ComponentType } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useTheme } from "next-themes";
import { IconButton, Button, Toaster } from "@medusajs/ui";
import {
  ChartBar,
  ListCheckbox,
  Users,
  ChartPie,
  CogSixTooth,
  Component,
  SidebarLeft,
  Sun,
  Moon,
  PlusMini,
  EllipsisHorizontal,
  QueueList,
  GridList,
  AdjustmentsDone,
  Window,
  DocumentText,
} from "@medusajs/icons";
import { CURRENT_USER } from "@/lib/data";
import { StoreProvider } from "./store";

// ── Data ──

interface NavItem {
  title: string;
  icon: ComponentType<{ className?: string }>;
  href: string;
}

const NAV_ITEMS: NavItem[] = [
  { title: "Dashboard", icon: ChartBar, href: "/dashboard" },
  { title: "Tasks", icon: ListCheckbox, href: "/tasks" },
  { title: "Team", icon: Users, href: "/team" },
  { title: "Reports", icon: ChartPie, href: "/reports" },
];

interface GalleryGroup {
  title: string;
  items: NavItem[];
}

const GALLERY: GalleryGroup[] = [
  {
    title: "Cards",
    items: [
      { title: "StatCards", icon: Component, href: "/gallery/cards/stat-cards" },
      { title: "ChartCards", icon: ChartBar, href: "/gallery/cards/chart-cards" },
    ],
  },
  {
    title: "Controls",
    items: [
      { title: "ControlsBar", icon: AdjustmentsDone, href: "/gallery/controls/controls" },
    ],
  },
  {
    title: "Views",
    items: [
      { title: "RecentTasks", icon: QueueList, href: "/gallery/views/recent-tasks" },
      { title: "Kanban", icon: GridList, href: "/gallery/views/kanban-board" },
      { title: "Settings", icon: CogSixTooth, href: "/gallery/views/settings" },
    ],
  },
  {
    title: "Overlays",
    items: [
      { title: "CreateTaskModal", icon: Window, href: "/gallery/overlays/create-task-modal" },
      { title: "TaskDetails", icon: DocumentText, href: "/gallery/overlays/task-details-modal" },
    ],
  },
];

const NAV_EXTENSIONS: NavItem[] = [
  { title: "Settings", icon: CogSixTooth, href: "/settings" },
];

interface PageHeaderConfig {
  title: string;
  actions?: { label: string; icon?: ComponentType<{ className?: string }> }[];
}

const PAGE_HEADERS: Record<string, PageHeaderConfig> = {
  "/dashboard": { title: "Dashboard" },
  "/tasks": {
    title: "Tasks",
    actions: [{ label: "Add task", icon: PlusMini }],
  },
  "/team": {
    title: "Team",
    actions: [{ label: "Invite member", icon: PlusMini }],
  },
  "/reports": {
    title: "Reports",
    actions: [{ label: "Generate report", icon: PlusMini }],
  },
  "/settings": { title: "Settings" },
};

// ── Dot Divider ──

function DotDivider() {
  return (
    <div className="flex items-center justify-center gap-[3px] overflow-hidden px-3 w-full">
      {Array.from({ length: 54 }).map((_, i) => (
        <div key={i} className="w-px h-px bg-ui-border-strong shrink-0" />
      ))}
    </div>
  );
}

// ── Sidebar ──

function Sidebar({ collapsed, onToggle }: { collapsed: boolean; onToggle: () => void }) {
  const pathname = usePathname();

  return (
    <aside
      aria-label="Main navigation"
      className="flex h-full shrink-0 overflow-hidden transition-[width] motion-safe:duration-200 motion-reduce:duration-0"
      style={{ width: collapsed ? 52 : 240 }}
    >
      <div className="flex flex-col flex-1 min-w-0 bg-ui-bg-subtle">
        {/* Header */}
        <div className={`shrink-0 ${collapsed ? "flex justify-center p-3" : "p-3"}`}>
          <button
            aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
            className={`flex items-center rounded-md cursor-pointer focus-visible:shadow-borders-focus outline-none ${
              collapsed ? "justify-center w-7 h-7" : "gap-3 pl-0.5 pr-2 py-0.5"
            }`}
            onClick={onToggle}
          >
            <div className="w-6 h-6 rounded-md bg-ui-bg-base shadow-elevation-card-rest overflow-hidden shrink-0">
              <Image src="/logo.svg" alt="SuperTasks" width={24} height={24} />
            </div>
            {!collapsed && (
              <>
                <span className="flex-1 min-w-0 txt-compact-small-plus text-ui-fg-base whitespace-nowrap">
                  SuperTasks
                </span>
                <EllipsisHorizontal className="w-[15px] h-[15px] shrink-0 text-ui-fg-subtle" />
              </>
            )}
          </button>
        </div>

        {/* Divider */}
        {!collapsed ? <DotDivider /> : <div className="h-px bg-ui-border-base mx-2" />}

        {/* Menu */}
        <nav className={`flex flex-col shrink-0 ${collapsed ? "items-center gap-1 px-[10px] pt-8 pb-2" : "px-3 pt-8 pb-3"}`}>
          {NAV_ITEMS.map((item) => {
            const active = pathname.startsWith(item.href);
            const Icon = item.icon;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center rounded-md transition-colors outline-none focus-visible:shadow-borders-focus ${
                  collapsed
                    ? "justify-center w-7 h-7"
                    : "gap-3 h-9 px-2 py-1 txt-compact-small-plus"
                } ${
                  active
                    ? "bg-ui-bg-subtle-pressed text-ui-fg-base"
                    : "text-ui-fg-subtle hover:bg-ui-bg-subtle-hover"
                }`}
              >
                <Icon className="w-[15px] h-[15px] shrink-0" />
                {!collapsed && <span className="flex-1 min-w-0 whitespace-nowrap">{item.title}</span>}
              </Link>
            );
          })}
        </nav>

        {/* Gallery (dev — delete before ship) */}
        {!collapsed && (
          <div className="flex flex-col shrink-0 px-3 pt-2">
            <DotDivider />
            <div className="overflow-y-auto max-h-[50vh] pt-4">
              {GALLERY.map((group) => (
                <div key={group.title} className="mb-3">
                  <p className="txt-compact-xsmall-plus text-ui-fg-muted px-2 pb-1">{group.title}</p>
                  {group.items.map((item) => {
                    const active = pathname.startsWith(item.href);
                    const Icon = item.icon;
                    return (
                      <Link
                        key={item.href}
                        href={item.href}
                        className={`flex items-center gap-3 h-8 px-2 py-1 rounded-md txt-compact-small transition-colors outline-none focus-visible:shadow-borders-focus ${
                          active
                            ? "bg-ui-bg-subtle-pressed text-ui-fg-base"
                            : "text-ui-fg-subtle hover:bg-ui-bg-subtle-hover"
                        }`}
                      >
                        <Icon className="w-[15px] h-[15px] shrink-0" />
                        <span className="flex-1 min-w-0 whitespace-nowrap">{item.title}</span>
                      </Link>
                    );
                  })}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Spacer */}
        <div className="flex-1" />

        {/* Extensions */}
        <nav className={`flex flex-col gap-0.5 shrink-0 ${collapsed ? "items-center px-[10px] py-2" : "p-3"}`}>
          {NAV_EXTENSIONS.map((item) => {
            const active = pathname.startsWith(item.href);
            const Icon = item.icon;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center rounded-md transition-colors outline-none focus-visible:shadow-borders-focus ${
                  collapsed
                    ? "justify-center w-7 h-7"
                    : "gap-3 h-9 px-2 py-1 txt-compact-small-plus"
                } ${
                  active
                    ? "bg-ui-bg-subtle-pressed text-ui-fg-base"
                    : "text-ui-fg-subtle hover:bg-ui-bg-subtle-hover"
                }`}
              >
                <Icon className="w-[15px] h-[15px] shrink-0" />
                {!collapsed && <span className="flex-1 min-w-0 whitespace-nowrap">{item.title}</span>}
              </Link>
            );
          })}
        </nav>
      </div>

      {/* 1px vertical divider */}
      <div className="w-px bg-ui-border-base shrink-0" />
    </aside>
  );
}

// ── Topbar ──

function Topbar({ onToggleSidebar }: { onToggleSidebar: () => void }) {
  const pathname = usePathname();
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const segment = pathname.split("/").filter(Boolean)[0] || "dashboard";
  const label = segment.charAt(0).toUpperCase() + segment.slice(1);

  return (
    <div className="flex flex-col bg-ui-bg-subtle shrink-0">
      <div className="flex items-center gap-3 py-3 pl-1 pr-10">
        <div className="flex flex-1 items-center gap-2 min-w-0">
          <IconButton variant="transparent" size="small" onClick={onToggleSidebar} aria-label="Toggle sidebar">
            <SidebarLeft className="text-ui-fg-muted" />
          </IconButton>
          <span className="txt-compact-xsmall-plus text-ui-fg-subtle whitespace-nowrap">{label}</span>
        </div>

        <div className="flex flex-1 items-center justify-end gap-3 min-w-0">
          <div className="flex items-center gap-1">
            {mounted && (
              <IconButton
                variant="transparent"
                size="small"
                onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
                aria-label={resolvedTheme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
              >
                {resolvedTheme === "dark" ? <Sun className="text-ui-fg-muted" /> : <Moon className="text-ui-fg-muted" />}
              </IconButton>
            )}
          </div>

          <div className="flex items-center gap-2 h-7 bg-ui-bg-field pl-1 pr-2.5 rounded-full shadow-elevation-card-rest">
            <div className="w-5 h-5 rounded-full overflow-hidden bg-ui-bg-base shadow-elevation-card-rest">
              <Image
                src={CURRENT_USER.avatar}
                alt={CURRENT_USER.name}
                width={20}
                height={20}
                className="rounded-full object-cover"
              />
            </div>
            <span className="txt-compact-xsmall-plus text-ui-fg-subtle whitespace-nowrap">
              {CURRENT_USER.name}
            </span>
          </div>
        </div>
      </div>

      <div className="h-px bg-ui-border-base" />
    </div>
  );
}

// ── PageHeader ──

function PageHeader() {
  const pathname = usePathname();
  const config = PAGE_HEADERS[pathname];

  if (!config) return null;

  return (
    <div className="flex items-center justify-between pt-8 px-8 pb-4">
      <h1 className="text-2xl leading-8 font-normal text-ui-fg-base">{config.title}</h1>
      {config.actions && (
        <div className="flex items-center gap-2">
          {config.actions.map((action) => (
            <Button key={action.label} variant="primary" size="small">
              {action.icon && <action.icon className="w-4 h-4" />}
              {action.label}
            </Button>
          ))}
        </div>
      )}
    </div>
  );
}

// ── AppLayout ──

export default function AppLayout({ children }: { children: ReactNode }) {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const closeMobile = useCallback(() => setMobileOpen(false), []);

  useEffect(() => {
    if (!mobileOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeMobile();
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [mobileOpen, closeMobile]);

  return (
    <StoreProvider>
      <div className="flex h-screen bg-ui-bg-subtle">
        <div className="hidden lg:flex">
          <Sidebar collapsed={collapsed} onToggle={() => setCollapsed(!collapsed)} />
        </div>

        {mobileOpen && (
          <div className="fixed inset-0 z-50 lg:hidden">
            <div
              className="absolute inset-0 bg-ui-bg-overlay"
              onClick={() => setMobileOpen(false)}
              aria-hidden="true"
            />
            <div className="relative h-full w-[240px] shadow-elevation-modal">
              <Sidebar collapsed={false} onToggle={() => setMobileOpen(false)} />
            </div>
          </div>
        )}

        <div className="flex flex-col flex-1 min-w-0">
          <Topbar
            onToggleSidebar={() => {
              if (window.innerWidth < 1024) {
                setMobileOpen(!mobileOpen);
              } else {
                setCollapsed(!collapsed);
              }
            }}
          />
          <main className="flex-1 overflow-auto" aria-label="Page content">
            <PageHeader />
            <div className="px-8 pb-4 flex flex-col gap-4">
              {children}
            </div>
          </main>
        </div>
      </div>
      <Toaster />
    </StoreProvider>
  );
}
