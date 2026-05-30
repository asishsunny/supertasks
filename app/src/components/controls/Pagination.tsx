"use client";

import { Button } from "@medusajs/ui";

interface PaginationProps {
  page: number;
  pageSize: number;
  total: number;
  onPageChange?: (page: number) => void;
}

export function Pagination({ page, pageSize, total, onPageChange }: PaginationProps) {
  const start = (page - 1) * pageSize + 1;
  const end = Math.min(page * pageSize, total);
  const totalPages = Math.ceil(total / pageSize);

  return (
    <div className="flex items-center justify-between py-3">
      <span className="txt-compact-small text-ui-fg-subtle">
        {start}–{end} of {total}
      </span>
      <div className="flex gap-1">
        <Button
          variant="secondary"
          size="small"
          disabled={page <= 1}
          onClick={() => onPageChange?.(page - 1)}
        >
          Previous
        </Button>
        <Button
          variant="secondary"
          size="small"
          disabled={page >= totalPages}
          onClick={() => onPageChange?.(page + 1)}
        >
          Next
        </Button>
      </div>
    </div>
  );
}
