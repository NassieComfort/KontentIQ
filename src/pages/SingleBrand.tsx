import React, { useEffect, useMemo, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Textarea } from '../components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Label } from '../components/ui/label';
import { Separator } from '../components/ui/separator';
import { useBrandStore, BrandData, BrandVoice } from '../store/useBrandStore';
import { useUIStore } from '../store/useUIStore';

export function SingleBrand() {
  const { id } = useParams();
  const navigate = useNavigate();
  const brand = useBrandStore((state) => state.brands.find((item) => item.id === id));
  const updateBrand = useBrandStore((state) => state.updateBrand);
  const updateVoice = useBrandStore((state) => state.updateVoice);
  const deleteBrand = useBrandStore((state) => state.deleteBrand);
  const setSelectedBrandId = useUIStore((state) => state.setSelectedBrandId);

  const [brandForm, setBrandForm] = useState<Partial<BrandData>>({});
  const [voiceForm, setVoiceForm] = useState<BrandVoice>({
    tones: [],
    targetAudience: '',
    preferredWords: [],
    bannedWords: [],
    samplePhrase: '',
  });
  const [brandSaving, setBrandSaving] = useState(false);
  const [voiceSaving, setVoiceSaving] = useState(false);

  useEffect(() => {
    if (brand) {
      setBrandForm({
        name: brand.name,
        industry: brand.industry,
        description: brand.description,
        website: brand.website,
        logo: brand.logo,
      });
      setVoiceForm(brand.voice);
      setSelectedBrandId(brand.id);
    }
  }, [brand, setSelectedBrandId]);

  const currentBrandName = useMemo(() => brand?.name ?? 'Brand', [brand]);

  const handleLogoChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === 'string') {
        setBrandForm((current) => ({ ...current, logo: reader.result }));
      }
    };
    reader.readAsDataURL(file);
  };

  const handleSaveBrand = () => {
    if (!brand || !brandForm.name?.trim() || !brandForm.industry?.trim()) return;
    setBrandSaving(true);
    updateBrand(brand.id, {
      name: brandForm.name.trim(),
      industry: brandForm.industry.trim(),
      description: brandForm.description?.trim() ?? '',
      website: brandForm.website?.trim() ?? '',
      logo: brandForm.logo ?? '',
    });
    window.setTimeout(() => setBrandSaving(false), 300);
  };

  const handleSaveVoice = () => {
    if (!brand) return;
    setVoiceSaving(true);
    updateVoice(brand.id, {
      ...voiceForm,
      tones: voiceForm.tones.map((tone) => tone.trim()).filter(Boolean),
      preferredWords: voiceForm.preferredWords.map((word) => word.trim()).filter(Boolean),
      bannedWords: voiceForm.bannedWords.map((word) => word.trim()).filter(Boolean),
    });
    window.setTimeout(() => setVoiceSaving(false), 300);
  };

  const handleDeleteBrand = () => {
    if (!brand) return;
    if (!window.confirm(`Delete ${brand.name}? This cannot be undone.`)) return;
    deleteBrand(brand.id);
    navigate('/dashboard/brands');
  };

  if (!brand) {
    return (
      <div className="min-h-screen bg-background text-foreground p-8">
        <div className="max-w-4xl mx-auto rounded-3xl border border-slate-200 bg-white p-8 shadow-lg">
          <h1 className="text-3xl font-semibold mb-4">Brand not found</h1>
          <p className="text-slate-600 mb-6">We could not locate that brand. Return to the brands list to select or create one.</p>
          <Link to="/dashboard/brands" className="inline-flex items-center rounded-full border border-slate-200 bg-slate-50 px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-100">
            Back to brands
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8 max-w-7xl mx-auto p-8">
      <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div>
          <h1 className="text-3xl font-bold font-display">{currentBrandName}</h1>
          <p className="text-slate-500">Edit this brand and keep the voice aligned across your workspace.</p>
        </div>
        <div className="flex flex-col sm:flex-row gap-3">
          <Button variant="outline" className="rounded-xl" onClick={() => navigate('/dashboard/brands')}>
            Back to brands
          </Button>
          <Button className="rounded-xl bg-[#6D5EF5] hover:bg-[#5B4EE0]" onClick={handleSaveBrand} disabled={brandSaving}>
            {brandSaving ? 'Saving...' : 'Save profile'}
          </Button>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-[1.4fr_1fr]">
        <Card className="rounded-[2rem] border-slate-200 shadow-sm">
          <CardHeader>
            <CardTitle>Brand details</CardTitle>
            <CardDescription>Update the company name, industry, website, description, and logo.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid gap-6 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="brand-name">Brand name</Label>
                <Input
                  id="brand-name"
                  value={brandForm.name ?? ''}
                  onChange={(e) => setBrandForm((current) => ({ ...current, name: e.target.value }))}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="brand-industry">Industry</Label>
                <Input
                  id="brand-industry"
                  value={brandForm.industry ?? ''}
                  onChange={(e) => setBrandForm((current) => ({ ...current, industry: e.target.value }))}
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="brand-website">Website</Label>
              <Input
                id="brand-website"
                value={brandForm.website ?? ''}
                onChange={(e) => setBrandForm((current) => ({ ...current, website: e.target.value }))}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="brand-description">Description</Label>
              <Textarea
                id="brand-description"
                value={brandForm.description ?? ''}
                onChange={(e) => setBrandForm((current) => ({ ...current, description: e.target.value }))}
              />
            </div>
            <Separator />
            <div className="grid gap-6 sm:grid-cols-[160px_1fr] items-start">
              <div className="space-y-2">
                <Label>Logo</Label>
                <div className="w-40 h-40 overflow-hidden rounded-3xl border border-slate-200 bg-slate-50">
                  {brandForm.logo ? (
                    <img src={brandForm.logo} alt={`${brand.name} logo`} className="h-full w-full object-cover" />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center text-slate-400">Upload logo</div>
                  )}
                </div>
              </div>
              <div className="space-y-4">
                <p className="text-sm text-slate-500">Upload a brand logo to keep the profile consistent across the app.</p>
                <label className="inline-flex cursor-pointer items-center rounded-2xl border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 shadow-sm hover:bg-slate-50">
                  Choose file
                  <input type="file" accept="image/*" className="hidden" onChange={handleLogoChange} />
                </label>
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex flex-col gap-3 sm:flex-row sm:justify-between sm:items-center">
            <div className="text-sm text-slate-500">Any changes here are saved to the workspace brand record.</div>
            <Button variant="secondary" className="rounded-xl" onClick={handleDeleteBrand}>
              Delete brand
            </Button>
          </CardFooter>
        </Card>

        <Card className="rounded-[2rem] border-slate-200 shadow-sm">
          <CardHeader>
            <CardTitle>Brand voice</CardTitle>
            <CardDescription>Save tone, audience, and word guidelines for this brand.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="voice-tones">Tone tags</Label>
              <Input
                id="voice-tones"
                value={voiceForm.tones.join(', ')}
                onChange={(e) => setVoiceForm((current) => ({ ...current, tones: e.target.value.split(',').map((item) => item.trim()).filter(Boolean) }))}
                placeholder="Modern, Playful, Confident"
              />
              <p className="text-sm text-slate-500">Comma-separated tone words are used across brand cards and AI prompts.</p>
            </div>
            <div className="space-y-2">
              <Label htmlFor="target-audience">Target audience</Label>
              <Input
                id="target-audience"
                value={voiceForm.targetAudience}
                onChange={(e) => setVoiceForm((current) => ({ ...current, targetAudience: e.target.value }))}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="preferred-words">Preferred words</Label>
              <Input
                id="preferred-words"
                value={voiceForm.preferredWords.join(', ')}
                onChange={(e) => setVoiceForm((current) => ({ ...current, preferredWords: e.target.value.split(',').map((item) => item.trim()).filter(Boolean) }))}
                placeholder="Innovative, Empower, Crafted"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="banned-words">Banned words</Label>
              <Input
                id="banned-words"
                value={voiceForm.bannedWords.join(', ')}
                onChange={(e) => setVoiceForm((current) => ({ ...current, bannedWords: e.target.value.split(',').map((item) => item.trim()).filter(Boolean) }))}
                placeholder="Disruptive, Cheap, Legacy"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="sample-phrase">Sample phrase</Label>
              <Textarea
                id="sample-phrase"
                value={voiceForm.samplePhrase}
                onChange={(e) => setVoiceForm((current) => ({ ...current, samplePhrase: e.target.value }))}
                placeholder="Create on-brand content in minutes, not days."
              />
            </div>
            <div className="space-y-2">
              <Label>Preview</Label>
              <div className="rounded-3xl border border-slate-200 bg-slate-50 p-4 text-sm text-slate-700">
                <p className="font-semibold">Tone:</p>
                <div className="flex flex-wrap gap-2 mt-2">
                  {voiceForm.tones.map((tone) => (
                    <Badge key={tone} variant="secondary" className="bg-indigo-50 text-[#6D5EF5] border-none">
                      {tone}
                    </Badge>
                  ))}
                </div>
                <p className="mt-4 text-slate-500">{voiceForm.samplePhrase || 'Your brand sample phrase will appear here.'}</p>
              </div>
            </div>
          </CardContent>
          <CardFooter className="justify-end">
            <Button className="rounded-xl bg-[#6D5EF5] hover:bg-[#5B4EE0]" onClick={handleSaveVoice} disabled={voiceSaving}>
              {voiceSaving ? 'Saving...' : 'Save voice'}
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
