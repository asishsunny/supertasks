// source: artifacts/cache/settings.jsx (billing panel)

import { Button, Table } from "@medusajs/ui";

export interface NavItem {
  label: string;
  active?: boolean;
}

export interface BillingPlan {
  name: string;
  price: string;
  renewalNote: string;
  changeLabel: string;
}

export interface PaymentMethod {
  label: string;
  desc: string;
  updateLabel: string;
}

export interface BillingHistoryColumn {
  key: string;
  header: string;
  className?: string;
}

export interface BillingHistoryRow {
  id: string | number;
  [key: string]: unknown;
}

export interface SettingsBillingProps {
  navItems: NavItem[];
  title: string;
  plan: BillingPlan;
  payment: PaymentMethod;
  historyTitle: string;
  historyColumns: BillingHistoryColumn[];
  historyRows: BillingHistoryRow[];
  onChangePlan?: () => void;
  onUpdatePayment?: () => void;
  onTabChange?: (label: string) => void;
}

export function SettingsBilling({
  navItems,
  title,
  plan,
  payment,
  historyTitle,
  historyColumns,
  historyRows,
  onChangePlan,
  onUpdatePayment,
  onTabChange,
}: SettingsBillingProps) {
  return (
    <div className="flex gap-6 items-start w-full h-full">
      {/* Settings Nav */}
      <div className="bg-ui-bg-base flex flex-col overflow-clip py-2 rounded-lg shadow-elevation-card-rest shrink-0 w-[200px]">
        {navItems.map((item) => (
          <button
            key={item.label}
            type="button"
            onClick={() => onTabChange?.(item.label)}
            className={`flex items-center px-4 py-2.5 w-full text-left ${
              item.active
                ? "bg-ui-bg-subtle border-ui-fg-base border-l-2 text-ui-fg-base txt-compact-small-plus"
                : "text-ui-fg-subtle txt-compact-small"
            }`}
          >
            {item.label}
          </button>
        ))}
      </div>

      {/* Content Card */}
      <div className="bg-ui-bg-base flex flex-1 flex-col min-w-[1px] overflow-clip rounded-lg shadow-elevation-card-rest">
        {/* Card Header */}
        <div className="flex flex-col px-6 py-3 w-full">
          <p className="text-ui-fg-base txt-compact-medium-plus">
            {title}
          </p>
        </div>

        {/* Divider */}
        <div className="bg-ui-border-base h-px w-full" />

        {/* Card Body */}
        <div className="flex flex-col gap-5 p-6 w-full">
          {/* Plan Card */}
          <div className="bg-ui-bg-base flex flex-col gap-1 overflow-clip px-6 py-5 rounded-lg shadow-elevation-card-rest w-full">
            <div className="flex items-center justify-between w-full">
              <p className="text-ui-fg-base txt-compact-small-plus">
                {plan.name}
              </p>
              <Button variant="secondary" size="small" onClick={onChangePlan}>
                {plan.changeLabel}
              </Button>
            </div>
            <p className="text-ui-fg-base font-medium text-[18px] leading-7">
              {plan.price}
            </p>
            <p className="text-ui-fg-subtle txt-compact-small">
              {plan.renewalNote}
            </p>
          </div>

          {/* Payment Method */}
          <div className="flex items-center justify-between py-2 w-full">
            <div className="flex flex-col gap-1">
              <p className="text-ui-fg-base txt-compact-small-plus">
                {payment.label}
              </p>
              <p className="text-ui-fg-subtle txt-compact-small">
                {payment.desc}
              </p>
            </div>
            <Button
              variant="secondary"
              size="small"
              onClick={onUpdatePayment}
            >
              {payment.updateLabel}
            </Button>
          </div>

          {/* Billing History */}
          <div className="bg-ui-bg-base flex flex-col overflow-clip rounded-xl shadow-elevation-card-rest w-full">
            <div className="flex items-start pb-4 pt-6 px-6 w-full">
              <p className="text-ui-fg-base txt-compact-medium-plus">
                {historyTitle}
              </p>
            </div>
            <Table>
              <Table.Header className="border-t-0">
                <Table.Row>
                  {historyColumns.map((col) => (
                    <Table.HeaderCell
                      key={col.key}
                      className={col.className}
                    >
                      {col.header}
                    </Table.HeaderCell>
                  ))}
                </Table.Row>
              </Table.Header>
              <Table.Body>
                {historyRows.map((row) => (
                  <Table.Row key={row.id}>
                    {historyColumns.map((col) => (
                      <Table.Cell key={col.key} className={col.className}>
                        <p className="text-ui-fg-subtle txt-compact-small">
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
