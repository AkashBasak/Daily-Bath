"use client";

import { useActionState, useEffect, useRef, type ReactNode } from "react";
import { submitContact, type ContactFormState } from "@/app/contact/actions";
import { contactLimits, contactSubjects, type ContactField } from "@/lib/contact-schema";

const fieldShell =
  "flex items-center gap-4 rounded-lg border border-transparent bg-neutral-50 px-4 transition-[border-color,box-shadow] focus-within:border-primary-500 focus-within:ring-2 focus-within:ring-primary-500/25 has-[[aria-invalid=true]]:border-[#b42318] md:px-6";
const inputClass =
  "h-14 w-full min-w-0 bg-transparent text-base leading-[26px] tracking-[-0.02em] text-neutral-900 placeholder:text-neutral-500 focus:outline-none";

function Icon({ children }: { children: ReactNode }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" className="size-6 shrink-0 text-secondary-500">
      {children}
    </svg>
  );
}

const icons = {
  name: (
    <Icon>
      <circle cx="12" cy="7" r="4" stroke="currentColor" strokeWidth="1.5" />
      <path d="M4 21c0-4 3.6-6.5 8-6.5s8 2.5 8 6.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </Icon>
  ),
  phone: (
    <Icon>
      <path
        d="M4.5 3.5h3l1.5 4-2 1.5a12 12 0 0 0 8 8l1.5-2 4 1.5v3a2 2 0 0 1-2 2A17 17 0 0 1 2.5 5.5a2 2 0 0 1 2-2z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      <path d="M14 7h.01M17 7h.01M20 7h.01" stroke="#17bbde" strokeWidth="2.2" strokeLinecap="round" />
    </Icon>
  ),
  email: (
    <Icon>
      <rect x="2.5" y="4.5" width="19" height="15" rx="2.5" stroke="currentColor" strokeWidth="1.5" />
      <path d="M3 6l9 7 9-7" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
    </Icon>
  ),
  subject: (
    <Icon>
      <path d="M12 3l9 4.5-9 4.5-9-4.5z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
      <path d="M3 12l9 4.5 9-4.5M3 16.5L12 21l9-4.5" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
    </Icon>
  ),
};

function FieldError({ id, errors }: { id: string; errors?: string[] }) {
  if (!errors?.length) return null;
  return (
    <p id={id} className="mt-1.5 flex items-center gap-1.5 text-sm leading-5 text-[#b42318]">
      <svg viewBox="0 0 20 20" aria-hidden="true" className="size-4 shrink-0 fill-current">
        <path d="M10 1.7a8.3 8.3 0 1 0 0 16.6 8.3 8.3 0 0 0 0-16.6zm.9 12.5H9.1v-1.8h1.8zm0-3.3H9.1V5.8h1.8z" />
      </svg>
      {errors[0]}
    </p>
  );
}

