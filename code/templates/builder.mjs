/**
 * builder.mjs — Section emitters for TSX pages
 *
 * Every Tailwind class traces to a mechanical source:
 *   R.xxx → snippet VariableID → tokens.json → token-maps.json
 *   L.xxx → snippet Figma API call → layout-maps.json
 *   No hardcoded values.
 */

import { R, L } from "./resolve.mjs";

// ── Cell renderers ──

const CELL = {
  title(field, iter) {
    return `<p className="${R.fgBase} ${R.txtCompactSmall}">{${iter}.${field}}</p>`;
  },

  "title+desc"(field, iter) {
    return `<p className="${R.fgBase} ${R.txtCompactSmall}">{${iter}.${field}}</p>`;
  },

  user(_field, iter) {
    return [
      `<span className="inline-flex ${L.itemsCenter} ${L.gap8}">`,
      `  <ColorAvatar member={member} size="xsmall" />`,
      `  <span className="${R.fgBase} ${R.txtCompactSmall}">{member.name}</span>`,
      `</span>`,
    ].join("\n                    ");
  },

  "badge:priority"(_field, iter) {
    return `<Badge color={PRIORITY_COLOR[${iter}.priority]} size="2xsmall" rounded="full">{${iter}.priority.charAt(0).toUpperCase() + ${iter}.priority.slice(1)}</Badge>`;
  },

  "badge:status"(_field, iter) {
    return [
      `<span className="inline-flex ${L.itemsCenter} gap-1.5">`,
      `  <span`,
      `    className="inline-block size-2 rounded-[2px] shrink-0 border border-black/[.12] dark:border-white/[.12]"`,
      `    style={{ backgroundColor: BAR_COLORS[${iter}.status] }}`,
      `  />`,
      `  <span className="${R.txtCompactSmall} ${R.fgSubtle}">{STATUS_LABEL[${iter}.status]}</span>`,
      `</span>`,
    ].join("\n                    ");
  },

  "subtle:due"(_field, iter) {
    return `<p className="${R.fgSubtle} ${R.txtCompactSmall}">{formatDate(${iter}.due)}</p>`;
  },

  subtle(field, iter) {
    return `<p className="${R.fgSubtle} ${R.txtCompactSmall}">{${iter}.${field}}</p>`;
  },

  base(field, iter, fieldMap) {
    const expr = fieldMap?.[field] || `${iter}.${field}`;
    return `<span className="${R.txtCompactSmall}">{${expr}}</span>`;
  },

  actions() {
    return [
      `<IconButton variant="transparent" size="small">`,
      `  <EllipsisHorizontal />`,
      `</IconButton>`,
    ].join("\n                    ");
  },
};

function renderCell(col, iterator, fieldMap) {
  const specific = `${col.type}:${col.field}`;
  const renderer = CELL[specific] || CELL[col.type];
  if (!renderer) return `{/* unknown cell type: ${col.type} */}`;
  return renderer(col.field, iterator, fieldMap);
}

// ── Section builders ──

export function statCards() {
  const imports = { named: {} };

  const setup = `const stats = [
    { label: "Total Tasks", value: total, error: false },
    { label: "In Progress", value: tasks.filter((t) => t.status === "in_progress").length, error: false },
    { label: "Completed", value: tasks.filter((t) => t.status === "done").length, error: false },
    { label: "Overdue", value: tasks.filter((t) => t.status !== "done" && isOverdue(t.due)).length, error: true },
  ];`;

  // statcards-snippet.js lines 89-97: row.layoutMode='HORIZONTAL', counterAxisSizingMode='AUTO',
  // setBoundVariable('itemSpacing', T.sp16), fills=[], clipsContent=false
  // lines 100-118: frame.layoutMode='VERTICAL', padding=sp24, itemSpacing=sp16, radius=r12,
  // fills=SOLID(bgBase), clipsContent=true, cardRest effect, layoutSizingHorizontal='FILL'
  const jsx = `<div className="${L.horiz} gap-${R.sp16} ${L.itemsStart} relative w-full">
        {stats.map((s) => (
          <div
            className="${R.bgBase} ${L.vert} ${L.fill} gap-${R.sp16} min-w-[1px] ${L.clip} ${L.p24} relative ${R.r12} ${R.cardRest} ${R.fgBase}"
            key={s.label}
          >
            <p className="${R.txtCompactMedPlus}">{s.label}</p>
            <p
              className={\`${R.H2} \${s.error ? "${R.fgError}" : "${R.fgBase}"}\`}
            >
              {s.value}
            </p>
          </div>
        ))}
      </div>`;

  return { jsx, setup, imports };
}

