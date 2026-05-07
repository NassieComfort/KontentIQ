import React from 'react';
import { 
  Upload, 
  Search, 
  MoreVertical, 
  Download, 
  Eye, 
  Tag, 
  FileIcon, 
  Film, 
  Image as ImageIcon,
  FolderOpen,
  Filter,
  Grid,
  List as ListIcon,
  Plus
} from 'lucide-react';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Card, CardContent } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from '../components/ui/dropdown-menu';
import { mockAssets } from '../mock/data';

export function Assets() {
  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold font-display">Assets</h1>
          <p className="text-muted-foreground">Manage and organize your brand media library</p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" className="rounded-xl">
             <FolderOpen className="w-4 h-4 mr-2" />
             New Folder
          </Button>
          <Button className="rounded-xl bg-primary">
             <Upload className="w-4 h-4 mr-2" />
             Upload Media
          </Button>
        </div>
      </div>

      {/* Toolbar */}
      <div className="flex items-center justify-between gap-4 flex-wrap">
        <div className="flex items-center gap-3 flex-1 min-w-[300px]">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input placeholder="Search assets..." className="pl-10 h-11 bg-muted/50 border-none rounded-xl" />
          </div>
          <Button variant="outline" size="icon" className="h-11 w-11 rounded-xl border-muted bg-muted/30">
            <Filter className="w-4 h-4" />
          </Button>
        </div>
        <div className="flex bg-muted p-1 rounded-xl">
           <Button variant="ghost" size="icon" className="bg-background shadow-sm h-8 w-8 rounded-lg">
             <Grid className="w-4 h-4" />
           </Button>
           <Button variant="ghost" size="icon" className="h-8 w-8 rounded-lg text-muted-foreground">
             <ListIcon className="w-4 h-4" />
           </Button>
        </div>
      </div>

      {/* Asset Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6">
        {/* Placeholder folders */}
        {[
          { name: 'Logos', count: 12 },
          { name: 'Social Graphics', count: 45 },
          { name: 'Video B-Roll', count: 8 },
          { name: 'Product Photos', count: 120 },
        ].map((folder, i) => (
          <div key={i} className="group cursor-pointer">
            <div className="aspect-square rounded-3xl bg-muted/50 flex items-center justify-center border border-transparent group-hover:border-primary/20 group-hover:bg-primary/5 transition-all mb-3 relative overflow-hidden">
               <div className="absolute top-0 right-0 w-12 h-12 bg-primary/5 rounded-bl-3xl" />
               <FolderOpen className="w-10 h-10 text-muted-foreground group-hover:text-primary transition-colors" />
            </div>
            <p className="text-sm font-semibold truncate group-hover:text-primary transition-colors">{folder.name}</p>
            <p className="text-xs text-muted-foreground">{folder.count} items</p>
          </div>
        ))}
        
        {/* Actual assets */}
        {mockAssets.map((asset) => (
          <Card key={asset.id} className="group overflow-hidden rounded-3xl border-border/40 hover:shadow-xl transition-all duration-300">
            <div className="relative aspect-square">
               <img src={asset.url} alt={asset.name} className="w-full h-full object-cover transition-transform group-hover:scale-105 duration-700" />
               <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                  <Button size="icon" variant="secondary" className="rounded-full w-8 h-8">
                     <Eye className="w-4 h-4" />
                  </Button>
                  <Button size="icon" variant="secondary" className="rounded-full w-8 h-8">
                     <Download className="w-4 h-4" />
                  </Button>
               </div>
               <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                       <Button size="icon" variant="secondary" className="rounded-full w-7 h-7">
                          <MoreVertical className="w-3 h-3" />
                       </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                       <DropdownMenuItem>Rename</DropdownMenuItem>
                       <DropdownMenuItem>Manage Tags</DropdownMenuItem>
                       <DropdownMenuItem className="text-destructive">Delete</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
               </div>
            </div>
            <CardContent className="p-3">
               <p className="text-xs font-bold truncate mb-1">{asset.name}</p>
               <div className="flex items-center justify-between">
                  <span className="text-[10px] text-muted-foreground uppercase font-bold tracking-tight">
                    {asset.type} • {asset.size}
                  </span>
                  <div className="flex gap-1">
                    {asset.tags.slice(0, 1).map(tag => (
                      <Badge key={tag} variant="outline" className="text-[9px] px-1 py-0 border-primary/20 text-primary">
                        {tag}
                      </Badge>
                    ))}
                  </div>
               </div>
            </CardContent>
          </Card>
        ))}

        <div className="aspect-square border-2 border-dashed border-muted rounded-3xl flex flex-col items-center justify-center hover:bg-muted/50 transition-colors cursor-pointer group text-center p-4">
           <Plus className="w-8 h-8 text-muted-foreground group-hover:text-primary transition-colors" />
           <p className="text-xs font-bold text-muted-foreground mt-2 group-hover:text-primary transition-colors">Add more files</p>
        </div>
      </div>
    </div>
  );
}
