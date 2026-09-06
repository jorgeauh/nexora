import { Target, Eye, Handshake, Timer } from "lucide-react";
import { Reveal } from "@/components/Reveal";

const PILLARS = [
  {
    icon: Target,
    title: "Misión",
    text: "Dar a las PyMEs mexicanas herramientas de gestión que antes solo tenía la gran empresa.",
  },
  {
    icon: Eye,
    title: "Visión",
    text: "Ser la consultora de referencia para negocios en su primera etapa de escalamiento en México.",
  },
  {
    icon: Handshake,
    title: "Compromiso",
    text: "Sin contratos forzosos. Si el plan no genera resultado medible en 90 días, lo ajustamos sin costo.",
  },
  {
    icon: Timer,
    title: "Velocidad",
    text: "Diagnóstico inicial en 5 días hábiles. Nada de procesos de consultoría de meses.",
  },
];

export function About() {
  return (
    <section id="empresa" className="py-20 sm:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
          <Reveal>
            <p className="text-xs font-semibold uppercase tracking-wide text-accent">Nexora Business</p>
            <h2 className="text-balance mt-3 text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
              Consultoría que se mide en resultados, no en horas facturadas
            </h2>
            <p className="mt-5 text-base leading-relaxed text-secondary">
              Fundamos Nexora Business para cerrar la brecha entre las grandes consultoras
              —caras y lentas— y el negocio familiar que necesita orden ya. Combinamos
              metodología financiera formal con la velocidad de decisión que exige una PyME.
            </p>
            <p className="mt-4 text-base leading-relaxed text-secondary">
              Nuestro equipo viene de banca de desarrollo, operaciones retail y finanzas
              corporativas — traducido a planes que un dueño de negocio puede ejecutar
              con su equipo actual.
            </p>
          </Reveal>

          <div className="grid gap-6 sm:grid-cols-2">
            {PILLARS.map(({ icon: Icon, title, text }, index) => (
              <Reveal key={title} delay={index * 100}>
                <div className="group h-full rounded-lg border border-border bg-surface p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_10px_24px_rgba(15,23,42,0.08)]">
                  <Icon
                    className="h-5 w-5 text-accent transition-transform duration-300 group-hover:scale-110"
                    strokeWidth={1.5}
                  />
                  <h3 className="mt-4 text-sm font-semibold text-foreground">{title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{text}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
