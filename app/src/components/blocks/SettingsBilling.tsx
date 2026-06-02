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

export function SettingsBilling({
  navItems = [
    { label: "Profile" },
    { label: "Notifications" },
    { label: "Security" },
    { label: "Billing", active: true },
  ],
  onNavClick,
  title = "Billing",
  plan = {
    name: "Pro plan",
    price: "$12/month",
    renewalNote: "Renews on Apr 15, 2026",
    changeLabel: "Change plan",
  },
  payment = {
    label: "Payment method",
    desc: "Visa ending in 4242",
    updateLabel: "Update",
  },
  onChangePlan,
  onUpdatePayment,
  historyTitle = "Billing history",
  historyColumns = [
    { key: "date", header: "Date" },
    { key: "description", header: "Description" },
    { key: "amount", header: "Amount", className: "w-[120px]" },
  ],
  historyRows = [
    { id: 1, date: "Mar 1, 2026", description: "Pro Plan — Monthly", amount: "$12.00" },
    { id: 2, date: "Feb 1, 2026", description: "Pro Plan — Monthly", amount: "$12.00" },
    { id: 3, date: "Jan 1, 2026", description: "Pro Plan — Monthly", amount: "$12.00" },
  ],
}: SettingsBillingProps) {
  return (
    <div className="flex gap-6 items-start w-full">
      <div className="bg-ui-bg-base flex flex-col overflow-clip py-2 rounded-[8px] shadow-elevation-card-rest shrink-0 w-[240px]">
        {navItems.map((item) => (
          <div
            key={item.label}
            className={`flex items-center px-4 py-2.5 w-full${
              item.active ? " bg-ui-bg-subtle border-ui-fg-base border-l-2" : ""
            }`}
            role="button"
            tabIndex={0}
            onClick={() => onNavClick?.(item.label)}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") onNavClick?.(item.label);
            }}
          >
            <p
              className={
                item.active
                  ? "text-ui-fg-base txt-compact-small-plus"
                  : "text-ui-fg-subtle txt-compact-small"
              }
            >
              {item.label}
            </p>
          </div>
        ))}
      </div>

      <div className="bg-ui-bg-base flex flex-1 flex-col min-w-[1px] overflow-clip rounded-[8px] shadow-elevation-card-rest">
        <div className="flex flex-col px-6 py-3 w-full">
          <p className="text-ui-fg-base font-medium text-[14px] leading-[20px]">
            {title}
          </p>
        </div>
        <div className="h-px bg-ui-border-base" />
        <div className="flex flex-col gap-5 p-6 w-full">
          <div className="bg-ui-bg-base flex flex-col gap-1 overflow-clip px-6 py-5 rounded-[8px] shadow-elevation-card-rest w-full">
            <div className="flex items-center justify-between w-full">
              <p className="text-ui-fg-base txt-compact-small-plus">
                {plan.name}
              </p>
              <Button variant="secondary" size="small" onClick={onChangePlan}>
                {plan.changeLabel}
              </Button>
            </div>
            <p className="text-ui-fg-base font-medium text-[18px] leading-[28px]">
              {plan.price}
            </p>
            <p className="text-ui-fg-subtle txt-compact-small">
              {plan.renewalNote}
            </p>
          </div>

          <div className="flex items-center justify-between py-2 w-full">
            <div className="flex flex-col gap-1 text-[13px] leading-[20px]">
              <p className="text-ui-fg-base font-medium">
                {payment.label}
              </p>
              <p className="text-ui-fg-subtle font-normal">
                {payment.desc}
              </p>
            </div>
            <Button variant="secondary" size="small" onClick={onUpdatePayment}>
              {payment.updateLabel}
            </Button>
          </div>

          <div className="bg-ui-bg-base flex flex-col overflow-clip rounded-[12px] shadow-elevation-card-rest w-full">
            <div className="flex items-start pb-4 pt-6 px-6 w-full">
              <p className="text-ui-fg-base txt-compact-medium-plus">
                {historyTitle}
              </p>
            </div>
            <Table>
              <Table.Header className="border-t-0">
                <Table.Row>
                  {historyColumns.map((col) => (
                    <Table.HeaderCell key={col.key} className={col.className}>
                      {col.header}
                    </Table.HeaderCell>
                  ))}
                </Table.Row>
              </Table.Header>
              <Table.Body>
                {historyRows.map((row) => (
                  <Table.Row key={row.id}>
                    {historyColumns.map((col) => {
                      const isFirst = col.key === historyColumns[0]?.key;
                      return (
                        <Table.Cell key={col.key} className={col.className}>
                          <p
                            className={`txt-compact-small ${
                              isFirst ? "text-ui-fg-subtle" : col.key === "amount" ? "text-ui-fg-subtle" : "text-ui-fg-base"
                            }`}
                          >
                            {String(row[col.key] ?? "")}
                          </p>
                        </Table.Cell>
                      );
                    })}
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
