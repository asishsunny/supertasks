"use client";

import { SettingsProfile } from "@/components/blocks/SettingsProfile";
import { SettingsNotifications } from "@/components/blocks/SettingsNotifications";
import { SettingsSecurity } from "@/components/blocks/SettingsSecurity";
import { SettingsBilling } from "@/components/blocks/SettingsBilling";

export default function Page() {
  return (
    <div className="flex flex-col gap-12 p-6">
      <section>
        <h2 className="txt-compact-medium-plus text-ui-fg-subtle mb-3">Profile</h2>
        <SettingsProfile />
      </section>
      <section>
        <h2 className="txt-compact-medium-plus text-ui-fg-subtle mb-3">Notifications</h2>
        <SettingsNotifications />
      </section>
      <section>
        <h2 className="txt-compact-medium-plus text-ui-fg-subtle mb-3">Security</h2>
        <SettingsSecurity />
      </section>
      <section>
        <h2 className="txt-compact-medium-plus text-ui-fg-subtle mb-3">Billing</h2>
        <SettingsBilling />
      </section>
    </div>
  );
}
