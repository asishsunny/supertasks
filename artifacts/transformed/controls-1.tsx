export default function Controls1() {
  return <div className="flex gap-0 h-8 items-center relative shrink-0 w-full">
        <div className="bg-ui-bg-segment-control flex gap-0.5 items-center p-0.5 rounded-lg shrink-0"><button className="text-ui-fg-subtle px-2.5 py-1 rounded-md txt-compact-small cursor-pointer">90d</button><button className="bg-ui-bg-base text-ui-fg-base shadow-elevation-card-rest px-2.5 py-1 rounded-md txt-compact-small cursor-pointer">30d</button><button className="text-ui-fg-subtle px-2.5 py-1 rounded-md txt-compact-small cursor-pointer">7d</button></div>
        <div className="flex-1 h-full min-w-[1px] relative" />
        <div className="flex gap-2 items-center relative shrink-0">
          <div className="flex gap-2 items-center relative shrink-0">
            <Button variant="secondary" size="small"><Funnel className="w-[15px] h-[15px]" />Filter</Button>
            <Button variant="secondary" size="small"><CalendarMini className="w-[15px] h-[15px]" />Date</Button>
            <Button variant="secondary" size="small"><Adjustments className="w-[15px] h-[15px]" />Columns</Button>
          </div>
          <IconButton size="small" variant="primary"><DescendingSorting /></IconButton>
          <div className="relative"><Input type="search" size="small" placeholder="Search" /><Kbd className="absolute right-1.5 top-1/2 -translate-y-1/2">⌘K</Kbd></div>
        </div>
      </div>;
}