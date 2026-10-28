import type { Metadata } from "next";
import { Inter, Manrope } from "next/font/google";
import { IntroCurtain } from "@/components/layout/intro-curtain";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
});

export const metadata: Metadata = {
  title: {
    default: "Daily Bath",
    template: "%s | Daily Bath",
  },
  description: "Daily Bath body care and skincare for every part of your daily ritual.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" suppressHydrationWarning className={`${inter.variable} ${manrope.variable} antialiased`}>
      <body className="min-h-dvh font-sans">
        <IntroCurtain />
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-50 focus:rounded focus:bg-white focus:px-4 focus:py-2 focus:text-neutral-900 focus:outline-2 focus:outline-primary-500"
        >
          Skip to content
        </a>
        <SiteHeader />
        {children}
        <SiteFooter />
      </body>
    </html>
  );
}
