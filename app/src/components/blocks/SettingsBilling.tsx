import { Button, Table } from "@medusajs/ui";

interface NavItem {
  label: string;
  active?: boolean;
}

interface BillingPlan {
  name: string;
  price: string;
  renewalNote: string;
  changeLabel: string;
}

interface PaymentMethod {
  label: string;
  desc: string;
  updateLabel: string;
}

interface BillingHistoryColumn {
  key: string;
  header: string;
  className?: string;
}

interface BillingHistoryRow {
  id: string | number;
  [key: string]: unknown;
}

export interface SettingsBillingProps {
  navItems?: NavItem[];
  onNavClick?: (label: string) => void;
  title?: string;
  plan?: BillingPlan;
  payment?: PaymentMethod;
  onChangePlan?: () => void;
  onUpdatePayment?: () => void;
  historyTitle?: string;
  historyColumns?: BillingHistoryColumn[];
  historyRows?: BillingHistoryRow[];
}

const DEFAULT_NAV_ITEMS: NavItem[] = [
  {
    label: "Profile",
    active: true
  },
  {
    label: "Notifications",
    active: false
  },
  {
    label: "Security",
    active: false
  },
  {
    label: "Billing",
    active: false
  }
];
const DEFAULT_TITLE = "$12/month";
const DEFAULT_PLAN: BillingPlan = {
  name: "Pro plan",
  price: "$12/month",
  renewalNote: "Renews on Apr 15, 2026",
  changeLabel: "Change plan"
};
const DEFAULT_PAYMENT: PaymentMethod = {
  label: "Payment method",
  desc: "Visa ending in 4242",
  updateLabel: "Update"
};
const DEFAULT_HISTORY_TITLE = "Billing history";
const DEFAULT_HISTORY_COLUMNS: BillingHistoryColumn[] = [
  {
    key: "date",
    header: "Date"
  },
  {
    key: "description",
    header: "Description"
  },
  {
    key: "amount",
    header: "Amount"
  }
];
const DEFAULT_HISTORY_ROWS: BillingHistoryRow[] = [
  {
    id: 1,
    date: "Mar 1, 2026"
  },
  {
    id: 2,
    date: "Feb 1, 2026"
  },
  {
    id: 3,
    date: "Jan 1, 2026"
  }
];

export function SettingsBilling({
  navItems = DEFAULT_NAV_ITEMS,
  onNavClick,
  title = DEFAULT_TITLE,
  plan = DEFAULT_PLAN,
  payment = DEFAULT_PAYMENT,
  onChangePlan,
  onUpdatePayment,
  historyTitle = DEFAULT_HISTORY_TITLE,
  historyColumns = DEFAULT_HISTORY_COLUMNS,
  historyRows = DEFAULT_HISTORY_ROWS,
}: SettingsBillingProps) {
  return (
<div className="flex gap-6 items-start relative shrink-0 w-full">
  <div className="bg-ui-bg-base flex flex-col overflow-clip py-2 relative rounded-[8px] shadow-elevation-card-rest shrink-0 w-[240px]">
    {navItems.map((item, i) => (
      <div
        key={item.label}
        className={`flex items-center px-4 py-2.5 relative shrink-0 w-full${item.active ? " bg-ui-bg-subtle border-ui-fg-base border-l-2" : ""}`}
        onClick={() => onNavClick?.(item.label)}
        style={{ cursor: onNavClick ? "pointer" : undefined }}
      >
        <p className={`relative shrink-0 ${item.active ? "text-ui-fg-base txt-compact-small-plus" : "text-ui-fg-subtle txt-compact-small"}`}>
          {item.label}
        </p>
      </div>
    ))}
  </div>
  <div className="bg-ui-bg-base flex flex-1 flex-col min-w-[1px] overflow-clip relative rounded-[8px] shadow-elevation-card-rest">
    <div className="flex flex-col px-6 py-3 relative shrink-0 w-full">
      <p className="relative shrink-0 text-ui-fg-base font-medium text-[14px] leading-[20px]">
        Billing
      </p>
    </div>
    <div className="h-px bg-ui-border-base" />
    <div className="flex flex-col gap-5 p-6 relative shrink-0 w-full">
      <div className="bg-ui-bg-base flex flex-col gap-1 overflow-clip px-6 py-5 relative rounded-[8px] shadow-elevation-card-rest shrink-0 w-full">
        <div className="flex items-center justify-between relative shrink-0 w-full">
          <p className="relative shrink-0 text-ui-fg-base txt-compact-small-plus">
            {plan.name}
          </p>
          <Button variant="secondary" size="small" onClick={onChangePlan}>{plan.changeLabel}</Button>
        </div>
        <p className="relative shrink-0 text-ui-fg-base font-medium text-[18px] leading-[28px]">
          {plan.price}
        </p>
        <p className="relative shrink-0 text-ui-fg-subtle txt-compact-small">
          {plan.renewalNote}
        </p>
      </div>
      <div className="flex items-center justify-between py-2 relative shrink-0 w-full">
        <div className="flex flex-col gap-1 relative shrink-0 text-[13px] leading-[20px]">
          <p className="relative shrink-0 text-ui-fg-base font-medium">
            {payment.label}
          </p>
          <p className="relative shrink-0 text-ui-fg-subtle font-normal">
            {payment.desc}
          </p>
        </div>
        <Button variant="secondary" size="small" onClick={onUpdatePayment}>{payment.updateLabel}</Button>
      </div>
      <div className="bg-ui-bg-base flex flex-col overflow-clip relative rounded-[12px] shadow-elevation-card-rest shrink-0 w-full">
        <div className="flex items-start pb-4 pt-6 px-6 relative shrink-0 w-full">
          <p className="relative shrink-0 text-ui-fg-base txt-compact-medium-plus">
            {historyTitle}
          </p>
        </div>
        <Table>
          <Table.Header className="border-t-0">
            <Table.Row>
              {historyColumns.map((col) => (
                <Table.HeaderCell key={col.key} className={col.className}>{col.header}</Table.HeaderCell>
              ))}
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {historyRows.map((row) => (
              <Table.Row key={row.id}>
                {historyColumns.map((col) => (
                  <Table.Cell key={col.key} className={col.className}>
                    <p className={`relative shrink-0 txt-compact-small ${col.key === "description" ? "text-ui-fg-base" : "text-ui-fg-subtle"}`}>
                      {String(row[col.key] ?? "")}
                    </p>
                  </Table.Cell>
                ))}
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
      </div>
    </div>
  </div>
</div>
  );
}
