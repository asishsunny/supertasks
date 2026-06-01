"use client";

import { useState } from "react";
import { SettingsProfile } from "@/components/blocks/SettingsProfile";
import { SettingsNotifications } from "@/components/blocks/SettingsNotifications";
import { SettingsSecurity } from "@/components/blocks/SettingsSecurity";
import { SettingsBilling } from "@/components/blocks/SettingsBilling";
import { CURRENT_USER, NOTIFICATION_TOGGLES, SECURITY_TOGGLES, BILLING } from "@/lib/data";

const TABS = ["Profile", "Notifications", "Security", "Billing"];

function makeNavItems(activeIndex: number) {
  return TABS.map((label, i) => ({ label, active: i === activeIndex }));
}

function makeBillingNavItems(activeIndex: number) {
  return TABS.map((label, i) => ({
    key: label.toLowerCase(),
    label,
    active: i === activeIndex,
  }));
}

export function SettingsSection() {
  const [activeTab, setActiveTab] = useState(0);

  switch (activeTab) {
    case 0:
      return (
        <SettingsProfile
          title="Profile"
          navItems={makeNavItems(0)}
          avatarSrc={CURRENT_USER.avatar}
          userName={CURRENT_USER.name}
          avatarHint="Upload a photo (max 2MB)"
          formRows={[
            [
              { label: "Full name", defaultValue: CURRENT_USER.name },
              { label: "Email", defaultValue: CURRENT_USER.email },
            ],
            [
              { label: "Role", defaultValue: CURRENT_USER.role },
              { label: "Department", defaultValue: "Product" },
            ],
          ]}
          bioField={{ label: "Bio", placeholder: "Tell us about yourself..." }}
          submitLabel="Save changes"
        />
      );

    case 1:
      return (
        <SettingsNotifications
          tabs={TABS}
          activeTab={1}
          onTabChange={setActiveTab}
          heading="Notifications"
          toggles={NOTIFICATION_TOGGLES}
          saveLabel="Save changes"
        />
      );

    case 2:
      return (
        <SettingsSecurity
          title="Security"
          navItems={makeNavItems(2)}
          toggles={SECURITY_TOGGLES}
          submitLabel="Save changes"
        />
      );

    case 3:
      return (
        <SettingsBilling
          navItems={makeBillingNavItems(3)}
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
      );

    default:
      return null;
  }
}
