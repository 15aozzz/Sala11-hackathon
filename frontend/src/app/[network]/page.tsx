"use client";

import { useParams } from "next/navigation";

export default function GenericNetworkPage() {
  const params = useParams();
  const network = (params?.network as string) || "Red Social";
  const formattedNetwork = network.charAt(0).toUpperCase() + network.slice(1);

  return (
    <div className="space-y-6">
      <header className="border-b border-slate-200 pb-4">
        <h2 className="text-2xl font-bold tracking-tight text-slate-800">
          Métricas de {formattedNetwork}
        </h2>
        <p className="text-xs text-slate-500">Consolidado e ingestión analítica de {formattedNetwork}</p>
      </header>

      <section className="bg-white p-10 rounded-2xl border border-slate-200 shadow-sm text-center max-w-xl space-y-3">
        <div className="h-12 w-12 rounded-full bg-slate-100 flex items-center justify-center mx-auto text-slate-400 text-lg font-bold font-mono">
          ...
        </div>
        <h3 className="font-bold text-slate-800 text-base">Próximamente</h3>
        <p className="text-xs text-slate-400 leading-relaxed">
          La integración con la API de {formattedNetwork} está planificada para la siguiente etapa de desarrollo. Actualmente, las analíticas se centran en el módulo de YouTube.
        </p>
      </section>
    </div>
  );
}
