"use client";

import { ErrorBoundary, type FallbackProps } from "react-error-boundary";
import { Button } from "@medusajs/ui";
import type { ReactNode } from "react";

function Fallback({ error, resetErrorBoundary }: FallbackProps) {
  return (
    <div className="bg-ui-bg-base rounded-xl shadow-elevation-card-rest p-6 flex flex-col gap-3 items-center">
      <p className="txt-compact-small-plus text-ui-fg-base">Something went wrong</p>
      <p className="txt-compact-small text-ui-fg-subtle">{error?.message}</p>
      <Button variant="secondary" size="small" onClick={resetErrorBoundary}>
        Try again
      </Button>
    </div>
  );
}

export function ViewBoundary({ children }: { children: ReactNode }) {
  return <ErrorBoundary FallbackComponent={Fallback}>{children}</ErrorBoundary>;
}
