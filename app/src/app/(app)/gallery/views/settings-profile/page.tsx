"use client";

import { SettingsProfile } from "@/components/blocks/SettingsProfile";
import { CURRENT_USER, MEMBERS } from "@/lib/data";

const member = MEMBERS.find((m) => m.initials === CURRENT_USER.initials) ?? {
  initials: CURRENT_USER.initials,
  avatarBg: "tag-neutral-bg",
  avatarText: "tag-neutral-text",
};

export default function Page() {
  return (
    <div className="flex flex-col gap-12 p-6">
      <section className="flex flex-col gap-3">
        <h2 className="txt-compact-medium-plus text-ui-fg-subtle">
          Settings — Profile
        </h2>
        <SettingsProfile
          userName={CURRENT_USER.name}
          avatarSubtitle="Click to change photo"
          user={member}
          sidebarItems={[
            { label: "Profile", active: true },
            { label: "Notifications" },
            { label: "Security" },
            { label: "Billing" },
          ]}
          formRows={[
            [
              { label: "Full name", defaultValue: CURRENT_USER.name },
              { label: "Email", defaultValue: CURRENT_USER.email },
            ],
            [
              { label: "Role", defaultValue: CURRENT_USER.role },
            ],
          ]}
          bioPlaceholder="Tell your team a bit about yourself..."
          heading="Profile"
          saveLabel="Save changes"
        />
      </section>
    </div>
  );
}
