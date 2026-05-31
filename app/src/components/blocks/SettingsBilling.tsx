// source: artifacts/transformed/settings-billing-templatized.tsx

import { Button, Table } from "@medusajs/ui";

interface NavItem {
  key: string;
  label: string;
  active?: boolean;
}

interface PlanInfo {
  name: string;
  price: string;
  renewDate: string;
  changePlanLabel: string;
}

interface PaymentMethod {
  label: string;
  detail: string;
  updateLabel: string;
}

interface InvoiceRow {
  date: string;
  description: string;
  amount: string;
}

interface SettingsBillingProps {
  navItems: NavItem[];
  onNavChange?: (key: string) => void;
  plan: PlanInfo;
  onChangePlan?: () => void;
  payment: PaymentMethod;
  onUpdatePayment?: () => void;
  historyTitle: string;
  historyColumns: { date: string; description: string; amount: string };
  invoices: InvoiceRow[];
}

export function SettingsBilling({
  navItems,
  onNavChange,
  plan,
  onChangePlan,
  payment,
  onUpdatePayment,
  historyTitle,
  historyColumns,
  invoices,
}: SettingsBillingProps) {
  return (
    <div className="flex gap-6 items-start w-full">
      <div className="bg-ui-bg-base flex flex-col overflow-clip py-2 rounded-[8px] shadow-elevation-card-rest shrink-0 w-[240px]">
        {navItems.map((item) => (
          <button
            key={item.key}
            type="button"
            onClick={() => onNavChange?.(item.key)}
            className={
              item.active
                ? "bg-ui-bg-subtle border-ui-fg-base border-l-2 flex items-center px-4 py-2.5 w-full text-left"
                : "flex items-center px-4 py-2.5 w-full text-left"
            }
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
          </button>
        ))}
      </div>
      <div className="bg-ui-bg-base flex flex-1 flex-col min-w-[1px] overflow-clip rounded-[8px] shadow-elevation-card-rest">
        <div className="flex flex-col px-6 py-3 w-full">
          <p className="text-ui-fg-base txt-compact-medium-plus">
            {navItems.find((n) => n.active)?.label}
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
                {plan.changePlanLabel}
              </Button>
            </div>
            <p className="text-ui-fg-base font-medium text-[18px] leading-[28px]">
              {plan.price}
            </p>
            <p className="text-ui-fg-subtle txt-compact-small">
              {plan.renewDate}
            </p>
          </div>
          <div className="flex items-center justify-between py-2 w-full">
            <div className="flex flex-col gap-1 w-[100px] text-[13px]">
              <p className="text-ui-fg-base font-medium">{payment.label}</p>
              <p className="text-ui-fg-subtle font-normal">{payment.detail}</p>
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
                  <Table.HeaderCell>{historyColumns.date}</Table.HeaderCell>
                  <Table.HeaderCell>
                    {historyColumns.description}
                  </Table.HeaderCell>
                  <Table.HeaderCell className="w-[120px]">
                    {historyColumns.amount}
                  </Table.HeaderCell>
                </Table.Row>
              </Table.Header>
              <Table.Body>
                {invoices.map((inv, i) => (
                  <Table.Row key={i}>
                    <Table.Cell>
                      <p className="text-ui-fg-subtle txt-compact-small">
                        {inv.date}
                      </p>
                    </Table.Cell>
                    <Table.Cell>
                      <p className="text-ui-fg-base txt-compact-small">
                        {inv.description}
                      </p>
                    </Table.Cell>
                    <Table.Cell className="w-[120px]">
                      <p className="text-ui-fg-subtle txt-compact-small">
                        {inv.amount}
                      </p>
                    </Table.Cell>
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
