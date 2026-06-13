"use client";

import { useState, useMemo, useEffect } from "react";

interface VideoStats {
  id: string;
  title: string;
  publishedAt: string;
  durationSeconds: number;
  isShort: boolean;
  views: number;
  likes: number;
  comments: number;
  engagement: number | null;
}

interface VideoListProps {
  videos: VideoStats[];
}

export default function VideoList({ videos }: VideoListProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [typeFilter, setTypeFilter] = useState<"all" | "video" | "short">("all");
  const [sortBy, setSortBy] = useState<"date" | "views" | "engagement">("date");
  
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // Reset page when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, typeFilter, sortBy]);

  const processedVideos = useMemo(() => {
    let list = [...videos];

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      list = list.filter((v) => v.title.toLowerCase().includes(q));
    }

    if (typeFilter !== "all") {
      const isShortTarget = typeFilter === "short";
      list = list.filter((v) => v.isShort === isShortTarget);
    }

    list.sort((a, b) => {
      if (sortBy === "date") {
        return new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime();
      }
      if (sortBy === "views") {
        return b.views - a.views;
      }
      if (sortBy === "engagement") {
        return (b.engagement ?? -1) - (a.engagement ?? -1);
      }
      return 0;
    });

    return list;
  }, [videos, searchQuery, typeFilter, sortBy]);

  const totalPages = Math.ceil(processedVideos.length / itemsPerPage);

  const paginatedVideos = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return processedVideos.slice(start, start + itemsPerPage);
  }, [processedVideos, currentPage]);

  return (
    <section className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
      {/* Filtros */}
      <div className="px-6 py-4 bg-slate-50/50 border-b border-slate-200 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
        <div>
          <h3 className="font-bold text-slate-800">Videos del Snapshot ({processedVideos.length})</h3>
        </div>
        
        <div className="flex flex-wrap items-center gap-2">
          <input
            type="text"
            placeholder="Buscar video..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="px-3 py-1.5 text-xs rounded-lg border border-slate-200 bg-white"
          />
          
          <select
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value as any)}
            className="px-2 py-1.5 text-xs rounded-lg border border-slate-200 bg-white"
          >
            <option value="all">Todos</option>
            <option value="video">Videos</option>
            <option value="short">Shorts</option>
          </select>

          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as any)}
            className="px-2 py-1.5 text-xs rounded-lg border border-slate-200 bg-white"
          >
            <option value="date">Ordenar por Fecha</option>
            <option value="views">Ordenar por Vistas</option>
            <option value="engagement">Ordenar por Engagement</option>
          </select>
        </div>
      </div>

      {/* Tabla */}
      {processedVideos.length === 0 ? (
        <div className="py-12 text-center text-xs text-slate-500">No se encontraron videos.</div>
      ) : (
        <div>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-100 text-slate-700 font-bold uppercase tracking-wider text-xs">
                  <th className="px-6 py-3">Título</th>
                  <th className="px-6 py-3">Fecha</th>
                  <th className="px-6 py-3 text-center">Tipo</th>
                  <th className="px-6 py-3 text-right">Vistas</th>
                  <th className="px-6 py-3 text-right">Likes</th>
                  <th className="px-6 py-3 text-center">Engagement</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {paginatedVideos.map((vid) => (
                  <tr key={vid.id} className="hover:bg-slate-50">
                    <td className="px-6 py-3.5 max-w-sm truncate font-bold text-slate-900" title={vid.title}>
                      {vid.title}
                    </td>
                    <td className="px-6 py-3.5 text-slate-500">
                      {new Date(vid.publishedAt).toLocaleDateString("es-ES")}
                    </td>
                    <td className="px-6 py-3.5 text-center">
                      <span className={`px-2 py-1 rounded text-xs font-bold ${
                        vid.isShort ? "bg-purple-50 text-purple-700 border border-purple-100" : "bg-indigo-50 text-indigo-700 border border-indigo-100"
                      }`}>
                        {vid.isShort ? "Short" : "Video"}
                      </span>
                    </td>
                    <td className="px-6 py-3.5 text-right text-slate-700 font-semibold">{vid.views.toLocaleString()}</td>
                    <td className="px-6 py-3.5 text-right text-slate-600">{vid.likes.toLocaleString()}</td>
                    <td className="px-6 py-3.5 text-center">
                      <span className={`px-2.5 py-1 rounded text-xs font-bold ${
                        vid.engagement !== null ? "bg-emerald-50 text-emerald-700 border border-emerald-100" : "bg-slate-100 text-slate-600 border border-slate-200"
                      }`}>
                        {vid.engagement !== null ? `${vid.engagement}%` : "Sin datos"}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Controles de Paginación */}
          {totalPages > 1 && (
            <div className="px-6 py-4 bg-slate-50/50 border-t border-slate-100 flex items-center justify-between gap-4">
              <div className="text-xs text-slate-500 font-medium">
                Mostrando videos {((currentPage - 1) * itemsPerPage) + 1} - {Math.min(currentPage * itemsPerPage, processedVideos.length)} de {processedVideos.length}
              </div>
              
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
                  disabled={currentPage === 1}
                  className="px-3 py-1.5 text-xs font-semibold text-slate-700 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 disabled:opacity-40 disabled:hover:bg-white transition-all cursor-pointer"
                >
                  Anterior
                </button>
                <span className="text-xs text-slate-600 font-bold px-2 select-none">
                  Página {currentPage} de {totalPages}
                </span>
                <button
                  onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
                  disabled={currentPage === totalPages}
                  className="px-3 py-1.5 text-xs font-semibold text-slate-700 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 disabled:opacity-40 disabled:hover:bg-white transition-all cursor-pointer"
                >
                  Siguiente
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </section>
  );
}
