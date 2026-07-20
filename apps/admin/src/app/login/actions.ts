"use server";

import { redirect } from "next/navigation";
import { db } from "@quantbridge/db";
import { adminUsers } from "@quantbridge/db/schema";
import { eq } from "drizzle-orm";
import { verifyPassword } from "@/lib/password";
import { createSession } from "@/lib/session";

export type LoginState = {
  status: "idle" | "error";
  message?: string;
};

export async function login(
  _prevState: LoginState,
  formData: FormData,
): Promise<LoginState> {
  const email = formData.get("email")?.toString().trim();
  const password = formData.get("password")?.toString();

  if (!email || !password) {
    return {
      status: "error",
      message: "Email and password are required.",
    };
  }

  const [admin] = await db
    .select()
    .from(adminUsers)
    .where(eq(adminUsers.email, email));

  if (!admin || !verifyPassword(password, admin.passwordHash)) {
    return {
      status: "error",
      message: "Invalid email or password.",
    };
  }

  await createSession(admin.id);
  redirect("/");
}
