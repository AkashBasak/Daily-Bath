"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useId, useRef, useState } from "react";
import { allNavItems, isActivePath, primaryNav, type NavItem } from "@/lib/site-config";

function DesktopNavLink({ item, active }: { item: NavItem; active: boolean }) {
  return (
    <Link
      href={item.href}
      aria-current={active ? "page" : undefined}
      className={`border-b-2 px-4 py-1 text-lg leading-7 font-medium whitespace-nowrap transition-colors focus-visible:rounded-sm focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-500 ${
        active
          ? "border-primary-500 text-neutral-900"
          : "border-transparent text-neutral-900 hover:text-primary-800"
      }`}
    >
      {item.label}
    </Link>
  );
}

function MenuIcon({ open }: { open: boolean }) {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      {open ? (
        <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      ) : (
        <path d="M4 5h16M4 12h16M4 19h16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      )}
    </svg>
  );
}

export function SiteHeader() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const menuId = useId();
  const containerRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  // Close the menu after navigating.
  const [lastPathname, setLastPathname] = useState(pathname);
  if (pathname !== lastPathname) {
    setLastPathname(pathname);
    setMenuOpen(false);
  }

  useEffect(() => {
    if (!menuOpen) return;

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setMenuOpen(false);
        buttonRef.current?.focus();
      }
    }
    function onPointerDown(event: PointerEvent) {
      if (!containerRef.current?.contains(event.target as Node)) setMenuOpen(false);
    }

    document.addEventListener("keydown", onKeyDown);
    document.addEventListener("pointerdown", onPointerDown);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.removeEventListener("pointerdown", onPointerDown);
    };
  }, [menuOpen]);

  const logo = (
    <Link
      href="/"
      aria-label="Daily Bath home"
      className="shrink-0 focus-visible:rounded-sm focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary-500"
    >
      <Image
        src="/brand/daily-bath-logo.svg"
        alt=""
        width={296}
        height={48}
        priority
        className="h-6 w-auto md:h-8 lg:h-12"
      />
    </Link>
  );

  return (
    <header className="sticky top-3 z-40 px-3 md:top-4 md:px-4 lg:top-6 lg:px-6">
      <div ref={containerRef} className="relative">
        <div className="flex items-center justify-between rounded bg-neutral-100 p-2 md:rounded-lg md:p-4 lg:h-20 lg:px-8 lg:py-2">
          {/* Desktop: links either side of a centred logo. */}
          <nav aria-label="Primary" className="hidden flex-1 items-center gap-2 lg:flex">
            {primaryNav.left.map((item) => (
              <DesktopNavLink key={item.href} item={item} active={isActivePath(pathname, item.href)} />
            ))}
          </nav>

          {logo}

          <nav aria-label="Secondary" className="hidden flex-1 items-center justify-end gap-2 lg:flex">
            {primaryNav.right.map((item) => (
              <DesktopNavLink key={item.href} item={item} active={isActivePath(pathname, item.href)} />
            ))}
          </nav>

          {/* Mobile and tablet: menu toggle. */}
          <button
            ref={buttonRef}
            type="button"
            aria-expanded={menuOpen}
            aria-controls={menuId}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            onClick={() => setMenuOpen((open) => !open)}
            className="-m-2 flex size-10 items-center justify-center rounded text-neutral-900 focus-visible:outline-2 focus-visible:outline-primary-500 lg:hidden"
          >
            <MenuIcon open={menuOpen} />
          </button>
        </div>

        <nav
          id={menuId}
          aria-label="Mobile"
          hidden={!menuOpen}
          className="absolute top-full right-0 mt-2 w-50 rounded-lg border border-neutral-200 bg-neutral-50 px-3 py-4 shadow-[0_3px_3px_rgba(161,161,161,0.1),0_10px_5px_rgba(161,161,161,0.09),0_23px_7px_rgba(161,161,161,0.05)] lg:hidden"
        >
          <ul className="flex flex-col gap-3">
            {allNavItems.map((item, index) => {
              const active = isActivePath(pathname, item.href);
              const isLast = index === allNavItems.length - 1;
              return (
                <li key={item.href} className={isLast ? "" : "border-b border-neutral-200 pb-3"}>
                  <Link
                    href={item.href}
                    aria-current={active ? "page" : undefined}
                    onClick={() => setMenuOpen(false)}
                    className={`block rounded-sm py-1 text-base leading-6 focus-visible:outline-2 focus-visible:outline-primary-500 ${
                      active ? "font-medium text-primary-600" : "text-neutral-900 hover:text-primary-800"
                    }`}
                  >
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      </div>
    </header>
  );
}
