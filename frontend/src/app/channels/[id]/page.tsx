"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import ChannelHeader from "@/components/channel/ChannelHeader";
import Kpis from "@/components/channel/Kpis";
import VideoList from "@/components/channel/VideoList";
import { ChannelDetail } from "@/types/youtube";
import { fetchChannelDetail } from "@/services/api";

export default function ChannelDetailPage() {
  const params = useParams();
  const id = params?.id as string;

  const [channel, setChannel] = useState<ChannelDetail | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;
    const fetchDetails = async () => {
      setIsLoading(true);
      try {
        const data = await fetchChannelDetail(id);
        setChannel(data);
      } catch (err: any) {
        setError(err.message || "Error de conexión.");
      } finally {
        setIsLoading(false);
      }
    };
    fetchDetails();
  }, [id]);

  if (isLoading) {
    return (
      <div className="py-20 text-center text-xs text-slate-500 font-semibold">
        Cargando análisis de canal...
      </div>
    );
  }

  if (error || !channel) {
    return (
      <div className="flex flex-col items-center justify-center py-20 space-y-4">
        <div className="text-red-500 text-sm font-bold">Error: {error || "No se encontró el canal"}</div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header Modulado */}
      <ChannelHeader 
        name={channel.name} 
        id={channel.id} 
        fetchedDate={channel.fetchedDate} 
        customImageUrl={channel.customImageUrl}
      />

      {/* KPIs Grid Modulado */}
      <Kpis 
        subscriberCount={channel.subscriberCount}
        totalViews={channel.totalViews}
        videoCount={channel.videoCount}
        engagementPromedio={channel.engagementPromedio}
      />

      {/* Listado y Filtros de Videos Modulados */}
      <VideoList videos={channel.videos} />
    </div>
  );
}
