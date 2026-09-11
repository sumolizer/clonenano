import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import AssistantWidget from "@/components/AssistantWidget";
import DemoBanner from "@/components/DemoBanner";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Naano Clone: B2B LinkedIn Creator Marketplace (baseline)",
  description:
    "Internal audit baseline clone of the naano.com marketing site and JWT-based auth flow.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-[#fcfcfb] text-[#17181c]">
        <DemoBanner />
        {children}
        <AssistantWidget />
      </body>
    </html>
  );
}
