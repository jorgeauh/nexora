import { ArrowRight, ShieldCheck } from "lucide-react";

const STATS = [
  { value: "120+", label: "PyMEs asesoradas" },
  { value: "18", label: "estados de México" },
  { value: "6.4×", label: "retorno promedio del plan" },
];

export function Hero() {
  return (
    <section id="top" className="relative overflow-hidden border-b border-border">
      <div className="bg-grid absolute inset-0 [mask-image:linear-gradient(to_bottom,black,transparent_85%)]" />

      <div className="relative mx-auto grid max-w-6xl gap-12 px-4 py-20 sm:px-6 lg:grid-cols-[1.1fr_0.9fr] lg:items-center lg:gap-8 lg:py-28 lg:px-8">
        <div>
          <div className="inline-flex items-center gap-2 rounded-sm border border-border bg-surface px-3 py-1.5 text-xs font-medium text-secondary">
            <ShieldCheck className="h-3.5 w-3.5 text-accent" strokeWidth={2} />
            Consultoría estratégica para PyMEs
          </div>

          <h1 className="text-balance mt-6 text-4xl font-semibold tracking-tight text-foreground sm:text-5xl lg:text-[3.25rem] lg:leading-[1.08]">
            Orden financiero y una ruta clara para crecer tu empresa
          </h1>

          <p className="mt-6 max-w-xl text-lg leading-relaxed text-secondary">
            Nexora Business diagnostica tu operación, tu flujo de caja y tu estrategia
            comercial — y entrega un plan de acción con responsables y fechas, no un
            reporte que nadie vuelve a abrir.
          </p>

          <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center">
            <a
              href="#contacto"
              className="inline-flex items-center justify-center gap-2 rounded-sm bg-primary px-6 py-3.5 text-sm font-medium text-on-primary transition-colors duration-200 hover:bg-secondary cursor-pointer"
            >
              Solicita tu diagnóstico gratuito
              <ArrowRight className="h-4 w-4" strokeWidth={2} />
            </a>
            <a
              href="#servicios"
              className="inline-flex items-center justify-center gap-2 rounded-sm border border-border bg-surface px-6 py-3.5 text-sm font-medium text-foreground transition-colors duration-200 hover:border-secondary cursor-pointer"
            >
              Ver servicios
            </a>
          </div>

          <dl className="mt-14 grid grid-cols-3 gap-6 border-t border-border pt-8">
            {STATS.map((stat) => (
              <div key={stat.label}>
                <dt className="sr-only">{stat.label}</dt>
                <dd className="font-mono text-2xl font-medium text-foreground sm:text-3xl">
                  {stat.value}
                </dd>
                <dd className="mt-1 text-xs text-muted-foreground sm:text-sm">{stat.label}</dd>
              </div>
            ))}
          </dl>
        </div>

        <div className="relative rounded-lg border border-border bg-surface p-6 shadow-[0_1px_2px_rgba(15,23,42,0.04)] sm:p-8">
          <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
            Diagnóstico exprés — semana 1
          </p>
          <ul className="mt-5 space-y-4">
            {[
              ["Flujo de caja", "Mapa de entradas/salidas y semanas de colchón"],
              ["Estructura comercial", "Embudo, ticket promedio y tasa de cierre"],
              ["Costos operativos", "Fugas identificadas y prioridad de ahorro"],
            ].map(([title, desc]) => (
              <li key={title} className="flex gap-3 border-b border-border pb-4 last:border-0 last:pb-0">
                <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                <div>
                  <p className="text-sm font-medium text-foreground">{title}</p>
                  <p className="mt-0.5 text-sm text-muted-foreground">{desc}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
