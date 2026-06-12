const channelId = 'UCgVEoPZ0kxhCLeRjavcYb4w';
const apiKey = 'acava tu apikey';

// Endpoint de la API de YouTube para listar canales
const url = `https://www.googleapis.com/youtube/v3/channels?part=snippet,statistics,contentDetails&id=${channelId}&key=${apiKey}`;

fetch(url)
  .then(response => {
    if (!response.ok) {
      throw new Error(`Error en la petición: ${response.status}`);
    }
    return response.json();
  })
  .then(data => {
    // Verificamos si la respuesta contiene elementos
    if (data.items && data.items.length > 0) {
      const channel = data.items[0];
      
      console.log("--- INFORMACIÓN GENERAL ---");
      console.log(`Nombre del canal: ${channel.snippet.title}`);
      console.log(`Descripción: ${channel.snippet.description}`);
      console.log(`Foto de perfil: ${channel.snippet.thumbnails.high.url}`);

      console.log("\n--- ESTADÍSTICAS ---");
      console.log(`Suscriptores: ${channel.statistics.subscriberCount}`);
      console.log(`Vistas totales: ${channel.statistics.viewCount}`);
      console.log(`Total de videos subidos: ${channel.statistics.videoCount}`);
      
      console.log("\n--- DETALLES ADICIONALES ---");
      // ID de la lista de reproducción donde se guardan los videos subidos de este canal
      console.log(`ID de lista "Uploads" (para traer sus videos): ${channel.contentDetails.relatedPlaylists.uploads}`);
    } else {
      console.log("No se encontró ningún canal con ese ID.");
    }
  })
  .catch(error => {
    console.error("Hubo un error al realizar la petición:", error);
  });
