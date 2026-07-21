"use server";

import { db } from "@quantbridge/db";
import { accounts } from "@quantbridge/db/schema";
import { after } from "next/server";
import { notifyNewLead } from "@/lib/notify-new-lead";
import { captureEvent } from "@/lib/posthog";

export type SignupState = {
  status: "idle" | "success" | "error";
  message?: string;
};

function readOptionalString(formData: FormData, key: string) {
  const value = formData.get(key)?.toString().trim();
  return value ? value : null;
}

export async function submitSignup(
  _prevState: SignupState,
  formData: FormData,
): Promise<SignupState> {
  const firstName = formData.get("firstName")?.toString().trim();
  const lastName = formData.get("lastName")?.toString().trim();
  const email = formData.get("email")?.toString().trim();

  if (!firstName || !lastName || !email) {
    return {
      status: "error",
      message: "First name, last name, and email are required.",
    };
  }

  const graduationYearRaw = formData.get("graduationYear")?.toString().trim();
  const graduationYear = graduationYearRaw ? Number(graduationYearRaw) : null;

  const country = readOptionalString(formData, "country");
  const background = readOptionalString(formData, "background");
  const school = readOptionalString(formData, "school");
  const major = readOptionalString(formData, "major");
  const profession = readOptionalString(formData, "profession");

  try {
    await db.insert(accounts).values({
      firstName,
      lastName,
      email,
      country,
      sex: readOptionalString(formData, "sex"),
      background,
      school,
      major,
      graduationYear:
        graduationYear !== null && Number.isFinite(graduationYear)
          ? graduationYear
          : null,
      profession,
    });
  } catch (error) {
    const code = (error as { cause?: { code?: string } }).cause?.code;
    if (code === "23505") {
      return {
        status: "error",
        message: "This email has already requested access.",
      };
    }
    throw error;
  }

  after(() =>
    notifyNewLead({
      firstName,
      lastName,
      email,
      country,
      background,
      school,
      major,
      graduationYear: graduationYearRaw,
      profession,
    }),
  );

  after(() =>
    captureEvent(email, "signup_submitted", {
      firstName,
      lastName,
      email,
      country,
      sex: readOptionalString(formData, "sex"),
      background,
      school,
      major,
      graduationYear: graduationYearRaw ?? null,
      profession,
    }),
  );

  return {
    status: "success",
    message: "Thanks! We'll be in touch soon.",
  };
}
