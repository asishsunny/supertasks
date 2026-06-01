"use client";

import { useState } from "react";
import { Controls } from "@/components/blocks/Controls";

export default function Page() {
  const [activeTab, setActiveTab] = useState('list');
const tabs = [{ key: 'kanban', label: 'Kanban' }, { key: 'list', label: 'List' }];
const actions = [{ icon: null as unknown as React.ReactNode, label: 'Filter' }, { icon: null as unknown as React.ReactNode, label: 'Date' }];
  return (
    <div className="p-6">
      <Controls tabs={tabs} activeTab={activeTab} onTabChange={setActiveTab} actions={actions} searchPlaceholder="Search" />
    </div>
  );
}
