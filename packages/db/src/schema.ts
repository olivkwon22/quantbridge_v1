import { pgTable, uuid, text, integer, timestamp } from "drizzle-orm/pg-core";

export const accounts = pgTable("accounts", {
  id: uuid("id").primaryKey().defaultRandom(),
  firstName: text("first_name").notNull(),
  lastName: text("last_name").notNull(),
  email: text("email").notNull().unique(),
  country: text("country"),
  sex: text("sex"),
  background: text("background"),
  school: text("school"),
  major: text("major"),
  graduationYear: integer("graduation_year"),
  profession: text("profession"),
  lifecycleStage: text("lifecycle_stage").notNull().default("onboarding"),
  healthScore: integer("health_score").default(0),
  utmSource: text("utm_source"),
  utmCampaign: text("utm_campaign"),
  lastActiveAt: timestamp("last_active_at", { withTimezone: true }),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
});

export const accountLogs = pgTable("account_logs", {
  id: uuid("id").primaryKey().defaultRandom(),
  accountId: uuid("account_id")
    .notNull()
    .references(() => accounts.id),
  logText: text("log_text").notNull(),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
});

export const adminUsers = pgTable("admin_users", {
  id: uuid("id").primaryKey().defaultRandom(),
  email: text("email").notNull().unique(),
  passwordHash: text("password_hash").notNull(),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
});
