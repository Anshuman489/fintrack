import { Resend } from "resend";
import { render } from "@react-email/render";

interface SendEmailParams {
  to: string;
  subject: string;
  react: React.ReactElement;
}

export async function sendEmail({ to, subject, react }: SendEmailParams) {
  const resend = new Resend(process.env.RESEND_API_KEY || "");

  try {
    const html = await render(react);

    const data = await resend.emails.send({
      from: "FinTrack <onboarding@resend.dev>",
      to,
      subject,
      html,
    });

    return { success: true, data };
  } catch (error) {
    console.error("Failed to send email:", error);
    return { success: false, error };
  }
}