export function chartCards(config) {
  const { charts } = config;

  const imports = {
    named: {
      "@/lib/constants": ["PRIORITY_BAR_COLORS", "BAR_COLORS"],
    },
    types: ["Priority", "Status"],
  };

  const setup = charts.map((c) => {
    if (c.colorVar === "PRIORITY_BAR_COLORS") {
      return `const ${c.rowsVar}: { key: Priority; label: string }[] = [
    ${c.rows.map((r) => `{ key: "${r.key}", label: "${r.label}" }`).join(",\n    ")},
  ];`;
    }
    return `const ${c.rowsVar}: { key: Status; label: string }[] = [
    ${c.rows.map((r) => `{ key: "${r.key}", label: "${r.label}" }`).join(",\n    ")},
  ];`;
  }).join("\n\n  ");

  // chartcards-snippet.js lines 97-106: outer.layoutMode='HORIZONTAL', itemSpacing=sp16, fills=[]
  // lines 108-126: cardFrame.layoutMode='VERTICAL', padding=sp24, itemSpacing=sp16, radius=r12, bgBase, cardRest, FILL
  // lines 135-144: rows.layoutMode='VERTICAL', itemSpacing=sp16, fills=[], FILL
  // lines 158-168: labelRow.layoutMode='HORIZONTAL', counterAxisAlignItems='CENTER', itemSpacing=sp8, FILL
  // lines 179-192: track.layoutMode='NONE', radius=r4, trackBg fill, clipsContent=true, height=8
  const cards = charts.map((c) => `<div
          className="${R.bgBase} ${L.vert} ${L.fill} gap-${R.sp16} min-w-0 ${L.clip} ${L.p24} relative ${R.r12} ${R.cardRest}"
        >
          <p className="${R.fgBase} ${R.txtCompactMedPlus}">${c.title}</p>
          <div className="${L.vert} gap-${R.sp16} w-full">
            {${c.rowsVar}.map((row) => {
              const count = tasks.filter((t) => t.${c.filterField} === row.key).length;
              return (
                <div key={row.key} className="${L.horiz} ${L.gap8} ${L.itemsCenter} w-full">
                  <p className="${R.fgSubtle} ${L.w88} ${R.txtCompactSmall}">{row.label}</p>
                  <div className="${R.trackBg} ${L.fill} ${L.h8} min-w-[1px] ${L.clip} ${R.r4}">
                    <div
                      className="h-full ${R.r4}"
                      style={{
                        width: \`\${Math.round((count / total) * 100)}%\`,
                        backgroundColor: ${c.colorVar}[row.key],
                      }}
                    />
                  </div>
                  <p className="${R.fgBase} ${R.txtCompactSmallPlus}">{count}</p>
                </div>
              );
            })}
          </div>
        </div>`);

  // outer frame: layoutMode='HORIZONTAL', itemSpacing=sp16, fills=[]
  const jsx = `<div className="${L.horiz} gap-${R.sp16} ${L.itemsStart} relative w-full">
        ${cards.join("\n\n        ")}
      </div>`;

  return { jsx, setup, imports };
}

