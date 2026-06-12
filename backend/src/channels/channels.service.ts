import { Injectable } from '@nestjs/common';
import { YoutubeService, YoutubeVideoStats } from '../youtube/youtube.service';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class ChannelsService {
  constructor(
    private readonly youtubeService: YoutubeService,
    private readonly prisma: PrismaService,
  ) {}

  async getChannelDashboard(channelId: string) {
    // 1. Obtener la fecha de hoy en formato YYYY-MM-DD (hora local)
    const hoy = new Date().toLocaleDateString('sv-SE'); // sv-SE produce "YYYY-MM-DD" localmente

    // 2. Buscar si ya existe el snapshot de hoy para este canal
    const snapshotExistente = await this.prisma.canalSnapshot.findFirst({
      where: {
        channelId: channelId,
        fetchedDate: hoy,
      },
      include: {
        videos: true,
      },
    });

    // 3. Si existe en la base de datos, lo retornamos sin llamar a la API
    if (snapshotExistente) {
      return {
        id: snapshotExistente.channelId,
        name: snapshotExistente.name,
        subscriberCount: snapshotExistente.subscriberCount,
        totalViews: Number(snapshotExistente.totalViews),
        videoCount: snapshotExistente.videoCount,
        engagementPromedio: snapshotExistente.engagementPromedio,
        videos: snapshotExistente.videos.map((v) => ({
          id: v.videoId,
          title: v.title,
          publishedAt: v.publishedDate,
          durationSeconds: v.durationSeconds,
          isShort: v.isShort,
          views: v.views,
          likes: v.likes,
          comments: v.comments,
          engagement: v.engagement,
        })),
      };
    }

    // 4. Si NO existe en la base de datos, obtener información de la API de YouTube
    const channelInfo = await this.youtubeService.getChannelInfo(channelId);

    // 5. Obtener los IDs de videos
    const videoIds = await this.youtubeService.getVideoIds(channelInfo.uploadsPlaylistId);

    // 6. Obtener estadísticas de los videos
    const videosStats = await this.youtubeService.getVideosStats(videoIds);

    // 7. Calcular métricas por video
    let totalEngagement = 0;
    let validVideosCount = 0;

    const formattedVideos = videosStats.map((video: YoutubeVideoStats) => {
      const isShort = video.durationSeconds <= 60;
      
      let engagement: number | null = null;
      if (video.views > 0) {
        engagement = parseFloat(
          (((video.likes + video.comments) / video.views) * 100).toFixed(2)
        );
        totalEngagement += engagement;
        validVideosCount++;
      }

      return {
        id: video.id,
        title: video.title,
        publishedAt: video.publishedAt,
        durationSeconds: video.durationSeconds,
        isShort,
        views: video.views,
        likes: video.likes,
        comments: video.comments,
        engagement,
      };
    });

    // 8. Calcular engagement promedio del canal
    const engagementPromedio = validVideosCount > 0
      ? parseFloat((totalEngagement / validVideosCount).toFixed(2))
      : 0;

    // 9. Guardar el nuevo snapshot en la base de datos de manera atómica
    await this.prisma.canalSnapshot.create({
      data: {
        channelId: channelId,
        name: channelInfo.name,
        subscriberCount: channelInfo.subscriberCount,
        totalViews: BigInt(channelInfo.totalViews),
        videoCount: channelInfo.videoCount,
        engagementPromedio: engagementPromedio,
        fetchedDate: hoy,
        videos: {
          create: formattedVideos.map((v) => ({
            videoId: v.id,
            title: v.title,
            views: v.views,
            likes: v.likes,
            comments: v.comments,
            engagement: v.engagement || 0,
            durationSeconds: v.durationSeconds,
            isShort: v.isShort,
            publishedDate: v.publishedAt,
          })),
        },
      },
    });

    return {
      id: channelId,
      name: channelInfo.name,
      subscriberCount: channelInfo.subscriberCount,
      totalViews: channelInfo.totalViews,
      videoCount: channelInfo.videoCount,
      engagementPromedio,
      videos: formattedVideos,
    };
  }
}
