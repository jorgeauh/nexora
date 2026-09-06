import { MapPin, Phone, Mail, Clock } from "lucide-react";
import { ContactForm } from "@/components/ContactForm";
import { CalendlyButton } from "@/components/CalendlyButton";
import { Reveal } from "@/components/Reveal";

const INFO = [
  { icon: MapPin, label: "Oficina", value: "Av. Insurgentes Sur 1602, CDMX, México" },
  { icon: Phone, label: "Teléfono", value: "+52 55 1234 5678" },
  { icon: Mail, label: "Correo", value: "contacto@nexorabusiness.mx" },
  { icon: Clock, label: "Atención", value: "Lun–Vie, 9:00–19:00 (hora CDMX)" },
];

export function Contact() {
  return (
    <section id="contacto" className="py-20 sm:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
          <Reveal>
            <p className="text-xs font-semibold uppercase tracking-wide text-accent">Contacto</p>
            <h2 className="text-balance mt-3 text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
              Empecemos con un diagnóstico
            </h2>
            <p className="mt-4 text-base leading-relaxed text-secondary">
              Cuéntanos de tu negocio. Respondemos en menos de 24 horas hábiles con
              siguientes pasos concretos.
            </p>

            <dl className="mt-9 space-y-5">
              {INFO.map(({ icon: Icon, label, value }) => (
                <div key={label} className="group flex items-start gap-3.5">
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-sm bg-muted transition-colors duration-300 group-hover:bg-primary">
                    <Icon
                      className="h-4.5 w-4.5 text-primary transition-colors duration-300 group-hover:text-on-primary"
                      strokeWidth={1.5}
                    />
                  </span>
                  <div>
                    <dt className="text-xs text-muted-foreground">{label}</dt>
                    <dd className="text-sm font-medium text-foreground">{value}</dd>
                  </div>
                </div>
              ))}
            </dl>

            <div className="mt-8">
              <CalendlyButton />
            </div>
          </Reveal>

          <Reveal delay={150} className="rounded-lg border border-border bg-surface p-6 sm:p-8">
            <ContactForm />
          </Reveal>
        </div>
      </div>
    </section>
  );
}
