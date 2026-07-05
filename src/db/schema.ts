import { pgTable, uuid, text, integer, timestamp } from "drizzle-orm/pg-core";

export const accounts = pgTable("accounts", {
  id: uuid("id").primaryKey().defaultRandom(),
  name: text("name").notNull(),
  email: text("email").notNull(),
  country: text("country"),
  background: text("background"),
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
