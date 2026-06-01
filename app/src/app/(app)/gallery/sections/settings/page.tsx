"use client";
import { useState } from "react";
import { SettingsProfile } from "@/components/blocks/SettingsProfile";
import { CURRENT_USER } from "@/lib/data";

const NAV_ITEMS = [
  { label: "Profile", active: true },
  { label: "Notifications" },
  { label: "Security" },
  { label: "Billing" },
];

const FORM_ROWS = [
  [{ label: "Full name", defaultValue: CURRENT_USER.name }, { label: "Email", defaultValue: CURRENT_USER.email }],
  [{ label: "Job title", defaultValue: CURRENT_USER.role }, { label: "Phone", defaultValue: "+1 (555) 000-0000" }],
  [{ label: "Location", defaultValue: "San Francisco, CA" }, { label: "Time zone", defaultValue: "Pacific Time (UTC-8)" }],
];

export default function Page() {
  return (
    <SettingsProfile
      title="Profile"
      navItems={NAV_ITEMS}
      avatarSrc={CURRENT_USER.avatar}
      userName={CURRENT_USER.name}
      avatarHint="Click to change photo"
      formRows={FORM_ROWS}
      bioField={{ label: "Bio", placeholder: "Write something about yourself..." }}
      submitLabel="Save changes"
    />
  );
}
