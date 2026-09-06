import { NextResponse } from "next/server";
import { contactSchema } from "@/lib/validation";
import { getSupabaseServerClient } from "@/lib/supabase/server";

const recentSubmissions = new Map<string, number>();
const THROTTLE_MS = 15_000;

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "JSON inválido." }, { status: 400 });
  }

  const parsed = contactSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Datos inválidos.", issues: parsed.error.flatten().fieldErrors },
      { status: 422 }
    );
  }

  if (parsed.data.website) {
    return NextResponse.json({ ok: true });
  }

  const ip = request.headers.get("x-forwarded-for") ?? "unknown";
  const lastSubmit = recentSubmissions.get(ip);
  if (lastSubmit && Date.now() - lastSubmit < THROTTLE_MS) {
    return NextResponse.json(
      { error: "Espera unos segundos antes de volver a enviar." },
      { status: 429 }
    );
  }
  recentSubmissions.set(ip, Date.now());

  const supabase = getSupabaseServerClient();
  if (!supabase) {
    console.error("Supabase no está configurado (faltan SUPABASE_URL / SUPABASE_SERVICE_ROLE_KEY).");
    return NextResponse.json(
      { error: "El servicio no está disponible en este momento." },
      { status: 503 }
    );
  }

  const { name, email, phone, company, service, message } = parsed.data;

  const { error } = await supabase.from("leads").insert({
    name,
    email,
    phone,
    company: company || null,
    service,
    message,
    source: "sitio-web",
  });

  if (error) {
    console.error("Error al guardar el lead en Supabase:", error.message);
    return NextResponse.json(
      { error: "No pudimos guardar tu solicitud. Intenta de nuevo." },
      { status: 500 }
    );
  }

  return NextResponse.json({ ok: true });
}
