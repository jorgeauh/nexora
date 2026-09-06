const LINKS = [
  { href: "#servicios", label: "Servicios" },
  { href: "#empresa", label: "Empresa" },
  { href: "#panorama", label: "Panorama" },
  { href: "#contacto", label: "Contacto" },
];

export function Footer() {
  return (
    <footer className="border-t border-border bg-primary py-12 text-slate-400">
      <div className="mx-auto flex max-w-6xl flex-col gap-8 px-4 sm:px-6 md:flex-row md:items-start md:justify-between lg:px-8">
        <div>
          <span className="flex items-center gap-2.5">
            <span className="flex h-8 w-8 items-center justify-center rounded-sm bg-white/10 font-mono text-sm font-medium text-white">
              N
            </span>
            <span className="text-[15px] font-semibold text-white">Nexora Business</span>
          </span>
          <p className="mt-4 max-w-xs text-sm leading-relaxed">
            Consultoría estratégica para pequeñas y medianas empresas en México.
          </p>
        </div>

        <nav className="flex flex-wrap gap-x-8 gap-y-3" aria-label="Enlaces del pie de página">
          {LINKS.map((link) => (
            <a key={link.href} href={link.href} className="text-sm hover:text-white transition-colors duration-200">
              {link.label}
            </a>
          ))}
        </nav>
      </div>

      <div className="mx-auto mt-10 max-w-6xl border-t border-white/10 px-4 pt-6 text-xs sm:px-6 lg:px-8">
        © {new Date().getFullYear()} Nexora Business. Empresa ficticia con fines de evaluación técnica.
      </div>
    </footer>
  );
}
