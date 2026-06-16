import React, { useMemo, useState } from 'react';
import { Search, Plus, Filter, Trash, ArrowUpRight } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Link, useNavigate } from 'react-router-dom';
import { Avatar, AvatarFallback } from '../components/ui/avatar';
import { useBrandStore, BrandData } from '../store/useBrandStore';
import { useUIStore } from '../store/useUIStore';

const defaultNewBrand: Partial<BrandData> = {
  name: '',
  industry: '',
  description: '',
  website: '',
  logo: '',
};

export function Brands() {
  const navigate = useNavigate();
  const brands = useBrandStore((state) => state.brands);
  const addBrand = useBrandStore((state) => state.addBrand);
  const deleteBrand = useBrandStore((state) => state.deleteBrand);
  const setSelectedBrandId = useUIStore((state) => state.setSelectedBrandId);

  const [showCreate, setShowCreate] = useState(false);
  const [newBrand, setNewBrand] = useState(defaultNewBrand);

  const brandList = useMemo(() => brands, [brands]);

  const handleLogoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === 'string') {
        setNewBrand((current) => ({ ...current, logo: reader.result }));
      }
    };
    reader.readAsDataURL(file);
  };

  const handleCreateBrand = () => {
    if (!newBrand.name?.trim() || !newBrand.industry?.trim()) {
      return;
    }

    const id = Date.now().toString();
    const brand: BrandData = {
      id,
      name: newBrand.name.trim(),
      industry: newBrand.industry.trim(),
      description: newBrand.description?.trim() ?? '',
      website: newBrand.website?.trim() ?? '',
      logo: newBrand.logo ?? '',
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
        tones: ['Clear', 'Friendly'],
        targetAudience: '',
        preferredWords: [],
        bannedWords: [],
        samplePhrase: '',
      },
      assets: [],
      tone: ['Clear', 'Friendly'],
      team: [],
      lastActivity: 'Just now',
    };

    addBrand(brand);
    setSelectedBrandId(id);
    setNewBrand(defaultNewBrand);
    setShowCreate(false);
    navigate(`/dashboard/brands/${id}`);
  };

  const handleDeleteBrand = (brandId: string) => {
    if (!window.confirm('Delete this brand? This action cannot be undone.')) return;
    deleteBrand(brandId);
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold font-display">Brands</h1>
          <p className="text-slate-500">Manage your brand identities and AI-trained personas</p>
        </div>
        <Button
          className="rounded-xl px-6 bg-[#6D5EF5] hover:bg-[#5B4EE0] shadow-lg shadow-indigo-100 font-bold h-11"
          onClick={() => setShowCreate((current) => !current)}
        >
          <Plus className="w-4 h-4 mr-2" />
          {showCreate ? 'Cancel' : 'Add New Brand'}
        </Button>
      </div>

      {showCreate && (
        <Card className="rounded-3xl border border-slate-200 bg-white shadow-sm">
          <CardHeader className="p-6">
            <CardTitle>Create a new brand</CardTitle>
            <CardDescription>Define the brand name, industry, description, and logo to get started.</CardDescription>
          </CardHeader>
          <CardContent className="grid gap-6 md:grid-cols-2">
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">Brand name</label>
                <Input
                  value={newBrand.name ?? ''}
                  onChange={(e) => setNewBrand((current) => ({ ...current, name: e.target.value }))}
                  placeholder="KontentIQ"
                  className="rounded-2xl"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">Industry</label>
                <Input
                  value={newBrand.industry ?? ''}
                  onChange={(e) => setNewBrand((current) => ({ ...current, industry: e.target.value }))}
                  placeholder="AI SaaS"
                  className="rounded-2xl"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">Website</label>
                <Input
                  value={newBrand.website ?? ''}
                  onChange={(e) => setNewBrand((current) => ({ ...current, website: e.target.value }))}
                  placeholder="kontentiq.ai"
                  className="rounded-2xl"
                />
              </div>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">Description</label>
                <textarea
                  value={newBrand.description ?? ''}
                  onChange={(e) => setNewBrand((current) => ({ ...current, description: e.target.value }))}
                  className="min-h-[120px] w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#6D5EF5]/20"
                  placeholder="A brand description that explains your positioning."
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">Logo upload</label>
                <div className="flex items-center gap-4">
                  <div className="w-20 h-20 rounded-3xl border border-slate-200 overflow-hidden bg-slate-50">
                    {newBrand.logo ? (
                      <img src={newBrand.logo} alt="logo" className="w-full h-full object-cover" />
                    ) : (
                      <div className="flex h-full w-full items-center justify-center text-slate-400 text-xs uppercase tracking-[0.2em]">
                        Logo
                      </div>
                    )}
                  </div>
                  <label className="cursor-pointer rounded-2xl border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 shadow-sm hover:bg-slate-50">
                    Choose file
                    <input type="file" accept="image/*" onChange={handleLogoUpload} className="hidden" />
                  </label>
                </div>
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex flex-col gap-3 px-6 pb-6 pt-0 sm:flex-row sm:justify-between sm:items-center">
            <p className="text-sm text-slate-500">Once added, the brand will be available across your workspace and AI workflow.</p>
            <Button className="rounded-xl px-6 bg-[#6D5EF5] hover:bg-[#5B4EE0]" onClick={handleCreateBrand}>
              Create Brand
            </Button>
          </CardFooter>
        </Card>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {brandList.map((brand) => (
          <div key={brand.id} className="group bg-white rounded-3xl border border-slate-100 overflow-hidden hover:shadow-xl hover:shadow-indigo-500/5 transition-all duration-300">
            <div className="p-6">
              <div className="flex items-start justify-between mb-6">
                <div className="w-14 h-14 rounded-2xl overflow-hidden border border-slate-100 shadow-sm bg-slate-100">
                  {brand.logo ? (
                    <img src={brand.logo} alt={brand.name} className="w-full h-full object-cover" />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center text-slate-400">No logo</div>
                  )}
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  className="rounded-xl bg-slate-50 hover:bg-slate-100 opacity-0 group-hover:opacity-100 transition-opacity"
                  onClick={() => handleDeleteBrand(brand.id)}
                >
                  <Trash className="w-4 h-4 text-slate-400" />
                </Button>
              </div>
              <div>
                <Link to={`/dashboard/brands/${brand.id}`} className="hover:text-[#6D5EF5] transition-colors">
                  <h3 className="text-xl font-bold font-display leading-tight">{brand.name}</h3>
                </Link>
                <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mt-1">{brand.industry}</p>
              </div>
              <p className="text-sm text-slate-500 line-clamp-2 mt-4 min-h-[40px] leading-relaxed">
                {brand.description}
              </p>
              <div className="flex flex-wrap gap-2 mt-6">
                {brand.tone.map((tone) => (
                  <Badge key={tone} variant="secondary" className="bg-indigo-50 text-[#6D5EF5] font-bold text-[10px] uppercase border-none px-2.5">
                    {tone}
                  </Badge>
                ))}
              </div>
            </div>
            <div className="p-4 px-6 bg-slate-50 flex items-center justify-between border-t border-slate-100">
              <div className="flex -space-x-2">
                {brand.team.map((member, i) => (
                  <Avatar key={i} className="w-7 h-7 border-2 border-white shadow-sm shrink-0">
                    <AvatarFallback className="text-[10px] font-bold bg-indigo-100 text-indigo-600">{member.name[0]}</AvatarFallback>
                  </Avatar>
                ))}
              </div>
              <Link to={`/dashboard/brands/${brand.id}`}>
                <Button variant="ghost" size="sm" className="text-xs font-bold text-slate-400 hover:text-[#6D5EF5] transition-colors gap-1">
                  View Brand <ArrowUpRight className="w-3 h-3" />
                </Button>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
