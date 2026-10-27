export type NavItem = {
  label: string;
  href: string;
};

export const primaryNav = {
  left: [
    { label: "Home", href: "/" },
    { label: "Products", href: "/products" },
  ],
  right: [
    { label: "Brand Story", href: "/brand-story" },
    { label: "Contact", href: "/contact" },
  ],
} satisfies Record<string, NavItem[]>;

export const allNavItems: NavItem[] = [...primaryNav.left, ...primaryNav.right];

export type SocialLink = {
  label: string;
  href: string;
  icon: string;
};

// TODO(owner): replace with the official Daily Bath profile URLs.
export const socialLinks: SocialLink[] = [
  { label: "Facebook", href: "https://www.facebook.com/", icon: "/icons/facebook.svg" },
  { label: "TikTok", href: "https://www.tiktok.com/", icon: "/icons/tiktok.svg" },
  { label: "Instagram", href: "https://www.instagram.com/", icon: "/icons/instagram.svg" },
  { label: "X", href: "https://x.com/", icon: "/icons/x.svg" },
];

export function isActivePath(pathname: string, href: string): boolean {
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(`${href}/`);
}
