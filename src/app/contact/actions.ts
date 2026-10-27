"use server";

import { headers } from "next/headers";
import { fail, ok, type ApiResponse } from "@/lib/api-response";
import { validateContact } from "@/lib/contact-schema";
import { rateLimit } from "@/lib/rate-limit";
import { insertContactSubmission, SubmissionStoreUnavailableError } from "@/lib/supabase/contact-submissions";

// Failed submissions echo the visitor's own input so the form can refill it.
export type ContactFormState = (ApiResponse<{ status: "received" }> & { values?: Record<string, string> }) | null;

function echo(formData: FormData): Record<string, string> {
  const values: Record<string, string> = {};
  for (const field of ["name", "phone", "email", "subject", "message"]) {
    const value = formData.get(field);
    if (typeof value === "string") values[field] = value.slice(0, 2000);
  }
  return values;
}

const RATE_LIMIT = { limit: 5, windowMs: 10 * 60 * 1000 };

async function clientKey() {
  const h = await headers();
  const forwarded = h.get("x-forwarded-for")?.split(",")[0]?.trim();
  return forwarded || h.get("x-real-ip") || "unknown";
}

export async function submitContact(_previous: ContactFormState, formData: FormData): Promise<ContactFormState> {
  // Honeypot: real visitors never see or fill this field.
  if (typeof formData.get("website") === "string" && formData.get("website") !== "") {
    return ok({ status: "received" }, "Thanks! Your message has been sent.");
  }

  const limited = rateLimit(`contact:${await clientKey()}`, RATE_LIMIT.limit, RATE_LIMIT.windowMs);
  if (!limited.allowed) {
    const minutes = Math.max(1, Math.ceil(limited.retryAfterMs / 60_000));
    return {
      ...fail("RATE_LIMITED", `Too many messages from this connection. Please try again in ${minutes} minute${minutes === 1 ? "" : "s"}.`),
      values: echo(formData),
    };
  }

  const result = validateContact(formData);
  if (!result.ok) {
    return { ...fail("VALIDATION_ERROR", "Please check the highlighted fields.", result.fieldErrors), values: echo(formData) };
  }

  try {
    await insertContactSubmission(result.data);
  } catch (error) {
    if (error instanceof SubmissionStoreUnavailableError) {
      console.warn("Contact form received a message but Supabase is not configured.");
    } else {
      console.error(error instanceof Error ? error.message : "Contact submission failed");
    }
    return {
      ...fail("SUBMISSION_FAILED", "We couldn't send your message right now. Please try again shortly or email info@chardike.com."),
      values: echo(formData),
    };
  }

  return ok({ status: "received" }, "Thanks! Your message has been sent. We'll get back to you soon.");
}