export function tableBlock(config) {
  const { columns, title, dataVar, iterator, keyExpr, rowSetup, pageSize, fieldMap } = config;

  const imports = {
    named: {
      "@medusajs/ui": ["Table", "Badge", "IconButton"],
      "@medusajs/icons": ["EllipsisHorizontal"],
    },
  };

  const hasUser = columns.some((c) => c.type === "user");
  const hasBadgePriority = columns.some((c) => c.type === "badge" && c.field === "priority");
  const hasBadgeStatus = columns.some((c) => c.type === "badge" && c.field === "status");
  const hasDue = columns.some((c) => c.field === "due");

  if (hasUser) {
    imports.named["@/components/ColorAvatar"] = ["ColorAvatar"];
    imports.named["@/lib/data"] = imports.named["@/lib/data"] || [];
    imports.named["@/lib/data"].push("MEMBERS");
  }
  if (hasBadgePriority) {
    imports.named["@/lib/constants"] = imports.named["@/lib/constants"] || [];
    imports.named["@/lib/constants"].push("PRIORITY_COLOR");
  }
  if (hasBadgeStatus) {
    imports.named["@/lib/constants"] = imports.named["@/lib/constants"] || [];
    imports.named["@/lib/constants"].push("BAR_COLORS", "STATUS_LABEL");
  }
  if (hasDue) {
    imports.named["@/lib/utils"] = imports.named["@/lib/utils"] || [];
    imports.named["@/lib/utils"].push("formatDate");
  }

  const headerCells = columns
    .filter((c) => c.type !== "actions")
    .map((c) => {
      const w = c.width && c.width !== "FILL" ? ` className="w-[${c.width}px]"` : "";
      return `<Table.HeaderCell${w}>${c.header}</Table.HeaderCell>`;
    });
  headerCells.push(`<Table.HeaderCell className="w-7" />`);

  const bodyCells = columns.map((c) => {
    if (c.type === "actions") {
      return `<Table.Cell className="w-7">
                  ${renderCell(c, iterator, fieldMap)}
                </Table.Cell>`;
    }
    const w = c.width && c.width !== "FILL" ? ` className="w-[${c.width}px]"` : "";
    return `<Table.Cell${w}>
                  ${renderCell(c, iterator, fieldMap)}
                </Table.Cell>`;
  });

  // table-snippet.js lines 265-283: card.layoutMode='VERTICAL', padding=sp0, radius=r12, bgBase, cardRest, clipsContent=true
  // lines 286-306: titleWrap.layoutMode='HORIZONTAL', paddingTop=24, paddingBottom=16, paddingLeft=24, paddingRight=24
  const titleBlock = title
    ? `\n        <div className="${L.pb16} ${L.pt24} ${L.px24}">
          <p className="${R.fgBase} ${R.txtCompactMedPlus}">${title}</p>
        </div>`
    : "";

  const rowSetupLine = rowSetup ? `\n              ${rowSetup}` : "";

  if (pageSize) {
    imports.named["react"] = imports.named["react"] || [];
    imports.named["react"].push("useState");
  }

  const paginationSetup = pageSize
    ? `const [page, setPage] = useState(0);
  const pageCount = Math.ceil(${dataVar}.length / ${pageSize});
  const paged${capitalize(dataVar)} = ${dataVar}.slice(page * ${pageSize}, (page + 1) * ${pageSize});`
    : "";

  const loopVar = pageSize ? `paged${capitalize(dataVar)}` : dataVar;

  const jsx = `<div className="${R.bgBase} ${L.vert} ${L.clip} ${R.r12} ${R.cardRest} w-full">${titleBlock}
        <Table>
          <Table.Header className="border-t-0">
            <Table.Row>
              ${headerCells.join("\n              ")}
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {${loopVar}.map((${iterator}) => {${rowSetupLine}
              return (
                <Table.Row key={${keyExpr}}>
                  ${bodyCells.join("\n                  ")}
                </Table.Row>
              );
            })}
          </Table.Body>
        </Table>
      </div>`;

  return { jsx, setup: paginationSetup || null, imports };
}

