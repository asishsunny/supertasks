"use client";
import { SettingsProfile } from "@/components/blocks/SettingsProfile";
import { CURRENT_USER } from "@/lib/data";

const TABS = ["Profile", "Notifications", "Security", "Billing"];
const FIELD_ROWS: [{ label: string; value: string }, { label: string; value: string }][] = [
  [{ label: "Full name", value: CURRENT_USER.name }, { label: "Email", value: CURRENT_USER.email }],
  [{ label: "Job title", value: CURRENT_USER.role }, { label: "Phone", value: "+1 (555) 000-0000" }],
  [{ label: "Location", value: "San Francisco, CA" }, { label: "Time zone", value: "Pacific Time (UTC-8)" }],
];

export default function Page() {
  return (
    <SettingsProfile
      name={CURRENT_USER.name}
      initials={CURRENT_USER.initials}
      avatar={CURRENT_USER.avatar}
      avatarBg="tag-orange-bg"
      avatarText="tag-orange-text"
      photoHint="Click to change photo"
      tabs={TABS}
      fieldRows={FIELD_ROWS}
      bioLabel="Bio"
      bioPlaceholder="Write something about yourself..."
      saveLabel="Save changes"
    />
  );
}
