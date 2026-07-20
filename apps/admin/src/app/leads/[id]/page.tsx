import { db } from "@quantbridge/db";
import { accountLogs, accounts } from "@quantbridge/db/schema";
import { desc, eq } from "drizzle-orm";
import { notFound } from "next/navigation";
import { LeadForm } from "@/components/admin/lead-form";
import { LeadLogs } from "@/components/admin/lead-logs";

export default async function LeadDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const [lead] = await db.select().from(accounts).where(eq(accounts.id, id));

  if (!lead) {
    notFound();
  }

  const logs = await db
    .select()
    .from(accountLogs)
    .where(eq(accountLogs.accountId, id))
    .orderBy(desc(accountLogs.createdAt));

  return (
    <main className="mx-auto max-w-2xl px-6 py-10">
      <LeadForm lead={lead} />
      <LeadLogs accountId={id} logs={logs} />
    </main>
  );
}