export function settingsBlock(view, config) {
  const imports = {
    named: {
      react: ["useState"],
      "@medusajs/ui": ["Table"],
    },
  };

  const tabs = view.tabs || [];
  const tabKeys = tabs.map((t) => t.toLowerCase());

  const setup = `const [activeTab, setActiveTab] = useState("${tabKeys[0]}");`;

  // settings-snippet.js lines 217-239: nav tab items
  // layoutMode='HORIZONTAL', FIXED×AUTO, padding 10/10/16/16, counterAxisAlignItems='CENTER'
  // active: bgSubtle fill, strokeLeftWeight=2 (border-l-2), fgBase stroke
  const navItems = tabs
    .map((t) => {
      const key = t.toLowerCase();
      return `<button
                key="${key}"
                onClick={() => setActiveTab("${key}")}
                className={\`${L.horiz} ${L.itemsCenter} w-full ${L.px16} ${L.py10} text-left transition-colors \${
                  activeTab === "${key}"
                    ? "${R.bgSubtle} border-l-2 border-ui-fg-base ${R.txtCompactSmallPlus} ${R.fgBase}"
                    : "${R.txtCompactSmall} ${R.fgSubtle} hover:bg-ui-bg-subtle-hover"
                }\`}
              >
                ${t}
              </button>`;
    })
    .join("\n              ");

  // settings-snippet.js lines 283-294: avatarRow.dir='HORIZONTAL', itemSpacing=12, counterAxisAlignItems='CENTER'
  // avatarInfo: VERTICAL, itemSpacing=2
  const profilePanel = `<>
              <div className="${L.horiz} ${L.itemsCenter} ${L.gap12}">
                <div className="size-16 rounded-full ${R.bgSubtle} ${L.clip} ${R.cardRest}">
                  <img src={user.avatar} alt={user.name} className="size-full object-cover" />
                </div>
                <div className="${L.vert} ${L.gap2}">
                  <span className="${R.txtCompactMedPlus} ${R.fgBase}">{user.name}</span>
                  <span className="${R.txtCompactSmall} ${R.fgSubtle}">Click to change photo</span>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-x-${R.sp16} ${L.gap20}">
                <div className="${L.vert} ${L.gap6}">
                  <Label size="small">Full name</Label>
                  <Input size="small" defaultValue={user.name} />
                </div>
                <div className="${L.vert} ${L.gap6}">
                  <Label size="small">Email</Label>
                  <Input size="small" defaultValue={user.email} />
                </div>
                <div className="${L.vert} ${L.gap6}">
                  <Label size="small">Job title</Label>
                  <Input size="small" defaultValue={user.role} />
                </div>
                <div className="${L.vert} ${L.gap6}">
                  <Label size="small">Phone</Label>
                  <Input size="small" defaultValue="+1 (555) 000-0000" />
                </div>
                <div className="${L.vert} ${L.gap6}">
                  <Label size="small">Location</Label>
                  <Input size="small" defaultValue="San Francisco, CA" />
                </div>
                <div className="${L.vert} ${L.gap6}">
                  <Label size="small">Time zone</Label>
                  <Input size="small" defaultValue="Pacific Time (UTC-8)" />
                </div>
              </div>
              <div className="${L.horiz} ${L.justifyEnd}">
                <Button size="small">Save changes</Button>
              </div>
            </>`;

  // settings-snippet.js lines 370-403: toggleRow.dir='HORIZONTAL', primaryAxisAlignItems='SPACE_BETWEEN',
  // counterAxisAlignItems='CENTER'; info: VERTICAL, itemSpacing=4
  const togglePanel = (dataVar) => `<>
              {${dataVar}.map((t, i) => (
                <div key={t.label}>
                  <div className="${L.horiz} ${L.itemsCenter} ${L.justifyBetween} ${L.py8}">
                    <div className="${L.vert} ${L.gap4}">
                      <span className="${R.txtCompactSmallPlus} ${R.fgBase}">{t.label}</span>
                      <span className="${R.txtCompactSmall} ${R.fgSubtle}">{t.desc}</span>
                    </div>
                    <Switch defaultChecked={t.on} />
                  </div>
                  {i < ${dataVar}.length - 1 && <div className="border-t border-ui-border-base" />}
                </div>
              ))}
              <div className="${L.horiz} ${L.justifyEnd} ${L.pt8}">
                <Button size="small">Save changes</Button>
              </div>
            </>`;

  // settings-snippet.js lines 479-488: planCard cornerRadius=8, bgBase, cardRest, padding 20/20/24/24, itemSpacing=4
  // lines 490-494: planHeader.dir='HORIZONTAL', SPACE_BETWEEN, CENTER
  // lines 520-524: payRow.dir='HORIZONTAL', SPACE_BETWEEN, CENTER, padding 8/8
  const billingPanel = `<>
              <div className="${R.bgBase} ${L.r8} ${R.cardRest} ${L.p20} ${L.vert} ${L.gap4}">
                <div className="${L.horiz} ${L.itemsCenter} ${L.justifyBetween}">
                  <span className="${R.txtCompactSmallPlus} ${R.fgBase}">{BILLING.plan.name}</span>
                  <Button variant="secondary" size="small">{BILLING.plan.action}</Button>
                </div>
                <span className="text-2xl font-normal ${R.fgBase}">{BILLING.plan.price}</span>
                <span className="${R.txtCompactSmall} ${R.fgSubtle}">{BILLING.plan.renews}</span>
              </div>
              <div className="${L.horiz} ${L.itemsCenter} ${L.justifyBetween} ${L.py8}">
                <div className="${L.vert} ${L.gap4}">
                  <span className="${R.txtCompactSmallPlus} ${R.fgBase}">{BILLING.payment.label}</span>
                  <span className="${R.txtCompactSmall} ${R.fgSubtle}">{BILLING.payment.value}</span>
                </div>
                <Button variant="secondary" size="small">{BILLING.payment.action}</Button>
              </div>
              <div className="${R.bgBase} ${R.r12} ${R.cardRest} ${L.clip}">
                <div className="${L.px24} ${L.pt24} ${L.pb16}">
                  <span className="${R.txtCompactMedPlus} ${R.fgBase}">Billing history</span>
                </div>
                <Table>
                  <Table.Header className="border-t-0">
                    <Table.Row>
                      <Table.HeaderCell>Date</Table.HeaderCell>
                      <Table.HeaderCell>Description</Table.HeaderCell>
                      <Table.HeaderCell className="${L.w120}">Amount</Table.HeaderCell>
                    </Table.Row>
                  </Table.Header>
                  <Table.Body>
                    {BILLING.history.map((h) => (
                      <Table.Row key={h.date}>
                        <Table.Cell><span className="${R.txtCompactSmall} ${R.fgSubtle}">{h.date}</span></Table.Cell>
                        <Table.Cell><span className="${R.txtCompactSmall} ${R.fgBase}">{h.desc}</span></Table.Cell>
                        <Table.Cell className="${L.w120}"><span className="${R.txtCompactSmall} ${R.fgSubtle}">{h.amount}</span></Table.Cell>
                      </Table.Row>
                    ))}
                  </Table.Body>
                </Table>
              </div>
            </>`;

  const tabTitles = { profile: "Profile", notifications: "Notifications", security: "Security", billing: "Billing" };

  // settings-snippet.js lines 200-202: root.dir='HORIZONTAL', itemSpacing=24, fills=[]
  // lines 206-215: nav.resize(240), cornerRadius=8, bgBase, cardRest, clipsContent=true, padding 8/8
  // lines 243-251: card.cornerRadius=8, bgBase, cardRest, FILL, clipsContent=true
  // lines 254-258: cardHeader padding 12/12/24/24, itemSpacing=4
  // lines 271-275: cardBody padding 24, itemSpacing=20
  const jsx = `<div className="${L.horiz} ${L.gap24}">
        {/* Left nav */}
        <div className="${L.w240} shrink-0 self-start ${R.bgBase} ${L.r8} ${R.cardRest} ${L.clip} ${L.py8}">
          ${navItems}
        </div>

        {/* Right content card */}
        <div className="${L.fill} min-w-0 ${R.bgBase} ${L.r8} ${R.cardRest} ${L.clip}">
          <div className="${L.px24} ${L.py12} border-b border-ui-border-base">
            <h3 className="${R.txtCompactMedPlus} ${R.fgBase}">
              {${JSON.stringify(tabTitles)}[activeTab]}
            </h3>
          </div>
          <div className="${L.p24} ${L.vert} ${L.gap20}">
            {activeTab === "profile" && (
              ${profilePanel}
            )}
            {activeTab === "notifications" && (
              ${togglePanel("NOTIFICATION_TOGGLES")}
            )}
            {activeTab === "security" && (
              ${togglePanel("SECURITY_TOGGLES")}
            )}
            {activeTab === "billing" && (
              ${billingPanel}
            )}
          </div>
        </div>
      </div>`;

  return { jsx, setup, imports };
}

