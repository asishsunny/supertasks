"use client";

import { useState } from "react";
import { SettingsProfile } from "@/components/blocks/SettingsProfile";
import { SettingsNotifications } from "@/components/blocks/SettingsNotifications";
import { SettingsSecurity } from "@/components/blocks/SettingsSecurity";
import { SettingsBilling } from "@/components/blocks/SettingsBilling";
import { CURRENT_USER, NOTIFICATION_TOGGLES, SECURITY_TOGGLES, BILLING } from "@/lib/data";
import type { BillingHistoryRow } from "@/components/blocks/SettingsBilling";

const TABS = ["Profile", "Notifications", "Security", "Billing"];

const HISTORY_COLUMNS: { key: keyof BillingHistoryRow; header: string; className?: string }[] = [
  { key: "date", header: "Date", className: "w-[140px]" },
  { key: "description", header: "Description" },
  { key: "amount", header: "Amount", className: "w-[100px]" },
];

export function SettingsSection() {
  const [activeTab, setActiveTab] = useState(0);

  const sharedTabProps = {
    tabs: TABS,
    activeTab,
    onTabChange: setActiveTab,
  };

  switch (activeTab) {
    case 0:
      return (
        <SettingsProfile
          {...sharedTabProps}
          name={CURRENT_USER.name}
          avatar={CURRENT_USER.avatar}
          initials={CURRENT_USER.initials}
          photoHint="Upload a photo (max 2MB)"
          fieldRows={[
            [
              { label: "Full name", value: CURRENT_USER.name },
              { label: "Email", value: CURRENT_USER.email },
            ],
            [
              { label: "Role", value: CURRENT_USER.role },
              { label: "Department", value: "Product" },
            ],
          ]}
          bioLabel="Bio"
          bioPlaceholder="Tell us about yourself..."
          saveLabel="Save changes"
        />
      );

    case 1:
      return (
        <SettingsNotifications
          {...sharedTabProps}
          heading="Notifications"
          toggles={NOTIFICATION_TOGGLES}
          saveLabel="Save changes"
        />
      );

    case 2:
      return (
        <SettingsSecurity
          {...sharedTabProps}
          heading="Security"
          toggles={SECURITY_TOGGLES}
          saveLabel="Save changes"
        />
      );

    case 3:
      return (
        <SettingsBilling
          {...sharedTabProps}
          heading="Billing"
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
          historyHeading="Billing history"
          historyColumns={HISTORY_COLUMNS}
          historyRows={BILLING.history.map((h) => ({
            date: h.date,
            description: h.desc,
            amount: h.amount,
          }))}
        />
      );

    default:
      return null;
  }
}
