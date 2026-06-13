"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import ChannelTable from "@/components/ChannelTable";
import { ChannelSummary } from "@/types/youtube";
import { fetchChannels, ingestChannel } from "@/services/api";

export default function YoutubePage() {
  const router = useRouter();
  const [channels, setChannels] = useState<ChannelSummary[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Ingestion states
  const [searchId, setSearchId] = useState("");
  const [isSearching, setIsSearching] = useState(false);

  const loadChannels = async () => {
    setIsLoading(true);
    try {
      const data = await fetchChannels();
      setChannels(data);
    } catch (err: any) {
      setError(err.message || "Error al conectar con la base de datos.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadChannels();
  }, []);

  const handleIngest = async (e: React.FormEvent) => {
    e.preventDefault();
    const id = searchId.trim();
    if (!id) return;

    setIsSearching(true);
    setError(null);
    try {
      await ingestChannel(id);
      setSearchId("");
      loadChannels();
      router.push(`/channels/${id}`);
    } catch (err: any) {
      setError(err.message || "Error al analizar el canal.");
    } finally {
      setIsSearching(false);
    }
  };

  return (
    <div className="space-y-6">
      <header className="border-b border-slate-200 pb-4">
        <h2 className="text-2xl font-bold tracking-tight text-slate-800">
          Métricas de YouTube
        </h2>
        <p className="text-xs text-slate-500">Consolidado e ingestión analítica de canales de YouTube</p>
      </header>

      {/* Ingestion Box */}
      <section className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm max-w-xl space-y-3">
        <div>
          <h3 className="text-sm font-bold text-slate-800">Ingresar nuevo canal de YouTube</h3>
          <p className="text-xs text-slate-400">Analiza un canal ingresando su ID único (ej: UCgVEoPZ0kxhCLeRjavcYb4w).</p>
        </div>
        
        <form onSubmit={handleIngest} className="flex gap-2">
          <input
            type="text"
            placeholder="ID de canal de YouTube..."
            value={searchId}
            onChange={(e) => setSearchId(e.target.value)}
            className="flex-1 px-3 py-2 text-xs rounded-lg border border-slate-200 bg-slate-50 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            disabled={isSearching}
          />
          <button
            type="submit"
            disabled={isSearching}
            className="px-4 py-2 text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg transition-all disabled:opacity-50 cursor-pointer"
          >
            {isSearching ? "Analizando..." : "Analizar Canal"}
          </button>
        </form>
      </section>

      {error && (
        <div className="p-3 bg-red-50 text-red-700 text-xs rounded-lg border border-red-100 max-w-xl">
          {error}
        </div>
      )}

      {/* Connected Channels List */}
      <ChannelTable
        channels={channels}
        isLoading={isLoading}
        onRefresh={loadChannels}
      />
    </div>
  );
}
