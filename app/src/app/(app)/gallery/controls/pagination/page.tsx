"use client";

import { Pagination } from "@/components/controls/Pagination";

export default function PaginationGallery() {
  return <Pagination page={1} pageSize={10} total={18} />;
}
