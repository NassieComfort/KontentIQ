import React from 'react';
import { Sparkles, Users, FileText, Calendar, TrendingUp, ArrowUpRight, Plus, Upload } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../components/ui/card';
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  AreaChart, 
  Area 
} from 'recharts';
import { mockAnalytics, mockContent } from '../mock/data';
import { Badge } from '../components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '../components/ui/avatar';
import { cn } from '../lib/utils';

const stats = [
  { label: 'Total Brands', value: '12', change: '+2', icon: Users, color: 'bg-blue-500' },
  { label: 'Posts Generated', value: '1,284', change: '+18%', icon: FileText, color: 'bg-primary' },
  { label: 'Scheduled Posts', value: '24', change: '+4', icon: Calendar, color: 'bg-accent' },
  { label: 'Engagement Rate', value: '4.8%', change: '+0.6%', icon: TrendingUp, color: 'bg-success' },
];

export function Dashboard() {
  return (
    <div className="space-y-6">
      {/* Hero Section */}
      <section>
        <div className="relative overflow-hidden gradient-bg text-white rounded-4xl p-8 md:p-10 shadow-premium">
          <div className="absolute right-0 top-0 w-1/3 h-full opacity-10 pointer-events-none">
            <Sparkles className="w-full h-full rotate-12" />
          </div>
          
          <div className="relative flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="space-y-3">
              <h1 className="text-3xl md:text-4xl font-display font-bold leading-tight text-white dark:text-white">
                Good morning, Sarah 👋
              </h1>
              <p className="text-indigo-100 text-base max-w-xl">
                Your AI agents generated <span className="text-white font-bold underline decoration-white/30">24 new posts</span> and optimized 3 campaigns today.
              </p>
              <div className="flex flex-wrap items-center gap-3 pt-4">
                <Button className="rounded-2xl bg-white text-[#6D5EF5] hover:bg-slate-50 px-6 font-bold shadow-md h-11">
                  Generate Content
                </Button>
                <Button variant="outline" className="rounded-2xl border-white/30 text-white bg-white/10 backdrop-blur-md hover:bg-white/20 px-6 font-bold h-11 shadow-sm">
                  <Upload className="mr-2 w-4 h-4" />
                  Upload Assets
                </Button>
              </div>
            </div>
            
            <div className="hidden lg:flex w-32 h-32 items-center justify-center relative">
               <div className="absolute inset-0 animate-pulse bg-white/20 rounded-full border border-white/20 blur-xl" />
               <Sparkles className="w-16 h-16 text-white/50" />
            </div>
          </div>
        </div>
      </section>

      {/* Analytics Grid */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, i) => (
          <div key={i} className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-100 dark:border-slate-800 shadow-sm">
            <div className="flex items-center gap-3 mb-2">
              <div className={cn("p-2 rounded-lg bg-opacity-10", stat.color.replace('bg-', 'text-'), stat.color.replace('bg-', 'bg-'))}>
                 <stat.icon className="w-5 h-5" />
              </div>
              <span className="text-xs font-bold text-slate-500 uppercase tracking-tight">{stat.label}</span>
            </div>
            <div className="flex items-baseline justify-between">
              <span className="text-2xl font-bold">{stat.value}</span>
              <span className="text-xs text-green-500 font-bold bg-green-50 dark:bg-green-900/20 px-2 py-0.5 rounded-full">
                {stat.change} this mo
              </span>
            </div>
          </div>
        ))}
      </section>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Chart Card */}
        <div className="lg:col-span-8 bg-white dark:bg-slate-900 p-6 rounded-4xl border border-slate-100 dark:border-slate-800 shadow-sm">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h3 className="font-bold text-lg">Content Performance</h3>
            </div>
            <select className="bg-slate-50 dark:bg-slate-800 border-none text-xs rounded-lg px-3 py-1 font-semibold text-slate-500 ring-1 ring-slate-200 dark:ring-slate-700">
              <option>Last 7 days</option>
              <option>Last 30 days</option>
            </select>
          </div>
          <div className="h-[280px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={mockAnalytics}>
                  <defs>
                    <linearGradient id="colorEngagement" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#6D5EF5" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#6D5EF5" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#eee" />
                  <XAxis 
                    dataKey="date" 
                    axisLine={false} 
                    tickLine={false} 
                    tick={{ fontSize: 12, fill: '#888' }}
                    tickFormatter={(val) => new Date(val).toLocaleDateString('en-US', { weekday: 'short' })}
                  />
                  <YAxis hide />
                  <Tooltip 
                    contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                  />
                  <Area 
                    type="monotone" 
                    dataKey="engagement" 
                    stroke="#6D5EF5" 
                    strokeWidth={3}
                    fillOpacity={1} 
                    fill="url(#colorEngagement)" 
                  />
                  <Area 
                    type="monotone" 
                    dataKey="impressions" 
                    stroke="#0EA5E9" 
                    strokeWidth={2}
                    strokeDasharray="5 5"
                    fill="transparent" 
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

        {/* AI Activity Feed */}
        <div className="lg:col-span-4 bg-white dark:bg-slate-900 p-6 rounded-4xl border border-slate-100 dark:border-slate-800 shadow-sm flex flex-col">
          <h3 className="font-bold text-lg mb-4">AI Activity</h3>
          <div className="space-y-4 overflow-y-auto pr-2">
            {[
              { user: 'Nova AI', text: 'Instagram Post Ready', time: '2 mins ago', color: 'bg-indigo-100 text-indigo-500' },
              { user: 'HealthFlow', text: 'Blog Draft Generated', time: '45 mins ago', color: 'bg-emerald-100 text-emerald-500' },
              { user: 'Visual Designer', text: 'New Asset Tagged', time: '1 hr ago', color: 'bg-amber-100 text-amber-500' },
              { user: 'System', text: '5 Posts Scheduled', time: '3 hrs ago', color: 'bg-slate-100 text-slate-500' }
            ].map((item, i) => (
              <div key={i} className="flex gap-4">
                <div className={cn("h-8 w-8 rounded-full flex items-center justify-center shrink-0", item.color)}>
                  <div className="w-2 h-2 rounded-full bg-current" />
                </div>
                <div>
                  <p className="text-xs font-bold">{item.text}</p>
                  <p className="text-[10px] text-slate-400 uppercase tracking-tight">{item.user} • {item.time}</p>
                </div>
              </div>
            ))}
          </div>
          <button className="mt-auto pt-4 text-[10px] font-bold text-[#6D5EF5] uppercase tracking-widest text-center hover:underline transition-all">
            View History
          </button>
        </div>
      </div>

      {/* Scheduled Posts Table */}
      <section>
        <div className="bg-white dark:bg-slate-900 p-6 rounded-4xl border border-slate-100 dark:border-slate-800 shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="font-bold text-lg">Upcoming Scheduled Posts</h3>
              <p className="text-sm text-slate-400">Manage your automated queue</p>
            </div>
            <Button variant="ghost" size="sm" className="text-[#6D5EF5] font-bold hover:bg-indigo-50 dark:hover:bg-indigo-900/20 px-4 rounded-xl">
              Open Calendar
            </Button>
          </div>
          <div className="relative w-full overflow-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left border-b border-slate-100 dark:border-slate-800 text-slate-400">
                  <th className="pb-4 font-bold uppercase text-[10px] tracking-wider">Platform</th>
                  <th className="pb-4 font-bold uppercase text-[10px] tracking-wider">Content</th>
                  <th className="pb-4 font-bold uppercase text-[10px] tracking-wider">Date</th>
                  <th className="pb-4 font-bold uppercase text-[10px] tracking-wider">Status</th>
                  <th className="pb-4 font-bold uppercase text-[10px] tracking-wider text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {mockContent.map((post) => (
                  <tr key={post.id} className="border-b border-slate-50 dark:border-slate-800/50 last:border-0 hover:bg-slate-50/50 dark:hover:bg-slate-800/30 transition-colors">
                    <td className="py-4">
                       <Badge variant="secondary" className="font-bold uppercase text-[9px] bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400 border-none px-2">{post.type}</Badge>
                    </td>
                    <td className="py-4 font-bold text-slate-700 dark:text-slate-200">{post.title}</td>
                    <td className="py-4 text-slate-400 font-medium">
                      {post.scheduledFor || post.createdAt}
                    </td>
                    <td className="py-4">
                      <Badge className={cn(
                        "font-bold uppercase text-[9px] px-2 py-0.5 border-none",
                        post.status === 'scheduled' 
                          ? 'bg-indigo-50 text-indigo-500 dark:bg-indigo-900/30' 
                          : 'bg-slate-100 text-slate-400 dark:bg-slate-800'
                      )}>
                        {post.status}
                      </Badge>
                    </td>
                    <td className="py-4 text-right">
                      <Button variant="ghost" size="sm" className="h-8 w-8 p-0 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800">
                        <ArrowUpRight className="w-4 h-4 text-slate-400" />
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </div>
  );
}
