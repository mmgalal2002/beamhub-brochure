import type { Metadata } from "next";
import localFont from "next/font/local";
import { siteDescription, siteTitle, siteUrl } from "@/lib/seo";
import "./globals.css";
import "./experience.css";
import "./features.css";
import "./listening-room.css";

const dmSans = localFont({
  src: [
    {
      path: "../node_modules/@fontsource-variable/dm-sans/files/dm-sans-latin-wght-normal.woff2",
      style: "normal",
      weight: "100 1000",
    },
    {
      path: "../node_modules/@fontsource-variable/dm-sans/files/dm-sans-latin-wght-italic.woff2",
      style: "italic",
      weight: "100 1000",
    },
  ],
  variable: "--font-dm-sans",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: siteTitle,
  description: siteDescription,
  applicationName: "BeamHub",
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    siteName: "BeamHub",
    locale: "en_US",
    url: siteUrl,
    title: siteTitle,
    description: siteDescription,
  },
  twitter: {
    card: "summary_large_image",
    title: siteTitle,
    description: siteDescription,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  verification: {
    google: process.env.GOOGLE_SITE_VERIFICATION,
    other: process.env.BING_SITE_VERIFICATION
      ? { "msvalidate.01": process.env.BING_SITE_VERIFICATION }
      : undefined,
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={dmSans.variable}>
      <body>{children}</body>
    </html>
  );
}
