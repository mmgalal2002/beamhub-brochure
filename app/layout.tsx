import type { Metadata } from "next";
import localFont from "next/font/local";
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
  metadataBase: new URL(process.env.SITE_URL ?? "http://localhost:3100"),
  title: "BeamHub | Great minds. Brighter medicine.",
  description:
    "Discover BeamHub: a global radiation medicine community for expert-led learning, shared knowledge and professional growth. Find your next learning chapter.",
  openGraph: {
    type: "website",
    siteName: "BeamHub field guide",
    title: "Great minds. Brighter medicine.",
    description:
      "A home for the people moving radiation medicine forward. Learn, connect and discover your next chapter with BeamHub.",
  },
  twitter: {
    card: "summary_large_image",
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={dmSans.variable}>
      <body>{children}</body>
    </html>
  );
}
