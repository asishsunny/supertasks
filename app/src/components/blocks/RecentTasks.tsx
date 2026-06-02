import { Table, Badge, IconButton } from "@medusajs/ui";
import { EllipsisHorizontal } from "@medusajs/icons";

interface TableColumn {
  key: string;
  header: string;
  width?: string;
  type?: "text" | "badge" | "avatar" | "date";
}

interface TableRow {
  id: string | number;
  [key: string]: unknown;
}

export interface RecentTasksProps {
  title?: string;
  columns?: TableColumn[];
  rows?: TableRow[];
}

const DEFAULT_TITLE = "Recent Tasks";

export function RecentTasks({
  title = DEFAULT_TITLE,
  columns,
  rows,
}: RecentTasksProps) {
  return (
    <div className="bg-ui-bg-base flex flex-col gap-0 overflow-clip p-0 relative rounded-xl shadow-elevation-card-rest shrink-0 w-full">
      <div className="flex items-start overflow-clip pb-4 pt-6 px-6 relative shrink-0 w-full">
        <p className="relative shrink-0 text-ui-fg-base txt-compact-medium-plus">
          {title}
        </p>
      </div>
      {columns && columns.length > 0 && (
        <Table>
          <Table.Header className="border-t-0">
            <Table.Row>
              {columns.map((col) => (
                <Table.HeaderCell key={col.key} className={col.width ? `w-[${col.width}]` : undefined}>
                  {col.header}
                </Table.HeaderCell>
              ))}
              <Table.HeaderCell className="w-7" />
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {rows?.map((row) => (
              <Table.Row key={row.id}>
                {columns.map((col) => (
                  <Table.Cell key={col.key} className={col.width ? `w-[${col.width}]` : undefined}>
                    {col.type === "badge" ? (
                      <Badge
                        color={(row[`${col.key}Color`] as "green" | "grey" | "blue" | "red" | "orange" | "purple") ?? "grey"}
                        size="2xsmall"
                        rounded="full"
                      >
                        {String(row[col.key] ?? "")}
                      </Badge>
                    ) : col.type === "avatar" ? (
                      <span className="inline-flex items-center gap-2">
                        <p className="relative shrink-0 text-ui-fg-base txt-compact-small">
                          {String(row[col.key] ?? "")}
                        </p>
                      </span>
                    ) : col.type === "date" ? (
                      <p className="relative shrink-0 text-ui-fg-subtle txt-compact-small">
                        {String(row[col.key] ?? "")}
                      </p>
                    ) : (
                      <p className="relative shrink-0 text-ui-fg-base txt-compact-small">
                        {String(row[col.key] ?? "")}
                      </p>
                    )}
                  </Table.Cell>
                ))}
                <Table.Cell>
                  <IconButton variant="transparent" size="small">
                    <EllipsisHorizontal />
                  </IconButton>
                </Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
      )}
    </div>
  );
}
