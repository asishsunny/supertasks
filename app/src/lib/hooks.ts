"use client";

import { useMemo } from "react";
import type { Member } from "@/types";
import { useStore } from "@/app/(app)/store";

export function useMemberLookup(): Map<number, Member> {
  const { state } = useStore();
  return useMemo(() => new Map(state.members.map((m) => [m.id, m])), [state.members]);
}
