import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "DevPulse Hub | Modern Full-Stack Workspace & API Platform",
  description: "Next.js 15, TypeScript, Tailwind CSS, REST API Routes, ve Canlı Telemetri içeren modern tam kapsamlı proje yönetim ve geliştirici platformu.",
  keywords: ["Next.js", "Full-Stack", "TypeScript", "Tailwind CSS", "API", "Developer Dashboard"],
  authors: [{ name: "Yağız Kaan Eryılmaz" }]
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="tr" className="dark h-full antialiased bg-zinc-950">
      <body className="min-h-full flex flex-col bg-zinc-950 text-zinc-100 selection:bg-cyan-500 selection:text-black">
        {children}
      </body>
    </html>
  );
}