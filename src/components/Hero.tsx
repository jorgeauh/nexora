import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { Reveal } from "@/components/Reveal";
import { Counter } from "@/components/Counter";

const STATS = [
  { to: 120, decimals: 0, suffix: "+", label: "PyMEs asesoradas" },
  { to: 18, decimals: 0, suffix: "", label: "estados de México" },
  { to: 6.4, decimals: 1, suffix: "×", label: "retorno promedio del plan" },
];

export function Hero() {
  return (
    <section id="top" className="relative overflow-hidden border-b border-border">
      <Image
        src="/img/GettyImages-2184924844.webp"
        alt="Equipo de Nexora Business revisando indicadores financieros con un cliente en sala de juntas"
        fill
        priority
        sizes="100vw"
        className="object-cover object-[center_35%]"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-primary/95 via-primary/85 to-primary/60" />
      <div className="absolute inset-0 bg-gradient-to-t from-primary/70 via-transparent to-transparent" />

      <div className="relative mx-auto grid max-w-6xl gap-12 px-4 py-20 sm:px-6 lg:grid-cols-[1.1fr_0.9fr] lg:items-center lg:gap-8 lg:py-28 lg:px-8">
        <div>
          <Reveal>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 text-xs font-medium text-slate-300">
              <span className="h-1.5 w-1.5 rounded-full bg-accent" />
              Consultoría estratégica para PyMEs
            </div>
          </Reveal>

          <Reveal delay={100}>
            <h1 className="text-balance mt-6 text-4xl font-semibold tracking-tight text-white sm:text-5xl lg:text-[3.25rem] lg:leading-[1.08]">
              Orden financiero y una ruta clara para crecer tu empresa
            </h1>
          </Reveal>

          <Reveal delay={200}>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-slate-300">
              Nexora Business diagnostica tu operación, tu flujo de caja y tu estrategia
              comercial — y entrega un plan de acción con responsables y fechas, no un
              reporte que nadie vuelve a abrir.
            </p>
          </Reveal>

          <Reveal delay={300}>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center">
              <a
                href="#contacto"
                className="group inline-flex items-center justify-center gap-2 rounded-sm bg-white px-6 py-3.5 text-sm font-medium text-primary transition-all duration-200 hover:bg-slate-100 hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
              >
                Solicita tu diagnóstico gratuito
                <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5" strokeWidth={2} />
              </a>
              <a
                href="#servicios"
                className="inline-flex items-center justify-center gap-2 rounded-sm border border-white/25 px-6 py-3.5 text-sm font-medium text-white transition-all duration-200 hover:border-white/50 hover:bg-white/5 hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
              >
                Ver servicios
              </a>
            </div>
          </Reveal>

          <Reveal delay={400}>
            <dl className="mt-14 grid grid-cols-3 gap-6 border-t border-white/15 pt-8">
              {STATS.map((stat) => (
                <div key={stat.label}>
                  <dt className="sr-only">{stat.label}</dt>
                  <dd className="font-mono text-2xl font-medium text-white sm:text-3xl">
                    <Counter to={stat.to} decimals={stat.decimals} suffix={stat.suffix} />
                  </dd>
                  <dd className="mt-1 text-xs text-slate-400 sm:text-sm">{stat.label}</dd>
                </div>
              ))}
            </dl>
          </Reveal>
        </div>

        <Reveal delay={200}>
          <div className="rounded-lg border border-white/15 bg-surface/95 p-6 shadow-[0_20px_50px_rgba(2,6,23,0.35)] backdrop-blur-sm transition-shadow duration-300 hover:shadow-[0_24px_60px_rgba(2,6,23,0.45)] sm:p-8">
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
        </Reveal>
      </div>
    </section>
  );
}
