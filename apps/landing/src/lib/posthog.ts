import { PostHog } from "posthog-node";

const isProduction = process.env.NODE_ENV === "production";

const posthog = new PostHog(process.env.POSTHOG_KEY!, {
  host: process.env.POSTHOG_HOST ?? "https://us.i.posthog.com",
  flushAt: 1,
  flushInterval: 0,
});

export async function captureEvent(
  distinctId: string,
  event: string,
  properties: Record<string, unknown>,
) {
  if (!isProduction) return;
  posthog.capture({ distinctId, event, properties });
  await posthog.flush();
}
