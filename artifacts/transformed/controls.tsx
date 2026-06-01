export default function Controls() {
  return <div className="flex gap-0 items-center relative w-full h-full">
      <div className="bg-ui-bg-segment-control flex gap-0.5 items-center p-0.5 rounded-lg shrink-0"><button className="segment-tab">Kanban</button><button className="segment-tab">List</button></div>
      <div className="flex-1 h-full min-w-[1px] relative" />
      <div className="flex gap-2 items-center relative shrink-0">
        <div className="flex gap-2 items-center relative shrink-0">
          <Button variant="secondary" size="small"><Funnel className="w-[15px] h-[15px]" />Filter</Button>
          <Button variant="secondary" size="small"><CalendarMini className="w-[15px] h-[15px]" />Date</Button>
          <Button variant="secondary" size="small"><Adjustments className="w-[15px] h-[15px]" />Columns</Button>
        </div>
        <IconButton size="small" variant="primary"><DescendingSorting /></IconButton>
        <div className="relative"><Input type="search" size="small" placeholder="Search" /><Kbd>⌘K</Kbd></div>
      </div>
    </div>;
}