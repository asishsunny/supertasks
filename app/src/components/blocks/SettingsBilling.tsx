import { Button, Table } from "@medusajs/ui";

/* ------------------------------------------------------------------ */
/*  Types                                                              */
/* ------------------------------------------------------------------ */

export interface SidebarItem {
  label: string;
  active?: boolean;
}

export interface PlanInfo {
  name: string;
  price: string;
  renews: string;
  action: string;
}

export interface PaymentInfo {
  label: string;
  value: string;
  action: string;
}

export interface BillingHistoryRow {
  date: string;
  desc: string;
  amount: string;
}

export interface SettingsBillingProps {
  sidebarItems?: SidebarItem[];
  heading?: string;
  plan?: PlanInfo;
  payment?: PaymentInfo;
  historyHeading?: string;
  history?: BillingHistoryRow[];
}

/* ------------------------------------------------------------------ */
/*  Default Figma data (one representative item per array)             */
/* ------------------------------------------------------------------ */

const DEFAULT_SIDEBAR: SidebarItem[] = [
  { label: "Profile" },
  { label: "Notifications" },
  { label: "Security" },
  { label: "Billing", active: true },
];

const DEFAULT_PLAN: PlanInfo = {
  name: "Pro plan",
  price: "$12/month",
  renews: "Renews on Apr 15, 2026",
  action: "Change plan",
};

const DEFAULT_PAYMENT: PaymentInfo = {
  label: "Payment method",
  value: "Visa ending in 4242",
  action: "Update",
};

const DEFAULT_HISTORY: BillingHistoryRow[] = [
  { date: "Mar 1, 2026", desc: "Pro Plan — Monthly", amount: "$12.00" },
];

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */

export function SettingsBilling({
  sidebarItems = DEFAULT_SIDEBAR,
  heading = "Billing",
  plan = DEFAULT_PLAN,
  payment = DEFAULT_PAYMENT,
  historyHeading = "Billing history",
  history = DEFAULT_HISTORY,
}: SettingsBillingProps) {
  return (
    <div className="flex gap-6 items-start relative shrink-0 w-full">
      {/* Sidebar */}
      <div className="bg-ui-bg-base flex flex-col overflow-clip py-2 relative rounded-[8px] shadow-elevation-card-rest shrink-0 w-[240px]">
        {sidebarItems.map((item, i) =>
          item.active ? (
            <div
              key={i}
              className="bg-ui-bg-subtle border-ui-fg-base border-l-2 flex items-center px-4 py-2.5 relative shrink-0 w-full"
            >
              <p className="relative shrink-0 text-ui-fg-base txt-compact-small-plus">
                {item.label}
              </p>
            </div>
          ) : (
            <div
              key={i}
              className="flex items-center px-4 py-2.5 relative shrink-0 w-full"
            >
              <p className="relative shrink-0 text-ui-fg-subtle txt-compact-small">
                {item.label}
              </p>
            </div>
          ),
        )}
      </div>

      {/* Content */}
      <div className="bg-ui-bg-base flex flex-1 flex-col min-w-[1px] overflow-clip relative rounded-[8px] shadow-elevation-card-rest">
        <div className="flex flex-col px-6 py-3 relative shrink-0 w-full">
          <p className="relative shrink-0 text-ui-fg-base txt-compact-medium-plus">
            {heading}
          </p>
        </div>
        <div className="h-px bg-ui-border-base" />
        <div className="flex flex-col gap-5 p-6 relative shrink-0 w-full">
          {/* Plan card */}
          <div className="bg-ui-bg-base flex flex-col gap-1 overflow-clip px-6 py-5 relative rounded-[8px] shadow-elevation-card-rest shrink-0 w-full">
            <div className="flex items-center justify-between relative shrink-0 w-full">
              <p className="relative shrink-0 text-ui-fg-base txt-compact-small-plus">
                {plan.name}
              </p>
              <Button variant="secondary" size="small">
                {plan.action}
              </Button>
            </div>
            <p className="relative shrink-0 text-ui-fg-base font-medium text-[18px] leading-[28px]">
              {plan.price}
            </p>
            <p className="relative shrink-0 text-ui-fg-subtle txt-compact-small">
              {plan.renews}
            </p>
          </div>

          {/* Payment method */}
          <div className="flex items-center justify-between py-2 relative shrink-0 w-full">
            <div className="flex flex-col gap-1 relative shrink-0 text-[13px]">
              <p className="relative shrink-0 text-ui-fg-base font-medium">
                {payment.label}
              </p>
              <p className="relative shrink-0 text-ui-fg-subtle font-normal">
                {payment.value}
              </p>
            </div>
            <Button variant="secondary" size="small">
              {payment.action}
            </Button>
          </div>

          {/* Billing history table */}
          <div className="bg-ui-bg-base flex flex-col overflow-clip relative rounded-[12px] shadow-elevation-card-rest shrink-0 w-full">
            <div className="flex items-start pb-4 pt-6 px-6 relative shrink-0 w-full">
              <p className="relative shrink-0 text-ui-fg-base txt-compact-medium-plus">
                {historyHeading}
              </p>
            </div>
            <Table>
              <Table.Header className="border-t-0">
                <Table.Row>
                  <Table.HeaderCell>Date</Table.HeaderCell>
                  <Table.HeaderCell>Description</Table.HeaderCell>
                  <Table.HeaderCell className="w-[120px]">Amount</Table.HeaderCell>
                </Table.Row>
              </Table.Header>
              <Table.Body>
                {history.map((row, i) => (
                  <Table.Row key={i}>
                    <Table.Cell>
                      <p className="relative shrink-0 text-ui-fg-subtle txt-compact-small">
                        {row.date}
                      </p>
                    </Table.Cell>
                    <Table.Cell>
                      <p className="relative shrink-0 text-ui-fg-base txt-compact-small">
                        {row.desc}
                      </p>
                    </Table.Cell>
                    <Table.Cell className="w-[120px]">
                      <p className="relative shrink-0 text-ui-fg-subtle txt-compact-small">
                        {row.amount}
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
