import Link from "next/link";
import type { accounts } from "@quantbridge/db/schema";

type Lead = typeof accounts.$inferSelect;

const stageBadgeClass: Record<string, string> = {
  onboarding: "bg-accent-soft text-accent",
  active_engagement: "bg-accent-soft text-accent",
  at_risk: "bg-surface-hover text-muted",
  churned: "bg-surface-hover text-muted",
};

const sexLabels: Record<string, string> = {
  male: "Male",
  female: "Female",
  other: "Other",
  prefer_not_to_say: "Prefer not to say",
};

const backgroundLabels: Record<string, string> = {
  undergraduate_student: "Undergraduate Student",
  graduate_student: "Graduate Student",
  working_professional: "Working Professional",
  freelancer: "Freelancer",
  other: "Other",
};

export function LeadsTable({ leads }: { leads: Lead[] }) {
  if (leads.length === 0) {
    return (
      <p className="mt-6 text-sm text-muted">No leads yet.</p>
    );
  }

  return (
    <div className="mt-6 overflow-x-auto rounded-xl border border-border">
      <table className="w-full text-left text-sm">
        <thead className="border-b border-border bg-surface text-xs uppercase tracking-wide text-muted">
          <tr>
            <th className="px-4 py-3 font-medium">Name</th>
            <th className="px-4 py-3 font-medium">Email</th>
            <th className="px-4 py-3 font-medium">Country</th>
            <th className="px-4 py-3 font-medium">Sex</th>
            <th className="px-4 py-3 font-medium">Background</th>
            <th className="px-4 py-3 font-medium">School</th>
            <th className="px-4 py-3 font-medium">Major</th>
            <th className="px-4 py-3 font-medium">Grad. year</th>
            <th className="px-4 py-3 font-medium">Profession</th>
            <th className="px-4 py-3 font-medium">Stage</th>
            <th className="px-4 py-3 font-medium">Health</th>
            <th className="px-4 py-3 font-medium">Signed up</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-border">
          {leads.map((lead) => (
            <tr key={lead.id} className="hover:bg-surface-hover">
              <td className="px-4 py-3">
                <Link href={`/leads/${lead.id}`} className="hover:text-accent">
                  {lead.firstName} {lead.lastName}
                </Link>
              </td>
              <td className="px-4 py-3 text-muted">{lead.email}</td>
              <td className="px-4 py-3 text-muted">{lead.country ?? "—"}</td>
              <td className="px-4 py-3 text-muted">
                {lead.sex ? sexLabels[lead.sex] ?? lead.sex : "—"}
              </td>
              <td className="px-4 py-3 text-muted">
                {lead.background
                  ? backgroundLabels[lead.background] ?? lead.background
                  : "—"}
              </td>
              <td className="px-4 py-3 text-muted">{lead.school ?? "—"}</td>
              <td className="px-4 py-3 text-muted">{lead.major ?? "—"}</td>
              <td className="px-4 py-3 text-muted">
                {lead.graduationYear ?? "—"}
              </td>
              <td className="px-4 py-3 text-muted">
                {lead.profession ?? "—"}
              </td>
              <td className="px-4 py-3">
                <span
                  className={`rounded-full px-2 py-0.5 text-xs ${
                    stageBadgeClass[lead.lifecycleStage] ??
                    "bg-surface-hover text-muted"
                  }`}
                >
                  {lead.lifecycleStage}
                </span>
              </td>
              <td className="px-4 py-3 text-muted">{lead.healthScore ?? 0}</td>
              <td className="px-4 py-3 text-muted">
                {lead.createdAt.toLocaleDateString()}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
