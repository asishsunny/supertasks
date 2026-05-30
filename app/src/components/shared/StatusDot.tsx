const DOT_BG: Record<string, string> = {
  todo: "bg-ui-tag-neutral-icon",
  in_progress: "bg-ui-tag-blue-icon",
  in_review: "bg-ui-tag-orange-icon",
  done: "bg-ui-tag-green-icon",
};

export function StatusDot({ status }: { status: string }) {
  return (
    <div className="size-[15px] flex items-center justify-center shrink-0">
      <div className={`size-2 rounded-[2px] border border-black/10 ${DOT_BG[status] ?? DOT_BG.todo}`} />
    </div>
  );
}
