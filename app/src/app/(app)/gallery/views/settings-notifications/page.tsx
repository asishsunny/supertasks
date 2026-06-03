"use client";

import { SettingsNotifications } from "@/components/blocks/SettingsNotifications";
import { NOTIFICATION_TOGGLES } from "@/lib/data";

export default function Page() {
  return (
    <div className="flex flex-col gap-12 p-6">
      <section className="flex flex-col gap-3">
        <h2 className="txt-compact-medium-plus text-ui-fg-subtle">
          Settings — Notifications
        </h2>
        <SettingsNotifications
          sidebarItems={[
            { label: "Profile" },
            { label: "Notifications", active: true },
            { label: "Security" },
            { label: "Billing" },
          ]}
          heading="Notifications"
          toggles={NOTIFICATION_TOGGLES}
          saveLabel="Save changes"
        />
      </section>
    </div>
  );
}
