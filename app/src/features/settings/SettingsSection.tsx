"use client";

import { useState } from "react";
import { Avatar, Button, Input, Label, Switch, Textarea } from "@medusajs/ui";
import { ViewBoundary } from "@/components/shared/ViewBoundary";
import { CURRENT_USER, NOTIFICATION_TOGGLES, SECURITY_TOGGLES, BILLING } from "@/lib/data";
import { TableView, type Column } from "@/components/views/TableView";

const TABS = ["Profile", "Notifications", "Security", "Billing"] as const;
type Tab = typeof TABS[number];

function ProfileTab() {
  return (
    <div className="flex flex-col gap-5 p-6">
      <div className="flex gap-3 items-center">
        <Avatar src={CURRENT_USER.avatar} fallback={CURRENT_USER.initials} size="xlarge" />
        <div>
          <p className="font-medium text-sm text-ui-fg-base">{CURRENT_USER.name}</p>
          <p className="txt-compact-small text-ui-fg-subtle">Click to change photo</p>
        </div>
      </div>
      <div className="flex gap-4">
        <div className="flex flex-1 flex-col gap-1.5 min-w-0"><Label>Full name</Label><Input size="small" defaultValue={CURRENT_USER.name} /></div>
        <div className="flex flex-1 flex-col gap-1.5 min-w-0"><Label>Email</Label><Input size="small" defaultValue={CURRENT_USER.email} /></div>
      </div>
      <div className="flex gap-4">
        <div className="flex flex-1 flex-col gap-1.5 min-w-0"><Label>Job title</Label><Input size="small" defaultValue={CURRENT_USER.role} /></div>
        <div className="flex flex-1 flex-col gap-1.5 min-w-0"><Label>Phone</Label><Input size="small" defaultValue="+1 (555) 000-0000" /></div>
      </div>
      <div className="flex gap-4">
        <div className="flex flex-1 flex-col gap-1.5 min-w-0"><Label>Location</Label><Input size="small" defaultValue="San Francisco, CA" /></div>
        <div className="flex flex-1 flex-col gap-1.5 min-w-0"><Label>Time zone</Label><Input size="small" defaultValue="Pacific Time (UTC-8)" /></div>
      </div>
      <div className="flex flex-col gap-1.5"><Label>Bio</Label><Textarea placeholder="Write a short bio..." /></div>
      <div className="flex justify-end"><Button variant="primary" size="small">Save changes</Button></div>
    </div>
  );
}

function TogglesTab({ toggles }: { toggles: { label: string; desc: string; on: boolean }[] }) {
  return (
    <div className="flex flex-col p-6">
      {toggles.map((t) => (
        <div key={t.label} className="flex items-center justify-between py-4 border-b border-ui-border-base last:border-0">
          <div>
            <p className="txt-compact-small-plus text-ui-fg-base">{t.label}</p>
            <p className="txt-compact-small text-ui-fg-subtle">{t.desc}</p>
          </div>
          <Switch defaultChecked={t.on} />
        </div>
      ))}
    </div>
  );
}

function BillingTab() {
  const historyColumns: Column<typeof BILLING.history[number]>[] = [
    { header: "Date", width: "w-[120px]", render: (h) => <span className="txt-compact-small">{h.date}</span> },
    { header: "Description", render: (h) => <span className="txt-compact-small">{h.desc}</span> },
    { header: "Amount", width: "w-[100px]", render: (h) => <span className="txt-compact-small">{h.amount}</span> },
  ];

  return (
    <div className="flex flex-col gap-6 p-6">
      <div className="bg-ui-bg-subtle rounded-lg p-4 flex items-center justify-between">
        <div>
          <p className="txt-compact-small-plus text-ui-fg-base">{BILLING.plan.name}</p>
          <p className="txt-compact-small text-ui-fg-subtle">{BILLING.plan.price} · {BILLING.plan.renews}</p>
        </div>
        <Button variant="secondary" size="small">{BILLING.plan.action}</Button>
      </div>
      <div className="bg-ui-bg-subtle rounded-lg p-4 flex items-center justify-between">
        <div>
          <p className="txt-compact-small-plus text-ui-fg-base">{BILLING.payment.label}</p>
          <p className="txt-compact-small text-ui-fg-subtle">{BILLING.payment.value}</p>
        </div>
        <Button variant="secondary" size="small">{BILLING.payment.action}</Button>
      </div>
      <div>
        <p className="txt-compact-small-plus text-ui-fg-base mb-3">Billing history</p>
        <div className="bg-ui-bg-subtle rounded-lg overflow-clip">
          <TableView data={BILLING.history} columns={historyColumns} keyFn={(h) => h.date} />
        </div>
      </div>
    </div>
  );
}

export function SettingsSection() {
  const [tab, setTab] = useState<Tab>("Profile");

  return (
    <div className="flex gap-6 w-full">
      <div className="bg-ui-bg-base flex flex-col overflow-clip py-2 rounded-lg shadow-elevation-card-rest shrink-0 w-[200px] self-start">
        {TABS.map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`flex items-center px-4 py-2.5 w-full text-left transition-colors cursor-pointer ${
              tab === t
                ? "bg-ui-bg-subtle border-l-2 border-ui-fg-base txt-compact-small-plus text-ui-fg-base"
                : "txt-compact-small text-ui-fg-subtle hover:bg-ui-bg-subtle-hover"
            }`}
          >
            {t}
          </button>
        ))}
      </div>
      <div className="bg-ui-bg-base flex flex-1 flex-col min-w-0 overflow-clip rounded-lg shadow-elevation-card-rest">
        <div className="px-6 py-3 border-b border-ui-border-base">
          <p className="font-medium text-sm text-ui-fg-base">{tab}</p>
        </div>
        <ViewBoundary>
          {tab === "Profile" && <ProfileTab />}
          {tab === "Notifications" && <TogglesTab toggles={NOTIFICATION_TOGGLES} />}
          {tab === "Security" && <TogglesTab toggles={SECURITY_TOGGLES} />}
          {tab === "Billing" && <BillingTab />}
        </ViewBoundary>
      </div>
    </div>
  );
}
