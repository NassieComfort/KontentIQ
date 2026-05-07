import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { DashboardLayout } from './layouts/DashboardLayout';
import { Toaster } from './components/ui/sonner';

// Lazy load pages for better performance
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
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<DashboardLayout />}>
            <Route index element={<Navigate to="/dashboard" replace />} />
            <Route path="dashboard" element={<Dashboard />} />
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
