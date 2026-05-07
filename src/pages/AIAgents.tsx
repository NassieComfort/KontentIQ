import React, { useState } from 'react';
import { 
  Bot, 
  Settings2, 
  Zap, 
  History, 
  BrainCircuit, 
  Layers, 
  CheckCircle2, 
  PauseCircle, 
  PlayCircle,
  MoreVertical,
  Activity,
  Cpu,
  Plus
} from 'lucide-react';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { mockAgents } from '../mock/data';
import { 
  Sheet, 
  SheetContent, 
  SheetDescription, 
  SheetHeader, 
  SheetTitle, 
  SheetTrigger 
} from '../components/ui/sheet';
import { Progress } from '../components/ui/progress';
import { Separator } from '../components/ui/separator';
import { cn } from '../lib/utils';

export function AIAgents() {
  const [selectedAgent, setSelectedAgent] = useState<any>(null);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold font-display">AI Agents</h1>
          <p className="text-slate-500">Autonomous workflow assistants trained on your brand</p>
        </div>
        <Button className="rounded-xl h-11 px-6 bg-[#6D5EF5] hover:bg-[#5B4EE0] shadow-lg shadow-indigo-100 font-bold">
          <Zap className="w-4 h-4 mr-2" />
          Quick Deploy
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {mockAgents.map((agent) => (
          <div key={agent.id} className="group bg-white dark:bg-slate-900 rounded-3xl border border-slate-100 dark:border-slate-800 overflow-hidden hover:shadow-xl hover:shadow-indigo-500/5 transition-all duration-300">
            <div className="p-6 text-left">
              <div className="flex items-start justify-between">
                <div className="w-12 h-12 rounded-2xl bg-indigo-50 dark:bg-indigo-900/20 flex items-center justify-center text-[#6D5EF5] group-hover:bg-[#6D5EF5] group-hover:text-white transition-all duration-300 shadow-sm">
                  <Bot className="w-6 h-6" />
                </div>
                <Badge className={cn(
                  "font-bold uppercase text-[9px] px-2.5 py-1 border-none",
                  agent.status === 'active' ? 'bg-green-50 text-green-500 dark:bg-green-900/20' : 
                  agent.status === 'busy' ? 'bg-amber-50 text-amber-500 dark:bg-amber-900/20' : 
                  'bg-slate-50 text-slate-400 dark:bg-slate-800'
                )}>
                  <div className={cn("w-1.5 h-1.5 rounded-full mr-1.5", 
                    agent.status === 'active' ? 'bg-green-500 animate-pulse' : 
                    agent.status === 'busy' ? 'bg-amber-500' : 
                    'bg-slate-400'
                  )} />
                  {agent.status}
                </Badge>
              </div>
              <div className="mt-6">
                <h3 className="text-xl font-bold font-display leading-tight">{agent.name}</h3>
                <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mt-1">{agent.specialty}</p>
              </div>
            </div>
            <div className="p-6 pt-0 space-y-4">
              <p className="text-sm text-slate-500 leading-relaxed mt-4 min-h-[60px]">
                {agent.description}
              </p>
              <div className="mt-6 space-y-3">
                <div className="flex items-center justify-between text-[10px] font-bold uppercase text-slate-400 tracking-widest">
                   <span>Throughput</span>
                   <span className="text-slate-900 dark:text-white">{agent.status === 'busy' ? '85%' : agent.status === 'active' ? '24%' : '0%'}</span>
                </div>
                <div className="h-1.5 w-full bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                  <div 
                    className="h-full gradient-bg rounded-full transition-all duration-1000"
                    style={{ width: `${agent.status === 'busy' ? 85 : agent.status === 'active' ? 24 : 0}%` }}
                  />
                </div>
              </div>
            </div>
            <div className="p-4 px-6 bg-slate-50/50 dark:bg-slate-800/30 border-t border-slate-50 dark:border-slate-800 flex gap-2">
               <Sheet>
                 <SheetTrigger asChild>
                    <Button variant="outline" className="flex-1 rounded-xl" onClick={() => setSelectedAgent(agent)}>
                        Manage Agent
                    </Button>
                 </SheetTrigger>
                 <SheetContent className="sm:max-w-md md:max-w-lg border-none shadow-2xl p-0 overflow-hidden bg-slate-50 dark:bg-slate-950">
                    <div className="h-full flex flex-col p-8 space-y-8 overflow-y-auto">
                      <SheetHeader className="text-left space-y-4">
                         <div className="w-16 h-16 rounded-3xl gradient-bg flex items-center justify-center text-white shadow-lg shadow-indigo-200">
                            <Bot className="w-10 h-10" />
                         </div>
                         <div>
                           <SheetTitle className="text-3xl font-display font-bold leading-none">{agent.name}</SheetTitle>
                           <SheetDescription className="text-slate-400 mt-1 uppercase text-[10px] font-bold tracking-widest">{agent.specialty}</SheetDescription>
                         </div>
                      </SheetHeader>
                      
                      <div className="grid grid-cols-2 gap-4">
                         <div className="p-5 bg-white dark:bg-slate-900 rounded-3xl shadow-sm border border-slate-100 dark:border-slate-800">
                            <p className="text-[10px] text-slate-400 uppercase font-bold tracking-widest mb-1">Accuracy</p>
                            <p className="text-2xl font-bold">98.4%</p>
                         </div>
                         <div className="p-5 bg-white dark:bg-slate-900 rounded-3xl shadow-sm border border-slate-100 dark:border-slate-800">
                            <p className="text-[10px] text-slate-400 uppercase font-bold tracking-widest mb-1">Uptime</p>
                            <p className="text-2xl font-bold">99.9h</p>
                         </div>
                      </div>

                      <div className="space-y-4 p-6 bg-white dark:bg-slate-900 rounded-3xl shadow-sm border border-slate-100 dark:border-slate-800">
                         <h4 className="font-bold flex items-center gap-2 text-sm uppercase tracking-widest text-slate-400">
                            <Cpu className="w-4 h-4" /> System Config
                         </h4>
                         <div className="space-y-3 pt-2">
                            <div className="flex justify-between items-center text-sm">
                               <span className="text-slate-500 font-medium">Context Window</span>
                               <span className="font-bold">128k tokens</span>
                            </div>
                            <div className="h-px bg-slate-50 dark:bg-slate-800" />
                            <div className="flex justify-between items-center text-sm">
                               <span className="text-slate-500 font-medium">Model Backend</span>
                               <span className="font-bold text-[#6D5EF5]">Nova-Pro-Large</span>
                            </div>
                         </div>
                      </div>

                      <div className="space-y-4">
                         <h4 className="font-bold flex items-center gap-2 text-sm uppercase tracking-widest text-slate-400">
                            <History className="w-4 h-4" /> Activity Log
                         </h4>
                         <div className="space-y-3">
                            {[1, 2, 3].map(i => (
                              <div key={i} className="flex gap-4 p-4 bg-white dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-800 shadow-sm transition-transform hover:translate-x-1 cursor-default">
                                 <div className="w-8 h-8 rounded-full bg-green-50 dark:bg-green-900/20 flex items-center justify-center text-green-500 shrink-0">
                                    <CheckCircle2 className="w-4 h-4" />
                                 </div>
                                 <div className="overflow-hidden">
                                    <p className="text-sm font-bold truncate">Campaign Auto-Optimization</p>
                                    <p className="text-[10px] text-slate-400 font-medium">{4 - i} hours ago • Success</p>
                                 </div>
                              </div>
                            ))}
                         </div>
                      </div>

                      <div className="mt-auto flex gap-3 pt-4">
                         <Button variant="outline" className="flex-1 rounded-2xl h-12 border-slate-200 font-bold hover:bg-slate-100">
                            <PauseCircle className="w-4 h-4 mr-2" /> Pause
                         </Button>
                         <Button className="flex-1 bg-[#6D5EF5] text-white rounded-2xl h-12 font-bold shadow-lg shadow-indigo-100 hover:bg-[#5B4EE0]">
                            <Settings2 className="w-4 h-4 mr-2" /> Configure
                         </Button>
                      </div>
                    </div>
                 </SheetContent>
               </Sheet>
               <Button variant="ghost" size="icon" className="group-hover:text-primary transition-colors">
                  <MoreVertical className="w-4 h-4" />
               </Button>
            </div>
          </div>
        ))}
        
        {/* Placeholder for new agent */}
        <div className="border-2 border-dashed border-slate-200 dark:border-slate-800 rounded-4xl flex flex-col items-center justify-center p-8 space-y-4 hover:border-indigo-200 hover:bg-indigo-50/20 dark:hover:bg-indigo-900/10 transition-all cursor-pointer group min-h-[340px]">
           <div className="w-16 h-16 rounded-full bg-slate-50 dark:bg-slate-900 flex items-center justify-center group-hover:bg-[#6D5EF5] group-hover:text-white transition-all duration-300 shadow-sm ring-4 ring-white dark:ring-slate-800 group-hover:ring-[#6D5EF5]/20">
              <Plus className="w-8 h-8" />
           </div>
           <div className="text-center">
              <h3 className="font-bold text-lg font-display">Custom Agent</h3>
              <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mt-1">Train New Node</p>
           </div>
        </div>
      </div>
    </div>
  );
}
