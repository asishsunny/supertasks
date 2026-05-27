/**
 * Data binding — auto-detect data.yaml values in JSX text and bind to expressions.
 */

export function createBinder(data) {
  const VALUE_TO_BINDING = new Map();

  function indexCollection(items, collectionName, iterator) {
    if (!Array.isArray(items)) return;
    for (const item of items) {
      for (const [key, val] of Object.entries(item)) {
        if (typeof val === "string" && val.length > 1 && key !== "id" && !key.includes("icon") && !key.includes("avatar") && !key.includes("_bg") && !key.includes("_text") && !key.includes("_border")) {
          VALUE_TO_BINDING.set(val, { expr: `${iterator}.${key}`, iterator, collection: collectionName, type: "field" });
        }
      }
    }
  }

  indexCollection(data.members, "members", "member");
  indexCollection(data.tasks, "tasks", "task");
  indexCollection(data.reports, "reports", "report");
  indexCollection(data.activity, "activity", "activity");

  for (const key of ["low", "medium", "high", "critical"]) {
    const label = key.charAt(0).toUpperCase() + key.slice(1);
    VALUE_TO_BINDING.set(label, { expr: "task.priority", iterator: "task", collection: "tasks", type: "badge" });
  }
  for (const [key, label] of [["todo", "To Do"], ["in_progress", "In Progress"], ["in_review", "In Review"], ["done", "Done"]]) {
    VALUE_TO_BINDING.set(label, { expr: "STATUS_LABEL[task.status]", iterator: "task", collection: "tasks", type: "status" });
  }

  function resolveBinding(text) {
    const exact = VALUE_TO_BINDING.get(text);
    if (exact) return exact;
    if (/^[A-Z][a-z]{2}\s+\d{1,2},\s+\d{4}$/.test(text))
      return { expr: "formatDate(task.due)", iterator: "task", collection: "tasks", type: "formatted" };
    if (/^[A-Z][a-z]{2}\s+\d{1,2}\s+[–—-]\s+[A-Z][a-z]{2}\s+\d{1,2}$/.test(text))
      return { expr: "report.range", iterator: "report", collection: "reports", type: "field" };
    if (/^\d+h\s+ago$/.test(text) || text === "Yesterday")
      return { expr: "activity.time", iterator: "activity", collection: "activity", type: "field" };
    return null;
  }

  return { resolveBinding, VALUE_TO_BINDING };
}
