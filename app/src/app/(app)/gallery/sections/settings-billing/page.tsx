"use client";
import { SettingsBilling } from "@/components/blocks/SettingsBilling";

const NAV_ITEMS = [
  { key: "profile", label: "Profile" },
  { key: "notifications", label: "Notifications" },
  { key: "security", label: "Security" },
  { key: "billing", label: "Billing", active: true },
];

export default function Page() {
  return (
    <SettingsBilling
      navItems={NAV_ITEMS}
      plan={{
        name: "Pro plan",
        price: "$12/month",
        renewDate: "Renews on Apr 15, 2026",
        changePlanLabel: "Change plan",
      }}
      payment={{
        label: "Payment method",
        detail: "Visa ending in 4242",
        updateLabel: "Update",
      }}
      historyTitle="Billing history"
      historyColumns={{ date: "Date", description: "Description", amount: "Amount" }}
      invoices={[
        { date: "Mar 1, 2026", description: "Pro Plan — Monthly", amount: "$12.00" },
        { date: "Feb 1, 2026", description: "Pro Plan — Monthly", amount: "$12.00" },
        { date: "Jan 1, 2026", description: "Pro Plan — Monthly", amount: "$12.00" },
      ]}
    />
  );
}
