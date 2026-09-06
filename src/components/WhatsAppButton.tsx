"use client";

import { useState } from "react";
import { X } from "lucide-react";
import { siteConfig } from "@/lib/env";

function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.148.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
      <path d="M12.004 2C6.478 2 2 6.478 2 12.004a9.94 9.94 0 0 0 1.386 5.09L2 22l5.02-1.354a9.98 9.98 0 0 0 4.984 1.334h.004c5.526 0 10.004-4.478 10.004-10.004C22.012 6.478 17.53 2 12.004 2zm0 18.09a8.05 8.05 0 0 1-4.104-1.124l-.294-.174-3.033.818.81-2.955-.192-.303a8.06 8.06 0 0 1-1.235-4.35c0-4.46 3.628-8.088 8.052-8.088 2.15 0 4.17.838 5.69 2.36a7.997 7.997 0 0 1 2.359 5.69c0 4.46-3.628 8.126-8.053 8.126z" />
    </svg>
  );
}

export function WhatsAppButton() {
  const [open, setOpen] = useState(false);
  const href = `https://wa.me/${siteConfig.whatsappNumber}?text=${siteConfig.whatsappMessage}`;

  return (
    <div className="fixed bottom-5 right-5 z-50 flex flex-col items-end gap-3 sm:bottom-6 sm:right-6">
      {open && (
        <div
          role="dialog"
          aria-label="Ventana de atención por WhatsApp"
          className="w-72 overflow-hidden rounded-lg border border-border bg-surface shadow-[0_8px_24px_rgba(15,23,42,0.12)] sm:w-80"
        >
          <div className="flex items-center justify-between bg-[#075E54] px-4 py-3">
            <div className="flex items-center gap-2.5">
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-white/15">
                <WhatsAppIcon className="h-4.5 w-4.5 text-white" />
              </span>
              <div>
                <p className="text-sm font-medium text-white">Nexora Business</p>
                <p className="text-xs text-white/70">Normalmente responde en minutos</p>
              </div>
            </div>
            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label="Cerrar ventana de WhatsApp"
              className="cursor-pointer text-white/80 hover:text-white"
            >
              <X className="h-4.5 w-4.5" />
            </button>
          </div>
          <div className="bg-[#e5ded8] p-4">
            <div className="max-w-[85%] rounded-lg rounded-tl-none bg-white px-3.5 py-2.5 text-sm text-slate-700 shadow-sm">
              Hola 👋 Soy del equipo de Nexora Business. ¿En qué proyecto podemos ayudarte hoy?
            </div>
          </div>
          <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 bg-[#25D366] px-4 py-3 text-sm font-medium text-white transition-colors duration-200 hover:bg-[#1fb959] cursor-pointer"
          >
            <WhatsAppIcon className="h-4 w-4" />
            Iniciar conversación
          </a>
        </div>
      )}

      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-label={open ? "Cerrar chat de WhatsApp" : "Abrir chat de WhatsApp"}
        className="relative flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-[0_6px_18px_rgba(37,211,102,0.4)] transition-transform duration-200 hover:scale-105 cursor-pointer"
      >
        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#25D366] opacity-40 motion-reduce:hidden" />
        {open ? <X className="h-6 w-6" /> : <WhatsAppIcon className="h-7 w-7" />}
      </button>
    </div>
  );
}
