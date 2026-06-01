"use client";

import { SettingsProfile } from "@/components/blocks/SettingsProfile";
import { SettingsNotifications } from "@/components/blocks/SettingsNotifications";
import { SettingsSecurity } from "@/components/blocks/SettingsSecurity";
import { SettingsBilling } from "@/components/blocks/SettingsBilling";
import {
  CURRENT_USER,
  NOTIFICATION_TOGGLES,
  SECURITY_TOGGLES,
  BILLING,
} from "@/lib/data";

const settingsNavItems = [
  { label: "Profile", active: true },
  { label: "Notifications" },
  { label: "Security" },
  { label: "Billing" },
];

const profileFieldRows = [
  { fields: [{ label: "First name", value: "Ludvig" }, { label: "Last name", value: "Rask" }] },
  { fields: [{ label: "Email", value: CURRENT_USER.email }, { label: "Role", value: CURRENT_USER.role }] },
];

const securityTabs = ["Profile", "Notifications", "Security", "Billing"];

const billingNavItems = [
  { label: "Profile" },
  { label: "Notifications" },
  { label: "Security" },
  { label: "Billing", active: true },
];

const billingHistoryColumns = [
  { key: "date", header: "Date", className: "w-[140px]" },
  { key: "desc", header: "Description" },
  { key: "amount", header: "Amount", className: "w-[100px]" },
];

const billingHistoryRows = BILLING.history.map((h, i) => ({
  id: i + 1,
  date: h.date,
  desc: h.desc,
  amount: h.amount,
}));

export default function SettingsGallery() {
  return (
    <div className="flex flex-col gap-12">
      {/* Profile */}
      <div className="flex flex-col gap-2">
        <h2 className="text-ui-fg-base txt-compact-medium-plus">Profile</h2>
        <SettingsProfile
          navItems={settingsNavItems}
          title="Profile"
          avatarSrc={CURRENT_USER.avatar}
          avatarFallback={CURRENT_USER.initials}
          userName={CURRENT_USER.name}
          avatarHint="JPG, GIF or PNG. 1MB max."
          fieldRows={profileFieldRows}
          bioLabel="Bio"
          bioPlaceholder="Write a short bio..."
          saveLabel="Save changes"
        />
      </div>

      {/* Notifications */}
      <div className="flex flex-col gap-2">
        <h2 className="text-ui-fg-base txt-compact-medium-plus">Notifications</h2>
        <SettingsNotifications
          title="Notifications"
          toggles={NOTIFICATION_TOGGLES}
          saveLabel="Save changes"
        />
      </div>

      {/* Security */}
      <div className="flex flex-col gap-2">
        <h2 className="text-ui-fg-base txt-compact-medium-plus">Security</h2>
        <SettingsSecurity
          tabs={securityTabs}
          activeTab={2}
          heading="Security"
          toggles={SECURITY_TOGGLES}
          saveLabel="Save changes"
        />
      </div>

      {/* Billing */}
      <div className="flex flex-col gap-2">
        <h2 className="text-ui-fg-base txt-compact-medium-plus">Billing</h2>
        <SettingsBilling
          navItems={billingNavItems}
          title="Billing"
          plan={{
            name: BILLING.plan.name,
            price: BILLING.plan.price,
            renewalNote: BILLING.plan.renews,
            changeLabel: BILLING.plan.action,
          }}
          payment={{
            label: BILLING.payment.label,
            desc: BILLING.payment.value,
            updateLabel: BILLING.payment.action,
          }}
          historyTitle="Billing history"
          historyColumns={billingHistoryColumns}
          historyRows={billingHistoryRows}
        />
      </div>
    </div>
  );
}
