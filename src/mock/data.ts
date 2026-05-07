import { Brand, GeneratedContent, AIAgent, Asset, AnalyticsData } from '../types';

export const mockBrands: Brand[] = [
  {
    id: '1',
    name: 'Nova AI',
    industry: 'AI SaaS',
    tone: ['Modern', 'Playful', 'Confident'],
    logo: 'https://images.unsplash.com/photo-1614850523296-d8c1af93d400?w=100&h=100&fit=crop',
    team: [{ name: 'Sarah' }, { name: 'Alex' }],
    lastActivity: '2 hours ago',
    description: 'Next-gen AI assistant for creative workflows.',
    website: 'nova.ai',
  },
  {
    id: '2',
    name: 'EcoFlow',
    industry: 'Sustainability',
    tone: ['Educational', 'Inspiring'],
    logo: 'https://images.unsplash.com/photo-1542601906-913b0d81c5a9?w=100&h=100&fit=crop',
    team: [{ name: 'Jordan' }],
    lastActivity: '1 day ago',
    description: 'Smart energy solutions for a greener planet.',
    website: 'ecoflow.com',
  },
];

export const mockContent: GeneratedContent[] = [
  {
    id: 'cnt_1',
    brandId: '1',
    type: 'instagram',
    title: 'Launch Campaign Reveal',
    preview: 'Our AI model just got a major upgrade. See the results...',
    status: 'draft',
    confidence: 94,
    createdAt: '2026-05-07',
    platform: 'Instagram',
  },
  {
    id: 'cnt_2',
    brandId: '1',
    type: 'linkedin',
    title: 'Why AI is the Future of Marketing',
    preview: 'Exploring the intersection of data-driven decisions and creative intuition...',
    status: 'scheduled',
    scheduledFor: '2026-05-10',
    confidence: 88,
    createdAt: '2026-05-06',
    platform: 'LinkedIn',
  },
];

export const mockAgents: AIAgent[] = [
  {
    id: 'agent_1',
    name: 'Social Media Agent',
    specialty: 'Instagram & X Content',
    status: 'active',
    icon: 'Share2',
    description: 'Optimizes engagement across social platforms.',
    lastTask: 'Generated 5 X posts for Nova AI',
  },
  {
    id: 'agent_2',
    name: 'SEO Blog Agent',
    specialty: 'Long-form Content',
    status: 'idle',
    icon: 'FileText',
    description: 'Specializes in high-ranking search engine content.',
    lastTask: 'Completed "Cloud Security Guide"',
  },
  {
    id: 'agent_3',
    name: 'Visual Designer Agent',
    specialty: 'Marketing Assets',
    status: 'busy',
    icon: 'Palette',
    description: 'Creates brand-aligned imagery and banners.',
    lastTask: 'Rendering banner for EcoFlow',
  },
];

export const mockAssets: Asset[] = [
  {
    id: 'ast_1',
    brandId: '1',
    name: 'Primary Logo.png',
    type: 'logo',
    url: 'https://images.unsplash.com/photo-1614850523296-d8c1af93d400?w=400&h=400&fit=crop',
    size: '1.2MB',
    createdAt: '2026-04-15',
    tags: ['logo', 'primary', 'png'],
  },
];

export const mockAnalytics: AnalyticsData[] = [
  { date: '2026-05-01', engagement: 4000, impressions: 2400, clicks: 2400 },
  { date: '2026-05-02', engagement: 3000, impressions: 1398, clicks: 2210 },
  { date: '2026-05-03', engagement: 2000, impressions: 9800, clicks: 2290 },
  { date: '2026-05-04', engagement: 2780, impressions: 3908, clicks: 2000 },
  { date: '2026-05-05', engagement: 1890, impressions: 4800, clicks: 2181 },
  { date: '2026-05-06', engagement: 2390, impressions: 3800, clicks: 2500 },
  { date: '2026-05-07', engagement: 3490, impressions: 4300, clicks: 2100 },
];
