export type BlockType = 'heading' | 'text' | 'image' | 'gallery' | 'quote' | 'registry_highlight';

export interface EditorialBlock {
  id: string;
  type: BlockType;
  content?: string;
  media_url?: string;
  media_urls?: string[];
  style?: 'default' | 'inset' | 'full';
  caption?: string;
  metadata?: Record<string, any>;
}
