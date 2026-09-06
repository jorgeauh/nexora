"use client";

import { useState } from "react";
import { Menu, X, ArrowUpRight } from "lucide-react";

const NAV_LINKS = [
  { href: "#servicios", label: "Servicios" },
  { href: "#empresa", label: "Empresa" },
  { href: "#panorama", label: "Panorama" },
  { href: "#contacto", label: "Contacto" },
];

export function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-border bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/80">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <a href="#top" className="flex items-center gap-2.5" aria-label="Nexora Business, inicio">
          <span className="flex h-8 w-8 items-center justify-center rounded-sm bg-primary text-on-primary font-mono text-sm font-medium">
            N
          </span>
          <span className="text-[15px] font-semibold tracking-tight text-foreground">
            Nexora <span className="text-muted-foreground font-normal">Business</span>
          </span>
        </a>

        <nav className="hidden items-center gap-8 md:flex" aria-label="Navegación principal">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm text-secondary transition-colors duration-200 hover:text-foreground"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="hidden items-center gap-4 md:flex">
          <a
            href="#contacto"
            className="inline-flex items-center gap-1.5 rounded-sm bg-primary px-4 py-2 text-sm font-medium text-on-primary transition-colors duration-200 hover:bg-secondary cursor-pointer"
          >
            Agenda diagnóstico
            <ArrowUpRight className="h-3.5 w-3.5" strokeWidth={2} />
          </a>
        </div>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className="inline-flex h-10 w-10 items-center justify-center rounded-sm text-foreground md:hidden cursor-pointer"
          aria-label={open ? "Cerrar menú" : "Abrir menú"}
          aria-expanded={open}
        >
          {open ? <X className="h-5.5 w-5.5" /> : <Menu className="h-5.5 w-5.5" />}
        </button>
      </div>

      {open && (
        <nav
          id="mobile-nav"
          className="border-t border-border bg-background px-4 pb-6 pt-2 md:hidden"
          aria-label="Navegación móvil"
        >
          <ul className="flex flex-col">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="block py-3 text-base text-secondary hover:text-foreground"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
          <a
            href="#contacto"
            onClick={() => setOpen(false)}
            className="mt-2 flex items-center justify-center gap-1.5 rounded-sm bg-primary px-4 py-3 text-sm font-medium text-on-primary"
          >
            Agenda diagnóstico
            <ArrowUpRight className="h-3.5 w-3.5" strokeWidth={2} />
          </a>
        </nav>
      )}
    </header>
  );
}
