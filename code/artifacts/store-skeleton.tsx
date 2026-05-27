/**
 * Store Reference — interface contract for pages to depend on.
 * Shows what the store must export, not how to build it.
 *
 * Pages import: useStore() → { state, dispatch }
 * Layout imports: StoreProvider
 */

// ── State Shape ──
// AppState {
//   tasks: Task[]
//   members: Member[]
//   reports: Report[]
// }

// ── Actions ──
// ADD_TASK     → { type, task: Task }
// UPDATE_TASK  → { type, task: Task }
// DELETE_TASK  → { type, id: number }
// MOVE_TASK    → { type, id: number, status: Status }
// ADD_MEMBER   → { type, member: Member }
// ADD_REPORT   → { type, report: Report }

// ── Exports ──
// StoreProvider — wraps children in context, initializes from:
//   INITIAL_TASKS, MEMBERS, INITIAL_REPORTS (from @/lib/data)
//
// useStore() — returns { state, dispatch }
//   Throws if called outside StoreProvider

export {};
