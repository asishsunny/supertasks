"use client";

import { SettingsSecurity } from "@/components/blocks/SettingsSecurity";
import { SECURITY_TOGGLES } from "@/lib/data";

export default function Page() {
  return (
    <div className="flex flex-col gap-12 p-6">
      <section className="flex flex-col gap-3">
        <h2 className="txt-compact-medium-plus text-ui-fg-subtle">
          Settings — Security
        </h2>
        <SettingsSecurity toggles={SECURITY_TOGGLES} />
      </section>
    </div>
  );
}