// ── Controls bar (controls-snippet.js) ──

export function controlsBar(config) {
  const { tabs, activeTab, tabLinks, filters, showSort, showSearch } = config;

  const imports = { named: {} };
  const iconImports = [];

  const ICON_MAP = {
    funnel: "Funnel",
    calendarMini: "CalendarMini",
    adjustments: "AdjustmentsDone",
  };

  if (tabLinks) {
    imports.named["next/link"] = ["default as Link"];
  }
  if (filters?.length) {
    imports.named["@medusajs/ui"] = imports.named["@medusajs/ui"] || [];
    imports.named["@medusajs/ui"].push("Button");
    for (const f of filters) {
      if (f.icon && ICON_MAP[f.icon]) iconImports.push(ICON_MAP[f.icon]);
    }
  }
  if (showSort) {
    imports.named["@medusajs/ui"] = imports.named["@medusajs/ui"] || [];
    imports.named["@medusajs/ui"].push("IconButton");
    iconImports.push("BarsArrowDown");
  }
  if (showSearch) {
    imports.named["@medusajs/ui"] = imports.named["@medusajs/ui"] || [];
    imports.named["@medusajs/ui"].push("Input");
  }
  if (iconImports.length) {
    imports.named["@medusajs/icons"] = iconImports;
  }

  const jsxParts = [];

  // controls-snippet.js lines 96-117: segment control tabs
  if (tabs?.length) {
    const tabItems = tabs.map((t) => {
      const isActive = t === activeTab;
      const cls = isActive
        ? `${R.bgBase} ${R.cardRest} ${R.txtCompactSmallPlus} ${R.fgBase}`
        : `${R.txtCompactSmall} ${R.fgSubtle}`;
      const href = tabLinks?.[t];
      if (href) {
        return `<Link key="${t}" href="${href}" scroll={false} className="${L.px16} ${L.py2} rounded-md ${cls}">${t}</Link>`;
      }
      return `<button key="${t}" className="${L.px16} ${L.py2} rounded-md ${cls}">${t}</button>`;
    }).join("\n            ");

    jsxParts.push(`<div className="inline-flex ${L.itemsCenter} ${R.bgSubtle} rounded-lg p-0.5 gap-0.5">
            ${tabItems}
          </div>`);
  }

  // controls-snippet.js lines 120-125: spacer with layoutGrow=1
  jsxParts.push(`<div className="${L.fill}" />`);

  // controls-snippet.js lines 128-137: right actions, HORIZONTAL, itemSpacing=sp8, CENTER
  const rightParts = [];

  if (filters?.length) {
    for (const f of filters) {
      const iconName = f.icon && ICON_MAP[f.icon] ? ICON_MAP[f.icon] : null;
      const iconJsx = iconName ? `<${iconName} /> ` : "";
      rightParts.push(`<Button variant="secondary" size="small">${iconJsx}${f.label}</Button>`);
    }
  }

  // controls-snippet.js lines 165-171: sort icon button
  if (showSort) {
    rightParts.push(`<IconButton variant="transparent" size="small"><BarsArrowDown /></IconButton>`);
  }

  // controls-snippet.js lines 174-180: search input, resize(160, 28)
  if (showSearch) {
    rightParts.push(`<Input size="small" placeholder="Search" className="w-[160px]" />`);
  }

  jsxParts.push(`<div className="${L.horiz} ${L.itemsCenter} ${L.gap8}">
            ${rightParts.join("\n            ")}
          </div>`);

  const jsx = `<div className="${L.horiz} ${L.itemsCenter} w-full">
          ${jsxParts.join("\n          ")}
        </div>`;

  return { jsx, setup: null, imports };
}

