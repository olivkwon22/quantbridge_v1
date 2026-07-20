import { db } from "@quantbridge/db";
import { accounts } from "@quantbridge/db/schema";
import { desc } from "drizzle-orm";
import { LeadsTable } from "@/components/admin/leads-table";
import { LogoutButton } from "@/components/admin/logout-button";

export const dynamic = "force-dynamic";

export default async function LeadsPage() {
  const leads = await db
    .select()
    .from(accounts)
    .orderBy(desc(accounts.createdAt));

  return (
    <main className="mx-auto max-w-6xl px-6 py-10">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-semibold tracking-tight">Leads</h1>
          <p className="mt-1 text-sm text-muted">
            {leads.length} lead{leads.length === 1 ? "" : "s"} from the
            signup pipeline.
          </p>
        </div>
        <LogoutButton />
      </div>

      <LeadsTable leads={leads} />
    </main>
  );
}
