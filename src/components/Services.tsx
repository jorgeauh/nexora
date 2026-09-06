import { LineChart, TrendingUp, Settings2, type LucideIcon } from "lucide-react";

type Service = {
  icon: LucideIcon;
  title: string;
  description: string;
  deliverables: string[];
};

const SERVICES: Service[] = [
  {
    icon: LineChart,
    title: "Diagnóstico financiero",
    description:
      "Revisamos flujo de caja, márgenes y punto de equilibrio para saber exactamente dónde estás parado.",
    deliverables: ["Estado de flujo de caja a 12 semanas", "Mapa de márgenes por línea", "Reporte de riesgos"],
  },
  {
    icon: TrendingUp,
    title: "Estrategia de crecimiento",
    description:
      "Definimos el siguiente mercado, canal o producto con mayor potencial y el plan para atacarlo.",
    deliverables: ["Análisis de mercado objetivo", "Plan comercial a 90 días", "Metas y KPIs de seguimiento"],
  },
  {
    icon: Settings2,
    title: "Optimización operativa",
    description:
      "Ordenamos procesos, equipo y proveedores para recuperar horas y reducir costos sin frenar la operación.",
    deliverables: ["Mapa de procesos actuales", "Plan de automatización", "Ahorro estimado documentado"],
  },
];

export function Services() {
  return (
    <section id="servicios" className="border-b border-border bg-surface py-20 sm:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl">
          <p className="text-xs font-semibold uppercase tracking-wide text-accent">Servicios</p>
          <h2 className="text-balance mt-3 text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
            Tres frentes, un solo plan
          </h2>
          <p className="mt-4 text-base leading-relaxed text-secondary sm:text-lg">
            Trabajamos por diagnóstico, no por hora. Cada servicio termina en entregables
            concretos que tu equipo puede ejecutar sin depender de nosotros.
          </p>
        </div>

        <div className="mt-14 grid gap-px overflow-hidden rounded-lg border border-border bg-border sm:grid-cols-3">
          {SERVICES.map(({ icon: Icon, title, description, deliverables }) => (
            <article key={title} className="flex flex-col bg-surface p-7">
              <span className="flex h-10 w-10 items-center justify-center rounded-sm bg-muted">
                <Icon className="h-5 w-5 text-primary" strokeWidth={1.5} />
              </span>
              <h3 className="mt-5 text-lg font-semibold text-foreground">{title}</h3>
              <p className="mt-2.5 text-sm leading-relaxed text-secondary">{description}</p>
              <ul className="mt-6 space-y-2.5 border-t border-border pt-5">
                {deliverables.map((item) => (
                  <li key={item} className="flex gap-2.5 text-sm text-muted-foreground">
                    <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-accent" />
                    {item}
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
