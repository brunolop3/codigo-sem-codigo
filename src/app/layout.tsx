import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Código sem Código: Guia Prático para Criar Ferramentas Web com IA",
  description:
    "Aprenda a construir aplicações, painéis e automações usando Inteligência Artificial — mesmo sem saber programar. Guia prático para servidores UEMS, desenvolvido pela Pró-Reitoria de Ensino.",
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
    "UEMS",
    "Pró-Reitoria de Ensino",
    "servidor público",
  ],
  authors: [{ name: "Bruno Lopes" }],
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
