import React from 'react';
import { 
  BarChart3, 
  TrendingUp, 
  TrendingDown, 
  Users, 
  MousePointer2, 
  Target, 
  PieChart as PieChartIcon,
  Download,
  Calendar,
  Filter
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { 
  AreaChart, 
  Area, 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  PieChart, 
  Pie,
  Cell, 
  Legend
} from 'recharts';
import { mockAnalytics } from '../mock/data';

const platformData = [
  { name: 'Instagram', value: 45, color: '#6D5EF5' },
  { name: 'LinkedIn', value: 30, color: '#0EA5E9' },
  { name: 'X / Twitter', value: 15, color: '#22C55E' },
  { name: 'Blog', value: 10, color: '#A78BFA' },
];

export function Analytics() {
  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold font-display">Analytics</h1>
          <p className="text-muted-foreground">Track engagement and AI performance ROI</p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" className="rounded-xl">
             <Calendar className="w-4 h-4 mr-2" />
             Last 30 Days
          </Button>
          <Button className="rounded-xl bg-primary">
             <Download className="w-4 h-4 mr-2" />
             Export Report
          </Button>
        </div>
      </div>

      {/* Stats Board */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { label: 'Total Reach', value: '45.2k', change: '+12.5%', isUp: true, icon: Users },
          { label: 'Avg. CTR', value: '3.4%', change: '+0.8%', isUp: true, icon: MousePointer2 },
          { label: 'Conversion', value: '1.2%', change: '-0.2%', isUp: false, icon: Target },
          { label: 'AI Efficiency', value: '88%', change: '+14%', isUp: true, icon: BarChart3 },
        ].map((stat, i) => (
          <Card key={i} className="rounded-2xl border-border/60">
            <CardContent className="p-6">
               <div className="flex items-center justify-between">
                  <div className="w-10 h-10 rounded-xl bg-muted flex items-center justify-center text-primary">
                     <stat.icon className="w-5 h-5" />
                  </div>
                  <div className={`flex items-center text-xs font-bold ${stat.isUp ? 'text-success' : 'text-danger'}`}>
                     {stat.isUp ? <TrendingUp className="w-3 h-3 mr-1" /> : <TrendingDown className="w-3 h-3 mr-1" />}
                     {stat.change}
                  </div>
               </div>
               <div className="mt-4">
                  <p className="text-sm text-muted-foreground">{stat.label}</p>
                  <h3 className="text-2xl font-bold mt-1 font-display">{stat.value}</h3>
               </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Main Growth Chart */}
        <Card className="lg:col-span-8 rounded-3xl border-border/60">
          <CardHeader className="flex flex-row items-center justify-between pb-8">
             <div>
               <CardTitle>Growth Trends</CardTitle>
               <CardDescription>Engagement and impressions over time</CardDescription>
             </div>
             <div className="flex bg-muted rounded-lg p-1">
                <Button variant="ghost" size="sm" className="bg-background shadow-sm text-xs h-7">Weekly</Button>
                <Button variant="ghost" size="sm" className="text-xs h-7">Monthly</Button>
             </div>
          </CardHeader>
          <CardContent>
            <div className="h-[400px] w-full pt-4">
               <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={mockAnalytics}>
                     <defs>
                        <linearGradient id="primaryGradient" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#6D5EF5" stopOpacity={0.2}/>
                          <stop offset="95%" stopColor="#6D5EF5" stopOpacity={0}/>
                        </linearGradient>
                        <linearGradient id="accentGradient" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#0EA5E9" stopOpacity={0.2}/>
                          <stop offset="95%" stopColor="#0EA5E9" stopOpacity={0}/>
                        </linearGradient>
                     </defs>
                     <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#eee" />
                     <XAxis 
                       dataKey="date" 
                       axisLine={false} 
                       tickLine={false} 
                       tick={{ fontSize: 12, fill: '#888' }}
                       tickFormatter={(val) => new Date(val).toLocaleDateString('en-US', { day: 'numeric', month: 'short' })}
                     />
                     <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#888' }} />
                     <Tooltip 
                        contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 20px 25px -5px rgb(0 0 0 / 0.1)' }} 
                     />
                     <Area 
                       type="monotone" 
                       dataKey="engagement" 
                       stroke="#6D5EF5" 
                       strokeWidth={4} 
                       fill="url(#primaryGradient)" 
                     />
                     <Area 
                       type="monotone" 
                       dataKey="impressions" 
                       stroke="#0EA5E9" 
                       strokeWidth={2} 
                       fill="url(#accentGradient)" 
                     />
                  </AreaChart>
               </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Platform Breakdown */}
        <Card className="lg:col-span-4 rounded-3xl border-border/60">
           <CardHeader>
              <CardTitle>Platform Distribution</CardTitle>
              <CardDescription>Performance by channel</CardDescription>
           </CardHeader>
           <CardContent className="flex flex-col items-center">
              <div className="h-[300px] w-full">
                 <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                       <Pie
                          data={platformData}
                          innerRadius={80}
                          outerRadius={110}
                          paddingAngle={8}
                          dataKey="value"
                       >
                          {platformData.map((entry, index) => (
                             <Cell key={`cell-${index}`} fill={entry.color} cornerRadius={12} />
                          ))}
                       </Pie>
                       <Tooltip 
                          contentStyle={{ borderRadius: '12px', border: 'none', background: '#fff' }} 
                       />
                       <Legend 
                          verticalAlign="bottom" 
                          iconType="circle"
                          formatter={(value) => <span className="text-xs font-medium text-muted-foreground">{value}</span>}
                       />
                    </PieChart>
                 </ResponsiveContainer>
              </div>
              <div className="w-full mt-6 space-y-4">
                 {platformData.map(platform => (
                    <div key={platform.name} className="flex items-center justify-between">
                       <div className="flex items-center gap-2">
                          <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: platform.color }} />
                          <span className="text-sm font-medium">{platform.name}</span>
                       </div>
                       <span className="text-sm font-bold">{platform.value}%</span>
                    </div>
                 ))}
              </div>
           </CardContent>
        </Card>
      </div>

      {/* Top Performing Content Section */}
      <section>
        <div className="flex items-center justify-between mb-6">
           <h3 className="text-2xl font-bold font-display">Top Performing Content</h3>
           <Button variant="ghost" className="text-primary font-bold">View full list</Button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
           {[1, 2, 3].map(i => (
             <Card key={i} className="rounded-2xl border-border/60 group hover:border-primary/40 transition-colors">
                <div className="p-4 flex gap-4">
                   <div className="w-16 h-16 rounded-xl bg-muted overflow-hidden shrink-0">
                      <img src={`https://images.unsplash.com/photo-${1550000000000 + i * 10000}?w=100&h=100&fit=crop`} className="w-full h-full object-cover" />
                   </div>
                   <div className="flex-1 min-w-0">
                      <p className="text-sm font-bold truncate">Spring 2026 Campaign Reveal</p>
                      <div className="flex items-center gap-2 mt-1">
                         <Badge variant="secondary" className="bg-primary/10 text-primary text-[10px] px-1.5 py-0">Instagram</Badge>
                         <span className="text-[10px] text-muted-foreground uppercase font-bold tracking-wider">May 01, 2026</span>
                      </div>
                   </div>
                </div>
                <div className="px-4 pb-4 grid grid-cols-3 gap-2">
                   <div className="text-center p-2 rounded-xl bg-muted/40 group-hover:bg-primary/5 transition-colors">
                      <p className="text-[10px] text-muted-foreground font-bold uppercase">Likes</p>
                      <p className="text-sm font-bold">1.2k</p>
                   </div>
                   <div className="text-center p-2 rounded-xl bg-muted/40 group-hover:bg-primary/5 transition-colors">
                      <p className="text-[10px] text-muted-foreground font-bold uppercase">Shares</p>
                      <p className="text-sm font-bold">428</p>
                   </div>
                   <div className="text-center p-2 rounded-xl bg-muted/40 group-hover:bg-primary/5 transition-colors">
                      <p className="text-[10px] text-muted-foreground font-bold uppercase">Convs</p>
                      <p className="text-sm font-bold">84</p>
                   </div>
                </div>
             </Card>
           ))}
        </div>
      </section>
    </div>
  );
}
