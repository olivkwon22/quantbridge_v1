import { resend } from "@/lib/resend";

const ADMIN_NOTIFICATION_EMAIL =
  process.env.ADMIN_NOTIFICATION_EMAIL ?? "olivkwon22@gmail.com";

type NewLead = {
  firstName: string;
  lastName: string;
  email: string;
  country: string | null;
  background: string | null;
  school: string | null;
  major: string | null;
  graduationYear: string | undefined;
  profession: string | null;
};

export function notifyNewLead(lead: NewLead) {
  return resend.emails
    .send({
      from: "QuantBridge <onboarding@resend.dev>",
      to: ADMIN_NOTIFICATION_EMAIL,
      subject: `New lead: ${lead.firstName} ${lead.lastName}`,
      text: [
        `A new signup was received.`,
        ``,
        `Name: ${lead.firstName} ${lead.lastName}`,
        `Email: ${lead.email}`,
        `Country: ${lead.country ?? "-"}`,
        `Background: ${lead.background ?? "-"}`,
        `School: ${lead.school ?? "-"}`,
        `Major: ${lead.major ?? "-"}`,
        `Graduation year: ${lead.graduationYear ?? "-"}`,
        `Profession: ${lead.profession ?? "-"}`,
      ].join("\n"),
    })
    .catch((error) => {
      console.error("Failed to send admin notification email:", error);
    });
}
