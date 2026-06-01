"use client";

import { SettingsProfile } from "@/components/blocks/SettingsProfile";
import SettingsNotifications from "@/components/blocks/SettingsNotifications";
import { SettingsSecurity } from "@/components/blocks/SettingsSecurity";
import { SettingsBilling } from "@/components/blocks/SettingsBilling";
import { CURRENT_USER, NOTIFICATION_TOGGLES, SECURITY_TOGGLES, BILLING } from "@/lib/data";

const navItems = [{ label: 'Profile', active: true }, { label: 'Notifications' }, { label: 'Security' }, { label: 'Billing' }];
const profileFieldRows = [
  { fields: [{ label: 'Full name', value: CURRENT_USER.name }, { label: 'Email', value: CURRENT_USER.email }] },
  { fields: [{ label: 'Job title', value: CURRENT_USER.role }] },
];
const billingNav = navItems.map((n, i) => ({ ...n, active: i === 3 }));
const billingHistoryColumns = [{ key: 'date', header: 'Date', className: 'w-[140px]' }, { key: 'desc', header: 'Description' }, { key: 'amount', header: 'Amount', className: 'w-[100px]' }];
const billingHistoryRows = BILLING.history.map((h, i) => ({ id: i + 1, date: h.date, desc: h.desc, amount: h.amount }));

export default function Page() {
  return (
    <div className="p-6">
      <div className="flex flex-col gap-8">
  <SettingsProfile navItems={navItems} title="Profile" avatarSrc={CURRENT_USER.avatar} avatarFallback={CURRENT_USER.initials} userName={CURRENT_USER.name} avatarHint="Click to change photo" fieldRows={profileFieldRows} bioLabel="Bio" bioPlaceholder="" saveLabel="Save changes" />
  <SettingsNotifications title="Notifications" toggles={NOTIFICATION_TOGGLES} saveLabel="Save changes" />
  <SettingsSecurity tabs={['Profile', 'Notifications', 'Security', 'Billing']} activeTab={2} heading="Security" toggles={SECURITY_TOGGLES} saveLabel="Save changes" />
  <SettingsBilling navItems={billingNav} title="Billing" plan={{ name: BILLING.plan.name, price: BILLING.plan.price, renewalNote: BILLING.plan.renews, changeLabel: BILLING.plan.action }} payment={{ label: BILLING.payment.label, desc: BILLING.payment.value, updateLabel: BILLING.payment.action }} historyTitle="Billing history" historyColumns={billingHistoryColumns} historyRows={billingHistoryRows} />
</div>
    </div>
  );
}
