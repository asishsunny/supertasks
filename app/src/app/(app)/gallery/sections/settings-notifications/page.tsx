"use client";
import { SettingsNotifications } from "@/components/blocks/SettingsNotifications";
import { NOTIFICATION_TOGGLES } from "@/lib/data";

const TABS = ["Profile", "Notifications", "Security", "Billing"];

export default function Page() {
  return (
    <SettingsNotifications
      tabs={TABS}
      activeTab={1}
      onTabChange={() => {}}
      heading="Notifications"
      toggles={NOTIFICATION_TOGGLES}
      saveLabel="Save changes"
    />
  );
}
