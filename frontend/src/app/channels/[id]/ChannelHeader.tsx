import Link from "next/link";

interface ChannelHeaderProps {
  name: string;
  id: string;
  fetchedDate: string;
  customImageUrl?: string | null;
}

export default function ChannelHeader({ name, id, fetchedDate, customImageUrl }: ChannelHeaderProps) {
  return (
    <header className="flex justify-between items-center border-b border-slate-200 pb-4">
      <div className="flex items-center gap-4">
        {customImageUrl ? (
          <img 
            src={customImageUrl} 
            alt={name} 
            className="w-14 h-14 rounded-full object-cover border border-slate-200 shadow-sm"
            referrerPolicy="no-referrer"
          />
        ) : (
          <div className="w-14 h-14 rounded-full bg-indigo-50 border border-indigo-150 text-indigo-700 flex items-center justify-center font-bold text-xl select-none">
            {name.charAt(0).toUpperCase()}
          </div>
        )}
        <div>
          <div className="text-xs text-indigo-600 font-bold tracking-wider uppercase">Reporte de Canal</div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-800">{name}</h1>
          <p className="text-xs text-slate-500 font-mono mt-0.5">ID: {id} • Captura: {fetchedDate}</p>
        </div>
      </div>
      <Link href="/?network=youtube" className="px-3 py-1.5 border border-slate-200 text-slate-700 bg-white hover:bg-slate-50 rounded-lg text-xs font-bold transition-all">
        ← Volver
      </Link>
    </header>
  );
}
