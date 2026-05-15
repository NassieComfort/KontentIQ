import React from 'react';
import { 
  User, 
  Settings2, 
  ShieldCheck, 
  CreditCard, 
  Bell, 
  Globe, 
  Key, 
  Database,
  ArrowRight,
  ExternalLink,
  ChevronRight,
  Sparkles,
  Zap
} from 'lucide-react';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { Switch } from '../components/ui/switch';
import { Label } from '../components/ui/label';
import { Input } from '../components/ui/input';
import { Separator } from '../components/ui/separator';
import { Badge } from '../components/ui/badge';

export function Settings() {
  return (
    <div className="space-y-8 max-w-6xl mx-auto">
      <div>
         <h1 className="text-3xl font-bold font-display">Settings</h1>
         <p className="text-muted-foreground">Manage your workspace and account preferences</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
        {/* Sidebar Nav */}
        <aside className="md:col-span-3 space-y-1">
           {[
             { label: 'Profile', icon: User, active: true },
             { label: 'Workspace', icon: Globe },
             { label: 'Team', icon: ShieldCheck },
             { label: 'AI Configuration', icon: Sparkles },
             { label: 'API Keys', icon: Key },
             { label: 'Billing', icon: CreditCard },
             { label: 'Notifications', icon: Bell },
           ].map((item, i) => (
             <Button
               key={i}
               variant="ghost"
               className={cn(
                 "w-full justify-start gap-3 rounded-xl h-11 transition-all",
                 item.active ? "bg-primary/10 text-primary font-bold hover:bg-primary/20" : "text-muted-foreground"
               )}
             >
                <item.icon className="w-5 h-5" />
                {item.label}
             </Button>
           ))}
        </aside>

        {/* Content Area */}
        <div className="md:col-span-9 space-y-8">
           <Card className="rounded-[2rem] border-border/60 overflow-hidden shadow-sm">
              <CardHeader className="p-8 pb-4">
                 <CardTitle className="text-2xl font-display font-bold">Profile Settings</CardTitle>
                 <CardDescription>Update your personal information and photo</CardDescription>
              </CardHeader>
              <CardContent className="p-8 pt-4 space-y-8">
                 <div className="flex flex-col sm:flex-row items-center gap-8">
                    <div className="relative group">
                       <div className="w-24 h-24 rounded-3xl bg-gradient-to-tr from-primary to-accent p-1">
                          <div className="w-full h-full rounded-[20px] bg-background flex items-center justify-center overflow-hidden border-2 border-background">
                             <img src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop" className="w-full h-full object-cover" />
                          </div>
                       </div>
                       <button className="absolute -bottom-2 -right-2 p-2 bg-primary text-white rounded-xl shadow-lg border-2 border-background hover:scale-110 transition-transform">
                          <Settings2 className="w-3 h-3" />
                       </button>
                    </div>
                    <div className="space-y-4 flex-1 w-full">
                       <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div className="space-y-2">
                             <Label className="text-xs uppercase font-bold text-muted-foreground">First Name</Label>
                             <Input defaultValue="Sarah" className="rounded-xl bg-muted/30 border-transparent h-11" />
                          </div>
                          <div className="space-y-2">
                             <Label className="text-xs uppercase font-bold text-muted-foreground">Last Name</Label>
                             <Input defaultValue="Nelson" className="rounded-xl bg-muted/30 border-transparent h-11" />
                          </div>
                       </div>
                       <div className="space-y-2">
                          <Label className="text-xs uppercase font-bold text-muted-foreground">Email Address</Label>
                          <Input defaultValue="sarah@kontentiq.ai" className="rounded-xl bg-muted/30 border-transparent h-11" />
                       </div>
                    </div>
                 </div>

                 <Separator />

                 <div className="space-y-4">
                    <h4 className="text-lg font-bold">Workspace Preferences</h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                       <div className="flex items-center justify-between p-4 bg-muted/20 border border-border/40 rounded-2xl">
                          <div>
                             <p className="text-sm font-bold">Dark Mode Interface</p>
                             <p className="text-[10px] text-muted-foreground">Toggle between light and dark theme</p>
                          </div>
                          <Switch />
                       </div>
                       <div className="flex items-center justify-between p-4 bg-muted/20 border border-border/40 rounded-2xl">
                          <div>
                             <p className="text-sm font-bold">Autosave Drafts</p>
                             <p className="text-[10px] text-muted-foreground">Sync your work every 30 seconds</p>
                          </div>
                          <Switch defaultChecked />
                       </div>
                    </div>
                 </div>

                 <div className="pt-4 flex justify-end gap-3">
                    <Button variant="ghost" className="rounded-xl">Cancel</Button>
                    <Button className="rounded-xl bg-primary px-8">Save Changes</Button>
                 </div>
              </CardContent>
           </Card>

           {/* AI Quota Card */}
           <Card className="rounded-[2rem] border-primary/20 bg-primary/5 overflow-hidden">
              <CardContent className="p-8 flex flex-col sm:flex-row items-center gap-8">
                 <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center text-primary shrink-0 animate-pulse">
                    <Zap className="w-8 h-8" />
                 </div>
                 <div className="flex-1 space-y-2 text-center sm:text-left">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                       <h3 className="text-xl font-bold font-display">AI Credits Remaining</h3>
                       <Badge className="bg-primary hover:bg-primary/90 rounded-full py-1">Upgrade Plan</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">You've used 8,540 / 10,000 credits for this month. Your cycle resets in 12 days.</p>
                    <div className="pt-4">
                       <div className="h-2 w-full bg-primary/10 rounded-full overflow-hidden">
                          <div className="h-full bg-primary w-[85%]" />
                       </div>
                    </div>
                 </div>
              </CardContent>
           </Card>
        </div>
      </div>
    </div>
  );
}

function cn(...inputs: any[]) {
  return inputs.filter(Boolean).join(' ');
}
