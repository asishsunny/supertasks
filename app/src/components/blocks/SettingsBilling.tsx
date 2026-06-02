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
  [key: string]: string | number;
}

export interface SettingsBillingProps {
  navItems: NavItem[];
  onNavClick?: (label: string) => void;
  title: string;
  plan: BillingPlan;
  payment: PaymentMethod;
  onChangePlan?: () => void;
  onUpdatePayment?: () => void;
  historyTitle: string;
  historyColumns: BillingHistoryColumn[];
  historyRows: BillingHistoryRow[];
}

export function SettingsBilling({
  navItems,
  onNavClick,
  title,
  plan,
  payment,
  onChangePlan,
  onUpdatePayment,
  historyTitle,
  historyColumns,
  historyRows,
}: SettingsBillingProps) {
  return (
    <div className="flex gap-6 items-start w-full">
      <div className="bg-ui-bg-base flex flex-col overflow-clip py-2 rounded-[8px] shadow-elevation-card-rest shrink-0 w-[240px]">
        {navItems.map((item) => (
          <div
            key={item.label}
            className={`flex items-center px-4 py-2.5 w-full${
              item.active
                ? " bg-ui-bg-subtle border-ui-fg-base border-l-2"
                : ""
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
              <Button
                variant="secondary"
                size="small"
                onClick={onChangePlan}
              >
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
              <p className="text-ui-fg-base font-medium">{payment.label}</p>
              <p className="text-ui-fg-subtle font-normal">{payment.desc}</p>
            </div>
            <Button
              variant="secondary"
              size="small"
              onClick={onUpdatePayment}
            >
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
                    {historyColumns.map((col) => (
                      <Table.Cell key={col.key} className={col.className}>
                        <p
                          className={`txt-compact-small ${
                            col.key === historyColumns[1]?.key
                              ? "text-ui-fg-base"
                              : "text-ui-fg-subtle"
                          }`}
                        >
                          {row[col.key]}
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
