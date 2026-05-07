import React, { useState } from 'react';
import { 
  Sparkles, 
  ChevronDown, 
  Share2, 
  Linkedin, 
  Instagram, 
  Twitter, 
  Mail, 
  FileText,
  RefreshCw,
  Copy,
  Calendar as CalendarIcon,
  Download,
  Image as ImageIcon,
  Check,
  BrainCircuit,
  Zap,
  MoreVertical
} from 'lucide-react';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { Badge } from '../components/ui/badge';
import { Label } from '../components/ui/label';
import { Textarea } from '../components/ui/textarea';
import { Slider } from '../components/ui/slider';
import { Switch } from '../components/ui/switch';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '../components/ui/select';
import { mockBrands } from '../mock/data';
import { motion, AnimatePresence } from 'motion/react';
import { toast } from 'sonner';
import { cn } from '../lib/utils';
import { Avatar, AvatarFallback, AvatarImage } from '../components/ui/avatar';

export function ContentStudio() {
  const [isGenerating, setIsGenerating] = useState(false);
  const [outputReady, setOutputReady] = useState(false);
  const [prompt, setPrompt] = useState('');

  const handleGenerate = () => {
    if (!prompt) return toast.error('Please enter a prompt first');
    
    setIsGenerating(true);
    // Simulate generation
    setTimeout(() => {
      setIsGenerating(false);
      setOutputReady(true);
      toast.success('Content generated successfully!');
    }, 2500);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold font-display">Content Studio</h1>
          <p className="text-slate-500">AI-powered generation tailored to your brand voice</p>
        </div>
        <div className="flex items-center gap-3">
           <div className="hidden md:flex flex-col items-end">
              <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">Current Model</span>
              <span className="text-xs font-bold text-[#6D5EF5]">Nova-Pro-Large</span>
           </div>
           <Badge variant="outline" className="px-3 py-1.5 gap-2 bg-indigo-50 dark:bg-indigo-900/20 border-indigo-100 dark:border-indigo-800 text-[#6D5EF5] font-bold rounded-xl shadow-sm">
              <BrainCircuit className="w-4 h-4" />
              Symmetry Engine 2.0
           </Badge>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Panel: Configuration */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-100 dark:border-slate-800 shadow-sm overflow-hidden">
            <div className="bg-slate-50/50 dark:bg-slate-800/30 border-b border-slate-100 dark:border-slate-800 p-6 flex items-center gap-2">
                <div className="p-2 rounded-xl bg-indigo-50 dark:bg-indigo-900/20 text-[#6D5EF5]">
                  <Zap className="w-5 h-5" />
                </div>
                <h3 className="text-lg font-bold">Generation Settings</h3>
            </div>
            <div className="p-6 space-y-6">
              {/* Brand Selector */}
              <div className="space-y-2">
                <Label className="text-xs uppercase tracking-wider font-bold text-muted-foreground">Select Brand</Label>
                <Select defaultValue={mockBrands[0].id}>
                  <SelectTrigger className="rounded-2xl h-14 bg-slate-50 dark:bg-slate-950 border-none transition-all focus:ring-2 focus:ring-[#6D5EF5]/20 font-bold p-4 shadow-sm text-slate-700 dark:text-slate-200">
                    <SelectValue placeholder="Choose a brand" />
                  </SelectTrigger>
                  <SelectContent>
                    {mockBrands.map(brand => (
                      <SelectItem key={brand.id} value={brand.id}>
                        <div className="flex items-center gap-2">
                          <div className="w-5 h-5 rounded bg-primary/20 flex items-center justify-center text-[10px] uppercase font-bold text-primary">
                             {brand.name.substring(0, 2)}
                          </div>
                          {brand.name}
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Content Type */}
              <div className="space-y-2">
                <Label className="text-xs uppercase tracking-wider font-bold text-muted-foreground">Content Type</Label>
                <div className="grid grid-cols-3 gap-3">
                  {[
                    { id: 'insta', icon: Instagram, label: 'Instagram' },
                    { id: 'linkedin', icon: Linkedin, label: 'LinkedIn' },
                    { id: 'x', icon: Twitter, label: 'X / Twitter' },
                    { id: 'blog', icon: FileText, label: 'Blog Post' },
                    { id: 'email', icon: Mail, label: 'Email' },
                    { id: 'campaign', icon: Share2, label: 'Campaign' },
                  ].map(type => (
                    <button
                      key={type.id}
                      className="flex flex-col items-center justify-center p-4 rounded-2xl border border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-950 hover:bg-indigo-50/50 hover:border-[#6D5EF5]/30 transition-all gap-2 group shadow-sm"
                    >
                      <type.icon className="w-5 h-5 text-slate-400 group-hover:text-[#6D5EF5] transition-colors" />
                      <span className="text-[10px] font-bold uppercase tracking-tight opacity-70 group-hover:opacity-100">{type.label}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Tone Sliders */}
              <div className="space-y-6 pt-2">
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <Label className="text-[10px] uppercase tracking-widest font-black text-slate-400">Creativity</Label>
                    <span className="text-xs font-black text-[#6D5EF5]">80%</span>
                  </div>
                  <Slider defaultValue={[80]} max={100} step={1} className="[&_[role=slider]]:bg-[#6D5EF5] [&_[role=slider]]:border-white [&_[role=slider]]:shadow-md" />
                </div>
                <div className="space-y-3">
                  <div className="flex justify-between items-center text-xs">
                    <Label className="text-[10px] uppercase tracking-widest font-black text-slate-400">Tone Warmth</Label>
                    <span className="text-xs font-black text-[#6D5EF5]">40%</span>
                  </div>
                  <Slider defaultValue={[40]} max={100} step={1} className="[&_[role=slider]]:bg-[#6D5EF5] [&_[role=slider]]:border-white [&_[role=slider]]:shadow-md" />
                </div>
              </div>

              {/* Context Toggles */}
              <div className="space-y-3 pt-4 border-t border-border/40">
                {[
                  'Use brand voice',
                  'Recent context',
                  'Optimize SEO',
                  'Target Audience'
                ].map((text, i) => (
                  <div key={i} className="flex items-center justify-between">
                    <Label className="text-xs font-bold text-slate-600 dark:text-slate-300 pointer-events-none" htmlFor={`switch-${i}`}>{text}</Label>
                    <Switch id={`switch-${i}`} defaultChecked={i === 0} className="data-[state=checked]:bg-[#6D5EF5]" />
                  </div>
                ))}
              </div>

              {/* Prompt Box */}
              <div className="space-y-2 pt-2">
                <Label className="text-[10px] uppercase tracking-widest font-black text-slate-400">Generation Prompt</Label>
                <Textarea 
                  placeholder="Describe your vision..."
                  className="min-h-[140px] p-5 rounded-3xl bg-slate-50 dark:bg-slate-950 border-none resize-none focus-visible:ring-2 focus-visible:ring-[#6D5EF5]/20 font-medium placeholder:text-slate-400"
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                />
              </div>

              <Button 
                onClick={handleGenerate}
                disabled={isGenerating}
                className="w-full h-14 rounded-2xl bg-[#6D5EF5] hover:bg-[#5B4EE0] text-lg font-bold shadow-xl shadow-indigo-100 dark:shadow-none transition-all mt-4"
              >
                {isGenerating ? (
                  <RefreshCw className="w-5 h-5 mr-3 animate-spin" />
                ) : (
                  <Sparkles className="w-5 h-5 mr-3" />
                )}
                {isGenerating ? 'Synthesizing...' : 'Magic Generate'}
              </Button>
            </div>
          </div>
        </div>

        {/* Right Panel: Output */}
        <div className="lg:col-span-7">
          <AnimatePresence mode="wait">
            {!outputReady && !isGenerating ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="h-full min-h-[600px] flex flex-col items-center justify-center space-y-6 border-2 border-dashed border-slate-200 dark:border-slate-800 rounded-[2.5rem] bg-slate-50/30 dark:bg-slate-900/10"
              >
                <div className="w-20 h-20 rounded-full bg-white dark:bg-slate-800 shadow-sm flex items-center justify-center ring-8 ring-slate-100 dark:ring-slate-900">
                  <Sparkles className="w-10 h-10 text-slate-300" />
                </div>
                <div className="text-center space-y-2">
                   <h3 className="text-xl font-bold font-display">Studio Ready</h3>
                   <p className="text-sm text-slate-400 max-w-[200px] mx-auto font-bold uppercase tracking-widest leading-loose">
                     Configure and Generate
                   </p>
                </div>
              </motion.div>
            ) : isGenerating ? (
               <motion.div
                key="loading"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="h-full min-h-[600px] flex flex-col items-center justify-center space-y-8 bg-indigo-50/20 dark:bg-indigo-900/5 rounded-[2.5rem]"
               >
                 <div className="relative">
                   <div className="w-24 h-24 rounded-full border-4 border-[#6D5EF5]/10 border-t-[#6D5EF5] animate-spin" />
                   <Sparkles className="absolute inset-0 m-auto w-8 h-8 text-[#6D5EF5] animate-pulse" />
                 </div>
                 <div className="text-center space-y-2">
                   <h3 className="text-xl font-bold font-display">Nova AI is thinking...</h3>
                   <div className="flex gap-1 justify-center">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#6D5EF5] animate-bounce [animation-delay:-0.3s]" />
                      <span className="w-1.5 h-1.5 rounded-full bg-[#6D5EF5] animate-bounce [animation-delay:-0.15s]" />
                      <span className="w-1.5 h-1.5 rounded-full bg-[#6D5EF5] animate-bounce" />
                   </div>
                 </div>
               </motion.div>
            ) : (
              <motion.div
                key="output"
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                className="space-y-6"
              >
                <div className="bg-white dark:bg-slate-900 rounded-[2.5rem] border border-slate-100 dark:border-slate-800 shadow-xl shadow-indigo-500/5 overflow-hidden">
                  <Tabs defaultValue="caption">
                    <div className="bg-slate-50/50 dark:bg-slate-800/30 border-b border-slate-100 dark:border-slate-800 px-8 py-5 flex items-center justify-between">
                       <TabsList className="bg-white dark:bg-slate-900 p-1 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-800 h-11">
                         <TabsTrigger value="caption" className="rounded-xl px-4 font-bold text-xs data-[state=active]:bg-[#6D5EF5] data-[state=active]:text-white transition-all">Copy</TabsTrigger>
                         <TabsTrigger value="visuals" className="rounded-xl px-4 font-bold text-xs data-[state=active]:bg-[#6D5EF5] data-[state=active]:text-white transition-all">Assets</TabsTrigger>
                         <TabsTrigger value="metadata" className="rounded-xl px-4 font-bold text-xs data-[state=active]:bg-[#6D5EF5] data-[state=active]:text-white transition-all">Plan</TabsTrigger>
                       </TabsList>
                       <div className="flex gap-2">
                          <Button variant="ghost" size="icon" className="h-10 w-10 text-slate-400 hover:text-[#6D5EF5] hover:bg-white dark:hover:bg-slate-800 rounded-xl transition-all">
                             <Copy className="w-4 h-4" />
                          </Button>
                          <Button variant="ghost" size="icon" className="h-10 w-10 text-slate-400 hover:text-[#6D5EF5] hover:bg-white dark:hover:bg-slate-800 rounded-xl transition-all">
                             <MoreVertical className="w-4 h-4" />
                          </Button>
                       </div>
                    </div>

                    <TabsContent value="caption" className="p-10 mt-0">
                       <div className="space-y-8">
                          <div className="flex items-center gap-3">
                             <Badge className="bg-green-50 text-green-500 dark:bg-green-900/20 border-none px-3 font-bold text-[10px] uppercase tracking-wider">98% Tone Match</Badge>
                             <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Gen-01 • 2.4s</span>
                          </div>
                          
                          <div className="prose prose-slate dark:prose-invert max-w-none">
                             <h2 className="text-3xl font-bold mb-6 font-display leading-tight">Earth Day 2026: Designing the Future of Sustenance 🌍</h2>
                             <p className="text-xl leading-relaxed text-slate-500 font-medium tracking-tight">
                                Sustainable design isn't just a trend—it's the core of Nova AI. This Earth Day, we're unveiling our new Eco-Optimizer workflow. 
                                By reducing computational overhead by 40%, we're making AI greener than ever before.
                             </p>
                             <div className="bg-indigo-50/50 dark:bg-indigo-900/10 p-8 rounded-3xl italic border border-indigo-100 dark:border-indigo-900/30 mt-8 text-[#6D5EF5] font-bold text-lg leading-relaxed shadow-sm">
                                "Design with the planet in mind. Because the best interfaces are the ones that leave a footprint only in the digital world."
                             </div>
                             <div className="mt-10 flex gap-2">
                                <Badge variant="outline" className="rounded-full border-slate-100 text-slate-400 font-bold px-4 py-1">#SustainableAI</Badge>
                                <Badge variant="outline" className="rounded-full border-slate-100 text-slate-400 font-bold px-4 py-1">#EcoDesign</Badge>
                                <Badge variant="outline" className="rounded-full border-slate-100 text-slate-400 font-bold px-4 py-1">#NovaAI</Badge>
                             </div>
                          </div>
                       </div>
                    </TabsContent>

                    <TabsContent value="visuals" className="p-10 mt-0 space-y-10">
                       <div className="grid grid-cols-2 gap-6">
                          {[1, 2, 3, 4].map(i => (
                            <div key={i} className="group relative aspect-square rounded-[2rem] overflow-hidden border border-slate-100 shadow-sm">
                               <img 
                                 src={`https://images.unsplash.com/photo-${1600000000000 + i * 100000}?w=600&h=600&fit=crop`} 
                                 className="w-full h-full object-cover transition-transform group-hover:scale-105 duration-1000" 
                               />
                               <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex flex-col justify-end p-6 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0">
                                  <div className="flex gap-2">
                                     <Button size="sm" variant="secondary" className="flex-1 rounded-xl h-10 font-bold bg-white/20 backdrop-blur-md text-white border-white/20 hover:bg-white/30">
                                        <RefreshCw className="w-3 h-3 mr-2" /> Remix
                                     </Button>
                                     <Button size="sm" className="bg-white text-[#6D5EF5] hover:bg-slate-100 rounded-xl h-10 font-black px-4">
                                        <Download className="w-4 h-4" />
                                     </Button>
                                  </div>
                               </div>
                            </div>
                          ))}
                       </div>
                    </TabsContent>
                  </Tabs>

                  <div className="p-6 bg-slate-900 dark:bg-black border-t border-white/5 flex items-center justify-between text-white">
                    <div className="flex items-center gap-4">
                       <Avatar className="w-10 h-10 border-2 border-white/20 ring-4 ring-slate-900 shadow-xl">
                          <AvatarImage src="https://images.unsplash.com/photo-1542601906-913b0d81c5a9?w=100&h=100&fit=crop" />
                          <AvatarFallback>EA</AvatarFallback>
                       </Avatar>
                       <div className="space-y-0.5">
                         <span className="block text-[10px] font-black uppercase tracking-widest text-[#6D5EF5]">Assigned Agent</span>
                         <span className="text-xs font-bold text-white">Visual Storytelling Engine</span>
                       </div>
                    </div>
                    <div className="flex gap-3">
                       <Button variant="outline" className="border-white/20 text-white hover:bg-white/10 rounded-2xl h-11 px-6 font-bold transition-all shadow-sm">Save Draft</Button>
                       <Button className="bg-[#6D5EF5] hover:bg-[#5B4EE0] text-white rounded-2xl h-11 px-6 font-black shadow-lg shadow-indigo-500/30">
                          <CalendarIcon className="w-4 h-4 mr-2" />
                          Schedule Post
                       </Button>
                    </div>
                  </div>
                </div>

                {/* Additional context or performance tips */}
                <div className="rounded-[2.5rem] border border-indigo-100 dark:border-indigo-900/30 bg-indigo-50/30 dark:bg-indigo-900/5 p-6 flex items-start gap-5 shadow-sm">
                   <div className="mt-1 p-2 rounded-xl bg-white dark:bg-slate-900 shadow-sm text-[#6D5EF5]">
                      <Sparkles className="w-5 h-5" />
                   </div>
                   <div className="space-y-1">
                      <p className="text-sm font-black uppercase tracking-tight text-[#6D5EF5]">Strategy Insights</p>
                      <p className="text-sm text-slate-500 font-medium leading-relaxed">
                        LinkedIn audiences engage 30% more when technical descriptions are followed by a "Call to Action" question. 
                        I've optimized the footer and added a direct outreach prompt for you.
                      </p>
                   </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
