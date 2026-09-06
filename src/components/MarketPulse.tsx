"use client";

import { useEffect, useState } from "react";
import { CloudSun, RefreshCw, TriangleAlert } from "lucide-react";
import { Reveal } from "@/components/Reveal";

type Rates = { date: string; usdMxn: number; usdEur: number };
type Weather = { city: string; temperatureC: number; condition: string };

function useJson<T>(url: string) {
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;

    fetch(url)
      .then((res) => {
        if (!res.ok) throw new Error("bad response");
        return res.json();
      })
      .then((json) => {
        if (!cancelled) setData(json);
      })
      .catch(() => {
        if (!cancelled) setError(true);
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [url]);

  return { data, error, loading };
}

function Skeleton() {
  return (
    <div className="animate-pulse">
      <div className="h-3 w-24 rounded bg-white/10" />
      <div className="mt-3 h-7 w-32 rounded bg-white/10" />
    </div>
  );
}

function ErrorState() {
  return (
    <div className="flex items-center gap-2 text-sm text-slate-400">
      <TriangleAlert className="h-4 w-4" strokeWidth={1.5} />
      Sin datos por ahora
    </div>
  );
}

export function MarketPulse() {
  const rates = useJson<Rates>("/api/rates");
  const weather = useJson<Weather>("/api/weather");

  const cards = [
    {
      key: "mxn",
      label: "USD → MXN",
      state: rates,
      render: (d: Rates) => d.usdMxn.toFixed(2),
      note: "Frankfurter API — Banco Central Europeo",
    },
    {
      key: "eur",
      label: "USD → EUR",
      state: rates,
      render: (d: Rates) => d.usdEur.toFixed(3),
      note: "Referencia para operaciones con el exterior",
    },
  ];

  return (
    <section id="panorama" className="border-b border-border bg-primary py-16 sm:py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <Reveal className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
              Panorama del día
            </p>
            <h2 className="mt-2 text-2xl font-semibold tracking-tight text-white sm:text-3xl">
              Datos en vivo para decidir con contexto
            </h2>
          </div>
          <p className="flex items-center gap-1.5 text-xs text-slate-400">
            <RefreshCw className="h-3.5 w-3.5" strokeWidth={1.5} />
            Actualizado {rates.data?.date ?? "cada hora"}
          </p>
        </Reveal>

        <div className="mt-9 grid gap-px overflow-hidden rounded-lg border border-white/10 bg-white/10 sm:grid-cols-3">
          {cards.map(({ key, label, state, render, note }, index) => (
            <Reveal key={key} delay={index * 120} className="group bg-primary p-6 transition-colors duration-300 hover:bg-white/[0.04]">
              <p className="text-xs font-medium text-slate-400">{label}</p>
              {state.loading ? (
                <Skeleton />
              ) : state.error || !state.data ? (
                <ErrorState />
              ) : (
                <p className="animate-fade-in-up mt-2 font-mono text-2xl font-medium text-white">
                  {render(state.data)}
                </p>
              )}
              <p className="mt-1 text-xs text-slate-500">{note}</p>
            </Reveal>
          ))}

          <Reveal delay={240} className="group bg-primary p-6 transition-colors duration-300 hover:bg-white/[0.04]">
            <p className="flex items-center gap-1.5 text-xs font-medium text-slate-400">
              <CloudSun className="h-3.5 w-3.5" strokeWidth={1.5} />
              Clima — {weather.data?.city ?? "Ciudad de México"}
            </p>
            {weather.loading ? (
              <Skeleton />
            ) : weather.error || !weather.data ? (
              <ErrorState />
            ) : (
              <p className="animate-fade-in-up mt-2 font-mono text-2xl font-medium text-white">
                {Math.round(weather.data.temperatureC)}°C
                <span className="ml-2 font-sans text-sm font-normal text-slate-400">
                  {weather.data.condition}
                </span>
              </p>
            )}
            <p className="mt-1 text-xs text-slate-500">Open-Meteo — sede Ciudad de México</p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
