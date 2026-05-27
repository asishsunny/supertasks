export default function GenerateReport() {
  return <div className="bg-ui-bg-base flex flex-col overflow-clip relative rounded-[12px] shadow-elevation-card-rest w-full h-full">
      <div className="flex flex-col relative shrink-0 w-full">
        <div className="flex items-center justify-between px-6 py-2 relative shrink-0 w-full">
          <p className="flex-1 min-w-[1px] relative text-ui-fg-base font-medium text-[14px] leading-[20px]">
            Generate report
          </p>
          <div className="flex gap-1 items-center relative shrink-0">
            <Kbd>Esc</Kbd>
            <IconButton size="small" variant="transparent"><XMark /></IconButton>
          </div>
        </div>
        <div className="h-px bg-ui-border-base" />
      </div>
      <div className="flex flex-col gap-5 p-6 relative shrink-0 w-full">
        <div className="flex flex-1 flex-col gap-1.5 min-w-[1px]"><Label size="small">Report name</Label><Input size="small" className="w-full" /></div>
        <div className="flex flex-1 flex-col gap-1.5 min-w-[1px]"><Label size="small">Member</Label><Select size="small" placeholder="Select member..." /></div>
        <div className="flex flex-1 flex-col gap-1.5 min-w-[1px]"><Label size="small">Date range</Label><Select size="small" placeholder="Select range..." /></div>
      </div>
      <div className="flex flex-col relative shrink-0 w-full">
        <div className="h-px bg-ui-border-base" />
        <div className="flex gap-2 items-center justify-end px-6 py-4 relative shrink-0 w-full">
          <Button variant="secondary" size="small">Cancel</Button>
          <Button variant="primary" size="small">Generate report</Button>
        </div>
      </div>
    </div>;
}
