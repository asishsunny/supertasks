export function DateCell({ date, overdue }: { date: string; overdue?: boolean }) {
  return (
    <span className={`txt-compact-small ${overdue ? "text-ui-fg-error" : "text-ui-fg-subtle"}`}>
      {date}
    </span>
  );
}
