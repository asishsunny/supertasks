"use client";

import { SettingsProfile } from "@/components/blocks/SettingsProfile";
import { SettingsNotifications } from "@/components/blocks/SettingsNotifications";
import { SettingsSecurity } from "@/components/blocks/SettingsSecurity";
import { SettingsBilling } from "@/components/blocks/SettingsBilling";
import type { SettingsToggle } from "@/types";

const settings_profile_navItems = [
    { label: "Label 1", active: true },
    { label: "Label 2", active: false },
    { label: "Label 3", active: false },
  ];
const settings_profile_fieldRows = [
    { fields: [
    { label: "Label 1", value: "123 1" },
    { label: "Label 2", value: "123 2" },
    { label: "Label 3", value: "123 3" },
  ] },
    { fields: [
    { label: "Label 1", value: "123 1" },
    { label: "Label 2", value: "123 2" },
    { label: "Label 3", value: "123 3" },
  ] },
    { fields: [
    { label: "Label 1", value: "123 1" },
    { label: "Label 2", value: "123 2" },
    { label: "Label 3", value: "123 3" },
  ] },
  ];
const settings_notifications_navItems = [
    { label: "Label 1", active: true },
    { label: "Label 2", active: false },
    { label: "Label 3", active: false },
  ];
const settings_notifications_toggles = [
    { label: "Toggle one", desc: "First toggle description", on: true },
    { label: "Toggle two", desc: "Second toggle description", on: false },
    { label: "Toggle three", desc: "Third toggle description", on: true },
  ];
const settings_security_navItems = [
    { label: "Label 1", active: true },
    { label: "Label 2", active: false },
    { label: "Label 3", active: false },
  ];
const settings_security_toggles = [
    { label: "Toggle one", desc: "First toggle description", on: true },
    { label: "Toggle two", desc: "Second toggle description", on: false },
    { label: "Toggle three", desc: "Third toggle description", on: true },
  ];
const settings_billing_navItems = [
    { label: "Label 1", active: true },
    { label: "Label 2", active: false },
    { label: "Label 3", active: false },
  ];
const settings_billing_historyColumns = [
    { key: "key-1 1", header: "Header 1", className: "className 1" },
    { key: "key-1 2", header: "Header 2", className: "className 2" },
    { key: "key-1 3", header: "Header 3", className: "className 3" },
  ];
const settings_billing_historyRows = [
    { id: 1 },
    { id: 2 },
    { id: 3 },
  ];

export default function Page() {
  return (
    <div className="flex flex-col gap-12 p-6">
      <section className="flex flex-col gap-3">
        <h2 className="txt-compact-medium-plus text-ui-fg-subtle">Settings — Profile</h2>
        <SettingsProfile
          navItems={settings_profile_navItems}
          title={"Title"}
          avatarSrc={"avatarSrc"}
          avatarFallback={"AB"}
          userName={"Jane Doe"}
          avatarHint={"Click to change"}
          fieldRows={settings_profile_fieldRows}
          bioLabel={"Bio"}
          bioPlaceholder={"Write something..."}
          saveLabel={"Save"}
        />
      </section>
      <section className="flex flex-col gap-3">
        <h2 className="txt-compact-medium-plus text-ui-fg-subtle">Settings — Notifications</h2>
        <SettingsNotifications
          navItems={settings_notifications_navItems}
          title={"Title"}
          toggles={settings_notifications_toggles}
          saveLabel={"Save"}
          heading={"Heading"}
        />
      </section>
      <section className="flex flex-col gap-3">
        <h2 className="txt-compact-medium-plus text-ui-fg-subtle">Settings — Security</h2>
        <SettingsSecurity
          navItems={settings_security_navItems}
          title={"Title"}
          toggles={settings_security_toggles}
          saveLabel={"Save"}
          heading={"Heading"}
        />
      </section>
      <section className="flex flex-col gap-3">
        <h2 className="txt-compact-medium-plus text-ui-fg-subtle">Settings — Billing</h2>
        <SettingsBilling
          navItems={settings_billing_navItems}
          title={"Title"}
          plan={{ name: "Item", price: "$12/month", renewalNote: "Renews monthly", changeLabel: "Change" }}
          payment={{ label: "Label", desc: "Description text", updateLabel: "Update" }}
          historyTitle={"History"}
          historyColumns={settings_billing_historyColumns}
          historyRows={settings_billing_historyRows}
        />
      </section>
    </div>
  );
}
