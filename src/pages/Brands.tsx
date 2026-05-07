import React from 'react';
import { Search, Plus, Filter, MoreVertical, ExternalLink } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Card, CardContent, CardFooter, CardHeader } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { mockBrands } from '../mock/data';
import { Link } from 'react-router-dom';
import { Avatar, AvatarFallback, AvatarGroup } from '../components/ui/avatar';

export function Brands() {
  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold font-display">Brands</h1>
          <p className="text-slate-500">Manage your brand identities and AI-trained personas</p>
        </div>
        <Button className="rounded-xl px-6 bg-[#6D5EF5] hover:bg-[#5B4EE0] shadow-lg shadow-indigo-100 font-bold h-11">
          <Plus className="w-4 h-4 mr-2" />
          Add New Brand
        </Button>
      </div>

      <div className="flex flex-col sm:flex-row items-center gap-4">
        <div className="relative flex-1 w-full">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input 
            placeholder="Search brands..." 
            className="w-full pl-11 h-12 bg-white dark:bg-slate-900 border-none rounded-2xl shadow-sm focus:ring-2 focus:ring-[#6D5EF5]/20 placeholder:text-slate-400" 
          />
        </div>
        <Button variant="outline" className="rounded-2xl h-12 px-6 border-slate-100 bg-white dark:bg-slate-900 shadow-sm font-semibold">
          <Filter className="w-4 h-4 mr-2 text-slate-400" />
          Filters
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {mockBrands.map((brand) => (
          <div key={brand.id} className="group bg-white dark:bg-slate-900 rounded-3xl border border-slate-100 dark:border-slate-800 overflow-hidden hover:shadow-xl hover:shadow-indigo-500/5 transition-all duration-300">
            <div className="p-6">
              <div className="flex items-start justify-between mb-6">
                <div className="w-14 h-14 rounded-2xl overflow-hidden border border-slate-100 shadow-sm">
                  <img src={brand.logo} alt={brand.name} className="w-full h-full object-cover" />
                </div>
                <Button variant="ghost" size="icon" className="rounded-xl bg-slate-50 hover:bg-slate-100 dark:bg-slate-800 dark:hover:bg-slate-700 opacity-0 group-hover:opacity-100 transition-opacity">
                  <MoreVertical className="w-4 h-4 text-slate-400" />
                </Button>
              </div>
              <div>
                <Link to={`/brands/${brand.id}`} className="hover:text-[#6D5EF5] transition-colors">
                  <h3 className="text-xl font-bold font-display leading-tight">{brand.name}</h3>
                </Link>
                <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mt-1">{brand.industry}</p>
              </div>
              <p className="text-sm text-slate-500 line-clamp-2 mt-4 min-h-[40px] leading-relaxed">
                {brand.description}
              </p>
              <div className="flex flex-wrap gap-2 mt-6">
                {brand.tone.map((t) => (
                  <Badge key={t} variant="secondary" className="bg-indigo-50 text-[#6D5EF5] dark:bg-indigo-900/20 dark:text-indigo-300 font-bold text-[10px] uppercase border-none px-2.5">
                    {t}
                  </Badge>
                ))}
              </div>
            </div>
            <div className="p-4 px-6 bg-slate-50/50 dark:bg-slate-800/30 flex items-center justify-between border-t border-slate-50 dark:border-slate-800">
               <div className="flex -space-x-2">
                  {brand.team.map((member, i) => (
                    <Avatar key={i} className="w-7 h-7 border-2 border-white dark:border-slate-900 shadow-sm shrink-0">
                      <AvatarFallback className="text-[10px] font-bold bg-indigo-100 text-indigo-600">{member.name[0]}</AvatarFallback>
                    </Avatar>
                  ))}
               </div>
               <Link to={`/brands/${brand.id}`}>
                <Button variant="ghost" size="sm" className="text-xs font-bold text-slate-400 hover:text-[#6D5EF5] group-hover:text-[#6D5EF5] transition-colors gap-1">
                  View Brand <ArrowUpRight className="w-3 h-3" />
                </Button>
               </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function ArrowUpRight(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M7 7h10v10" />
      <path d="M7 17 17 7" />
    </svg>
  );
}
