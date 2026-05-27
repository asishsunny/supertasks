"use client";

import { Button, Heading, Input, Label, Switch, Table } from "@medusajs/ui";
import { BILLING, CURRENT_USER, NOTIFICATION_TOGGLES, SECURITY_TOGGLES } from "@/lib/data";
import { useState } from "react";

export default function SettingsPage() {
  const user = CURRENT_USER;

  const [activeTab, setActiveTab] = useState("profile");

  return (
    <div className="flex flex-col gap-4">
      <div className="flex gap-6">
        {/* Left nav */}
        <div className="w-[240px] shrink-0 self-start bg-ui-bg-base rounded-lg shadow-elevation-card-rest overflow-clip py-2">
          <button
                key="profile"
                onClick={() => setActiveTab("profile")}
                className={`flex items-center w-full px-4 py-2.5 text-left transition-colors ${
                  activeTab === "profile"
                    ? "bg-ui-bg-subtle border-l-2 border-ui-fg-base txt-compact-small-plus text-ui-fg-base"
                    : "txt-compact-small text-ui-fg-subtle hover:bg-ui-bg-subtle-hover"
                }`}
              >
                Profile
              </button>
              <button
                key="notifications"
                onClick={() => setActiveTab("notifications")}
                className={`flex items-center w-full px-4 py-2.5 text-left transition-colors ${
                  activeTab === "notifications"
                    ? "bg-ui-bg-subtle border-l-2 border-ui-fg-base txt-compact-small-plus text-ui-fg-base"
                    : "txt-compact-small text-ui-fg-subtle hover:bg-ui-bg-subtle-hover"
                }`}
              >
                Notifications
              </button>
              <button
                key="security"
                onClick={() => setActiveTab("security")}
                className={`flex items-center w-full px-4 py-2.5 text-left transition-colors ${
                  activeTab === "security"
                    ? "bg-ui-bg-subtle border-l-2 border-ui-fg-base txt-compact-small-plus text-ui-fg-base"
                    : "txt-compact-small text-ui-fg-subtle hover:bg-ui-bg-subtle-hover"
                }`}
              >
                Security
              </button>
              <button
                key="billing"
                onClick={() => setActiveTab("billing")}
                className={`flex items-center w-full px-4 py-2.5 text-left transition-colors ${
                  activeTab === "billing"
                    ? "bg-ui-bg-subtle border-l-2 border-ui-fg-base txt-compact-small-plus text-ui-fg-base"
                    : "txt-compact-small text-ui-fg-subtle hover:bg-ui-bg-subtle-hover"
                }`}
              >
                Billing
              </button>
        </div>

        {/* Right content card */}
        <div className="flex-1 min-w-0 bg-ui-bg-base rounded-lg shadow-elevation-card-rest overflow-clip">
          <div className="px-6 py-3 border-b border-ui-border-base">
            <h3 className="txt-compact-medium-plus text-ui-fg-base">
              {{"profile":"Profile","notifications":"Notifications","security":"Security","billing":"Billing"}[activeTab]}
            </h3>
          </div>
          <div className="p-6 flex flex-col gap-5">
            {activeTab === "profile" && (
              <>
              <div className="flex items-center gap-3">
                <div className="size-16 rounded-full bg-ui-bg-subtle overflow-clip shadow-elevation-card-rest">
                  <img src={user.avatar} alt={user.name} className="size-full object-cover" />
                </div>
                <div className="flex flex-col gap-0.5">
                  <span className="txt-compact-medium-plus text-ui-fg-base">{user.name}</span>
                  <span className="txt-compact-small text-ui-fg-subtle">Click to change photo</span>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-x-4 gap-5">
                <div className="flex flex-col gap-1.5">
                  <Label size="small">Full name</Label>
                  <Input size="small" defaultValue={user.name} />
                </div>
                <div className="flex flex-col gap-1.5">
                  <Label size="small">Email</Label>
                  <Input size="small" defaultValue={user.email} />
                </div>
                <div className="flex flex-col gap-1.5">
                  <Label size="small">Job title</Label>
                  <Input size="small" defaultValue={user.role} />
                </div>
                <div className="flex flex-col gap-1.5">
                  <Label size="small">Phone</Label>
                  <Input size="small" defaultValue="+1 (555) 000-0000" />
                </div>
                <div className="flex flex-col gap-1.5">
                  <Label size="small">Location</Label>
                  <Input size="small" defaultValue="San Francisco, CA" />
                </div>
                <div className="flex flex-col gap-1.5">
                  <Label size="small">Time zone</Label>
                  <Input size="small" defaultValue="Pacific Time (UTC-8)" />
                </div>
              </div>
              <div className="flex justify-end">
                <Button size="small">Save changes</Button>
              </div>
            </>
            )}
            {activeTab === "notifications" && (
              <>
              {NOTIFICATION_TOGGLES.map((t, i) => (
                <div key={t.label}>
                  <div className="flex items-center justify-between py-2">
                    <div className="flex flex-col gap-1">
                      <span className="txt-compact-small-plus text-ui-fg-base">{t.label}</span>
                      <span className="txt-compact-small text-ui-fg-subtle">{t.desc}</span>
                    </div>
                    <Switch defaultChecked={t.on} />
                  </div>
                  {i < NOTIFICATION_TOGGLES.length - 1 && <div className="border-t border-ui-border-base" />}
                </div>
              ))}
              <div className="flex justify-end pt-2">
                <Button size="small">Save changes</Button>
              </div>
            </>
            )}
            {activeTab === "security" && (
              <>
              {SECURITY_TOGGLES.map((t, i) => (
                <div key={t.label}>
                  <div className="flex items-center justify-between py-2">
                    <div className="flex flex-col gap-1">
                      <span className="txt-compact-small-plus text-ui-fg-base">{t.label}</span>
                      <span className="txt-compact-small text-ui-fg-subtle">{t.desc}</span>
                    </div>
                    <Switch defaultChecked={t.on} />
                  </div>
                  {i < SECURITY_TOGGLES.length - 1 && <div className="border-t border-ui-border-base" />}
                </div>
              ))}
              <div className="flex justify-end pt-2">
                <Button size="small">Save changes</Button>
              </div>
            </>
            )}
            {activeTab === "billing" && (
              <>
              <div className="bg-ui-bg-base rounded-lg shadow-elevation-card-rest p-5 flex flex-col gap-1">
                <div className="flex items-center justify-between">
                  <span className="txt-compact-small-plus text-ui-fg-base">{BILLING.plan.name}</span>
                  <Button variant="secondary" size="small">{BILLING.plan.action}</Button>
                </div>
                <span className="text-2xl font-normal text-ui-fg-base">{BILLING.plan.price}</span>
                <span className="txt-compact-small text-ui-fg-subtle">{BILLING.plan.renews}</span>
              </div>
              <div className="flex items-center justify-between py-2">
                <div className="flex flex-col gap-1">
                  <span className="txt-compact-small-plus text-ui-fg-base">{BILLING.payment.label}</span>
                  <span className="txt-compact-small text-ui-fg-subtle">{BILLING.payment.value}</span>
                </div>
                <Button variant="secondary" size="small">{BILLING.payment.action}</Button>
              </div>
              <div className="bg-ui-bg-base rounded-xl shadow-elevation-card-rest overflow-clip">
                <div className="px-6 pt-6 pb-4">
                  <span className="txt-compact-medium-plus text-ui-fg-base">Billing history</span>
                </div>
                <Table>
                  <Table.Header className="border-t-0">
                    <Table.Row>
                      <Table.HeaderCell>Date</Table.HeaderCell>
                      <Table.HeaderCell>Description</Table.HeaderCell>
                      <Table.HeaderCell className="w-[120px]">Amount</Table.HeaderCell>
                    </Table.Row>
                  </Table.Header>
                  <Table.Body>
                    {BILLING.history.map((h) => (
                      <Table.Row key={h.date}>
                        <Table.Cell><span className="txt-compact-small text-ui-fg-subtle">{h.date}</span></Table.Cell>
                        <Table.Cell><span className="txt-compact-small text-ui-fg-base">{h.desc}</span></Table.Cell>
                        <Table.Cell className="w-[120px]"><span className="txt-compact-small text-ui-fg-subtle">{h.amount}</span></Table.Cell>
                      </Table.Row>
                    ))}
                  </Table.Body>
                </Table>
              </div>
            </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
