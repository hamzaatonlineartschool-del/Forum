import type { Metadata } from "next";
import { Inter } from "next/font/google";
import localFont from "next/font/local";
import { SiteHeader } from "@/components/site-header";
import "./globals.css";

/** Body and UI copy — Inter. */
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

/** Headings — Visby CF (local `.woff2` in `src/fonts/visby`). */
const visby = localFont({
  src: [
    { path: "../fonts/visby/VisbyCF-Light.woff2", weight: "400", style: "normal" },
    { path: "../fonts/visby/VisbyCF-Medium.woff2", weight: "500", style: "normal" },
    { path: "../fonts/visby/VisbyCF-DemiBold.woff2", weight: "600", style: "normal" },
    { path: "../fonts/visby/VisbyCF-Bold.woff2", weight: "700", style: "normal" },
  ],
  variable: "--font-visby",
  display: "swap",
});

export const metadata: Metadata = {
  title: "OAS — Online Art School",
  description: "Courses and community forum",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${visby.variable} h-full antialiased`}
    >
      <body className={`min-h-full flex flex-col ${inter.className}`}>
        <SiteHeader />
        <main className="flex-1">{children}</main>
      </body>
    </html>
  );
}
