# Nexora Business

Sitio web comercial para **Nexora Business** (empresa ficticia), consultoría
estratégica para PyMEs. Desarrollado como prueba práctica para Impulso Digital
Premium.

## Stack

- **Next.js 16** (App Router, TypeScript) — desplegado en **Vercel**.
- **Tailwind CSS v4** — sistema de diseño con tokens semánticos (paleta
  "Trust & Authority": navy `#0F172A` + acento azul `#0369A1`), tipografía
  IBM Plex Sans/Mono.
- **Supabase** (Postgres + RLS) — almacenamiento de leads del formulario de
  contacto.
- **lucide-react** — iconografía SVG (sin emojis).
- **Zod** — validación de formulario, compartida entre cliente y servidor.

## Integraciones externas

El ejercicio pedía al menos una integración real. Este proyecto incluye
cuatro, cada una resolviendo un problema de negocio distinto:

### 1. Supabase — almacenamiento de leads (obligatoria)

`POST /api/contact` ([src/app/api/contact/route.ts](src/app/api/contact/route.ts))
valida el payload con Zod, aplica un honeypot + throttle básico anti-spam, y
guarda el lead en la tabla `leads` de Supabase usando la **service role key**
del lado del servidor. La tabla tiene RLS activado y **sin políticas** de
insert/select para `anon`/`authenticated`: toda la escritura pasa por el route
handler, así la clave anónima nunca queda expuesta con permiso de escritura
en el navegador. Esquema en [supabase/schema.sql](supabase/schema.sql).

### 2. Frankfurter API — tipo de cambio (sin API key)

`GET /api/rates` ([src/app/api/rates/route.ts](src/app/api/rates/route.ts))
consulta el tipo de cambio USD→MXN/EUR publicado por el Banco Central Europeo
vía [Frankfurter](https://frankfurter.dev), con `revalidate: 3600` (Next.js
Data Cache). Se muestra en la sección **"Panorama del día"** — información
que le importa a un dueño de PyME que opera o compra en dólares.

### 3. Open-Meteo API — clima (sin API key)

`GET /api/weather` ([src/app/api/weather/route.ts](src/app/api/weather/route.ts))
consulta clima actual de la sede (CDMX) vía Open-Meteo, cacheado 15 min.
Mismo patrón que el tipo de cambio: fetch server-side, componente cliente
(`MarketPulse.tsx`) con estados de carga/error explícitos (nunca un widget
roto o en blanco).

### 4. EmailJS + Calendly — notificación y agendamiento (opcionales)

- **EmailJS**: al enviar el formulario, si `NEXT_PUBLIC_EMAILJS_*` está
  configurado, el cliente dispara `emailjs.send(...)` para notificar por
  correo al equipo comercial. Es un *plus*: si falla, no bloquea el éxito
  del lead (que ya quedó guardado en Supabase) — solo se registra en consola.
- **Calendly**: si `NEXT_PUBLIC_CALENDLY_URL` está configurado, aparece el
  botón "Agendar llamada" que abre el popup widget de Calendly
  (`CalendlyButton.tsx`). Si no está configurado, el botón simplemente no
  se renderiza — no se muestra una feature rota.

Ambas integraciones son *feature-flagged* por variable de entorno: el sitio
funciona completo sin ellas (Supabase + APIs sin key ya cumplen el requisito
de integración real y demostrable).

## Variables de entorno

Ver [.env.example](.env.example). Mínimo para que el formulario guarde leads:

```
SUPABASE_URL=...
SUPABASE_SERVICE_ROLE_KEY=...
```

## Correr en local

```bash
pnpm install
cp .env.example .env.local   # y completa tus valores
pnpm dev
```

## Deploy

1. **Supabase**: crear proyecto → SQL Editor → correr
   [supabase/schema.sql](supabase/schema.sql) → copiar `Project URL` y
   `service_role key` (Settings → API).
2. **Vercel**: importar el repo → agregar las variables de entorno de
   `.env.example` → deploy. Next.js se detecta automáticamente.
3. Actualizar `NEXT_PUBLIC_WHATSAPP_NUMBER` con el número real (formato
   `52<10 dígitos>`, sin signos).

## Estructura

```
src/
  app/
    page.tsx            Composición de secciones
    api/contact/         Insert de leads en Supabase
    api/rates/            Proxy cacheado a Frankfurter
    api/weather/          Proxy cacheado a Open-Meteo
  components/            Header, Hero, Services, About, MarketPulse,
                          Contact, ContactForm, CalendlyButton, Footer,
                          WhatsAppButton
  lib/
    validation.ts        Esquema Zod compartido
    env.ts                Config pública + flags de features opcionales
    supabase/server.ts    Cliente Supabase server-only (service role)
supabase/schema.sql       DDL de la tabla `leads`
```
