import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
  ChevronLeft, 
  Layout, 
  Type, 
  Wand2, 
  FileText, 
  FileImage, 
  Settings2,
  Plus,
  Palette,
  MessageSquare
} from 'lucide-react';
import { Button } from '../components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { mockBrands, mockContent, mockAssets } from '../mock/data';

export function SingleBrand() {
  const { id } = useParams();
  const brand = mockBrands.find(b => b.id === id) || mockBrands[0];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-border/60">
        <div className="flex items-start gap-6">
          <div className="w-24 h-24 rounded-3xl overflow-hidden shadow-xl border-4 border-background">
             <img src={brand.logo} alt={brand.name} className="w-full h-full object-cover" />
          </div>
          <div className="space-y-1 pt-2">
            <Link to="/brands" className="text-xs font-semibold text-primary flex items-center gap-1 hover:underline mb-1">
              <ChevronLeft className="w-3 h-3" /> Back to Brands
            </Link>
            <h1 className="text-4xl font-bold font-display">{brand.name}</h1>
            <p className="text-muted-foreground flex items-center gap-2">
              {brand.industry} • {brand.website}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" className="rounded-xl">Edit Profile</Button>
          <Button className="rounded-xl px-6 bg-primary hover:bg-primary/90">
             <Wand2 className="w-4 h-4 mr-2" />
             Generate Content
          </Button>
        </div>
      </div>

      <Tabs defaultValue="overview" className="space-y-8">
        <TabsList className="bg-muted/50 p-1 rounded-2xl w-full max-w-2xl overflow-x-auto h-auto">
          <TabsTrigger value="overview" className="rounded-xl py-2 px-6 data-[state=active]:bg-background data-[state=active]:shadow-sm">Overview</TabsTrigger>
          <TabsTrigger value="design" className="rounded-xl py-2 px-6 data-[state=active]:bg-background data-[state=active]:shadow-sm">Design System</TabsTrigger>
          <TabsTrigger value="voice" className="rounded-xl py-2 px-6 data-[state=active]:bg-background data-[state=active]:shadow-sm">Brand Voice</TabsTrigger>
          <TabsTrigger value="assets" className="rounded-xl py-2 px-6 data-[state=active]:bg-background data-[state=active]:shadow-sm">Assets</TabsTrigger>
          <TabsTrigger value="generated" className="rounded-xl py-2 px-6 data-[state=active]:bg-background data-[state=active]:shadow-sm">Generated Content</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <Card className="rounded-3xl border-border/40">
                <CardHeader>
                  <CardTitle className="text-lg">Brand Summary</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {brand.description}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {brand.tone.map(t => <Badge key={t} variant="outline" className="rounded-full">{t}</Badge>)}
                  </div>
                </CardContent>
              </Card>

              <Card className="rounded-3xl border-border/40">
                <CardHeader>
                  <CardTitle className="text-lg">Recent Content</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {mockContent.filter(c => c.brandId === brand.id).slice(0, 2).map((item, i) => (
                    <div key={i} className="flex items-center gap-4 p-3 rounded-2xl bg-muted/30">
                       <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
                          <FileText className="w-5 h-5" />
                       </div>
                       <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium truncate">{item.title}</p>
                          <p className="text-xs text-muted-foreground capitalize">{item.type}</p>
                       </div>
                    </div>
                  ))}
                </CardContent>
              </Card>

              <Card className="rounded-3xl border-border/40">
                <CardHeader>
                  <CardTitle className="text-lg">Campaign Health</CardTitle>
                </CardHeader>
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

        <TabsContent value="design" className="space-y-8">
           <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <section className="space-y-4">
                 <h3 className="text-xl font-bold flex items-center gap-2">
                    <Palette className="w-5 h-5 text-primary" /> Color Palette
                 </h3>
                 <div className="grid grid-cols-4 gap-4">
                    {['#6D5EF5', '#A78BFA', '#0EA5E9', '#F8FAFC'].map(color => (
                       <div key={color} className="space-y-2">
                          <div className="h-20 rounded-2xl border border-border shadow-sm" style={{ backgroundColor: color }} />
                          <p className="text-[10px] font-mono font-medium text-center uppercase">{color}</p>
                       </div>
                    ))}
                 </div>
              </section>

              <section className="space-y-4">
                 <h3 className="text-xl font-bold flex items-center gap-2">
                    <Type className="w-5 h-5 text-primary" /> Typography
                 </h3>
                 <Card className="rounded-2xl">
                    <CardContent className="p-6 space-y-4">
                       <div>
                          <p className="text-xs uppercase text-muted-foreground font-bold mb-1">Display</p>
                          <p className="text-2xl font-display font-medium">Space Grotesk</p>
                       </div>
                       <div>
                          <p className="text-xs uppercase text-muted-foreground font-bold mb-1">Body</p>
                          <p className="text-xl font-sans">Inter</p>
                       </div>
                    </CardContent>
                 </Card>
              </section>
           </div>
        </TabsContent>

        <TabsContent value="voice" className="space-y-8">
           <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <section className="space-y-4">
                 <h3 className="text-xl font-bold flex items-center gap-2">
                    <MessageSquare className="w-5 h-5 text-primary" /> Core Tone
                 </h3>
                 <div className="grid grid-cols-1 gap-4">
                    {['Confident & Authoritative', 'Youthful & Energetic', 'Inclusive & Warm'].map(tone => (
                       <div key={tone} className="p-4 bg-muted/40 rounded-2xl border border-border/50">
                          <p className="font-medium">{tone}</p>
                       </div>
                    ))}
                 </div>
              </section>
              
              <section className="space-y-4">
                 <h3 className="text-xl font-bold flex items-center gap-2">
                    <Plus className="w-5 h-5 text-primary" /> Keywords & Style
                 </h3>
                 <div className="grid grid-cols-2 gap-4">
                    <Card className="rounded-2xl bg-success/5 border-success/10">
                       <CardHeader className="pb-2">
                          <CardTitle className="text-sm font-bold text-success">Preferred</CardTitle>
                       </CardHeader>
                       <CardContent>
                          <div className="flex flex-wrap gap-2 text-xs">
                             {['Innovative', 'Seamless', 'Empower', 'Crafted'].map(w => <span key={w} className="px-2 py-1 bg-success/10 rounded">{w}</span>)}
                          </div>
                       </CardContent>
                    </Card>
                    <Card className="rounded-2xl bg-danger/5 border-danger/10">
                       <CardHeader className="pb-2">
                          <CardTitle className="text-sm font-bold text-danger">Banned</CardTitle>
                       </CardHeader>
                       <CardContent>
                          <div className="flex flex-wrap gap-2 text-xs">
                             {['Disruptive', 'Cheap', 'Legacy', 'Basic'].map(w => <span key={w} className="px-2 py-1 bg-danger/10 rounded">{w}</span>)}
                          </div>
                       </CardContent>
                    </Card>
                 </div>
              </section>
           </div>
        </TabsContent>

        <TabsContent value="assets" className="space-y-6">
           <div className="flex items-center justify-between">
              <h3 className="text-xl font-bold">Brand Assets</h3>
              <Button size="sm" className="rounded-lg">Upload Asset</Button>
           </div>
           <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
              {mockAssets.map(asset => (
                <Card key={asset.id} className="group overflow-hidden rounded-2xl border-border/40 hover:shadow-lg transition-all">
                  <div className="relative aspect-square">
                    <img src={asset.url} alt={asset.name} className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                       <Button size="sm" variant="secondary" className="rounded-full">Preview</Button>
                    </div>
                  </div>
                  <CardContent className="p-3">
                    <p className="text-xs font-medium truncate">{asset.name}</p>
                    <p className="text-[10px] text-muted-foreground uppercase mt-1">{asset.type} • {asset.size}</p>
                  </CardContent>
                </Card>
              ))}
              <div className="aspect-square border-2 border-dashed border-muted rounded-2xl flex flex-col items-center justify-center hover:bg-muted/50 transition-colors cursor-pointer group">
                  <Plus className="w-8 h-8 text-muted-foreground group-hover:text-primary transition-colors" />
                  <span className="text-xs text-muted-foreground mt-2">Add New</span>
              </div>
           </div>
        </TabsContent>

        <TabsContent value="generated" className="space-y-6">
           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {mockContent.filter(c => c.brandId === brand.id).map(item => (
                <Card key={item.id} className="rounded-2xl border-border/60 overflow-hidden">
                  <CardHeader className="flex flex-row items-center justify-between pb-3">
                    <div className="flex items-center gap-2">
                       <Badge variant="secondary" className="capitalize">{item.type}</Badge>
                       <span className="text-[10px] text-muted-foreground font-mono">ID: {item.id}</span>
                    </div>
                    <Badge className="bg-primary/20 text-primary border-none">{item.confidence}% Match</Badge>
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
        </TabsContent>
      </Tabs>
    </div>
  );
}
