 import React, { useEffect, useState } from 'react';
import {
  User, 
  Settings2,
  ShieldCheck,
  CreditCard,
  Bell,
  Globe,
  Key,
  Sparkles,
  Zap,
  Check
} from 'lucide-react';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../components/ui/card';
import { Switch } from '../components/ui/switch';
import { Label } from '../components/ui/label';
import { Input } from '../components/ui/input';
import { Separator } from '../components/ui/separator';
import { Badge } from '../components/ui/badge';
import { cn } from '../lib/utils';
import { useAuthStore } from '../store/useAuthStore';
import { useUIStore } from '../store/useUIStore';

export function Settings() {
  const { user, setUser } = useAuthStore();
  const { theme, setTheme } = useUIStore();
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName]   = useState('');
  const [email, setEmail]         = useState('');
  const [avatarUrl, setAvatarUrl] = useState<string | undefined>(undefined);
  const [saving, setSaving]       = useState(false);
  const [saved, setSaved]         = useState(false);

  useEffect(() => {
    if (user) {
      const parts = user.fullName.trim().split(' ');
      setFirstName(parts[0] || '');
      setLastName(parts.slice(1).join(' ') || '');
      setEmail(user.email || '');
      setAvatarUrl(user.avatarUrl);
    }
  }, [user]);

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === 'string') setAvatarUrl(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const handleSave = () => {
    if (!firstName.trim() || !email.trim()) return;
    setSaving(true);
    const updatedUser = {
      id: user?.id ?? Date.now().toString(),
      fullName: `${firstName} ${lastName}`.trim(),
      email: email.trim(),
      avatarUrl,
    };
    setTimeout(() => {
      setUser(updatedUser);
      setSaving(false);
      setSaved(true);
      setTimeout(() => setSaved(false), 2000);
    }, 500);
  };

  const handleCancel = () => {
    if (user) {
      const parts = user.fullName.trim().split(' ');
      setFirstName(parts[0] || '');
      setLastName(parts.slice(1).join(' ') || '');
      setEmail(user.email || '');
      setAvatarUrl(user.avatarUrl);
    }
  };

  const initials = `${firstName?.charAt(0) || 'U'}${lastName?.charAt(0) || ''}`.toUpperCase();

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
            { label: 'Profile',          icon: User,        active: true },
            { label: 'Workspace',        icon: Globe },
            { label: 'Team',             icon: ShieldCheck },
            { label: 'AI Configuration', icon: Sparkles },
            { label: 'API Keys',         icon: Key },
            { label: 'Billing',          icon: CreditCard },
            { label: 'Notifications',    icon: Bell },
          ].map((item, i) => (
            <Button key={i} variant="ghost"
              className={cn('w-full justify-start gap-3 rounded-xl h-11 transition-all',
                item.active
                  ? 'bg-primary/10 text-primary font-bold hover:bg-primary/20'
                  : 'text-muted-foreground'
              )}>
              <item.icon className="w-5 h-5" />
              {item.label}
            </Button>
          ))}
        </aside>

        {/* Content */}
        <div className="md:col-span-9 space-y-8">
          <Card className="rounded-[2rem] border-border/60 overflow-hidden shadow-sm">
            <CardHeader className="p-8 pb-4">
              <CardTitle className="text-2xl font-display font-bold">Profile Settings</CardTitle>
              <CardDescription>Update your personal information and photo</CardDescription>
            </CardHeader>
            <CardContent className="p-8 pt-4 space-y-8">
              <div className="flex flex-col sm:flex-row items-center gap-8">
                {/* Avatar */}
                <div className="relative group shrink-0">
                  <div className="w-24 h-24 rounded-3xl bg-gradient-to-tr from-primary to-accent p-1">
                    <div className="w-full h-full rounded-[20px] bg-background flex items-center justify-center overflow-hidden border-2 border-background">
                      {avatarUrl ? (
                        <img src={avatarUrl} alt="Profile" className="w-full h-full object-cover" />
                      ) : (
                        <div className="flex items-center justify-center w-full h-full bg-slate-900 text-white text-xl font-bold">
                          {initials}
                        </div>
                      )}
                    </div>
                  </div>
                    <input
                    id="avatar-upload"
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleAvatarChange}
                  />
                  <label htmlFor="avatar-upload"
                    className="absolute -bottom-2 -right-2 p-2 bg-primary text-white rounded-xl shadow-lg border-2 border-background cursor-pointer hover:scale-110 transition-transform">
                    <Settings2 className="w-3 h-3" />
                  </label>
                </div>

                {/* Name + Email */}
                <div className="space-y-4 flex-1 w-full">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label className="text-xs uppercase font-bold text-muted-foreground">First Name</Label>
                      <Input
                        value={firstName}
                        onChange={e => setFirstName(e.target.value)}
                        className="rounded-xl bg-muted/30 border-transparent h-11"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label className="text-xs uppercase font-bold text-muted-foreground">Last Name</Label>
                      <Input
                        value={lastName}
                        onChange={e => setLastName(e.target.value)}
                        className="rounded-xl bg-muted/30 border-transparent h-11"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label className="text-xs uppercase font-bold text-muted-foreground">Email Address</Label>
                    <Input
                      value={email}
                      onChange={e => setEmail(e.target.value)}
                      className="rounded-xl bg-muted/30 border-transparent h-11"
                    />
                  </div>
                </div>
              </div>

              <Separator />

              {/* Workspace Preferences */}
              <div className="space-y-4">
                <h4 className="text-lg font-bold">Workspace Preferences</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="flex items-center justify-between p-4 bg-muted/20 border border-border/40 rounded-2xl">
                    <div>
                      <p className="text-sm font-bold">Dark Mode Interface</p>
                      <p className="text-[10px] text-muted-foreground">Toggle between light and dark theme</p>
                    </div>
                    <Switch
                      checked={theme === 'dark'}
                      onCheckedChange={(checked) => setTheme(checked ? 'dark' : 'light')}
                    />
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

              {/* Buttons */}
              <div className="pt-4 flex justify-end gap-3">
                <Button variant="ghost" className="rounded-xl" onClick={handleCancel}>
                  Cancel
                </Button>
                <Button
                  className="rounded-xl bg-primary px-8 gap-2"
                  onClick={handleSave}
                  disabled={saving}
                >
                  {saved ? (
                    <><Check className="w-4 h-4" /> Saved!</>
                  ) : saving ? 'Saving...' : 'Save Changes'}
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* AI Credits */}
          <Card className="rounded-[2rem] border-primary/20 bg-primary/5 overflow-hidden">
            <CardContent className="p-8 flex flex-col sm:flex-row items-center gap-8">
              <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center text-primary shrink-0">
                <Zap className="w-8 h-8" />
              </div>
              <div className="flex-1 space-y-2 text-center sm:text-left">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <h3 className="text-xl font-bold font-display">AI Credits Remaining</h3>
                  <Badge className="bg-primary hover:bg-primary/90 rounded-full py-1">Upgrade Plan</Badge>
                </div>
                <p className="text-sm text-muted-foreground">
                  You've used 8,540 / 10,000 credits this month. Resets in 12 days.
                </p>
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