export function ContactForm() {
  const [state, formAction, pending] = useActionState<ContactFormState, FormData>(submitContact, null);
  const formRef = useRef<HTMLFormElement>(null);
  const statusRef = useRef<HTMLDivElement>(null);

  const fieldErrors = state && !state.success ? (state.error.fieldErrors ?? {}) : {};
  const errorFor = (field: ContactField) => fieldErrors[field];
  // React resets the form after each submission to these defaults.
  const values = state && !state.success ? (state.values ?? {}) : {};

  useEffect(() => {
    if (!state) return;
    if (state.success) {
      statusRef.current?.focus();
      return;
    }
    // Move focus to the first invalid field, or to the summary for other errors.
    const firstInvalid = formRef.current?.querySelector<HTMLElement>("[aria-invalid='true']");
    (firstInvalid ?? statusRef.current)?.focus();
  }, [state]);

  const describe = (field: ContactField) => (errorFor(field) ? `${field}-error` : undefined);

  return (
    <form ref={formRef} action={formAction} noValidate className="flex w-full flex-col items-center gap-8 md:gap-8 lg:gap-12">
      <div className="flex w-full flex-col gap-3 md:gap-3 lg:gap-4">
        {/* Honeypot, hidden from people and assistive tech. */}
        <div aria-hidden="true" className="absolute -left-[9999px] h-px w-px overflow-hidden">
          <label>
            Website
            <input type="text" name="website" tabIndex={-1} autoComplete="off" />
          </label>
        </div>

        <div>
          <label className={fieldShell}>
            {icons.name}
            <span className="sr-only">Your name</span>
            <input
              name="name"
              defaultValue={values.name}
              type="text"
              autoComplete="name"
              placeholder="Your name"
              required
              maxLength={contactLimits.name.max}
              aria-invalid={errorFor("name") ? true : undefined}
              aria-describedby={describe("name")}
              className={inputClass}
            />
          </label>
          <FieldError id="name-error" errors={errorFor("name")} />
        </div>

        <div>
          <label className={fieldShell}>
            {icons.phone}
            <span className="sr-only">Contact number</span>
            <input
              name="phone"
              defaultValue={values.phone}
              type="tel"
              inputMode="tel"
              autoComplete="tel"
              placeholder="Contact number"
              required
              maxLength={contactLimits.phone.max}
              aria-invalid={errorFor("phone") ? true : undefined}
              aria-describedby={describe("phone")}
              className={inputClass}
            />
          </label>
          <FieldError id="phone-error" errors={errorFor("phone")} />
        </div>

        <div>
          <label className={fieldShell}>
            {icons.email}
            <span className="sr-only">Email address</span>
            <input
              name="email"
              defaultValue={values.email}
              type="email"
              autoComplete="email"
              placeholder="Email address"
              required
              maxLength={contactLimits.email.max}
              aria-invalid={errorFor("email") ? true : undefined}
              aria-describedby={describe("email")}
              className={inputClass}
            />
          </label>
          <FieldError id="email-error" errors={errorFor("email")} />
        </div>

        <div>
          <label className={`${fieldShell} relative`}>
            {icons.subject}
            <span className="sr-only">Subject</span>
            <select
              // Remount so a refilled subject survives the form reset.
              key={values.subject ?? ""}
              name="subject"
              required
              defaultValue={values.subject ?? ""}
              aria-invalid={errorFor("subject") ? true : undefined}
              aria-describedby={describe("subject")}
              className={`${inputClass} cursor-pointer appearance-none pr-8 invalid:text-neutral-900`}
            >
              <option value="" disabled>
                Select Subject
              </option>
              {contactSubjects.map((subject) => (
                <option key={subject} value={subject}>
                  {subject}
                </option>
              ))}
            </select>
            <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" className="pointer-events-none absolute right-4 size-5 md:right-6">
              <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </label>
          <FieldError id="subject-error" errors={errorFor("subject")} />
        </div>

        <div>
          <label className="block">
            <span className="sr-only">Your message</span>
            <textarea
              name="message"
              defaultValue={values.message}
              rows={4}
              placeholder="Write your message"
              required
              maxLength={contactLimits.message.max}
              aria-invalid={errorFor("message") ? true : undefined}
              aria-describedby={describe("message")}
              className="min-h-[118px] w-full resize-y rounded-lg border border-transparent bg-neutral-50 px-4 py-4 text-base leading-[26px] tracking-[-0.02em] text-neutral-900 transition-[border-color,box-shadow] placeholder:text-neutral-500 focus:border-primary-500 focus:ring-2 focus:ring-primary-500/25 focus:outline-none aria-[invalid=true]:border-[#b42318] md:px-6"
            />
          </label>
          <FieldError id="message-error" errors={errorFor("message")} />
        </div>
      </div>

      <div ref={statusRef} tabIndex={-1} role="status" aria-live="polite" className="w-full empty:hidden focus:outline-none">
        {state?.success && (
          <p className="flex animate-fade-in items-center gap-2 rounded-lg bg-[#ecfdf3] px-4 py-3 text-sm leading-5 font-medium text-[#067647] md:text-base md:leading-6">
            <svg viewBox="0 0 20 20" aria-hidden="true" className="size-5 shrink-0 fill-current">
              <path d="M10 1.7a8.3 8.3 0 1 0 0 16.6 8.3 8.3 0 0 0 0-16.6zM8.6 13.6 5 10l1.2-1.2 2.4 2.4 5.2-5.2L15 7.2z" />
            </svg>
            {state.message}
          </p>
        )}
        {state && !state.success && state.error.code !== "VALIDATION_ERROR" && (
          <p className="flex animate-fade-in items-center gap-2 rounded-lg bg-[#fef3f2] px-4 py-3 text-sm leading-5 font-medium text-[#b42318] md:text-base md:leading-6">
            <svg viewBox="0 0 20 20" aria-hidden="true" className="size-5 shrink-0 fill-current">
              <path d="M10 1.7a8.3 8.3 0 1 0 0 16.6 8.3 8.3 0 0 0 0-16.6zm.9 12.5H9.1v-1.8h1.8zm0-3.3H9.1V5.8h1.8z" />
            </svg>
            {state.error.message}
          </p>
        )}
      </div>

      <button
        type="submit"
        disabled={pending}
        className="btn-sheen group -mt-4 flex h-11 w-[150px] items-center justify-center gap-3 rounded-lg bg-primary-500 pr-3 pl-6 text-base leading-6 font-medium text-white transition-colors hover:bg-primary-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-800 disabled:cursor-wait disabled:opacity-70 md:h-12 md:w-[200px] md:text-lg lg:-mt-6 lg:h-14 lg:w-[278px]"
      >
        {pending && (
          <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" className="size-5 animate-spin">
            <circle cx="12" cy="12" r="9" stroke="currentColor" strokeOpacity="0.3" strokeWidth="2.5" />
            <path d="M21 12a9 9 0 0 0-9-9" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
          </svg>
        )}
        {pending ? "Sending…" : "Submit"}
        {!pending && (
          <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" className="size-6 transition-transform duration-300 group-hover:translate-x-1">
            <path d="M4 12h16m-6-6l6 6-6 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="square" />
          </svg>
        )}
      </button>
    </form>
  );
}
