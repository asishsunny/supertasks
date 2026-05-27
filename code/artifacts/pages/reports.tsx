"use client";

import { INITIAL_REPORTS, MEMBERS } from "@/lib/data";
import { Badge, IconButton, Input, Table } from "@medusajs/ui";
import { EllipsisHorizontal } from "@medusajs/icons";
import { ColorAvatar } from "@/components/ColorAvatar";

export default function ReportsPage() {
  const reports = INITIAL_REPORTS;

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center w-full">
          <div className="inline-flex items-center bg-ui-bg-subtle rounded-lg p-0.5 gap-0.5">
            <button key="90d" className="px-4 py-0.5 rounded-md txt-compact-small text-ui-fg-subtle">90d</button>
            <button key="30d" className="px-4 py-0.5 rounded-md bg-ui-bg-base shadow-elevation-card-rest txt-compact-small-plus text-ui-fg-base">30d</button>
            <button key="7d" className="px-4 py-0.5 rounded-md txt-compact-small text-ui-fg-subtle">7d</button>
          </div>
          <div className="flex-1" />
          <div className="flex items-center gap-2">
            <Input size="small" placeholder="Search" className="w-[160px]" />
          </div>
        </div>

      <div className="flex gap-4 items-start relative w-full">
        {[{ label: "Total completed", value: "3" }, { label: "Avg completion rate", value: "17%" }, { label: "Overdue", value: "5" }, { label: "On track", value: "10" }].map((s) => (
          <div
            className="bg-ui-bg-base flex flex-col flex-1 gap-4 min-w-[1px] overflow-clip p-6 relative rounded-xl shadow-elevation-card-rest text-ui-fg-base"
            key={s.label}
          >
            <p className="txt-compact-medium-plus">{s.label}</p>
            <p className="text-[32px] leading-[44px] tracking-[-0.16px] font-normal">{s.value}</p>
          </div>
        ))}
      </div>

      <div className="bg-ui-bg-base flex flex-col overflow-clip rounded-xl shadow-elevation-card-rest w-full">
        <Table>
          <Table.Header className="border-t-0">
            <Table.Row>
              <Table.HeaderCell>Report name</Table.HeaderCell>
              <Table.HeaderCell className="w-[200px]">Member</Table.HeaderCell>
              <Table.HeaderCell className="w-[160px]">Date range</Table.HeaderCell>
              <Table.HeaderCell className="w-[140px]">Generated on</Table.HeaderCell>
              <Table.HeaderCell className="w-7" />
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {reports.map((report) => {
              const member = MEMBERS.find((m) => m.id === report.memberId) ?? MEMBERS[0];
              return (
                <Table.Row key={report.id}>
                  <Table.Cell>
                  <span className="txt-compact-small">{report.report}</span>
                </Table.Cell>
                  <Table.Cell className="w-[200px]">
                  <span className="inline-flex items-center gap-2">
                      <ColorAvatar member={member} size="xsmall" />
                      <span className="text-ui-fg-base txt-compact-small">{member.name}</span>
                    </span>
                </Table.Cell>
                  <Table.Cell className="w-[160px]">
                  <p className="text-ui-fg-subtle txt-compact-small">{report.range}</p>
                </Table.Cell>
                  <Table.Cell className="w-[140px]">
                  <p className="text-ui-fg-subtle txt-compact-small">{report.generated}</p>
                </Table.Cell>
                  <Table.Cell className="w-7">
                  <IconButton variant="transparent" size="small">
                      <EllipsisHorizontal />
                    </IconButton>
                </Table.Cell>
                </Table.Row>
              );
            })}
          </Table.Body>
        </Table>
      </div>
    </div>
  );
}
