import StatCards from "@/components/blocks/StatCards";
import { STAT_CARDS } from "@/lib/gallery";

export default function Page() {
  return (
    <div className="flex flex-col gap-8 p-6">
      <h2 className="txt-compact-medium-plus text-ui-fg-subtle">Stat Cards</h2>
      <StatCards cards={STAT_CARDS} />
    </div>
  );
}
