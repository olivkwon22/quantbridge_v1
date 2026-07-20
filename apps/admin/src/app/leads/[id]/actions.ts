"use server";

import { db } from "@quantbridge/db";
import { accountLogs, accounts } from "@quantbridge/db/schema";
import { eq } from "drizzle-orm";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";

export type UpdateLeadState = {
  status: "idle" | "error";
  message?: string;
};

function readOptionalString(formData: FormData, key: string) {
  const value = formData.get(key)?.toString().trim();
  return value ? value : null;
}

export async function updateLead(
  id: string,
  _prevState: UpdateLeadState,
  formData: FormData,
): Promise<UpdateLeadState> {
  const firstName = formData.get("firstName")?.toString().trim();
  const lastName = formData.get("lastName")?.toString().trim();
  const email = formData.get("email")?.toString().trim();
  const lifecycleStage = formData.get("lifecycleStage")?.toString().trim();

  if (!firstName || !lastName || !email || !lifecycleStage) {
    return {
      status: "error",
      message: "First name, last name, email, and lifecycle stage are required.",
    };
  }

  const graduationYearRaw = formData.get("graduationYear")?.toString().trim();
  const graduationYear = graduationYearRaw ? Number(graduationYearRaw) : null;

  const healthScoreRaw = formData.get("healthScore")?.toString().trim();
  const healthScore = healthScoreRaw ? Number(healthScoreRaw) : 0;

  try {
    await db
      .update(accounts)
      .set({
        firstName,
        lastName,
        email,
        country: readOptionalString(formData, "country"),
        sex: readOptionalString(formData, "sex"),
        background: readOptionalString(formData, "background"),
        school: readOptionalString(formData, "school"),
        major: readOptionalString(formData, "major"),
        graduationYear:
          graduationYear !== null && Number.isFinite(graduationYear)
            ? graduationYear
            : null,
        profession: readOptionalString(formData, "profession"),
        lifecycleStage,
        healthScore: Number.isFinite(healthScore) ? healthScore : 0,
      })
      .where(eq(accounts.id, id));
  } catch (error) {
    const code = (error as { cause?: { code?: string } }).cause?.code;
    if (code === "23505") {
      return {
        status: "error",
        message: "Another lead already uses this email.",
      };
    }
    throw error;
  }

  revalidatePath("/");
  redirect("/");
}

export async function deleteLead(id: string) {
  await db.delete(accounts).where(eq(accounts.id, id));
  revalidatePath("/");
  redirect("/");
}

export async function createLog(accountId: string, formData: FormData) {
  const logText = formData.get("logText")?.toString().trim();
  if (!logText) return;

  await db.insert(accountLogs).values({ accountId, logText });
  revalidatePath(`/leads/${accountId}`);
}
