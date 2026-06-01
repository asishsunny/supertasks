"use client";

import { SettingsProfile } from "@/components/blocks/SettingsProfile";
import { SettingsNotifications } from "@/components/blocks/SettingsNotifications";
import { SettingsSecurity } from "@/components/blocks/SettingsSecurity";
import { SettingsBilling } from "@/components/blocks/SettingsBilling";
import { CURRENT_USER, NOTIFICATION_TOGGLES, SECURITY_TOGGLES, BILLING } from "@/lib/data";

const TABS = ["Profile", "Notifications", "Security", "Billing"];

const PROFILE_NAV = [
  { label: "Profile", active: true },
  { label: "Notifications" },
  { label: "Security" },
  { label: "Billing" },
];

const NOTIFICATIONS_NAV = [
  { label: "Profile" },
  { label: "Notifications", active: true },
  { label: "Security" },
  { label: "Billing" },
];

const SECURITY_NAV = [
  { label: "Profile" },
  { label: "Notifications" },
  { label: "Security", active: true },
  { label: "Billing" },
];

const BILLING_NAV = [
  { key: "profile", label: "Profile" },
  { key: "notifications", label: "Notifications" },
  { key: "security", label: "Security" },
  { key: "billing", label: "Billing", active: true },
];

const FORM_ROWS = [
  [{ label: "Full name", defaultValue: CURRENT_USER.name }, { label: "Email", defaultValue: CURRENT_USER.email }],
  [{ label: "Job title", defaultValue: CURRENT_USER.role }, { label: "Phone", defaultValue: "+1 (555) 000-0000" }],
  [{ label: "Location", defaultValue: "San Francisco, CA" }, { label: "Time zone", defaultValue: "Pacific Time (UTC-8)" }],
];

function Section({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <p className="text-ui-fg-subtle txt-compact-small mb-2">{label}</p>
      {children}
    </div>
  );
}

export default function Page() {
  return (
    <div className="flex flex-col gap-8">
      <Section label="Profile">
        <SettingsProfile
          title="Profile"
          navItems={PROFILE_NAV}
          avatarSrc={CURRENT_USER.avatar}
          userName={CURRENT_USER.name}
          avatarHint="Click to change photo"
          formRows={FORM_ROWS}
          bioField={{ label: "Bio", placeholder: "Write something about yourself..." }}
          submitLabel="Save changes"
        />
      </Section>
      <Section label="Notifications">
        <SettingsNotifications
          tabs={TABS}
          activeTab={1}
          onTabChange={() => {}}
          heading="Notifications"
          toggles={NOTIFICATION_TOGGLES}
          saveLabel="Save changes"
        />
      </Section>
      <Section label="Security">
        <SettingsSecurity
          title="Security"
          navItems={SECURITY_NAV}
          toggles={SECURITY_TOGGLES}
          submitLabel="Save changes"
        />
      </Section>
      <Section label="Billing">
        <SettingsBilling
          navItems={BILLING_NAV}
          plan={{
            name: BILLING.plan.name,
            price: BILLING.plan.price,
            renewDate: BILLING.plan.renews,
            changePlanLabel: BILLING.plan.action,
          }}
          payment={{
            label: BILLING.payment.label,
            detail: BILLING.payment.value,
            updateLabel: BILLING.payment.action,
          }}
          historyTitle="Billing history"
          historyColumns={{ date: "Date", description: "Description", amount: "Amount" }}
          invoices={BILLING.history.map((h) => ({
            date: h.date,
            description: h.desc,
            amount: h.amount,
          }))}
        />
      </Section>
    </div>
  );
}
