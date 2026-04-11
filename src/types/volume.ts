import { EditorialBlock } from "./blocks";

export type VolumeRecord = {
  id: string;
  slug: string;
  volumeType: 'article' | 'masterclass';
  volumeNumber?: string;
  category?: string;
  title: string;
  writer: string;
  writerAvatar?: string | null;
  publishedAt?: string;
  timeToRead?: string;
  goal?: string;
  summary: string;
  content: string[] | EditorialBlock[] | any[];
  leadParagraph?: string | null;
  heroImageUrl?: string | null;
  heroImageOrientation?: 'portrait' | 'landscape';
  isPublished: boolean;
  isFeatured?: boolean;
  isLatest?: boolean;
  orderIndex: number;
  createdAt?: string;
  updatedAt?: string;
};
