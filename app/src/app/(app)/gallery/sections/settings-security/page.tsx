"use client";
import { SettingsSecurity } from "@/components/blocks/SettingsSecurity";
import { SECURITY_TOGGLES } from "@/lib/data";

const NAV_ITEMS = [
  { label: "Profile" },
  { label: "Notifications" },
  { label: "Security", active: true },
  { label: "Billing" },
];

export default function Page() {
  return (
    <SettingsSecurity
      title="Security"
      navItems={NAV_ITEMS}
      toggles={SECURITY_TOGGLES}
      submitLabel="Save changes"
    />
  );
}
