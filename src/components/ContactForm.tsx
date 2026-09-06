"use client";

import { useState, type FormEvent } from "react";
import { Loader2, CircleCheck, CircleAlert } from "lucide-react";
import { contactSchema } from "@/lib/validation";
import { isEmailJsConfigured, siteConfig } from "@/lib/env";

type Status = "idle" | "submitting" | "success" | "error";

const SERVICE_OPTIONS = [
  { value: "diagnostico-financiero", label: "Diagnóstico financiero" },
  { value: "estrategia-crecimiento", label: "Estrategia de crecimiento" },
  { value: "optimizacion-operativa", label: "Optimización operativa" },
  { value: "otro", label: "Otro / no estoy seguro" },
] as const;

export function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [serverError, setServerError] = useState<string | null>(null);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setServerError(null);

    const form = event.currentTarget;
    const formData = new FormData(form);
    const payload = {
      name: String(formData.get("name") ?? ""),
      email: String(formData.get("email") ?? ""),
      phone: String(formData.get("phone") ?? ""),
      company: String(formData.get("company") ?? ""),
      service: String(formData.get("service") ?? "otro"),
      message: String(formData.get("message") ?? ""),
      website: String(formData.get("website") ?? ""),
    };

    const parsed = contactSchema.safeParse(payload);
    if (!parsed.success) {
      const fieldErrors: Record<string, string> = {};
      for (const [key, messages] of Object.entries(parsed.error.flatten().fieldErrors)) {
        if (messages?.[0]) fieldErrors[key] = messages[0];
      }
      setErrors(fieldErrors);
      const firstInvalid = form.querySelector<HTMLElement>("[aria-invalid='true']");
      firstInvalid?.focus();
      return;
    }

    setErrors({});
    setStatus("submitting");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(parsed.data),
      });

      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error(body.error ?? "No pudimos enviar tu solicitud.");
      }

      if (isEmailJsConfigured) {
        try {
          const emailjs = (await import("@emailjs/browser")).default;
          await emailjs.send(
            siteConfig.emailjs.serviceId,
            siteConfig.emailjs.templateId,
            {
              from_name: parsed.data.name,
              from_email: parsed.data.email,
              phone: parsed.data.phone,
              company: parsed.data.company || "—",
              service: parsed.data.service,
              message: parsed.data.message,
            },
            { publicKey: siteConfig.emailjs.publicKey }
          );
        } catch (emailErr) {
          console.error("EmailJS falló al notificar el lead:", emailErr);
        }
      }

      setStatus("success");
      form.reset();
    } catch (err) {
      setStatus("error");
      setServerError(err instanceof Error ? err.message : "No pudimos enviar tu solicitud.");
    }
  }

  if (status === "success") {
    return (
      <div
        role="status"
        className="flex flex-col items-start gap-3 rounded-lg border border-border bg-surface p-8"
      >
        <CircleCheck className="h-8 w-8 text-success" strokeWidth={1.5} />
        <h3 className="text-lg font-semibold text-foreground">Solicitud recibida</h3>
        <p className="text-sm leading-relaxed text-muted-foreground">
          Un especialista de Nexora Business revisará tu caso y te contactará dentro de
          las próximas 24 horas hábiles.
        </p>
        <button
          type="button"
          onClick={() => setStatus("idle")}
          className="mt-2 text-sm font-medium text-accent hover:underline cursor-pointer"
        >
          Enviar otra solicitud
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-5">
      <div className="absolute -left-[9999px]" aria-hidden="true">
        <label htmlFor="website">Website</label>
        <input type="text" id="website" name="website" tabIndex={-1} autoComplete="off" />
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Nombre completo" name="name" error={errors.name} required autoComplete="name" />
        <Field label="Correo" name="email" type="email" error={errors.email} required autoComplete="email" />
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Teléfono" name="phone" type="tel" error={errors.phone} required autoComplete="tel" />
        <Field label="Empresa" name="company" error={errors.company} autoComplete="organization" />
      </div>

      <div>
        <label htmlFor="service" className="mb-1.5 block text-sm font-medium text-foreground">
          Servicio de interés
        </label>
        <select
          id="service"
          name="service"
          defaultValue="diagnostico-financiero"
          className="w-full rounded-sm border border-border bg-background px-3.5 py-2.5 text-sm text-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-ring/20 cursor-pointer"
        >
          {SERVICE_OPTIONS.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor="message" className="mb-1.5 block text-sm font-medium text-foreground">
          Cuéntanos tu reto <span className="text-destructive">*</span>
        </label>
        <textarea
          id="message"
          name="message"
          rows={4}
          required
          aria-invalid={Boolean(errors.message)}
          aria-describedby={errors.message ? "message-error" : undefined}
          className="w-full rounded-sm border border-border bg-background px-3.5 py-2.5 text-sm text-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-ring/20"
        />
        {errors.message && (
          <p id="message-error" className="mt-1.5 flex items-center gap-1.5 text-sm text-destructive">
            <CircleAlert className="h-3.5 w-3.5" strokeWidth={2} />
            {errors.message}
          </p>
        )}
      </div>

      {serverError && (
        <p role="alert" className="flex items-center gap-1.5 text-sm text-destructive">
          <CircleAlert className="h-3.5 w-3.5" strokeWidth={2} />
          {serverError}
        </p>
      )}

      <button
        type="submit"
        disabled={status === "submitting"}
        className="inline-flex w-full items-center justify-center gap-2 rounded-sm bg-primary px-6 py-3.5 text-sm font-medium text-on-primary transition-colors duration-200 hover:bg-secondary disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto cursor-pointer"
      >
        {status === "submitting" && <Loader2 className="h-4 w-4 animate-spin" strokeWidth={2} />}
        {status === "submitting" ? "Enviando..." : "Enviar solicitud"}
      </button>
    </form>
  );
}

function Field({
  label,
  name,
  type = "text",
  error,
  required,
  autoComplete,
}: {
  label: string;
  name: string;
  type?: string;
  error?: string;
  required?: boolean;
  autoComplete?: string;
}) {
  return (
    <div>
      <label htmlFor={name} className="mb-1.5 block text-sm font-medium text-foreground">
        {label} {required && <span className="text-destructive">*</span>}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        required={required}
        autoComplete={autoComplete}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? `${name}-error` : undefined}
        className="w-full rounded-sm border border-border bg-background px-3.5 py-2.5 text-sm text-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-ring/20"
      />
      {error && (
        <p id={`${name}-error`} className="mt-1.5 flex items-center gap-1.5 text-sm text-destructive">
          <CircleAlert className="h-3.5 w-3.5" strokeWidth={2} />
          {error}
        </p>
      )}
    </div>
  );
}
