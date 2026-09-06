import type { Metadata } from "next";
import { IBM_Plex_Sans, IBM_Plex_Mono } from "next/font/google";
import "./globals.css";

const plexSans = IBM_Plex_Sans({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const plexMono = IBM_Plex_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Nexora Business — Consultoría estratégica para PyMEs",
  description:
    "Nexora Business asesora a pequeñas y medianas empresas en finanzas, operaciones y crecimiento. Diagnóstico, plan de acción y acompañamiento directo.",
  metadataBase: new URL("https://nexora-business.vercel.app"),
  openGraph: {
    title: "Nexora Business — Consultoría estratégica para PyMEs",
    description:
      "Diagnóstico, estrategia y acompañamiento para que tu PyME crezca con orden.",
    locale: "es_MX",
    type: "website",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="es"
      className={`${plexSans.variable} ${plexMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-background text-foreground font-sans">
        {children}
      </body>
    </html>
  );
}
