"use client";
import { SettingsSecurity } from "@/components/blocks/SettingsSecurity";
import { SECURITY_TOGGLES } from "@/lib/data";

const TABS = ["Profile", "Notifications", "Security", "Billing"];

export default function Page() {
  return (
    <SettingsSecurity
      tabs={TABS}
      activeTab={2}
      heading="Security"
      toggles={SECURITY_TOGGLES}
      saveLabel="Save changes"
    />
  );
}
