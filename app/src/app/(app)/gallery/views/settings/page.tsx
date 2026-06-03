"use client";

import { useState } from "react";
import { SettingsProfile } from "@/components/blocks/SettingsProfile";
import { SettingsNotifications } from "@/components/blocks/SettingsNotifications";
import { SettingsSecurity } from "@/components/blocks/SettingsSecurity";
import { SettingsBilling } from "@/components/blocks/SettingsBilling";
import { SETTINGS_TABS } from "@/lib/gallery";
import {
  CURRENT_USER,
  NOTIFICATION_TOGGLES,
  SECURITY_TOGGLES,
  BILLING,
} from "@/lib/data";

type Tab = (typeof SETTINGS_TABS)[number];

function makeSidebar(active: Tab) {
  return SETTINGS_TABS.map((t) => ({ label: t, active: t === active }));
}

const profileUser = {
  initials: CURRENT_USER.initials,
  avatarBg: "tag-neutral-bg" as const,
  avatarText: "tag-neutral-text" as const,
};

const profileFormRows = [
  [
    { label: "Full name", defaultValue: CURRENT_USER.name },
    { label: "Email", defaultValue: CURRENT_USER.email },
  ],
  [
    { label: "Role", defaultValue: CURRENT_USER.role },
  ],
];

export default function Page() {
  const [tab, setTab] = useState<Tab>("Profile");

  return (
    <div className="flex flex-col gap-8 p-6">
      <h2 className="txt-compact-medium-plus text-ui-fg-subtle">Settings</h2>

      <div className="flex gap-2 mb-2">
        {SETTINGS_TABS.map((t) => (
          <button
            key={t}
            type="button"
            onClick={() => setTab(t)}
            className={`px-3 py-1.5 rounded-md txt-compact-small cursor-pointer ${
              tab === t
                ? "bg-ui-bg-base text-ui-fg-base shadow-elevation-card-rest"
                : "text-ui-fg-subtle"
            }`}
          >
            {t}
          </button>
        ))}
      </div>

      {tab === "Profile" && (
        <SettingsProfile
          userName={CURRENT_USER.name}
          avatarSubtitle="Click to change photo"
          user={profileUser}
          sidebarItems={makeSidebar("Profile")}
          formRows={profileFormRows}
          bioPlaceholder="Tell us about yourself..."
          heading="Profile"
          saveLabel="Save changes"
        />
      )}

      {tab === "Notifications" && (
        <SettingsNotifications
          sidebarItems={makeSidebar("Notifications")}
          heading="Notifications"
          toggles={NOTIFICATION_TOGGLES}
          saveLabel="Save changes"
        />
      )}

      {tab === "Security" && (
        <SettingsSecurity
          sidebarItems={makeSidebar("Security")}
          heading="Security"
          toggles={SECURITY_TOGGLES}
          saveLabel="Save changes"
        />
      )}

      {tab === "Billing" && (
        <SettingsBilling
          sidebarItems={makeSidebar("Billing")}
          heading="Billing"
          plan={BILLING.plan}
          payment={BILLING.payment}
          historyHeading="Billing history"
          history={BILLING.history}
        />
      )}
    </div>
  );
}
