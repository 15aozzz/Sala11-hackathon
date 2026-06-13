import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import axios from 'axios';

export interface YoutubeChannelInfo {
  name: string;
  subscriberCount: number;
  totalViews: number;
  videoCount: number;
  uploadsPlaylistId: string;
  customImageUrl?: string;
}

export interface YoutubeVideoStats {
  id: string;
  title: string;
  publishedAt: string;
  durationSeconds: number;
  views: number;
  likes: number;
  comments: number;
}

@Injectable()
export class YoutubeService {
  private readonly apiKey: string;
  private readonly baseUrl = 'https://www.googleapis.com/youtube/v3';

  constructor(private readonly configService: ConfigService) {
    this.apiKey = this.configService.get<string>('YOUTUBE_API_KEY') || '';
  }

  // Convierte duración ISO 8601 (ej. PT1M30S) a segundos
  private parseISO8601ToSeconds(duration: string): number {
    const match = duration.match(/PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?/);
    if (!match) return 0;
    const hours = parseInt(match[1] || '0', 10);
    const minutes = parseInt(match[2] || '0', 10);
    const seconds = parseInt(match[3] || '0', 10);
    return hours * 3600 + minutes * 60 + seconds;
  }

  async getChannelInfo(channelId: string): Promise<YoutubeChannelInfo> {
    const url = `${this.baseUrl}/channels`;
    const response = await axios.get(url, {
      params: {
        part: 'statistics,contentDetails,snippet',
        id: channelId,
        key: this.apiKey,
      },
    });

    const items = response.data.items;
    if (!items || items.length === 0) {
      throw new Error(`Canal no encontrado: ${channelId}`);
    }

    const channel = items[0];
    return {
      name: channel.snippet.title,
      subscriberCount: parseInt(channel.statistics.subscriberCount || '0', 10),
      totalViews: parseInt(channel.statistics.viewCount || '0', 10),
      videoCount: parseInt(channel.statistics.videoCount || '0', 10),
      uploadsPlaylistId: channel.contentDetails.relatedPlaylists.uploads,
      customImageUrl: channel.snippet.thumbnails?.medium?.url || channel.snippet.thumbnails?.default?.url || "",
    };
  }

  async getVideoIds(uploadsPlaylistId: string): Promise<string[]> {
    const url = `${this.baseUrl}/playlistItems`;
    const response = await axios.get(url, {
      params: {
        part: 'contentDetails',
        playlistId: uploadsPlaylistId,
        maxResults: 50,
        key: this.apiKey,
      },
    });

    const items = response.data.items || [];
    return items.map((item: any) => item.contentDetails.videoId);
  }

  async getVideosStats(videoIds: string[]): Promise<YoutubeVideoStats[]> {
    if (videoIds.length === 0) return [];
    
    // Solo hasta 50 IDs de una vez
    const ids = videoIds.slice(0, 50).join(',');
    const url = `${this.baseUrl}/videos`;
    const response = await axios.get(url, {
      params: {
        part: 'statistics,snippet,contentDetails',
        id: ids,
        key: this.apiKey,
      },
    });

    const items = response.data.items || [];
    return items.map((video: any) => {
      const durationSeconds = this.parseISO8601ToSeconds(video.contentDetails.duration);
      return {
        id: video.id,
        title: video.snippet.title,
        publishedAt: video.snippet.publishedAt.split('T')[0], // formato "2026-04-17"
        durationSeconds,
        views: parseInt(video.statistics.viewCount || '0', 10),
        likes: parseInt(video.statistics.likeCount || '0', 10),
        comments: parseInt(video.statistics.commentCount || '0', 10),
      };
    });
  }
}
