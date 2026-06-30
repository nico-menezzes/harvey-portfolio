import type { Metadata } from "next";
import { Inter, Geist_Mono, Playfair_Display } from "next/font/google";
import "./globals.css";
import { AgentationProvider } from "@/components/AgentationProvider";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-geist-mono",
  display: "swap",
});

// Editorial serif accent (used for the italic ampersand in display copy)
const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400"],
  style: ["italic"],
  variable: "--font-playfair",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Harvey Specter — H.Studio",
  description:
    "H.Studio is a full-service creative studio creating beautiful digital experiences and products — branding, web design and engineering.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${geistMono.variable} ${playfair.variable}`}
    >
      <body className="bg-background font-sans text-foreground antialiased">
        {children}
        <AgentationProvider />
      </body>
    </html>
  );
}
