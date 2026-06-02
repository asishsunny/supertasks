import type { ReactNode } from "react";

export default function GalleryLayout({ children }: { children: ReactNode }) {
  return <div className="flex-1 min-w-0">{children}</div>;
}
