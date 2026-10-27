import Image from "next/image";
import { socialLinks } from "@/lib/site-config";

type SocialLinksProps = {
  className?: string;
  linkClassName?: string;
  iconClassName?: string;
};

export function SocialLinks({ className = "", linkClassName = "", iconClassName = "" }: SocialLinksProps) {
  return (
    <ul className={`flex items-center ${className}`}>
      {socialLinks.map((link) => (
        <li key={link.label}>
          <a
            href={link.href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Daily Bath on ${link.label} (opens in a new tab)`}
            className={`flex items-center justify-center rounded transition-opacity hover:opacity-70 focus-visible:outline-2 focus-visible:outline-primary-500 ${linkClassName}`}
          >
            <Image src={link.icon} alt="" width={24} height={24} className={iconClassName} />
          </a>
        </li>
      ))}
    </ul>
  );
}
