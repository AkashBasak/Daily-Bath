import "server-only";
import type { ContactInput } from "@/lib/contact-schema";

export class SubmissionStoreUnavailableError extends Error {}

function config() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !anonKey) return null;
  return { url: url.replace(/\/$/, ""), anonKey };
}

// Inserts with the public (anon) key. Row Level Security on form_submissions
// allows anonymous INSERT only, so this key can never read submissions back.
export async function insertContactSubmission(input: ContactInput): Promise<void> {
  const settings = config();
  if (!settings) throw new SubmissionStoreUnavailableError("Supabase is not configured");

  const response = await fetch(`${settings.url}/rest/v1/form_submissions`, {
    method: "POST",
    headers: {
      apikey: settings.anonKey,
      Authorization: `Bearer ${settings.anonKey}`,
      "Content-Type": "application/json",
      // Anonymous users have no SELECT permission, so ask for no row back.
      Prefer: "return=minimal",
    },
    body: JSON.stringify({
      name: input.name,
      phone: input.phone,
      email: input.email,
      subject: input.subject,
      message: input.message,
    }),
    cache: "no-store",
    signal: AbortSignal.timeout(10_000),
  });

  if (!response.ok) {
    // Status only: never log submitted personal data or raw database errors.
    throw new Error(`Submission insert failed with status ${response.status}`);
  }
}
