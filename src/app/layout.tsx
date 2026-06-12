import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Guia Prático: Como Criar Ferramentas Web com IA",
  description:
    "Aprenda a construir formulários, painéis e automações usando Inteligência Artificial — mesmo sem saber programar. Guia completo para educadores e não-programadores.",
  keywords: [
    "IA",
    "inteligência artificial",
    "criar sites",
    "Google Sheets",
    "automação",
    "educação",
    "ferramentas web",
    "prompt",
    "ChatGPT",
    "Gemini",
    "Claude",
  ],
  authors: [{ name: "Guia IA Web" }],
  icons: {
    icon: "https://z-cdn.chatglm.cn/z-ai/static/logo.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className="dark" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-foreground`}
      >
        {children}
        <Toaster />
      </body>
    </html>
  );
}
