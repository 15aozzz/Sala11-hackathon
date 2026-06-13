export default function Home() {
  return (
    <div className="space-y-6">
      <header className="border-b border-slate-200 pb-4">
        <h2 className="text-2xl font-bold tracking-tight text-slate-800">
          Dashboard Principal
        </h2>
        <p className="text-xs text-slate-500">Consolidado e ingestión analítica de redes sociales</p>
      </header>

      <section className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm max-w-xl space-y-2">
        <h3 className="font-bold text-slate-800 text-base">Bienvenido a Metrics Studio</h3>
        <p className="text-xs text-slate-500 leading-relaxed">
          Selecciona una de las redes sociales en el menú lateral de la izquierda para comenzar a gestionar tus analíticas y snapshots de canales.
        </p>
      </section>
    </div>
  );
}
