import React from 'react';
import { 
  ChevronLeft, 
  ChevronRight, 
  Plus, 
  Filter,
  Instagram,
  Linkedin,
  Twitter,
  FileText,
  Clock,
  CheckCircle2,
  AlertCircle,
  MoreHorizontal
} from 'lucide-react';
import { Button } from '../components/ui/button';
import { Card, CardContent } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '../components/ui/avatar';

const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const months = ['May 2026', 'Jun 2026'];

interface ScheduledItem {
  id: string;
  platform: 'instagram' | 'linkedin' | 'x' | 'blog';
  title: string;
  time: string;
  status: 'published' | 'scheduled' | 'error';
  image?: string;
}

const calendarItems: Record<number, ScheduledItem[]> = {
  7: [
    { id: '1', platform: 'instagram', title: 'Launch teaser', time: '10:00 AM', status: 'published', image: 'https://images.unsplash.com/photo-1614850523296-d8c1af93d400?w=100&h=100&fit=crop' }
  ],
  10: [
    { id: '2', platform: 'linkedin', title: 'Career insights', time: '11:30 AM', status: 'scheduled' },
    { id: '3', platform: 'x', title: 'Feature thread', time: '02:00 PM', status: 'scheduled' }
  ],
  15: [
    { id: '4', platform: 'blog', title: 'May product update', time: '09:00 AM', status: 'scheduled' }
  ],
  22: [
    { id: '5', platform: 'instagram', title: 'Team spotlight', time: '01:00 PM', status: 'error' }
  ]
};

