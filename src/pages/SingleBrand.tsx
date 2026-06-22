 import React, { useState, useRef, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import {
  ChevronLeft, Wand2, FileText, Plus, Palette,
  MessageSquare, Type, Trash2, Upload, X, Check,
  AlertCircle, Pencil
} from 'lucide-react';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import {
  useBrandStore, BrandColor, BrandTypography,
  BrandVoice, BrandAsset
} from '../store/useBrandStore';
import { mockContent } from '../mock/data';

// ── Design System ─────────────────────────────────────────────────────────────
function DesignSystemTab({ brandId }: { brandId: string }) {
  const { brands, updateDesignSystem } = useBrandStore();
  const brand = brands.find(b => b.id === brandId)!;
  const [colors, setColors]         = useState<BrandColor[]>(brand?.colors || []);
  const [typography, setTypography] = useState<BrandTypography>(
    brand?.typography || { displayFont: '', bodyFont: '', headingSize: '', bodySize: '' }
  );
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    if (brand) {
      setColors(brand.colors);
      setTypography(brand.typography);
    }
  }, [brandId]);

  const addColor    = () => setColors(p => [...p, { hex: '#6D5EF5', label: 'New Color' }]);
  const removeColor = (i: number) => setColors(p => p.filter((_, idx) => idx !== i));
  const updateColor = (i: number, field: 'hex' | 'label', val: string) =>
    setColors(p => p.map((c, idx) => idx === i ? { ...c, [field]: val } : c));

  const handleSave = () => {
    updateDesignSystem(brandId, colors, typography);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="space-y-8">
      {/* Colors */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-xl font-bold flex items-center gap-2">
            <Palette className="w-5 h-5 text-primary" /> Color Palette
          </h3>
          <Button variant="outline" size="sm" onClick={addColor} className="rounded-xl gap-1">
            <Plus className="w-3 h-3" /> Add Color
          </Button>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {colors.map((color, i) => (
            <div key={i} className="space-y-2 group relative">
              <div className="relative">
                <div
                  className="h-20 rounded-2xl border border-border shadow-sm cursor-pointer overflow-hidden"
                  style={{ backgroundColor: color.hex }}
                >
                  <input
                    type="color"
                    value={color.hex}
                    onChange={e => updateColor(i, 'hex', e.target.value)}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  />
                </div>
                <button
                  onClick={() => removeColor(i)}
                  className="absolute -top-2 -right-2 w-5 h-5 bg-red-500 text-white rounded-full text-xs items-center justify-center hidden group-hover:flex"
                >
                  <X className="w-3 h-3" />
                </button>
              </div>
              <Input
                value={color.label}
                onChange={e => updateColor(i, 'label', e.target.value)}
                className="h-7 text-xs text-center font-mono rounded-lg"
                placeholder="Label"
              />
              <p className="text-[10px] font-mono text-center text-muted-foreground uppercase">
                {color.hex}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Typography */}
      <section className="space-y-4">
        <h3 className="text-xl font-bold flex items-center gap-2">
          <Type className="w-5 h-5 text-primary" /> Typography
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="text-xs font-bold uppercase text-muted-foreground">Display Font</label>
            <Input
              value={typography.displayFont}
              onChange={e => setTypography(p => ({ ...p, displayFont: e.target.value }))}
              placeholder="e.g. Space Grotesk"
              className="rounded-xl h-11"
            />
          </div>
          <div className="space-y-2">
            <label className="text-xs font-bold uppercase text-muted-foreground">Body Font</label>
            <Input
              value={typography.bodyFont}
              onChange={e => setTypography(p => ({ ...p, bodyFont: e.target.value }))}
              placeholder="e.g. Inter"
              className="rounded-xl h-11"
            />
          </div>
          <div className="space-y-2">
            <label className="text-xs font-bold uppercase text-muted-foreground">Heading Size</label>
            <Input
              value={typography.headingSize}
              onChange={e => setTypography(p => ({ ...p, headingSize: e.target.value }))}
              placeholder="e.g. 32px"
              className="rounded-xl h-11"
            />
          </div>
          <div className="space-y-2">
            <label className="text-xs font-bold uppercase text-muted-foreground">Body Size</label>
            <Input
              value={typography.bodySize}
              onChange={e => setTypography(p => ({ ...p, bodySize: e.target.value }))}
              placeholder="e.g. 16px"
              className="rounded-xl h-11"
            />
          </div>
        </div>
      </section>

      <Button onClick={handleSave} className="bg-[#6D5EF5] hover:bg-[#5B4EE0] rounded-xl px-8 h-11 gap-2">
        {saved ? <><Check className="w-4 h-4" /> Saved!</> : 'Save Design System'}
      </Button>
    </div>
  );
}

// ── Brand Voice ───────────────────────────────────────────────────────────────
function BrandVoiceTab({ brandId }: { brandId: string }) {
  const { brands, updateVoice } = useBrandStore();
  const brand = brands.find(b => b.id === brandId)!;
  const [voice, setVoice] = useState<BrandVoice>(
    brand?.voice || { tones: [], targetAudience: '', preferredWords: [], bannedWords: [], samplePhrase: '' }
  );
  const [newTone, setNewTone]         = useState('');
  const [newPreferred, setNewPreferred] = useState('');
  const [newBanned, setNewBanned]     = useState('');
  const [saved, setSaved]             = useState(false);

  useEffect(() => {
    if (brand?.voice) setVoice(brand.voice);
  }, [brandId]);

  const addTone = () => {
    if (!newTone.trim()) return;
    setVoice(p => ({ ...p, tones: [...p.tones, newTone.trim()] }));
    setNewTone('');
  };
  const removeTone = (i: number) =>
    setVoice(p => ({ ...p, tones: p.tones.filter((_, idx) => idx !== i) }));

  const addWord = (type: 'preferredWords' | 'bannedWords', val: string, clear: () => void) => {
    if (!val.trim()) return;
    setVoice(p => ({ ...p, [type]: [...p[type], val.trim()] }));
    clear();
  };
  const removeWord = (type: 'preferredWords' | 'bannedWords', i: number) =>
    setVoice(p => ({ ...p, [type]: p[type].filter((_, idx) => idx !== i) }));

  const handleSave = () => {
    updateVoice(brandId, voice);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="space-y-8">
      {/* Tone */}
      <section className="space-y-3">
        <h3 className="text-xl font-bold flex items-center gap-2">
          <MessageSquare className="w-5 h-5 text-primary" /> Core Tone
        </h3>
        <div className="flex flex-wrap gap-2 mb-2">
          {voice.tones.map((tone, i) => (
            <Badge key={i} variant="secondary" className="gap-1 pr-1 rounded-full text-sm py-1 pl-3">
              {tone}
              <button onClick={() => removeTone(i)} className="ml-1 hover:text-red-500">
                <X className="w-3 h-3" />
              </button>
            </Badge>
          ))}
        </div>
        <div className="flex gap-2">
          <Input
            value={newTone}
            onChange={e => setNewTone(e.target.value)}
            placeholder="e.g. Confident & Authoritative"
            className="rounded-xl h-10"
            onKeyDown={e => e.key === 'Enter' && addTone()}
          />
          <Button variant="outline" onClick={addTone} className="rounded-xl h-10 px-4">Add</Button>
        </div>
      </section>

      {/* Target Audience */}
      <section className="space-y-2">
        <label className="text-sm font-bold uppercase text-muted-foreground">Target Audience</label>
        <Input
          value={voice.targetAudience}
          onChange={e => setVoice(p => ({ ...p, targetAudience: e.target.value }))}
          placeholder="e.g. Marketing teams and content creators"
          className="rounded-xl h-11"
        />
      </section>

      {/* Sample Phrase */}
      <section className="space-y-2">
        <label className="text-sm font-bold uppercase text-muted-foreground">Sample Brand Phrase</label>
        <textarea
          value={voice.samplePhrase}
          onChange={e => setVoice(p => ({ ...p, samplePhrase: e.target.value }))}
          placeholder="e.g. Create on-brand content in minutes, not days."
          className="w-full rounded-xl border border-input bg-background px-3 py-2 text-sm min-h-[80px] resize-none focus:outline-none focus:ring-2 focus:ring-[#6D5EF5]/20"
        />
      </section>

      {/* Words */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <section className="space-y-3">
          <label className="text-sm font-bold uppercase text-green-600">Preferred Words</label>
          <div className="flex flex-wrap gap-2 p-3 bg-green-50 dark:bg-green-900/10 rounded-2xl min-h-[60px]">
            {voice.preferredWords.map((w, i) => (
              <Badge key={i} className="bg-green-100 text-green-700 border-none gap-1 pr-1">
                {w}
                <button onClick={() => removeWord('preferredWords', i)}>
                  <X className="w-3 h-3" />
                </button>
              </Badge>
            ))}
          </div>
          <div className="flex gap-2">
            <Input
              value={newPreferred}
              onChange={e => setNewPreferred(e.target.value)}
              placeholder="Add word..."
              className="rounded-xl h-9 text-sm"
              onKeyDown={e => e.key === 'Enter' && addWord('preferredWords', newPreferred, () => setNewPreferred(''))}
            />
            <Button size="sm" variant="outline"
              onClick={() => addWord('preferredWords', newPreferred, () => setNewPreferred(''))}
              className="rounded-xl h-9">Add</Button>
          </div>
        </section>

        <section className="space-y-3">
          <label className="text-sm font-bold uppercase text-red-500">Banned Words</label>
          <div className="flex flex-wrap gap-2 p-3 bg-red-50 dark:bg-red-900/10 rounded-2xl min-h-[60px]">
            {voice.bannedWords.map((w, i) => (
              <Badge key={i} className="bg-red-100 text-red-600 border-none gap-1 pr-1">
                {w}
                <button onClick={() => removeWord('bannedWords', i)}>
                  <X className="w-3 h-3" />
                </button>
              </Badge>
            ))}
          </div>
          <div className="flex gap-2">
            <Input
              value={newBanned}
              onChange={e => setNewBanned(e.target.value)}
              placeholder="Add word..."
              className="rounded-xl h-9 text-sm"
              onKeyDown={e => e.key === 'Enter' && addWord('bannedWords', newBanned, () => setNewBanned(''))}
            />
            <Button size="sm" variant="outline"
              onClick={() => addWord('bannedWords', newBanned, () => setNewBanned(''))}
              className="rounded-xl h-9">Add</Button>
          </div>
        </section>
      </div>

      <Button onClick={handleSave} className="bg-[#6D5EF5] hover:bg-[#5B4EE0] rounded-xl px-8 h-11 gap-2">
        {saved ? <><Check className="w-4 h-4" /> Saved!</> : 'Save Brand Voice'}
      </Button>
    </div>
  );
}

// ── Assets Tab ────────────────────────────────────────────────────────────────
function AssetsTab({ brandId }: { brandId: string }) {
  const { brands, addAsset, removeAsset } = useBrandStore();
  const brand   = brands.find(b => b.id === brandId)!;
  const fileRef  = useRef<HTMLInputElement>(null);
  const [dragOver, setDragOver] = useState(false);

  const handleFiles = (files: FileList | null) => {
    if (!files) return;
    Array.from(files).forEach(file => {
      const reader = new FileReader();
      reader.onload = e => {
        const asset: BrandAsset = {
          id: `${Date.now()}-${Math.random()}`,
          name: file.name,
          type: file.type.startsWith('image') ? 'image' : 'document',
          url: e.target?.result as string,
          size: file.size > 1024 * 1024
            ? `${(file.size / 1024 / 1024).toFixed(1)}MB`
            : `${(file.size / 1024).toFixed(0)}KB`,
          tags: [],
          createdAt: new Date().toISOString().split('T')[0],
        };
        addAsset(brandId, asset);
      };
      reader.readAsDataURL(file);
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-bold">Brand Assets</h3>
        <Button size="sm" onClick={() => fileRef.current?.click()}
          className="rounded-xl bg-[#6D5EF5] hover:bg-[#5B4EE0]">
          <Upload className="w-4 h-4 mr-2" /> Upload Asset
        </Button>
        <input
          ref={fileRef}
          type="file"
          multiple
          accept="image/*,.pdf,.svg"
          className="hidden"
          title="Upload asset"
          aria-label="Upload asset"
          onChange={e => { handleFiles(e.target.files); e.target.value = ''; }}
        />
      </div>

      <div
        onDragOver={e => { e.preventDefault(); setDragOver(true); }}
        onDragLeave={() => setDragOver(false)}
        onDrop={e => { e.preventDefault(); setDragOver(false); handleFiles(e.dataTransfer.files); }}
        onClick={() => fileRef.current?.click()}
        className={`border-2 border-dashed rounded-3xl p-10 text-center cursor-pointer transition-all ${
          dragOver
            ? 'border-[#6D5EF5] bg-indigo-50 dark:bg-indigo-900/10'
            : 'border-muted hover:border-[#6D5EF5]/50 hover:bg-muted/30'
        }`}
      >
        <Upload className={`w-10 h-10 mx-auto mb-3 ${dragOver ? 'text-[#6D5EF5]' : 'text-muted-foreground'}`} />
        <p className="font-semibold text-sm">Drag & drop files here or click to browse</p>
        <p className="text-xs text-muted-foreground mt-1">Supports images, SVG, PDF</p>
      </div>

      {brand?.assets.length === 0 ? (
        <div className="text-center py-10 text-muted-foreground">
          <AlertCircle className="w-8 h-8 mx-auto mb-2 opacity-40" />
          <p className="text-sm">No assets uploaded yet</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {brand?.assets.map(asset => (
            <Card key={asset.id}
              className="group overflow-hidden rounded-2xl border-border/40 hover:shadow-lg transition-all">
              <div className="relative aspect-square bg-muted/30">
                {asset.type === 'image' ? (
                  <img src={asset.url} alt={asset.name} className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <FileText className="w-10 h-10 text-muted-foreground" />
                  </div>
                )}
                <button
                  onClick={() => removeAsset(brandId, asset.id)}
                  className="absolute top-2 right-2 w-7 h-7 bg-red-500 text-white rounded-full items-center justify-center hidden group-hover:flex shadow"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
              <CardContent className="p-3">
                <p className="text-xs font-bold truncate">{asset.name}</p>
                <p className="text-[10px] text-muted-foreground uppercase mt-1">
                  {asset.type} · {asset.size}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}

// ── Edit Profile Modal ────────────────────────────────────────────────────────
function EditProfileModal({ brand, onClose }: { brand: any; onClose: () => void }) {
  const { updateBrand } = useBrandStore();
  const [form, setForm] = useState({
    name:        brand.name,
    industry:    brand.industry,
    description: brand.description,
    website:     brand.website,
  });

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name.trim()) return;
    updateBrand(brand.id, form);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="bg-white dark:bg-slate-900 rounded-3xl p-8 w-full max-w-md shadow-2xl">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold">Edit Brand Profile</h2>
          <button onClick={onClose}
            className="p-2 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>
        <form onSubmit={handleSave} className="space-y-4">
          <div className="space-y-1">
            <label className="text-sm font-semibold text-slate-600 dark:text-slate-400">Brand Name *</label>
            <Input value={form.name}
              onChange={e => setForm(p => ({ ...p, name: e.target.value }))}
              className="rounded-xl h-11" required />
          </div>
          <div className="space-y-1">
            <label className="text-sm font-semibold text-slate-600 dark:text-slate-400">Industry</label>
            <Input value={form.industry}
              onChange={e => setForm(p => ({ ...p, industry: e.target.value }))}
              placeholder="e.g. AI SaaS, E-commerce" className="rounded-xl h-11" />
          </div>
          <div className="space-y-1">
            <label className="text-sm font-semibold text-slate-600 dark:text-slate-400">Description</label>
            <textarea value={form.description}
              onChange={e => setForm(p => ({ ...p, description: e.target.value }))}
              placeholder="What does this brand do?"
              className="w-full rounded-xl border border-input bg-background px-3 py-2 text-sm min-h-[80px] resize-none focus:outline-none focus:ring-2 focus:ring-[#6D5EF5]/20" />
          </div>
          <div className="space-y-1">
            <label className="text-sm font-semibold text-slate-600 dark:text-slate-400">Website</label>
            <Input value={form.website}
              onChange={e => setForm(p => ({ ...p, website: e.target.value }))}
              placeholder="e.g. mybrand.com" className="rounded-xl h-11" />
          </div>
          <div className="flex gap-3 pt-2">
            <Button type="button" variant="outline" onClick={onClose} className="flex-1 rounded-xl h-11">
              Cancel
            </Button>
            <Button type="submit" className="flex-1 rounded-xl h-11 bg-[#6D5EF5] hover:bg-[#5B4EE0] font-bold">
              Save Changes
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

// ── Main ──────────────────────────────────────────────────────────────────────
export function SingleBrand() {
  const { id }                         = useParams();
  const navigate                       = useNavigate();
  const { brands, updateLogo }         = useBrandStore();
  const logoRef                         = useRef<HTMLInputElement>(null);
  const [showEditModal, setShowEditModal] = useState(false);

  const brand = brands.find(b => b.id === id) || brands[0];

  const handleLogoUpload = (files: FileList | null) => {
    if (!files || !files[0] || !brand) return;
    const reader = new FileReader();
    reader.onload = e => updateLogo(brand.id, e.target?.result as string);
    reader.readAsDataURL(files[0]);
  };

  if (!brand) return (
    <div className="text-center py-20">
      <p className="text-muted-foreground">Brand not found.</p>
      <Link to="/dashboard/brands" className="text-[#6D5EF5] text-sm mt-2 inline-block">← Back</Link>
    </div>
  );

  return (
    <div className="space-y-8">
      {showEditModal && (
        <EditProfileModal brand={brand} onClose={() => setShowEditModal(false)} />
      )}

      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-border/60">
        <div className="flex items-start gap-6">
          {/* Logo */}
          <div
            className="relative w-24 h-24 rounded-3xl overflow-hidden shadow-xl border-4 border-background bg-indigo-50 flex items-center justify-center cursor-pointer group"
            onClick={() => logoRef.current?.click()}
          >
            {brand.logo ? (
              <img src={brand.logo} alt={brand.name} className="w-full h-full object-cover" />
            ) : (
              <span className="text-4xl font-bold text-[#6D5EF5]">{brand.name[0]}</span>
            )}
            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
              <Upload className="w-6 h-6 text-white" />
            </div>
            <input
              ref={logoRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={e => { handleLogoUpload(e.target.files); e.target.value = ''; }}
            />
          </div>

          <div className="space-y-1 pt-2">
            <Link to="/dashboard/brands"
              className="text-xs font-semibold text-primary flex items-center gap-1 hover:underline mb-1">
              <ChevronLeft className="w-3 h-3" /> Back to Brands
            </Link>
            <h1 className="text-4xl font-bold font-display">{brand.name}</h1>
            <p className="text-muted-foreground">{brand.industry} · {brand.website}</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <Button variant="outline" className="rounded-xl" onClick={() => setShowEditModal(true)}>
            <Pencil className="w-4 h-4 mr-2" /> Edit Profile
          </Button>
          <Button className="rounded-xl px-6 bg-primary hover:bg-primary/90">
            <Wand2 className="w-4 h-4 mr-2" /> Generate Content
          </Button>
        </div>
      </div>

      {/* Tabs */}
      <Tabs defaultValue="overview" className="space-y-8">
        <TabsList className="bg-muted/50 p-1 rounded-2xl w-full max-w-2xl overflow-x-auto h-auto">
          {[
            { value: 'overview',   label: 'Overview' },
            { value: 'design',     label: 'Design System' },
            { value: 'voice',      label: 'Brand Voice' },
            { value: 'assets',     label: 'Assets' },
            { value: 'generated',  label: 'Generated Content' },
          ].map(tab => (
            <TabsTrigger key={tab.value} value={tab.value}
              className="rounded-xl py-2 px-5 data-[state=active]:bg-background data-[state=active]:shadow-sm">
              {tab.label}
            </TabsTrigger>
          ))}
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card className="rounded-3xl border-border/40">
              <CardHeader><CardTitle className="text-lg">Brand Summary</CardTitle></CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {brand.description || 'No description yet.'}
                </p>
                <div className="flex flex-wrap gap-2">
                  {brand.tone.map(t => (
                    <Badge key={t} variant="outline" className="rounded-full">{t}</Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
            <Card className="rounded-3xl border-border/40">
              <CardHeader><CardTitle className="text-lg">Color Palette</CardTitle></CardHeader>
              <CardContent>
                <div className="flex gap-2 flex-wrap">
                  {brand.colors.map((c, i) => (
                    <div key={i} className="text-center">
                      <div className="w-10 h-10 rounded-xl shadow-sm border border-border"
                        style={{ backgroundColor: c.hex }} />
                      <p className="text-[9px] text-muted-foreground mt-1">{c.label}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
            <Card className="rounded-3xl border-border/40">
              <CardHeader><CardTitle className="text-lg">Campaign Health</CardTitle></CardHeader>
              <CardContent>
                <div className="flex items-center justify-center h-24">
                  <div className="text-center">
                    <span className="text-4xl font-bold text-primary">94.2%</span>
                    <p className="text-xs text-muted-foreground mt-1">AI Alignment Score</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="design">
          <DesignSystemTab brandId={brand.id} />
        </TabsContent>

        <TabsContent value="voice">
          <BrandVoiceTab brandId={brand.id} />
        </TabsContent>

        <TabsContent value="assets">
          <AssetsTab brandId={brand.id} />
        </TabsContent>

        <TabsContent value="generated" className="space-y-6">
          {mockContent.filter(c => c.brandId === brand.id).length === 0 ? (
            <div className="text-center py-20 text-muted-foreground">
              <FileText className="w-10 h-10 mx-auto mb-3 opacity-30" />
              <p>No generated content yet. Click Generate Content to start.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {mockContent.filter(c => c.brandId === brand.id).map(item => (
                <Card key={item.id} className="rounded-2xl border-border/60 overflow-hidden">
                  <CardHeader className="flex flex-row items-center justify-between pb-3">
                    <SocialBadge type={item.type} />
                    <Badge className="bg-primary/20 text-primary border-none">
                      {item.confidence}% Match
                    </Badge>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    <h4 className="font-bold">{item.title}</h4>
                    <p className="text-sm text-muted-foreground line-clamp-3">{item.preview}</p>
                  </CardContent>
                  <div className="p-4 bg-muted/20 border-t border-border/40 flex items-center justify-between">
                    <span className="text-xs text-muted-foreground">Generated {item.createdAt}</span>
                    <div className="flex gap-2">
                      <Button variant="ghost" size="sm" className="h-8">Regenerate</Button>
                      <Button size="sm" className="h-8">Review</Button>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}

// Social badge helper
function SocialBadge({ type }: { type: string }) {
  const map: Record<string, { label: string; bg: string; color: string; emoji: string }> = {
    instagram: { label: 'Instagram', bg: '#fce4ec', color: '#c2185b', emoji: '📸' },
    linkedin:  { label: 'LinkedIn',  bg: '#e3f2fd', color: '#0077b5', emoji: '💼' },
    twitter:   { label: 'X/Twitter', bg: '#f5f5f5', color: '#000000', emoji: '✕'  },
    x:         { label: 'X/Twitter', bg: '#f5f5f5', color: '#000000', emoji: '✕'  },
    blog:      { label: 'Blog',      bg: '#f3e5f5', color: '#7b1fa2', emoji: '📝' },
    email:     { label: 'Email',     bg: '#e8f5e9', color: '#2e7d32', emoji: '✉️' },
    campaign:  { label: 'Campaign',  bg: '#fff3e0', color: '#e65100', emoji: '🚀' },
  };
  const s = map[type?.toLowerCase()] || { label: type, bg: '#f5f5f5', color: '#555', emoji: '📄' };
  return (
    <span className="inline-flex items-center gap-1.5 px-2 py-1 rounded-lg text-[10px] font-bold uppercase"
      style={{ background: s.bg, color: s.color }}>
      {s.emoji} {s.label}
    </span>
  );
}