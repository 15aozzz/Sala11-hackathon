interface KpisProps {
  subscriberCount: number;
  totalViews: number;
  videoCount: number;
  engagementPromedio: number | null;
}

export default function Kpis({ subscriberCount, totalViews, videoCount, engagementPromedio }: KpisProps) {
  return (
    <section className="grid grid-cols-2 md:grid-cols-4 gap-4">
      <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-sm">
        <span className="text-xs text-slate-500 font-bold uppercase tracking-wider">Suscriptores</span>
        <div className="text-xl font-bold text-slate-900 mt-1">{subscriberCount.toLocaleString()}</div>
      </div>
      <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-sm">
        <span className="text-xs text-slate-500 font-bold uppercase tracking-wider">Vistas Totales</span>
        <div className="text-xl font-bold text-slate-900 mt-1">{totalViews.toLocaleString()}</div>
      </div>
      <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-sm">
        <span className="text-xs text-slate-500 font-bold uppercase tracking-wider">Videos Totales</span>
        <div className="text-xl font-bold text-slate-900 mt-1">{videoCount}</div>
      </div>
      <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-sm">
        <span className="text-xs text-slate-500 font-bold uppercase tracking-wider">Engagement Promedio</span>
        <div className="text-xl font-bold text-emerald-700 mt-1">
          {engagementPromedio !== null ? `${engagementPromedio}%` : "Sin datos"}
        </div>
      </div>
    </section>
  );
}