export function Calendar() {
  return (
    <div className="space-y-8 h-full flex flex-col">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold font-display">Schedule</h1>
          <p className="text-muted-foreground">Manage your content publishing timeline</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex bg-muted p-1 rounded-xl mr-2">
            <Button variant="ghost" size="sm" className="bg-background shadow-sm h-8 rounded-lg px-4 text-xs font-bold">Month</Button>
            <Button variant="ghost" size="sm" className="h-8 rounded-lg px-4 text-xs font-bold text-muted-foreground">Week</Button>
            <Button variant="ghost" size="sm" className="h-8 rounded-lg px-4 text-xs font-bold text-muted-foreground">Day</Button>
          </div>
          <Button className="rounded-xl bg-primary">
             <Plus className="w-4 h-4 mr-2" />
             Schedule Post
          </Button>
        </div>
      </div>

      <Card className="flex-1 rounded-[2rem] border-border/60 overflow-hidden shadow-xl bg-background flex flex-col">
        {/* Calendar Header */}
        <div className="p-6 border-b border-border/60 flex items-center justify-between bg-muted/20">
           <div className="flex items-center gap-4">
              <h2 className="text-xl font-bold font-display">May 2026</h2>
              <div className="flex gap-1">
                 <Button variant="outline" size="icon" className="w-8 h-8 rounded-lg">
                    <ChevronLeft className="w-4 h-4" />
                 </Button>
                 <Button variant="outline" size="icon" className="w-8 h-8 rounded-lg">
                    <ChevronRight className="w-4 h-4" />
                 </Button>
              </div>
           </div>
           <div className="flex items-center gap-6">
              <div className="flex items-center gap-2 text-xs font-medium">
                 <div className="w-2.5 h-2.5 rounded-full bg-success" />
                 <span className="text-muted-foreground uppercase tracking-wider">Published</span>
              </div>
              <div className="flex items-center gap-2 text-xs font-medium">
                 <div className="w-2.5 h-2.5 rounded-full bg-primary" />
                 <span className="text-muted-foreground uppercase tracking-wider">Scheduled</span>
              </div>
              <div className="flex items-center gap-2 text-xs font-medium">
                 <div className="w-2.5 h-2.5 rounded-full bg-danger" />
                 <span className="text-muted-foreground uppercase tracking-wider">Failed</span>
              </div>
              <Separator orientation="vertical" className="h-4" />
              <Button variant="ghost" size="sm" className="rounded-lg h-9">
                 <Filter className="w-4 h-4 mr-2" />
                 Filter
              </Button>
           </div>
        </div>

        {/* Calendar Grid */}
        <div className="flex-1 grid grid-cols-7 border-collapse">
          {days.map((day) => (
            <div key={day} className="p-4 text-center border-b border-r border-border/60 bg-muted/10">
              <span className="text-xs font-bold text-muted-foreground uppercase tracking-widest">{day}</span>
            </div>
          ))}
          
          {/* Calendar Days */}
          {Array.from({ length: 31 }).map((_, i) => {
            const dayNum = i + 1;
            const items = calendarItems[dayNum] || [];
            
            return (
              <div key={i} className="min-h-[140px] p-3 border-b border-r border-border/60 hover:bg-muted/5 transition-colors group relative">
                <div className="flex justify-between items-start mb-2">
                   <span className={cn(
                     "text-sm font-bold w-7 h-7 flex items-center justify-center rounded-full transition-colors",
                     dayNum === 7 ? "bg-primary text-primary-foreground" : "text-muted-foreground"
                   )}>
                     {dayNum}
                   </span>
                   {dayNum === 1 && <span className="text-[10px] font-bold text-muted-foreground uppercase">May</span>}
                </div>
                
                <div className="space-y-2">
                  {items.map((item) => (
                    <div 
                      key={item.id} 
                      className={cn(
                        "p-2 rounded-xl border border-transparent shadow-sm cursor-pointer transition-all hover:shadow-md active:scale-95 group/item relative",
                        item.status === 'published' ? "bg-success/10 border-success/20 text-success" :
                        item.status === 'error' ? "bg-danger/10 border-danger/20 text-danger" :
                        "bg-primary/5 border-primary/20 text-primary"
                      )}
                    >
                       <div className="flex items-center justify-between mb-1">
                          <div className="flex items-center gap-1.5">
                             {item.platform === 'instagram' && <Instagram className="w-3 h-3" />}
                             {item.platform === 'linkedin' && <Linkedin className="w-3 h-3" />}
                             {item.platform === 'x' && <Twitter className="w-3 h-3" />}
                             {item.platform === 'blog' && <FileText className="w-3 h-3" />}
                             <span className="text-[10px] font-bold whitespace-nowrap">{item.time}</span>
                          </div>
                          {item.status === 'published' && <CheckCircle2 className="w-3 h-3" />}
                          {item.status === 'error' && <AlertCircle className="w-3 h-3" />}
                       </div>
                       <p className="text-[10px] font-semibold leading-tight truncate">{item.title}</p>
                       
                       {/* Floating actions on hover */}
                       <div className="absolute top-1 right-1 opacity-0 group-hover/item:opacity-100 transition-opacity bg-white/80 dark:bg-black/80 rounded h-4 w-4 flex items-center justify-center">
                          <MoreHorizontal className="w-3 h-3" />
                       </div>
                    </div>
                  ))}
                </div>
                
                {/* Add button on hover */}
                <button className="absolute bottom-2 right-2 w-6 h-6 rounded-lg bg-primary text-white opacity-0 group-hover:opacity-100 transition-all transform scale-75 group-hover:scale-100 shadow-lg flex items-center justify-center">
                   <Plus className="w-4 h-4" />
                </button>
              </div>
            );
          })}
        </div>
      </Card>
    </div>
  );
}

function Separator({ className, orientation = 'horizontal' }: { className?: string, orientation?: 'horizontal' | 'vertical' }) {
  return (
    <div className={cn(
      "bg-border shrink-0",
      orientation === 'horizontal' ? "h-[1px] w-full" : "h-full w-[1px]",
      className
    )} />
  );
}

function cn(...inputs: any[]) {
  return inputs.filter(Boolean).join(' ');
}
