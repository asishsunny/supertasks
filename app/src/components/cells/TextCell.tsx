export function TextCell({ title, desc }: { title: string; desc?: string }) {
  return (
    <div className="flex flex-col">
      <span className="txt-compact-small text-ui-fg-base">{title}</span>
      {desc && <span className="txt-compact-xsmall text-ui-fg-subtle truncate">{desc}</span>}
    </div>
  );
}
