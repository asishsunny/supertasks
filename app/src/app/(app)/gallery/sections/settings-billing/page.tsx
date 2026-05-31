"use client";
import { SettingsBilling } from "@/components/blocks/SettingsBilling";
import type { BillingHistoryColumn, BillingHistoryRow } from "@/components/blocks/SettingsBilling";

const TABS = ["Profile", "Notifications", "Security", "Billing"];

const HISTORY_COLUMNS: BillingHistoryColumn[] = [
  { key: "date", header: "Date" },
  { key: "description", header: "Description" },
  { key: "amount", header: "Amount", className: "w-[120px]" },
];

const HISTORY_ROWS: BillingHistoryRow[] = [
  { date: "Mar 1, 2026", description: "Pro Plan — Monthly", amount: "$12.00" },
  { date: "Feb 1, 2026", description: "Pro Plan — Monthly", amount: "$12.00" },
  { date: "Jan 1, 2026", description: "Pro Plan — Monthly", amount: "$12.00" },
];

export default function Page() {
  return (
    <SettingsBilling
      tabs={TABS}
      activeTab={3}
      heading="Billing"
      plan={{
        name: "Pro plan",
        price: "$12/month",
        renewalNote: "Renews on Apr 15, 2026",
        changeLabel: "Change plan",
      }}
      payment={{
        label: "Payment method",
        desc: "Visa ending in 4242",
        updateLabel: "Update",
      }}
      historyHeading="Billing history"
      historyColumns={HISTORY_COLUMNS}
      historyRows={HISTORY_ROWS}
    />
  );
}
