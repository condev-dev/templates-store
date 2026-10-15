// Transactional mail helper.
//
// It talks to Resend's HTTP API with plain fetch instead of pulling in an SDK, so there is no new
// dependency and swapping providers later (Brevo, Mailgun, ...) is a one-line URL change.
//
// Environment variables:
//   RESEND_API_KEY  - required, otherwise sendEmail throws instead of silently doing nothing
//   MAIL_FROM       - optional, defaults to the sender below (its domain must be verified)

const RESEND_ENDPOINT = "https://api.resend.com/emails";

export const MAIL_FROM = process.env.MAIL_FROM || "Con Dev <no-reply@condev.ir>";

export async function sendEmail({ to, subject, html }) {
  const apiKey = process.env.RESEND_API_KEY;

  // Failing loudly matters here: if the key were missing and this returned quietly, every reset
  // request would look successful while no mail ever left the server.
  if (!apiKey) {
    throw new Error("RESEND_API_KEY is not set");
  }

  const res = await fetch(RESEND_ENDPOINT, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ from: MAIL_FROM, to, subject, html }),
  });

  if (!res.ok) {
    const detail = await res.text();
    throw new Error(`Mail provider responded ${res.status}: ${detail}`);
  }

  return res.json();
}
