"use client";

import { useState } from "react";

export function ShareButton({ title }: { title: string }) {
  const [copied, setCopied] = useState(false);

  async function share() {
    const url = window.location.href;
    if (navigator.share) {
      try {
        await navigator.share({ title, url });
        return;
      } catch {
        // Cancelled or unsupported; fall back to copying.
      }
    }
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      // Clipboard blocked; nothing more we can do quietly.
    }
  }

  return (
    <div className="relative">
      <button
        type="button"
        onClick={share}
        aria-label={`Share ${title}`}
        className="-m-2 flex size-12 items-center justify-center rounded-full text-neutral-900 transition-colors hover:bg-neutral-100 hover:text-primary-800 focus-visible:outline-2 focus-visible:outline-primary-500"
      >
        <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" className="size-6 lg:size-8">
          <circle cx="18" cy="5.5" r="2.5" stroke="currentColor" strokeWidth="1.5" />
          <circle cx="6" cy="12" r="2.5" stroke="currentColor" strokeWidth="1.5" />
          <circle cx="18" cy="18.5" r="2.5" stroke="currentColor" strokeWidth="1.5" />
          <path d="M8.2 10.8l7.6-4.1M8.2 13.2l7.6 4.1" stroke="currentColor" strokeWidth="1.5" />
        </svg>
      </button>
      <span
        role="status"
        className={`absolute top-full right-0 mt-1 rounded bg-neutral-900 px-2 py-1 text-xs whitespace-nowrap text-white transition-opacity ${
          copied ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
      >
        {copied ? "Link copied" : ""}
      </span>
    </div>
  );
}
