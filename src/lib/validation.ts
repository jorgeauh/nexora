import { z } from "zod";

export const contactSchema = z.object({
  name: z.string().trim().min(2, "Escribe tu nombre completo.").max(120),
  email: z.string().trim().email("Escribe un correo válido."),
  phone: z
    .string()
    .trim()
    .min(10, "El teléfono debe tener al menos 10 dígitos.")
    .max(20)
    .regex(/^[0-9+\s()-]+$/, "Usa solo números y símbolos telefónicos."),
  company: z.string().trim().max(160).optional().or(z.literal("")),
  service: z.enum([
    "diagnostico-financiero",
    "estrategia-crecimiento",
    "optimizacion-operativa",
    "otro",
  ]),
  message: z.string().trim().min(10, "Cuéntanos un poco más (mín. 10 caracteres).").max(2000),
  // Honeypot field — must stay empty. Bots tend to fill every input.
  website: z.literal("").optional(),
});

export type ContactInput = z.infer<typeof contactSchema>;
