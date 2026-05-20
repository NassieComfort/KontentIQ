import React from 'react';
import { Search, Bell, Sparkles, ChevronDown, Command, Plus } from 'lucide-react';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuLabel, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from '../ui/dropdown-menu';
import { useUIStore } from '../../store/useUIStore';
import { useAuthStore } from '../../store/useAuthStore';
import { mockBrands } from '../../mock/data';

export function Navbar() {
  const { selectedBrandId, setSelectedBrandId } = useUIStore();
  const { user } = useAuthStore();
  
  const selectedBrand = mockBrands.find(b => b.id === selectedBrandId) || mockBrands[0];
  const userInitial = user?.fullName?.charAt(0).toUpperCase() || 'U';

  return (
    <header className="h-16 border-b border-slate-100 dark:border-slate-800 bg-white/80 dark:bg-background/80 backdrop-blur-md sticky top-0 z-40 flex items-center justify-between px-8 shrink-0">
      {/* Workspace Switcher & Search */}
      <div className="flex items-center gap-6">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="flex items-center gap-2 font-bold px-0 hover:bg-transparent transition-colors">
              <div className="w-8 h-8 rounded-lg bg-indigo-50 dark:bg-indigo-900/20 flex items-center justify-center text-[#6D5EF5] text-xs font-bold shadow-sm">
                {selectedBrand.name.substring(0, 2).toUpperCase()}
              </div>
              <span className="text-sm truncate max-w-[150px] font-display">{selectedBrand.name}</span>
              <ChevronDown className="w-4 h-4 text-slate-400" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start" className="w-[220px] rounded-2xl p-2 shadow-premium border-slate-100">
            <DropdownMenuLabel className="text-[10px] uppercase tracking-widest text-slate-400 font-bold px-2 py-1.5">Switch Brand</DropdownMenuLabel>
            <DropdownMenuSeparator className="bg-slate-50" />
            {mockBrands.map((brand) => (
              <DropdownMenuItem 
                key={brand.id}
                onClick={() => setSelectedBrandId(brand.id)}
                className="flex items-center gap-3 cursor-pointer rounded-xl h-10 px-2 my-0.5 focus:bg-slate-50"
              >
                <div className="w-6 h-6 rounded bg-slate-100 flex items-center justify-center text-slate-500 text-[10px] font-bold">
                  {brand.name.substring(0, 2).toUpperCase()}
                </div>
                <span className="font-medium text-sm">{brand.name}</span>
              </DropdownMenuItem>
            ))}
            <DropdownMenuSeparator className="bg-slate-50" />
            <DropdownMenuItem className="text-[#6D5EF5] font-bold cursor-pointer rounded-xl h-10 px-2 focus:bg-indigo-50">
              + New Brand
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        <div className="hidden lg:flex items-center bg-slate-100 dark:bg-slate-800 rounded-xl px-4 py-2 w-96 transition-all focus-within:ring-2 focus-within:ring-[#6D5EF5]/20">
          <Search className="w-4 h-4 text-slate-400 mr-2" />
          <input 
            type="text"
            placeholder="Search brands, content, agents..." 
            className="bg-transparent border-none focus:ring-0 text-sm w-full placeholder:text-slate-400 placeholder:font-medium"
          />
          <div className="flex items-center gap-1 text-[10px] font-bold text-slate-400 opacity-50 px-1.5 py-0.5 rounded border border-slate-300">
             K
          </div>
        </div>
      </div>

      {/* Right Actions */}
      <div className="flex items-center gap-4">
        <Button 
          className="bg-[#6D5EF5] text-white px-4 py-2 h-10 rounded-xl text-sm font-bold shadow-lg shadow-indigo-100 hover:bg-[#5B4EE0] transition-all hover:-translate-y-0.5"
        >
          <Plus className="w-4 h-4 mr-2" />
          Quick Action
        </Button>
        
        <div className="relative cursor-pointer hover:bg-slate-50 p-2 rounded-full transition-colors group">
          <div className="absolute top-1.5 right-1.5 h-2 w-2 bg-red-500 rounded-full border-2 border-white group-hover:scale-110 transition-transform" />
          <Bell className="w-6 h-6 text-slate-400" />
        </div>

        <div className="w-px h-6 bg-slate-100 dark:bg-slate-800 mx-2" />

        <div className="flex items-center gap-2 p-1 pl-2">
          <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-[#6D5EF5] to-[#A78BFA] shadow-sm flex items-center justify-center text-white text-xs font-bold">
            {userInitial}
          </div>
          <ChevronDown className="w-4 h-4 text-slate-400" />
        </div>
      </div>
    </header>
  );
}
