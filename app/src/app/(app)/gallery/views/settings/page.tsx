"use client";

import { SettingsProfile } from "@/components/blocks/SettingsProfile";
import { SettingsNotifications } from "@/components/blocks/SettingsNotifications";
import { SettingsSecurity } from "@/components/blocks/SettingsSecurity";
import { SettingsBilling } from "@/components/blocks/SettingsBilling";
import { CURRENT_USER, NOTIFICATION_TOGGLES, SECURITY_TOGGLES, BILLING } from "@/lib/data";

const TABS = ["Profile", "Notifications", "Security", "Billing"];
const FIELD_ROWS: [{ label: string; value: string }, { label: string; value: string }][] = [
  [{ label: "Full name", value: CURRENT_USER.name }, { label: "Email", value: CURRENT_USER.email }],
  [{ label: "Job title", value: CURRENT_USER.role }, { label: "Phone", value: "+1 (555) 000-0000" }],
  [{ label: "Location", value: "San Francisco, CA" }, { label: "Time zone", value: "Pacific Time (UTC-8)" }],
];

const HISTORY_COLUMNS = [
  { header: "Date", width: "flex-1" },
  { header: "Description", width: "flex-1" },
  { header: "Amount", width: "w-[120px]" },
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
        <SettingsProfile name={CURRENT_USER.name} initials={CURRENT_USER.initials} avatar={CURRENT_USER.avatar} photoHint="Click to change photo" tabs={TABS} activeTab={0} fieldRows={FIELD_ROWS} bioLabel="Bio" bioPlaceholder="Write something about yourself..." saveLabel="Save changes" />
      </Section>
      <Section label="Notifications">
        <SettingsNotifications tabs={TABS} activeTab={1} heading="Notifications" toggles={NOTIFICATION_TOGGLES} saveLabel="Save changes" />
      </Section>
      <Section label="Security">
        <SettingsSecurity tabs={TABS} activeTab={2} heading="Security" toggles={SECURITY_TOGGLES} saveLabel="Save changes" />
      </Section>
      <Section label="Billing">
        <SettingsBilling tabs={TABS} activeTab={3} heading="Billing" plan={{ name: BILLING.plan.name, price: BILLING.plan.price, renews: BILLING.plan.renews, action: BILLING.plan.action }} payment={{ label: BILLING.payment.label, value: BILLING.payment.value, action: BILLING.payment.action }} historyHeading="Billing history" historyColumns={HISTORY_COLUMNS} historyRows={BILLING.history.map(h => ({ date: h.date, desc: h.desc, amount: h.amount }))} />
      </Section>
    </div>
  );
}
