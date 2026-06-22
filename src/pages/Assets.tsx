 import React, { useState, useRef } from 'react';
import {
  Upload, 
  Search, 
  MoreVertical, 
  Download,
  Eye,
  FolderOpen, 
  Filter, 
  Grid, 
  List as ListIcon,
  Plus, 
  FileText, 
  Trash2, 
  AlertCircle
} from 'lucide-react';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Card, CardContent } from '../components/ui/card';
import {
  DropdownMenu, DropdownMenuContent,
  DropdownMenuItem, DropdownMenuTrigger
} from '../components/ui/dropdown-menu';
import { useBrandStore, BrandAsset } from '../store/useBrandStore';

export function Assets() {
  const { brands, addAsset, removeAsset } = useBrandStore();
  const [search, setSearch]     = useState('');
  const [dragOver, setDragOver] = useState(false);
  const fileRef                  = useRef<HTMLInputElement>(null);

  const allAssets = brands.flatMap(b =>
    b.assets.map(a => ({ ...a, brandName: b.name, brandId: b.id }))
  );
  const filtered = allAssets.filter(a =>
    a.name.toLowerCase().includes(search.toLowerCase())
  );

  const handleFiles = (files: FileList | null) => {
    if (!files || brands.length === 0) return;
    const targetBrandId = brands[0].id;
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
        addAsset(targetBrandId, asset);
      };
      reader.readAsDataURL(file);
    });
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold font-display">Assets</h1>
          <p className="text-muted-foreground">Manage and organise your brand media library</p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" className="rounded-xl">
            <FolderOpen className="w-4 h-4 mr-2" /> New Folder
          </Button>
          <Button
            className="rounded-xl bg-[#6D5EF5] hover:bg-[#5B4EE0]"
            onClick={() => fileRef.current?.click()}
          >
            <Upload className="w-4 h-4 mr-2" /> Upload Media
          </Button>
          <input
            ref={fileRef}
            type="file"
            multiple
            accept="image/*,.pdf,.svg"
            className="hidden"
            onChange={e => { handleFiles(e.target.files); e.target.value = ''; }}
          />
        </div>
      </div>

      {/* Toolbar */}
      <div className="flex items-center justify-between gap-4 flex-wrap">
        <div className="flex items-center gap-3 flex-1 min-w-[260px]">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Search assets..."
              className="pl-10 h-11 bg-muted/50 border-none rounded-xl"
            />
          </div>
          <Button variant="outline" className="h-11 w-11 rounded-xl border-muted bg-muted/30">
            <Filter className="w-4 h-4" />
          </Button>
        </div>
        <div className="flex bg-muted p-1 rounded-xl">
          <Button variant="ghost" className="bg-background shadow-sm h-8 w-8 rounded-lg">
            <Grid className="w-4 h-4" />
          </Button>
          <Button variant="ghost" className="h-8 w-8 rounded-lg text-muted-foreground">
            <ListIcon className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {/* Drag & Drop Zone */}
      <div
        onDragOver={e => { e.preventDefault(); setDragOver(true); }}
        onDragLeave={() => setDragOver(false)}
        onDrop={e => { e.preventDefault(); setDragOver(false); handleFiles(e.dataTransfer.files); }}
        onClick={() => fileRef.current?.click()}
        className={`border-2 border-dashed rounded-3xl p-8 text-center cursor-pointer transition-all ${
          dragOver
            ? 'border-[#6D5EF5] bg-indigo-50 dark:bg-indigo-900/10'
            : 'border-muted hover:border-[#6D5EF5]/50 hover:bg-muted/20'
        }`}
      >
        <Upload className={`w-8 h-8 mx-auto mb-2 transition-colors ${
          dragOver ? 'text-[#6D5EF5]' : 'text-muted-foreground'
        }`} />
        <p className="font-semibold text-sm">Drag & drop files here or click to browse</p>
        <p className="text-xs text-muted-foreground mt-1">Supports PNG, JPG, SVG, GIF, PDF</p>
      </div>

      {/* Asset Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6">
        {filtered.length === 0 && (
          <div className="col-span-full text-center py-14 text-muted-foreground">
            <AlertCircle className="w-8 h-8 mx-auto mb-2 opacity-30" />
            <p className="text-sm">
              {search
                ? 'No assets match your search'
                : 'No assets yet — drag & drop or click Upload'}
            </p>
          </div>
        )}

        {filtered.map(asset => (
          <Card key={asset.id}
            className="group overflow-hidden rounded-3xl border-border/40 hover:shadow-xl transition-all duration-300">
            <div className="relative aspect-square bg-muted/20">
              {asset.type === 'image' ? (
                <img
                  src={asset.url}
                  alt={asset.name}
                  className="w-full h-full object-cover transition-transform group-hover:scale-105 duration-700"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <FileText className="w-10 h-10 text-muted-foreground" />
                </div>
              )}
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                <Button variant="secondary" className="rounded-full w-8 h-8">
                  <Eye className="w-4 h-4" />
                </Button>
                <a href={asset.url} download={asset.name}>
                  <Button variant="secondary" className="rounded-full w-8 h-8">
                    <Download className="w-4 h-4" />
                  </Button>
                </a>
              </div>
              <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="secondary" className="rounded-full w-7 h-7">
                    <MoreVertical className="w-3 h-3" />
                  </Button>
                </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem>Rename</DropdownMenuItem>
                    <DropdownMenuItem
                      className="text-destructive"
                      onClick={() => removeAsset(asset.brandId, asset.id)}
                    >
                      Delete
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
            <CardContent className="p-3">
              <p className="text-xs font-bold truncate mb-0.5">{asset.name}</p>
              <p className="text-[10px] text-muted-foreground uppercase font-bold tracking-tight">
                {asset.type} · {asset.size}
              </p>
              <p className="text-[9px] text-muted-foreground/50 mt-0.5">{asset.brandName}</p>
            </CardContent>
          </Card>
        ))}

        <div
          onClick={() => fileRef.current?.click()}
          className="aspect-square border-2 border-dashed border-muted rounded-3xl flex flex-col items-center justify-center hover:bg-muted/50 transition-colors cursor-pointer group text-center p-4"
        >
          <Plus className="w-8 h-8 text-muted-foreground group-hover:text-primary transition-colors" />
          <p className="text-xs font-bold text-muted-foreground mt-2 group-hover:text-primary transition-colors">
            Add files
          </p>
        </div>
      </div>
    </div>
  );
}