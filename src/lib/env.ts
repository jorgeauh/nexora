export const siteConfig = {
  name: "Nexora Business",
  whatsappNumber: process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "525512345678",
  whatsappMessage: encodeURIComponent(
    "Hola, quiero información sobre los servicios de Nexora Business."
  ),
  calendlyUrl: process.env.NEXT_PUBLIC_CALENDLY_URL ?? "",
  emailjs: {
    serviceId: process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID ?? "",
    templateId: process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID ?? "",
    publicKey: process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY ?? "",
  },
};

export const isEmailJsConfigured = Boolean(
  siteConfig.emailjs.serviceId &&
    siteConfig.emailjs.templateId &&
    siteConfig.emailjs.publicKey
);

export const isCalendlyConfigured = Boolean(siteConfig.calendlyUrl);
