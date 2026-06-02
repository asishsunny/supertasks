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
    // TODO: Agent fills from artifacts/transformed/settings-billing.tsx
    <div>TODO</div>
  );
}
