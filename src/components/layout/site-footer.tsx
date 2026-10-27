import Image from "next/image";
import Link from "next/link";
import { SocialLinks } from "@/components/social-links";

const siteLinks = [
  { label: "Home", href: "/" },
  { label: "Brand Story", href: "/brand-story" },
  { label: "Products", href: "/products" },
  { label: "Contact", href: "/contact" },
];

const legalLinks = [
  { label: "Terms & Conditions", href: "/terms" },
  { label: "Privacy Policy", href: "/privacy" },
];

const footerCopy =
  "Daily Bath is currently at an early brand-development stage. The brand name has been established, while its product portfolio, brand positioning, visual direction, and communication strategy are still being explored";

function FooterLinkList({ links }: { links: { label: string; href: string }[] }) {
  return (
    <ul className="flex flex-col gap-3 2xl:gap-4">
      {links.map((link) => (
        <li key={link.href}>
          <Link
            href={link.href}
            className="rounded-sm text-sm leading-5 font-semibold whitespace-nowrap text-neutral-300 transition-colors hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white 2xl:text-lg 2xl:leading-7"
          >
            {link.label}
          </Link>
        </li>
      ))}
    </ul>
  );
}

function Socials({ className = "" }: { className?: string }) {
  return (
    <SocialLinks
      className={className}
      linkClassName="size-10 focus-visible:outline-white 2xl:size-12"
      iconClassName="size-8 brightness-0 invert 2xl:size-12"
    />
  );
}

export function SiteFooter() {
  return (
    <footer className="px-3 pb-3 md:px-4 md:pb-4 lg:px-6 lg:pb-6">
      <div className="site-footer-grid rounded-lg bg-secondary-500 px-3 pt-5 pb-8 text-white md:px-4 md:pb-4 lg:px-12 lg:py-12 2xl:p-20">
        <div className="flex flex-col items-center gap-8 border-b border-white pb-4 [grid-area:blurb] md:flex-row md:justify-between md:gap-6 lg:items-start lg:border-0 lg:pb-0">
          <p className="text-center text-sm leading-5 font-medium md:max-w-[436px] md:text-left md:text-base md:leading-6 lg:max-w-[675px] lg:pr-10 lg:font-display lg:text-lg lg:leading-7 lg:font-semibold 2xl:text-2xl 2xl:leading-8">
            {footerCopy}
          </p>
          <Socials className="-my-1 md:-mr-1 lg:hidden" />
        </div>

        <nav aria-label="Footer" className="flex gap-12 [grid-area:links]">
          <FooterLinkList links={siteLinks} />
          <FooterLinkList links={legalLinks} />
        </nav>

        <address className="flex flex-col items-center gap-2 text-center text-sm leading-5 font-medium not-italic [grid-area:address] md:w-[207px] md:items-start md:text-left lg:w-auto lg:max-w-[403px] 2xl:gap-3">
          <span className="md:text-base md:leading-6 2xl:font-display 2xl:text-2xl 2xl:leading-8">Location</span>
          <span className="2xl:text-lg 2xl:leading-7">
            Chardike Limited, Floor 11 (Lift 10), 163-164, Sonargaon Road, Hatirpool, Dhaka 1205
          </span>
        </address>

        <div className="flex flex-col items-center gap-1 [grid-area:parent] md:items-start">
          <span className="text-xs leading-[18px] text-neutral-300 2xl:text-sm 2xl:leading-5">Proud concern of</span>
          {/* TODO(owner): replace with the Bearth logo asset. */}
          <span role="img" aria-label="Bearth" className="block h-5 w-[83px] rounded-sm bg-white/25 md:h-6 md:w-[99px] 2xl:h-8 2xl:w-[132px]" />
        </div>

        <div className="flex items-center justify-center [grid-area:brand] md:justify-end lg:flex-wrap lg:justify-between lg:gap-4">
          <Link
            href="/"
            aria-label="Daily Bath home"
            className="rounded-sm focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
          >
            <Image src="/brand/daily-bath-logo-white.svg" alt="" width={296} height={48} className="h-6 w-auto md:h-8 2xl:h-12" />
          </Link>
          <Socials className="hidden lg:flex 2xl:gap-4" />
        </div>
      </div>
    </footer>
  );
}
