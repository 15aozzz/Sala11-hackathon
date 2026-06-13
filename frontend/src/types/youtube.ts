export interface ChannelSummary {
  id: string;
  name: string;
  subscriberCount: number;
  totalViews: number;
  videoCount: number;
  engagementPromedio: number | null;
  fetchedDate: string;
  customImageUrl?: string | null;
}

export interface VideoStats {
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

export interface ChannelDetail {
  id: string;
  name: string;
  subscriberCount: number;
  totalViews: number;
  videoCount: number;
  engagementPromedio: number | null;
  fetchedDate: string;
  customImageUrl?: string | null;
  videos: VideoStats[];
}