// ── Kanban board (kanban-snippet.js) ──

export function kanbanBoard() {
  const imports = {
    named: {
      "@medusajs/ui": ["Badge"],
      "@/components/ColorAvatar": ["ColorAvatar"],
      "@/lib/data": ["MEMBERS"],
      "@/lib/constants": ["BAR_COLORS", "PRIORITY_COLOR"],
      "@/lib/utils": ["formatDueDate", "isOverdue"],
    },
  };

  // kanban-snippet.js lines 12-17: status definitions
  const setup = `const STATUSES: { key: Status; label: string }[] = [
    { key: "todo", label: "To Do" },
    { key: "in_progress", label: "In Progress" },
    { key: "in_review", label: "In Review" },
    { key: "done", label: "Done" },
  ];`;

  // kanban-snippet.js lines 157-165: board HORIZONTAL, itemSpacing=sp16, fills=[]
  // lines 171-187: col VERTICAL, itemSpacing=sp8, padding=sp8, radius=r12, bgKanban, layoutGrow=1
  // lines 190-201: header HORIZONTAL, itemSpacing=6, py=4, CENTER, FILL
  // lines 233-251: card VERTICAL, itemSpacing=sp12, padding=sp12, radius=r8, bgBase, cardRest, FILL
  // lines 273-283: meta HORIZONTAL, itemSpacing=6, CENTER, FILL
  // MCP reference: board=size-full, col=size-full, spacer=flex-[1_0_0] h-px min-w-px, desc=min-w-full overflow-hidden text-ellipsis whitespace-nowrap
  const jsx = `<div className="${L.horiz} ${L.gap16} w-full h-full min-h-0">
        {STATUSES.map((status) => {
          const columnTasks = tasks.filter((t) => t.status === status.key);
          return (
            <div key={status.key} className="${L.vert} ${L.fill} ${L.gap8} ${L.p8} ${R.r12} ${R.bgKanban} min-w-0">
              <div className="${L.horiz} ${L.itemsCenter} ${L.gap6} ${L.py4} ${L.clip} w-full shrink-0">
                <span
                  className="inline-block size-2 rounded-[2px] shrink-0 border border-black/[.12] dark:border-white/[.12]"
                  style={{ backgroundColor: BAR_COLORS[status.key] }}
                />
                <span className="${R.txtCompactMedPlus} ${R.fgBase}">{status.label}</span>
                <span className="flex-[1_0_0] h-px min-w-px" />
                <span className="${R.txtCompactMed} ${R.fgMuted}">{columnTasks.length}</span>
              </div>
              {columnTasks.map((task) => {
                const member = MEMBERS.find((m) => m.id === task.assignee) ?? MEMBERS[0];
                return (
                  <div key={task.id} className="${L.vert} ${L.gap12} ${L.p12} ${L.r8} ${R.bgBase} ${R.cardRest} shrink-0">
                    <p className="${R.txtCompactMedPlus} ${R.fgBase}">{task.title}</p>
                    <p className="${R.txtCompactMed} ${R.fgMuted} w-full truncate">{task.desc}</p>
                    <div className="${L.horiz} ${L.itemsCenter} ${L.gap6} w-full">
                      <ColorAvatar member={member} size="xsmall" />
                      <span className="text-xs ${R.fgSubtle} shrink-0">{member.name.split(" ")[0]}</span>
                      <span className="flex-[1_0_0] h-px min-w-px" />
                      <span className={\`text-xs shrink-0 \${isOverdue(task.due) && task.status !== "done" ? "${R.fgError}" : "${R.fgSubtle}"}\`}>
                        {formatDueDate(task.due)}
                      </span>
                      <Badge color={PRIORITY_COLOR[task.priority]} size="2xsmall" rounded="full">
                        {task.priority.charAt(0).toUpperCase() + task.priority.slice(1)}
                      </Badge>
                    </div>
                  </div>
                );
              })}
            </div>
          );
        })}
      </div>`;

  return { jsx, setup, imports };
}

// ── Report stat cards (variant of statcards-snippet.js for reports) ──

export function reportStats(config) {
  const { stats } = config;

  const imports = { named: {} };

  const items = stats.map((s) => `{ label: "${s.label}", value: "${s.value}" }`).join(", ");

  // Same card layout as statcards-snippet.js but with static values
  const jsx = `<div className="${L.horiz} gap-${R.sp16} ${L.itemsStart} relative w-full">
        {[${items}].map((s) => (
          <div
            className="${R.bgBase} ${L.vert} ${L.fill} gap-${R.sp16} min-w-[1px] ${L.clip} ${L.p24} relative ${R.r12} ${R.cardRest} ${R.fgBase}"
            key={s.label}
          >
            <p className="${R.txtCompactMedPlus}">{s.label}</p>
            <p className="${R.H2}">{s.value}</p>
          </div>
        ))}
      </div>`;

  return { jsx, setup: null, imports };
}

function capitalize(s) {
  return s.charAt(0).toUpperCase() + s.slice(1);
}
