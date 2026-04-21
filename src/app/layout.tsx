import type { Metadata } from "next";
import { Geist_Mono } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";

// Circular LL VIP (Lineto) — self-hosted variable font. The single upright .ttf
// covers the full weight axis, so every Figma weight (450 Book, 500 Medium, 700 Bold)
// maps to the same file via the variable `wght` axis.
const circularLlVip = localFont({
  src: [
    { path: "./fonts/CircularLLVIP-Upright.ttf", weight: "100 900", style: "normal" },
  ],
  variable: "--font-circular-ll-vip",
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// VC Garamond Condensed (Very Cool) — self-hosted variable font with separate
// upright + italic files. Covers 200 ExtraLight → 700 Bold via the `wght` axis.
const vcGaramond = localFont({
  src: [
    { path: "./fonts/VCGaramondCondensedVF.ttf", weight: "100 900", style: "normal" },
    { path: "./fonts/VCGaramondCondensedVF-Italic.ttf", weight: "100 900", style: "italic" },
  ],
  variable: "--font-serif-heading",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Chatbooks",
    template: "%s · Chatbooks",
  },
  description: "Chatbooks prototype",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${circularLlVip.variable} ${geistMono.variable} ${vcGaramond.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
