"use client";

import Script from "next/script";
import { CalendarClock } from "lucide-react";
import { isCalendlyConfigured, siteConfig } from "@/lib/env";

declare global {
  interface Window {
    Calendly?: {
      initPopupWidget: (options: { url: string }) => void;
    };
  }
}

export function CalendlyButton() {
  if (!isCalendlyConfigured) return null;

  return (
    <>
      <link
        rel="stylesheet"
        href="https://assets.calendly.com/assets/external/widget.css"
      />
      <Script
        src="https://assets.calendly.com/assets/external/widget.js"
        strategy="lazyOnload"
      />
      <button
        type="button"
        onClick={() => window.Calendly?.initPopupWidget({ url: siteConfig.calendlyUrl })}
        className="inline-flex w-full items-center justify-center gap-2 rounded-sm border border-border bg-surface px-6 py-3.5 text-sm font-medium text-foreground transition-colors duration-200 hover:border-secondary sm:w-auto cursor-pointer"
      >
        <CalendarClock className="h-4 w-4" strokeWidth={1.5} />
        Agendar llamada en Calendly
      </button>
    </>
  );
}
