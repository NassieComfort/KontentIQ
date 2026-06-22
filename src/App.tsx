import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useEffect } from 'react';
import { useUIStore } from './store/useUIStore';
import { DashboardLayout } from './layouts/DashboardLayout';
import { Toaster } from './components/ui/sonner';

// Pages
import { LandingPage } from './pages/LandingPage';
import { LoginPage } from './pages/LoginPage';
import { SignupPage } from './pages/SignupPage';
import { Dashboard } from './pages/Dashboard';
import { Brands } from './pages/Brands';
import { SingleBrand } from './pages/SingleBrand';
import { ContentStudio } from './pages/ContentStudio';
import { AIAgents } from './pages/AIAgents';
import { Assets } from './pages/Assets';
import { Calendar } from './pages/Calendar';
import { Analytics } from './pages/Analytics';
import { Settings } from './pages/Settings';

const queryClient = new QueryClient();

export default function App() {
  const { theme } = useUIStore();

  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.remove('light', 'dark');
    root.classList.add(theme);
  }, [theme]);

  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />

          {/* Dashboard Routes */}
          <Route path="/dashboard" element={<DashboardLayout />}>
            <Route index element={<Dashboard />} />
            <Route path="brands" element={<Brands />} />
            <Route path="brands/:id" element={<SingleBrand />} />
            <Route path="content/create" element={<ContentStudio />} />
            <Route path="ai-agents" element={<AIAgents />} />
            <Route path="assets" element={<Assets />} />
            <Route path="calendar" element={<Calendar />} />
            <Route path="analytics" element={<Analytics />} />
            <Route path="settings" element={<Settings />} />
          </Route>
        </Routes>
      </BrowserRouter>
      <Toaster position="top-right" />
    </QueryClientProvider>
  );
}
