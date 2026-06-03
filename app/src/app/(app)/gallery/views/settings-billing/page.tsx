"use client";

import { SettingsBilling } from "@/components/blocks/SettingsBilling";
import { BILLING } from "@/lib/data";

export default function Page() {
  return (
    <div className="flex flex-col gap-12 p-6">
      <section className="flex flex-col gap-3">
        <h2 className="txt-compact-medium-plus text-ui-fg-subtle">
          Settings — Billing
        </h2>
        <SettingsBilling
          plan={BILLING.plan}
          payment={BILLING.payment}
          history={BILLING.history}
        />
      </section>
    </div>
  );
}
