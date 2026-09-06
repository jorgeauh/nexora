import { NextResponse } from "next/server";

const FRANKFURTER_URL = "https://api.frankfurter.app/latest?base=USD&symbols=MXN,EUR";

export async function GET() {
  try {
    const res = await fetch(FRANKFURTER_URL, {
      next: { revalidate: 3600 },
    });

    if (!res.ok) {
      throw new Error(`Frankfurter respondió ${res.status}`);
    }

    const data = (await res.json()) as { rates: Record<string, number>; date: string };

    return NextResponse.json({
      date: data.date,
      usdMxn: data.rates.MXN,
      usdEur: data.rates.EUR,
    });
  } catch (err) {
    console.error("Error al consultar Frankfurter API:", err);
    return NextResponse.json({ error: "No se pudo obtener el tipo de cambio." }, { status: 502 });
  }
}
