import { Button, Table } from "@medusajs/ui";

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

export interface BillingHistoryRow {
  date: string;
  description: string;
  amount: string;
}

export interface BillingHistoryColumn {
  key: keyof BillingHistoryRow;
  header: string;
  className?: string;
}

export interface SettingsBillingProps {
  tabs: string[];
  activeTab?: number;
  onTabChange?: (index: number) => void;
  heading: string;
  plan: BillingPlan;
  payment: PaymentMethod;
  historyHeading: string;
  historyColumns: BillingHistoryColumn[];
  historyRows: BillingHistoryRow[];
  onChangePlan?: () => void;
  onUpdatePayment?: () => void;
}

export function SettingsBilling({
  tabs,
  activeTab = 3,
  onTabChange,
  heading,
  plan,
  payment,
  historyHeading,
  historyColumns,
  historyRows,
  onChangePlan,
  onUpdatePayment,
}: SettingsBillingProps) {
  return (
    <div className="flex gap-6 items-start w-full">
      {/* Sidebar tabs */}
      <div className="bg-ui-bg-base flex flex-col overflow-clip py-2 rounded-[8px] shadow-elevation-card-rest shrink-0 w-[240px]">
        {tabs.map((tab, i) => {
          const isActive = i === activeTab;
          return (
            <button
              key={tab}
              type="button"
              onClick={() => onTabChange?.(i)}
              className={`flex items-center px-4 py-2.5 w-full text-left ${
                isActive
                  ? "bg-ui-bg-subtle border-ui-fg-base border-l-2 text-ui-fg-base txt-compact-small-plus"
                  : "text-ui-fg-subtle txt-compact-small"
              }`}
            >
              {tab}
            </button>
          );
        })}
      </div>

      {/* Content panel */}
      <div className="bg-ui-bg-base flex flex-1 flex-col min-w-[1px] overflow-clip rounded-[8px] shadow-elevation-card-rest">
        <div className="flex flex-col px-6 py-3 w-full">
          <p className="text-ui-fg-base txt-compact-medium-plus">{heading}</p>
        </div>
        <div className="h-px bg-ui-border-base" />
        <div className="flex flex-col gap-5 p-6 w-full">
          {/* Plan card */}
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

          {/* Payment method */}
          <div className="flex items-center justify-between py-2 w-full">
            <div className="flex flex-col gap-1 text-[13px]">
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

          {/* Billing history */}
          <div className="bg-ui-bg-base flex flex-col overflow-clip rounded-[12px] shadow-elevation-card-rest w-full">
            <div className="flex items-start pb-4 pt-6 px-6 w-full">
              <p className="text-ui-fg-base txt-compact-medium-plus">
                {historyHeading}
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
                {historyRows.map((row, i) => (
                  <Table.Row key={i}>
                    {historyColumns.map((col) => (
                      <Table.Cell key={col.key} className={col.className}>
                        <p
                          className={`txt-compact-small ${
                            col.key === "description"
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
