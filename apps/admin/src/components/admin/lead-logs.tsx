import type { accountLogs } from "@quantbridge/db/schema";
import { createLog } from "@/app/leads/[id]/actions";

type Log = typeof accountLogs.$inferSelect;

export function LeadLogs({
  accountId,
  logs,
}: {
  accountId: string;
  logs: Log[];
}) {
  const createLogWithId = createLog.bind(null, accountId);

  return (
    <div className="mt-6 rounded-xl border border-border bg-surface p-8">
      <h2 className="text-lg font-semibold tracking-tight">Notes</h2>

      <form action={createLogWithId} className="mt-4 space-y-2">
        <textarea
          name="logText"
          rows={3}
          required
          placeholder="Add a note about this lead..."
          className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm text-foreground placeholder:text-muted focus:border-accent focus:outline-none"
        />
        <button
          type="submit"
          className="rounded-md bg-accent px-4 py-2 text-sm font-medium text-accent-foreground transition-opacity hover:opacity-90"
        >
          Add note
        </button>
      </form>

      <ul className="mt-5 space-y-3">
        {logs.length === 0 ? (
          <p className="text-sm text-muted">No notes yet.</p>
        ) : (
          logs.map((log) => (
            <li
              key={log.id}
              className="rounded-md border border-border bg-background p-3"
            >
              <p className="whitespace-pre-wrap text-sm text-foreground">
                {log.logText}
              </p>
              <p className="mt-1 text-xs text-muted">
                {log.createdAt.toLocaleString()}
              </p>
            </li>
          ))
        )}
      </ul>
    </div>
  );
}
