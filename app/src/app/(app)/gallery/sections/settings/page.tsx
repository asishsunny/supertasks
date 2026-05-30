"use client";
import { Settings } from "@/components/blocks/Settings";
import { CURRENT_USER } from "@/lib/data";

export default function Page() {
  return <Settings name={CURRENT_USER.name} email={CURRENT_USER.email} role={CURRENT_USER.role} avatar={CURRENT_USER.avatar} initials={CURRENT_USER.initials} />;
}
