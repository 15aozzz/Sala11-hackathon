"use client";

import { useRouter } from "next/navigation";
import { ChannelSummary } from "@/types/youtube";

interface ChannelTableProps {
  channels: ChannelSummary[];
  isLoading: boolean;
  onRefresh: () => void;
}

export default function ChannelTable({ channels, isLoading, onRefresh }: ChannelTableProps) {
  const router = useRouter();

  const getEngagementColor = (rate: number | null) => {
    if (rate === null) return "text-slate-400 bg-slate-50 border-slate-100";
    if (rate >= 5) return "text-emerald-700 bg-emerald-50 border-emerald-100";
    if (rate >= 2) return "text-indigo-700 bg-indigo-50 border-indigo-100";
    return "text-amber-700 bg-amber-50 border-amber-100";
  };

  return (
    <section className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden flex-1">
      <div className="px-6 py-4 border-b border-slate-100 flex justify-between items-center">
        <div>
          <h3 className="font-bold text-slate-800 text-base">Consolidado de Canales</h3>
          <p className="text-xs text-slate-400">Últimos snapshots registrados en la base de datos local</p>
        </div>
        <button 
          onClick={onRefresh}
          className="px-3 py-1.5 text-xs font-semibold text-slate-600 border border-slate-200 rounded-lg hover:bg-slate-50 transition-all cursor-pointer"
        >
          Recargar
        </button>
      </div>

      {isLoading && channels.length === 0 ? (
        <div className="py-20 text-center text-sm text-slate-500">Cargando base de datos...</div>
      ) : channels.length === 0 ? (
        <div className="py-20 text-center text-sm text-slate-500">
          <p className="font-semibold text-slate-700">No hay canales monitoreados todavía.</p>
          <p className="text-xs text-slate-400 mt-1">Usa la barra lateral para agregar tu primer canal de YouTube.</p>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-100 text-slate-700 font-bold uppercase tracking-wider text-xs">
                <th className="px-6 py-4">Canal</th>
                <th className="px-6 py-4">Suscriptores</th>
                <th className="px-6 py-4">Vistas Totales</th>
                <th className="px-6 py-4 text-center">Videos</th>
                <th className="px-6 py-4 text-center">Engagement Promedio</th>
                <th className="px-6 py-4">Última Captura</th>
                <th className="px-6 py-4 text-right">Detalle</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {channels.map((ch) => (
                <tr key={ch.id} className="hover:bg-slate-50">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      {ch.customImageUrl ? (
                        <img 
                          src={ch.customImageUrl} 
                          alt={ch.name} 
                          className="w-10 h-10 rounded-full object-cover border border-slate-100 shadow-sm"
                          referrerPolicy="no-referrer"
                        />
                      ) : (
                        <div className="w-10 h-10 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-700 flex items-center justify-center font-bold text-sm select-none">
                          {ch.name.charAt(0).toUpperCase()}
                        </div>
                      )}
                      <div>
                        <div className="font-bold text-slate-900 text-base leading-tight">{ch.name}</div>
                        <div className="text-xs text-slate-500 font-mono mt-0.5">{ch.id}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-slate-700 font-semibold">{ch.subscriberCount.toLocaleString()}</td>
                  <td className="px-6 py-4 text-slate-700 font-medium">{ch.totalViews.toLocaleString()}</td>
                  <td className="px-6 py-4 text-center text-slate-700 font-semibold">{ch.videoCount}</td>
                  <td className="px-6 py-4 text-center">
                    <span className={`px-3 py-1.5 rounded-md text-xs font-bold border ${getEngagementColor(ch.engagementPromedio)}`}>
                      {ch.engagementPromedio !== null ? `${ch.engagementPromedio}%` : "Sin datos"}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-slate-500 font-mono">{ch.fetchedDate}</td>
                  <td className="px-6 py-4 text-right">
                    <button
                      onClick={() => router.push(`/channels/${ch.id}`)}
                      className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-xl font-bold text-xs transition-all active:scale-95 cursor-pointer"
                    >
                      Ver Reporte
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
}
