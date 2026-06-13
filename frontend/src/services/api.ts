import { ChannelSummary, ChannelDetail } from "@/types/youtube";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000/api";

export async function fetchChannels(): Promise<ChannelSummary[]> {
  const res = await fetch(`${API_URL}/channels`);
  if (!res.ok) {
    throw new Error("Error al cargar canales consolidados.");
  }
  return res.json();
}

export async function fetchChannelDetail(id: string): Promise<ChannelDetail> {
  const res = await fetch(`${API_URL}/channels/${id}`);
  if (!res.ok) {
    throw new Error("No se pudo obtener información de este canal.");
  }
  return res.json();
}

export async function ingestChannel(id: string): Promise<ChannelDetail> {
  // En el backend actual, obtener el dashboard con GET realiza la ingesta si no existe el snapshot.
  const res = await fetch(`${API_URL}/channels/${id}`);
  if (!res.ok) {
    throw new Error("ID de canal inválido o error en la API de YouTube.");
  }
  return res.json();
}
