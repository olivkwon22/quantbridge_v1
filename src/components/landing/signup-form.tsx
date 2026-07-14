"use client";

import { useActionState } from "react";
import { initialSignupState, submitSignup } from "@/app/actions";

const inputClass =
  "w-full rounded-md border border-border bg-background px-3 py-2 text-sm text-foreground placeholder:text-muted focus:border-accent focus:outline-none";
const labelClass = "mb-1.5 block text-sm font-medium text-foreground";

export function SignupForm() {
  const [state, formAction, pending] = useActionState(
    submitSignup,
    initialSignupState,
  );

  return (
    <section id="signup" className="border-t border-border">
      <div className="mx-auto max-w-6xl px-6 py-24">
        <div className="mx-auto max-w-xl rounded-xl border border-border bg-surface p-8 sm:p-10">
          <div className="text-center">
            <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">
              Request early access
            </h2>
            <p className="mt-3 text-sm text-muted">
              QuantBridge is currently onboarding researchers in small
              cohorts. Tell us a bit about yourself and we&apos;ll reach out.
            </p>
          </div>

          <form action={formAction} className="mt-8 space-y-5">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="firstName" className={labelClass}>
                  First name
                </label>
                <input
                  id="firstName"
                  name="firstName"
                  type="text"
                  placeholder="Jane"
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
                  placeholder="Doe"
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
                placeholder="jane@example.com"
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
                  placeholder="South Korea"
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
                  defaultValue=""
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
                defaultValue=""
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
                  placeholder="Seoul National University"
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
                  placeholder="Statistics"
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
                  placeholder="2026"
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
                  placeholder="Software Engineer"
                  className={inputClass}
                />
              </div>
            </div>

            {state.status !== "idle" && (
              <p
                className={`text-sm ${
                  state.status === "success" ? "text-accent" : "text-red-400"
                }`}
              >
                {state.message}
              </p>
            )}

            <button
              type="submit"
              disabled={pending}
              className="w-full rounded-md bg-accent px-4 py-2.5 text-sm font-medium text-accent-foreground transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {pending ? "Submitting..." : "Request Access"}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
