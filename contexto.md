Contexto del proyecto — Dashboard Unificado de Redes Sociales
¿Qué es este sistema?
Un dashboard que se conecta automáticamente a YouTube, trae métricas reales de canales y videos, las procesa y las muestra en una interfaz web. El objetivo es que el community manager tenga una visión global sin entrar a YouTube manualmente.
Stack tecnológico

Backend: NestJS (obligatorio)
Frontend: Next.js
Base de datos: (PostgreSQL más adelante, por ahora sqlite)
Fuente de datos: YouTube Data API v3 con API key

Estado actual

Solo trabajamos con YouTube (v1)
Sin base de datos por ahora — los datos se traen directo de la API en cada request
Más adelante se agregará PostgreSQL para guardar snapshots históricos
En el futuro se agregarán Facebook, Instagram y TikTok

Arquitectura pensada para escalar

Cada red social tendrá su propio conector independiente
La capa de negocio no sabe de qué red vienen los datos
El frontend solo consume endpoints REST del backend

Reglas de negocio obligatorias

Engagement de un video = (likes + comentarios) / vistas \* 100
Si vistas = 0 → engagement = null (nunca dividir por cero)
isShort = durationSeconds <= 60
Engagement promedio del canal = promedio de videos con engagement no nulo
Canal que crece más rápido = mayor tasa % de crecimiento, no crecimiento absoluto
Las duraciones de YouTube vienen en formato ISO 8601 (ej: PT1M30S) — siempre convertir a segundos

Reglas de la YouTube API

NUNCA usar search.list — cuesta 100 unidades de cuota por llamada
Para listar videos de un canal usar uploads playlist con playlistItems.list (1 unidad)
channels.list cuesta 1 unidad y trae estadísticas + ID del uploads playlist
videos.list cuesta 1 unidad por cada 50 videos
Cuota diaria disponible: 10,000 unidades
La API key va solo en el backend, en variables de entorno, nunca en el frontend ni en el repositorio

JSON que devuelve el backend (forma normalizada)
json{
"id": "UCxxxxxx",
"name": "Nombre del canal",
"subscriberCount": 39000000,
"totalViews": 22000000000,
"videoCount": 19,
"engagementPromedio": 2.35,
"videos": [
{
"id": "xxxxxxxxxxx",
"title": "Nombre del video",
"publishedAt": "2026-04-17",
"durationSeconds": 245,
"isShort": false,
"views": 13000000,
"likes": 286000,
"comments": 0,
"engagement": 2.27
}
]
}
