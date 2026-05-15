import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  LayoutDashboard, 
  Briefcase, 
  PenTool, 
  Bot, 
  Image as ImageIcon, 
  Calendar, 
  BarChart3, 
  Settings, 
  ChevronLeft, 
  ChevronRight,
  LogOut,
  Moon,
  Sun
} from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { useUIStore } from '../../store/useUIStore';
import { cn } from '../../lib/utils';
import { Button } from '../ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { Separator } from '../ui/separator';

const menuItems = [
  { icon: LayoutDashboard, label: 'Dashboard', path: '/dashboard' },
  { icon: Briefcase, label: 'Brands', path: '/dashboard/brands' },
  { icon: PenTool, label: 'Content Studio', path: '/dashboard/content/create' },
  { icon: Bot, label: 'AI Agents', path: '/dashboard/ai-agents' },
  { icon: ImageIcon, label: 'Assets', path: '/dashboard/assets' },
  { icon: Calendar, label: 'Calendar', path: '/dashboard/calendar' },
  { icon: BarChart3, label: 'Analytics', path: '/dashboard/analytics' },
  { icon: Settings, label: 'Settings', path: '/dashboard/settings' },
];

export function Sidebar() {
  const { sidebarOpen, setSidebarOpen, theme, setTheme } = useUIStore();
  const location = useLocation();

  return (
    <motion.aside
      initial={false}
      animate={{ width: sidebarOpen ? 260 : 80 }}
      className={cn(
        "relative flex flex-col h-screen bg-background border-r border-border transition-all duration-300 ease-in-out z-50",
        !sidebarOpen && "items-center"
      )}
    >
      {/* Logo Section */}
      <div className="h-20 flex items-center px-8">
        <Link to="/dashboard" className="flex items-center gap-3 overflow-hidden">
          <div className="w-8 h-8 rounded-lg bg-[#6D5EF5] flex items-center justify-center shrink-0 shadow-lg shadow-indigo-200">
            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"/></svg>
          </div>
          <AnimatePresence>
            {sidebarOpen && (
              <motion.span
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                className="font-display font-bold text-xl tracking-tight uppercase"
              >
                KontentIQ
              </motion.span>
            )}
          </AnimatePresence>
        </Link>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-4 space-y-1 overflow-y-auto">
        {menuItems.map((item) => {
          const isActive = location.pathname.startsWith(item.path);
          return (
            <Link
              key={item.path}
              to={item.path}
              className={cn(
                "flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200 group relative font-medium",
                isActive 
                  ? "bg-indigo-50 text-[#6D5EF5] dark:bg-indigo-900/20 dark:text-indigo-300" 
                  : "hover:bg-slate-50 text-slate-600 dark:text-slate-400 dark:hover:bg-slate-800/50"
              )}
            >
              <item.icon className={cn("w-5 h-5 shrink-0 transition-transform group-hover:scale-110", isActive ? "text-[#6D5EF5] dark:text-indigo-300" : "text-slate-400")} />
              {sidebarOpen && (
                <span className="text-sm">{item.label}</span>
              )}
              {!sidebarOpen && (
                <div className="absolute left-14 bg-popover text-popover-foreground px-2 py-1 rounded md border shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all whitespace-nowrap">
                  {item.label}
                </div>
              )}
            </Link>
          );
        })}
      </nav>

      {/* Profile Section (Bottom) */}
      <div className="p-4 border-t border-slate-100 dark:border-slate-800">
        <div className={cn(
          "flex items-center gap-3 p-2 rounded-2xl bg-slate-50 dark:bg-slate-900/50 transition-colors",
          !sidebarOpen && "justify-center"
        )}>
          <Avatar className="w-10 h-10 border border-white dark:border-slate-800 shrink-0 shadow-sm">
            <AvatarImage src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop" />
            <AvatarFallback className="bg-indigo-200 text-[#6D5EF5] font-bold">NC</AvatarFallback>
          </Avatar>
          {sidebarOpen && (
            <div className="flex flex-col overflow-hidden">
              <span className="text-sm font-bold truncate">Nassie Comfort</span>
              <span className="text-[10px] text-slate-400 uppercase tracking-wider font-semibold">Pro Workspace</span>
            </div>
          )}
        </div>
      </div>

      {/* Bottom Actions */}
      <div className="p-4 pt-0 space-y-2">
        <Button
          variant="ghost"
          size="sm"
          className={cn("w-full justify-start gap-3 rounded-xl", !sidebarOpen && "justify-center px-0")}
          onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
        >
          {theme === 'light' ? (
            <Moon className="w-5 h-5 shrink-0" />
          ) : (
            <Sun className="w-5 h-5 shrink-0 text-yellow-400" />
          )}
          {sidebarOpen && <span>{theme === 'light' ? 'Dark Mode' : 'Light Mode'}</span>}
        </Button>
        <Button
          variant="ghost"
          size="sm"
          className={cn("w-full justify-start gap-3 rounded-xl text-destructive hover:text-destructive hover:bg-destructive/10", !sidebarOpen && "justify-center px-0")}
        >
          <LogOut className="w-5 h-5 shrink-0" />
          {sidebarOpen && <span>Log Out</span>}
        </Button>
      </div>

      {/* Toggle Button */}
      <button
        onClick={() => setSidebarOpen(!sidebarOpen)}
        className="absolute -right-3 top-10 w-6 h-6 rounded-full bg-background border border-border flex items-center justify-center shadow-md hover:bg-muted transition-colors z-50"
      >
        {sidebarOpen ? (
          <ChevronLeft className="w-4 h-4" />
        ) : (
          <ChevronRight className="w-4 h-4" />
        )}
      </button>
    </motion.aside>
  );
}
