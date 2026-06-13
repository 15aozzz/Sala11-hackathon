# Checklist - Día 1: Conectar la API + Esqueleto + Consolidado

## Antes de codear

- [x] Escribir `Prediccion/prediccion.md` con las fórmulas de engagement y reglas de cuota.
- [ ] Hacer primer commit: `git commit -m "DASH-D1-START"` (Checklist + .gitignore con API key fuera del repo).

## Bloque A: Entender la API y traer el primer dato

- [x] Sacar una API key de YouTube y hacer la primera llamada (`channels.list`).
- [x] Imprimir suscriptores y vistas reales de un canal (probado en `prueba/dia1.js`).
- [x] Leer el glosario y poder explicar engagement, vistas y cuota.
- [x] Crear `.gitignore` en la raíz y asegurar que la API key esté en variables de entorno `.env` en el backend.
- [ ] Limpiar la API key hardcodeada en `prueba/dia1.js` antes de subir.
- [ ] Hacer commit del Bloque A: `git commit -m "DASH-D1-PREDICT"` (predicciones.md + primera llamada).

## Bloque B: Traer videos + normalizar + primer snapshot

- [x] Listar videos vía uploads playlist (`playlistItems.list`) y traer estadísticas (`videos.list`), evitando `search.list`.
- [x] Normalizar los datos a una estructura interna independiente del formato de la API de YouTube.
- [x] Configurar base de datos (SQLite con Prisma) y guardar el primer snapshot del día por canal.
- [ ] Hacer commit del Bloque B: `git commit -m "DASH-D1-INGEST"` (Ingesta + primer snapshot).

## Bloque C: Vista consolidada v1

- [ ] Crear la interfaz de usuario / frontend (vista consolidada) para ver todos los canales en una sola pantalla.
- [x] Calcular el engagement promedio por canal en el backend (manejando división por cero y canales sin videos).
- [ ] Mostrar el engagement promedio por canal y estadísticas en la interfaz de usuario.
- [ ] Hacer commit Final: `git commit -m "DASH-D1-FINAL"` (Vista consolidada v1).
