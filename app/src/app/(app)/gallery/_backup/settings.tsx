"use client";

import { Avatar, Button } from "@medusajs/ui";
import { CURRENT_USER } from "@/lib/data";

// markup from artifacts/transformed/settings.tsx — Profile tab only (Figma source)
export default function SettingsGallery() {
  return (
    <div className="flex gap-6 items-start relative w-full">
      <div className="bg-ui-bg-base flex flex-col overflow-clip py-2 relative rounded-[8px] shadow-elevation-card-rest shrink-0 w-[200px] self-start">
        <div className="bg-ui-bg-subtle border-ui-fg-base border-l-2 flex items-center px-4 py-2.5 relative shrink-0 w-full">
          <p className="relative shrink-0 text-ui-fg-base txt-compact-small-plus">Profile</p>
        </div>
        <div className="flex items-center px-4 py-2.5 relative shrink-0 w-full">
          <p className="relative shrink-0 text-ui-fg-subtle txt-compact-small">Notifications</p>
        </div>
        <div className="flex items-center px-4 py-2.5 relative shrink-0 w-full">
          <p className="relative shrink-0 text-ui-fg-subtle txt-compact-small">Security</p>
        </div>
        <div className="flex items-center px-4 py-2.5 relative shrink-0 w-full">
          <p className="relative shrink-0 text-ui-fg-subtle txt-compact-small">Billing</p>
        </div>
      </div>
      <div className="bg-ui-bg-base flex flex-1 flex-col min-w-[1px] overflow-clip relative rounded-[8px] shadow-elevation-card-rest">
        <div className="flex flex-col px-6 py-3 relative shrink-0 w-full">
          <p className="relative shrink-0 text-ui-fg-base font-medium text-[14px] leading-[20px]">Profile</p>
        </div>
        <div className="bg-ui-border-base h-px relative shrink-0 w-full" />
        <div className="flex flex-col gap-5 p-6 relative shrink-0 w-full">
          <div className="flex gap-3 items-center relative shrink-0 w-full">
            <Avatar src={CURRENT_USER.avatar} fallback={CURRENT_USER.initials} size="xlarge" />
            <div className="flex flex-col gap-0.5 relative shrink-0">
              <p className="relative shrink-0 text-ui-fg-base font-medium text-[14px] leading-[20px]">{CURRENT_USER.name}</p>
              <p className="relative shrink-0 text-ui-fg-subtle txt-compact-small">Click to change photo</p>
            </div>
          </div>
          <div className="flex gap-4 items-start relative shrink-0 w-full">
            <div className="flex flex-1 flex-col gap-1.5 min-w-[1px] relative">
              <p className="relative shrink-0 text-ui-fg-base txt-compact-small-plus">Full name</p>
              <div className="bg-ui-bg-field flex h-8 items-center overflow-clip px-2 relative rounded-md shadow-borders-base shrink-0 w-full">
                <p className="flex-1 text-ui-fg-base txt-compact-small">{CURRENT_USER.name}</p>
              </div>
            </div>
            <div className="flex flex-1 flex-col gap-1.5 min-w-[1px] relative">
              <p className="relative shrink-0 text-ui-fg-base txt-compact-small-plus">Email</p>
              <div className="bg-ui-bg-field flex h-8 items-center overflow-clip px-2 relative rounded-md shadow-borders-base shrink-0 w-full">
                <p className="flex-1 text-ui-fg-base txt-compact-small">{CURRENT_USER.email}</p>
              </div>
            </div>
          </div>
          <div className="flex gap-4 items-start relative shrink-0 w-full">
            <div className="flex flex-1 flex-col gap-1.5 min-w-[1px] relative">
              <p className="relative shrink-0 text-ui-fg-base txt-compact-small-plus">Job title</p>
              <div className="bg-ui-bg-field flex h-8 items-center overflow-clip px-2 relative rounded-md shadow-borders-base shrink-0 w-full">
                <p className="flex-1 text-ui-fg-base txt-compact-small">{CURRENT_USER.role}</p>
              </div>
            </div>
            <div className="flex flex-1 flex-col gap-1.5 min-w-[1px] relative">
              <p className="relative shrink-0 text-ui-fg-base txt-compact-small-plus">Phone</p>
              <div className="bg-ui-bg-field flex h-8 items-center overflow-clip px-2 relative rounded-md shadow-borders-base shrink-0 w-full">
                <p className="flex-1 text-ui-fg-base txt-compact-small">+1 (555) 000-0000</p>
              </div>
            </div>
          </div>
          <div className="flex gap-4 items-start relative shrink-0 w-full">
            <div className="flex flex-1 flex-col gap-1.5 min-w-[1px] relative">
              <p className="relative shrink-0 text-ui-fg-base txt-compact-small-plus">Location</p>
              <div className="bg-ui-bg-field flex h-8 items-center overflow-clip px-2 relative rounded-md shadow-borders-base shrink-0 w-full">
                <p className="flex-1 text-ui-fg-base txt-compact-small">San Francisco, CA</p>
              </div>
            </div>
            <div className="flex flex-1 flex-col gap-1.5 min-w-[1px] relative">
              <p className="relative shrink-0 text-ui-fg-base txt-compact-small-plus">Time zone</p>
              <div className="bg-ui-bg-field flex h-8 items-center overflow-clip px-2 relative rounded-md shadow-borders-base shrink-0 w-full">
                <p className="flex-1 text-ui-fg-base txt-compact-small">Pacific Time (UTC-8)</p>
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-1.5 relative shrink-0 w-full">
            <p className="relative shrink-0 text-ui-fg-base txt-compact-small-plus">Bio</p>
            <div className="bg-ui-bg-field flex flex-col gap-1.5 items-end justify-end overflow-clip px-2 py-1.5 relative rounded-md shadow-borders-base shrink-0 w-full">
              <p className="min-w-full relative shrink-0 text-ui-fg-muted txt-small">Placeholder</p>
            </div>
          </div>
          <div className="flex items-start justify-end relative shrink-0 w-full">
            <Button variant="primary" size="small">Save changes</Button>
          </div>
        </div>
      </div>
    </div>
  );
}
