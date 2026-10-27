import type { Metadata } from "next";
import Image from "next/image";
import type { ReactNode } from "react";
import friendsPhone from "@/assets/images/contact/friends-phone.png";
import { ContactForm } from "@/components/contact/contact-form";
import { socialLinks } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Contact Us",
  description: "Get in touch with Daily Bath: address, email and enquiry form.",
};

const socialHref = (label: string) => socialLinks.find((link) => link.label === label)?.href ?? "#";

// TODO(owner): confirm the LinkedIn page URL.
const contactSocials: { label: string; href: string; icon: ReactNode }[] = [
  {
    label: "Instagram",
    href: socialHref("Instagram"),
    icon: (
      <path
        fill="currentColor"
        d="M16 3H8a5 5 0 0 0-5 5v8a5 5 0 0 0 5 5h8a5 5 0 0 0 5-5V8a5 5 0 0 0-5-5zm-4 13.5a4.5 4.5 0 1 1 0-9 4.5 4.5 0 0 1 0 9zm5-9.25a1.25 1.25 0 1 1 0-2.5 1.25 1.25 0 0 1 0 2.5zM12 9.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5z"
      />
    ),
  },
  {
    label: "Facebook",
    href: socialHref("Facebook"),
    icon: (
      <path
        fill="currentColor"
        d="M17 3H7a4 4 0 0 0-4 4v10a4 4 0 0 0 4 4h5.5v-6.5h-2V12h2v-2a3 3 0 0 1 3-3H18v2.5h-2a.5.5 0 0 0-.5.5v2H18l-.5 2.5h-2V21H17a4 4 0 0 0 4-4V7a4 4 0 0 0-4-4z"
      />
    ),
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/",
    icon: (
      <path
        fill="currentColor"
        d="M17 3H7a4 4 0 0 0-4 4v10a4 4 0 0 0 4 4h10a4 4 0 0 0 4-4V7a4 4 0 0 0-4-4zM9 17H6.8v-6.5H9zM7.9 9.4A1.25 1.25 0 1 1 7.9 7a1.25 1.25 0 0 1 0 2.4zM17.5 17h-2.2v-3.2c0-.9-.3-1.5-1.1-1.5-.6 0-1 .4-1.1.8l-.1.6V17h-2.2v-6.5h2.2v.9c.3-.4.8-1 2-1 1.5 0 2.5.9 2.5 3z"
      />
    ),
  },
];

// TODO(owner): the design reads "Supprt@chardike.com"; confirm the correct support address.
const emails = ["info@chardike.com", "support@chardike.com"];

export default function ContactPage() {
  return (
    <main id="main-content" className="px-3 pt-4 pb-16 md:px-4 md:pt-4 md:pb-13 lg:px-6 lg:pt-8 lg:pb-11">
      <div className="mx-auto flex max-w-[1740px] flex-col gap-2 md:gap-2 lg:flex-row lg:gap-8">
        <div className="relative aspect-[369/134] overflow-hidden rounded-lg md:aspect-[736/350] lg:aspect-auto lg:min-h-[480px] lg:flex-1 lg:rounded-xl">
          <Image
            src={friendsPhone}
            alt="Two friends laughing while looking at a phone"
            fill
            priority
            sizes="(min-width: 1024px) 58vw, 100vw"
            className="object-cover"
          />
        </div>

        <section
          aria-labelledby="contact-heading"
          className="flex flex-col gap-6 rounded-lg bg-neutral-100 px-3 py-4 md:px-3 md:py-4 lg:w-[40%] lg:max-w-[695px] lg:justify-between lg:rounded-xl lg:px-8 lg:py-10"
        >
          <h1 id="contact-heading" className="font-display text-base leading-6 font-bold text-neutral-900 md:text-lg lg:text-4xl lg:leading-12 2xl:text-5xl 2xl:leading-16">
            Contact Us
          </h1>
          <div className="flex flex-col gap-5 lg:gap-8">
            <address className="flex flex-col gap-3 not-italic lg:gap-6">
              <p className="text-sm leading-5 text-neutral-900 lg:text-lg lg:leading-7">
                Chardike Limited, Floor 11 (Lift 10), 163-164, Sonargaon Road, Hatirpool, Dhaka 1205
              </p>
              <ul className="flex flex-col gap-1 lg:gap-4">
                {emails.map((email) => (
                  <li key={email}>
                    <a
                      href={`mailto:${email}`}
                      className="rounded-sm text-sm leading-6 font-medium break-all text-[#2a313a] underline-offset-4 transition-colors hover:text-primary-800 hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-500 md:font-display md:text-base lg:text-2xl lg:leading-8 2xl:text-[32px] 2xl:leading-10"
                    >
                      {email}
                    </a>
                  </li>
                ))}
              </ul>
            </address>
            <ul className="flex items-center gap-2 lg:gap-4">
              {contactSocials.map((social) => (
                <li key={social.label}>
                  <a
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Daily Bath on ${social.label} (opens in a new tab)`}
                    className="flex size-10 items-center justify-center rounded-full border border-neutral-900 text-neutral-900 transition-colors hover:bg-neutral-900 hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-500 lg:size-12"
                  >
                    <svg viewBox="0 0 24 24" aria-hidden="true" className="size-4 lg:size-6">
                      {social.icon}
                    </svg>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </section>
      </div>

      <section aria-labelledby="query-heading" className="mx-auto mt-10 flex max-w-[920px] flex-col items-center gap-6 md:mt-12 md:max-w-[602px] md:gap-8 lg:mt-18 lg:max-w-[920px] lg:gap-12">
        <h2 id="query-heading" className="font-display text-xl leading-7 font-bold text-neutral-900 md:text-[40px] md:leading-12 lg:text-6xl lg:leading-[76px] 2xl:text-7xl 2xl:leading-[88px]">
          Have any Query?
        </h2>
        <ContactForm />
      </section>
    </main>
  );
}
