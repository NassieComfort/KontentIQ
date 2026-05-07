export type Brand = {
  id: string;
  name: string;
  industry: string;
  tone: string[];
  logo: string;
  team: { name: string; avatar?: string }[];
  lastActivity: string;
  description: string;
  website: string;
};

export type ContentType = 'blog' | 'instagram' | 'linkedin' | 'x' | 'email';

export type GeneratedContent = {
  id: string;
  brandId: string;
  type: ContentType;
  title: string;
  preview: string;
  status: 'draft' | 'scheduled' | 'published';
  confidence: number;
  createdAt: string;
  scheduledFor?: string;
  platform: string;
};

export type AIAgent = {
  id: string;
  name: string;
  specialty: string;
  status: 'active' | 'idle' | 'busy';
  icon: string;
  description: string;
  lastTask: string;
};

export type Asset = {
  id: string;
  brandId: string;
  name: string;
  type: 'image' | 'video' | 'logo' | 'document';
  url: string;
  size: string;
  createdAt: string;
  tags: string[];
};

export type AnalyticsData = {
  date: string;
  engagement: number;
  impressions: number;
  clicks: number;
};
