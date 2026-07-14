"use server";

import { db } from "@/db";
import { accounts } from "@/db/schema";

export type SignupState = {
  status: "idle" | "success" | "error";
  message?: string;
};

export const initialSignupState: SignupState = { status: "idle" };

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

  try {
    await db.insert(accounts).values({
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

  return {
    status: "success",
    message: "Thanks! We'll be in touch soon.",
  };
}
