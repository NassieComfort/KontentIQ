 import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface BrandColor {
  hex: string;
  label: string;
}

export interface BrandTypography {
  displayFont: string;
  bodyFont: string;
  headingSize: string;
  bodySize: string;
}

export interface BrandVoice {
  tones: string[];
  targetAudience: string;
  preferredWords: string[];
  bannedWords: string[];
  samplePhrase: string;
}

export interface BrandAsset {
  id: string;
  name: string;
  type: 'image' | 'logo' | 'document' | 'video';
  url: string;
  size: string;
  tags: string[];
  createdAt: string;
}

export interface BrandData {
  id: string;
  name: string;
  industry: string;
  description: string;
  website: string;
  logo: string;
  colors: BrandColor[];
  typography: BrandTypography;
  voice: BrandVoice;
  assets: BrandAsset[];
  tone: string[];
  team: { name: string }[];
  lastActivity: string;
}

interface BrandStore {
  brands: BrandData[];
  addBrand: (brand: BrandData) => void;
  updateBrand: (id: string, updates: Partial<BrandData>) => void;
  deleteBrand: (id: string) => void;
  updateDesignSystem: (id: string, colors: BrandColor[], typography: BrandTypography) => void;
  updateVoice: (id: string, voice: BrandVoice) => void;
  addAsset: (id: string, asset: BrandAsset) => void;
  removeAsset: (brandId: string, assetId: string) => void;
}

const defaultBrands: BrandData[] = [
  {
    id: '1',
    name: 'KontentIQ',
    industry: 'AI SaaS',
    description: 'Next-gen AI assistant for creative workflows.',
    website: 'kontentiq.ai',
    logo: '',
    colors: [
      { hex: '#6D5EF5', label: 'Primary' },
      { hex: '#A78BFA', label: 'Secondary' },
      { hex: '#0EA5E9', label: 'Accent' },
      { hex: '#F8FAFC', label: 'Background' },
    ],
    typography: {
      displayFont: 'Space Grotesk',
      bodyFont: 'Inter',
      headingSize: '32px',
      bodySize: '16px',
    },
    voice: {
      tones: ['Confident & Authoritative', 'Youthful & Energetic', 'Inclusive & Warm'],
      targetAudience: 'Marketing teams and content creators',
      preferredWords: ['Innovative', 'Seamless', 'Empower', 'Crafted'],
      bannedWords: ['Disruptive', 'Cheap', 'Legacy', 'Basic'],
      samplePhrase: 'Create on-brand content in minutes, not days.',
    },
    assets: [],
    tone: ['Modern', 'Playful', 'Confident'],
    team: [{ name: 'Nassie' }, { name: 'Comfort' }],
    lastActivity: '2 hours ago',
  },
];

export const useBrandStore = create<BrandStore>()(
  persist(
    (set) => ({
      brands: defaultBrands,
      addBrand: (brand) => set((s) => ({ brands: [...s.brands, brand] })),
      updateBrand: (id, updates) =>
        set((s) => ({ brands: s.brands.map((b) => (b.id === id ? { ...b, ...updates } : b)) })),
      deleteBrand: (id) => set((s) => ({ brands: s.brands.filter((b) => b.id !== id) })),
      updateDesignSystem: (id, colors, typography) =>
        set((s) => ({ brands: s.brands.map((b) => (b.id === id ? { ...b, colors, typography } : b)) })),
      updateVoice: (id, voice) =>
        set((s) => ({ brands: s.brands.map((b) => (b.id === id ? { ...b, voice, tone: voice.tones } : b)) })),
      addAsset: (id, asset) =>
        set((s) => ({ brands: s.brands.map((b) => (b.id === id ? { ...b, assets: [...b.assets, asset] } : b)) })),
      removeAsset: (brandId, assetId) =>
        set((s) => ({
          brands: s.brands.map((b) =>
            b.id === brandId ? { ...b, assets: b.assets.filter((a) => a.id !== assetId) } : b
          ),
        })),
    }),
    { name: 'kontentiq-brands' }
  )
);