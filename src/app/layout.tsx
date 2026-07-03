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
    "Aprenda a construir aplicações, painéis e automações com IA — mesmo sem saber programar. Guia prático para servidores públicos da UEMS usando Google Sheets, Apps Script e prompts. Desenvolvido pela Pró-Reitoria de Ensino.",
  keywords: [
    "IA",
    "inteligência artificial",
    "criar sites",
    "Google Sheets",
    "Apps Script",
    "automação",
    "educação",
    "ferramentas web",
    "prompt",
    "prompt engineering",
    "ChatGPT",
    "Gemini",
    "Claude",
    "Z.ai",
    "Google AI Studio",
    "UEMS",
    "Pró-Reitoria de Ensino",
    "servidor público",
    "código sem código",
    "no-code",
    "low-code",
    "dashboard",
    "planilha",
    "tabela interativa",
    "formulário",
    "LGPD",
    "segurança de dados",
  ],
  authors: [{ name: "Bruno Lopes" }],
  icons: {
    icon: "https://z-cdn.chatglm.cn/z-ai/static/logo.svg",
  },
  openGraph: {
    title: "Código sem Código: Guia Prático para Criar Ferramentas Web com IA",
    description:
      "Aprenda a construir aplicações, painéis e automações com IA — mesmo sem saber programar. Guia prático para servidores públicos da UEMS usando Google Sheets, Apps Script e prompts.",
    type: "website",
    locale: "pt_BR",
    siteName: "Código sem Código",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className="dark" suppressHydrationWarning>
      <head>
        {/* Prevent flash of wrong theme */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              try {
                const theme = localStorage.getItem('csc-theme');
                if (theme === 'light') {
                  document.documentElement.classList.remove('dark');
                }
              } catch {}
            `,
          }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-foreground`}
      >
        {children}
        <Toaster />
      </body>
    </html>
  )
}
