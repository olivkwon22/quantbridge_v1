"use client";

import Link from "next/link";
import { useActionState } from "react";
import type { accounts } from "@quantbridge/db/schema";
import {
  deleteLead,
  updateLead,
  type UpdateLeadState,
} from "@/app/leads/[id]/actions";

type Lead = typeof accounts.$inferSelect;

const initialUpdateLeadState: UpdateLeadState = { status: "idle" };

const inputClass =
  "w-full rounded-md border border-border bg-background px-3 py-2 text-sm text-foreground placeholder:text-muted focus:border-accent focus:outline-none";
const labelClass = "mb-1.5 block text-sm font-medium text-foreground";

const lifecycleStages = [
  "onboarding",
  "active_engagement",
  "at_risk",
  "churned",
];

export function LeadForm({ lead }: { lead: Lead }) {
  const updateLeadWithId = updateLead.bind(null, lead.id);
  const deleteLeadWithId = deleteLead.bind(null, lead.id);

  const [state, formAction, pending] = useActionState(
    updateLeadWithId,
    initialUpdateLeadState,
  );

  return (
    <div>
      <Link href="/" className="text-sm text-muted hover:text-accent">
        &larr; Back to leads
      </Link>

      <div className="mt-4 rounded-xl border border-border bg-surface p-8">
        <h1 className="text-xl font-semibold tracking-tight">
          {lead.firstName} {lead.lastName}
        </h1>
        <p className="mt-1 text-sm text-muted">
          Signed up {lead.createdAt.toLocaleString()}
          {lead.utmSource ? ` · via ${lead.utmSource}` : ""}
          {lead.utmCampaign ? ` (${lead.utmCampaign})` : ""}
        </p>

        <form action={formAction} className="mt-6 space-y-5">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="firstName" className={labelClass}>
                First name
              </label>
              <input
                id="firstName"
                name="firstName"
                type="text"
                defaultValue={lead.firstName}
                className={inputClass}
              />
            </div>
            <div>
              <label htmlFor="lastName" className={labelClass}>
                Last name
              </label>
              <input
                id="lastName"
                name="lastName"
                type="text"
                defaultValue={lead.lastName}
                className={inputClass}
              />
            </div>
          </div>

          <div>
            <label htmlFor="email" className={labelClass}>
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              defaultValue={lead.email}
              className={inputClass}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="country" className={labelClass}>
                Country
              </label>
              <input
                id="country"
                name="country"
                type="text"
                defaultValue={lead.country ?? ""}
                className={inputClass}
              />
            </div>
            <div>
              <label htmlFor="sex" className={labelClass}>
                Sex
              </label>
              <select
                id="sex"
                name="sex"
                defaultValue={lead.sex ?? ""}
                className={inputClass}
              >
                <option value="" disabled>
                  Select one
                </option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
                <option value="prefer_not_to_say">Prefer not to say</option>
              </select>
            </div>
          </div>

          <div>
            <label htmlFor="background" className={labelClass}>
              Background
            </label>
            <select
              id="background"
              name="background"
              defaultValue={lead.background ?? ""}
              className={inputClass}
            >
              <option value="" disabled>
                Select one
              </option>
              <option value="undergraduate_student">
                Undergraduate Student
              </option>
              <option value="graduate_student">Graduate Student</option>
              <option value="working_professional">
                Working Professional
              </option>
              <option value="freelancer">Freelancer</option>
              <option value="other">Other</option>
            </select>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="school" className={labelClass}>
                School
              </label>
              <input
                id="school"
                name="school"
                type="text"
                defaultValue={lead.school ?? ""}
                className={inputClass}
              />
            </div>
            <div>
              <label htmlFor="major" className={labelClass}>
                Major
              </label>
              <input
                id="major"
                name="major"
                type="text"
                defaultValue={lead.major ?? ""}
                className={inputClass}
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="graduationYear" className={labelClass}>
                Graduation year
              </label>
              <input
                id="graduationYear"
                name="graduationYear"
                type="number"
                defaultValue={lead.graduationYear ?? ""}
                className={inputClass}
              />
            </div>
            <div>
              <label htmlFor="profession" className={labelClass}>
                Profession
              </label>
              <input
                id="profession"
                name="profession"
                type="text"
                defaultValue={lead.profession ?? ""}
                className={inputClass}
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="lifecycleStage" className={labelClass}>
                Lifecycle stage
              </label>
              <select
                id="lifecycleStage"
                name="lifecycleStage"
                defaultValue={lead.lifecycleStage}
                className={inputClass}
              >
                {lifecycleStages.map((stage) => (
                  <option key={stage} value={stage}>
                    {stage}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label htmlFor="healthScore" className={labelClass}>
                Health score
              </label>
              <input
                id="healthScore"
                name="healthScore"
                type="number"
                defaultValue={lead.healthScore ?? 0}
                className={inputClass}
              />
            </div>
          </div>

          {state.status === "error" && (
            <p className="text-sm text-red-400">{state.message}</p>
          )}

          <div className="flex items-center justify-between pt-2">
            <button
              type="submit"
              disabled={pending}
              className="rounded-md bg-accent px-4 py-2.5 text-sm font-medium text-accent-foreground transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {pending ? "Saving..." : "Save changes"}
            </button>
          </div>
        </form>

        <form
          action={deleteLeadWithId}
          onSubmit={(event) => {
            if (
              !confirm(
                `Delete ${lead.firstName} ${lead.lastName}? This cannot be undone.`,
              )
            ) {
              event.preventDefault();
            }
          }}
          className="mt-6 border-t border-border pt-6"
        >
          <button
            type="submit"
            className="rounded-md border border-red-400/40 px-4 py-2 text-sm text-red-400 transition-colors hover:bg-red-400/10"
          >
            Delete lead
          </button>
        </form>
      </div>
    </div>
  );
}
