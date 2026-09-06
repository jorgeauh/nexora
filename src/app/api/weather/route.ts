import { NextResponse } from "next/server";

const LAT = 19.4326;
const LON = -99.1332;

const OPEN_METEO_URL =
  `https://api.open-meteo.com/v1/forecast?latitude=${LAT}&longitude=${LON}` +
  `&current=temperature_2m,weather_code&timezone=America%2FMexico_City`;

const WEATHER_LABELS: Record<number, string> = {
  0: "Despejado",
  1: "Mayormente despejado",
  2: "Parcialmente nublado",
  3: "Nublado",
  45: "Neblina",
  48: "Neblina helada",
  51: "Llovizna ligera",
  53: "Llovizna",
  55: "Llovizna densa",
  61: "Lluvia ligera",
  63: "Lluvia",
  65: "Lluvia fuerte",
  80: "Chubascos",
  95: "Tormenta",
};

export async function GET() {
  try {
    const res = await fetch(OPEN_METEO_URL, { next: { revalidate: 900 } });

    if (!res.ok) {
      throw new Error(`Open-Meteo respondió ${res.status}`);
    }

    const data = (await res.json()) as {
      current: { temperature_2m: number; weather_code: number };
    };

    return NextResponse.json({
      city: "Ciudad de México",
      temperatureC: data.current.temperature_2m,
      condition: WEATHER_LABELS[data.current.weather_code] ?? "Condición variable",
    });
  } catch (err) {
    console.error("Error al consultar Open-Meteo API:", err);
    return NextResponse.json({ error: "No se pudo obtener el clima." }, { status: 502 });
  }
}
