// Contact form rules, shared by the form (hints) and the server (enforcement).

export const contactSubjects = [
  "General enquiry",
  "Product information",
  "Where to buy",
  "Partnership",
  "Feedback",
] as const;

export type ContactSubject = (typeof contactSubjects)[number];

export const contactLimits = {
  name: { min: 2, max: 100 },
  phone: { max: 20 },
  email: { max: 254 },
  message: { min: 10, max: 2000 },
} as const;

export type ContactInput = {
  name: string;
  phone: string;
  email: string;
  subject: ContactSubject;
  message: string;
};

export type ContactField = keyof ContactInput;

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
// Digits with optional leading +, spaces, dashes and brackets; 7 to 15 digits overall.
const PHONE_PATTERN = /^\+?[\d\s\-()]{7,20}$/;

function text(value: FormDataEntryValue | null): string {
  return typeof value === "string" ? value.trim() : "";
}

export type ContactValidation =
  | { ok: true; data: ContactInput }
  | { ok: false; fieldErrors: Partial<Record<ContactField, string[]>> };

export function validateContact(formData: FormData): ContactValidation {
  const name = text(formData.get("name")).replace(/\s+/g, " ");
  const phone = text(formData.get("phone"));
  const email = text(formData.get("email")).toLowerCase();
  const subject = text(formData.get("subject"));
  const message = text(formData.get("message")).replace(/\r\n/g, "\n");

  const errors: Partial<Record<ContactField, string[]>> = {};
  const add = (field: ContactField, error: string) => {
    errors[field] = [...(errors[field] ?? []), error];
  };

  if (name.length < contactLimits.name.min) add("name", "Enter your name.");
  else if (name.length > contactLimits.name.max) add("name", `Keep your name under ${contactLimits.name.max} characters.`);

  const digits = phone.replace(/\D/g, "");
  if (!phone) add("phone", "Enter a contact number.");
  else if (!PHONE_PATTERN.test(phone) || digits.length < 7 || digits.length > 15) add("phone", "Enter a valid phone number.");

  if (!email) add("email", "Enter your email address.");
  else if (email.length > contactLimits.email.max || !EMAIL_PATTERN.test(email)) add("email", "Enter a valid email address.");

  if (!contactSubjects.includes(subject as ContactSubject)) add("subject", "Choose a subject.");

  if (message.length < contactLimits.message.min) add("message", `Write at least ${contactLimits.message.min} characters.`);
  else if (message.length > contactLimits.message.max) add("message", `Keep your message under ${contactLimits.message.max} characters.`);

  if (Object.keys(errors).length > 0) return { ok: false, fieldErrors: errors };
  return { ok: true, data: { name, phone, email, subject: subject as ContactSubject, message } };
}
