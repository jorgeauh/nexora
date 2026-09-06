"use client";

import { useEffect, useState } from "react";
import { CloudSun, RefreshCw, TriangleAlert } from "lucide-react";

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
      <div className="h-3 w-24 rounded bg-muted" />
      <div className="mt-3 h-7 w-32 rounded bg-muted" />
    </div>
  );
}

function ErrorState() {
  return (
    <div className="flex items-center gap-2 text-sm text-muted-foreground">
      <TriangleAlert className="h-4 w-4" strokeWidth={1.5} />
      Sin datos por ahora
    </div>
  );
}

export function MarketPulse() {
  const rates = useJson<Rates>("/api/rates");
  const weather = useJson<Weather>("/api/weather");

  return (
    <section id="panorama" className="border-b border-border bg-primary py-16 sm:py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-wrap items-end justify-between gap-4">
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
        </div>

        <div className="mt-9 grid gap-px overflow-hidden rounded-lg border border-white/10 bg-white/10 sm:grid-cols-3">
          <div className="bg-primary p-6">
            <p className="text-xs font-medium text-slate-400">USD → MXN</p>
            {rates.loading ? (
              <Skeleton />
            ) : rates.error || !rates.data ? (
              <ErrorState />
            ) : (
              <p className="mt-2 font-mono text-2xl font-medium text-white">
                {rates.data.usdMxn.toFixed(2)}
              </p>
            )}
            <p className="mt-1 text-xs text-slate-500">Frankfurter API — Banco Central Europeo</p>
          </div>

          <div className="bg-primary p-6">
            <p className="text-xs font-medium text-slate-400">USD → EUR</p>
            {rates.loading ? (
              <Skeleton />
            ) : rates.error || !rates.data ? (
              <ErrorState />
            ) : (
              <p className="mt-2 font-mono text-2xl font-medium text-white">
                {rates.data.usdEur.toFixed(3)}
              </p>
            )}
            <p className="mt-1 text-xs text-slate-500">Referencia para operaciones con el exterior</p>
          </div>

          <div className="bg-primary p-6">
            <p className="flex items-center gap-1.5 text-xs font-medium text-slate-400">
              <CloudSun className="h-3.5 w-3.5" strokeWidth={1.5} />
              Clima — {weather.data?.city ?? "Ciudad de México"}
            </p>
            {weather.loading ? (
              <Skeleton />
            ) : weather.error || !weather.data ? (
              <ErrorState />
            ) : (
              <p className="mt-2 font-mono text-2xl font-medium text-white">
                {Math.round(weather.data.temperatureC)}°C
                <span className="ml-2 font-sans text-sm font-normal text-slate-400">
                  {weather.data.condition}
                </span>
              </p>
            )}
            <p className="mt-1 text-xs text-slate-500">Open-Meteo — sede Ciudad de México</p>
          </div>
        </div>
      </div>
    </section>
  );
}
