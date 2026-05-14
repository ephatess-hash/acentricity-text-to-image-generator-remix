import React from 'react';
import { 
  LayoutDashboard, 
  FlaskConical, 
  Target, 
  Users, 
  Layers, 
  LineChart 
} from 'lucide-react';
import { 
  AppShell, 
  AppShellSidebar, 
  AppShellMain, 
  MobileSidebarTrigger, 
  SidebarItem, 
  Button,
  Persona,
  Page
} from '@blinkdotnew/ui';
import { cn } from '@/lib/utils';
import { useLocation, Link, Outlet, useNavigate } from 'react-router-dom';
import { ChevronLeft } from 'lucide-react';

const navItems = [
  { id: 'overview', label: 'Dashboard', icon: <LayoutDashboard className="h-4 w-4" />, href: '/research' },
  { id: 'benchmarks', label: 'Prompt Stress Lab', icon: <FlaskConical className="h-4 w-4" />, href: '/research/benchmarks' },
  { id: 'evaluation', label: 'Evaluation Center', icon: <Target className="h-4 w-4" />, href: '/research/evaluation' },
  { id: 'identities', label: 'Identity Hub', icon: <Users className="h-4 w-4" />, href: '/research/identities' },
  { id: 'comparison', label: 'Comparison Lab', icon: <Layers className="h-4 w-4" />, href: '/research/comparison' },
  { id: 'analytics', label: 'Training Insights', icon: <LineChart className="h-4 w-4" />, href: '/research/analytics' },
];

export default function ResearchLabLayout() {
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <AppShell>
      <AppShellSidebar className="shrink-0">
        <div className="flex flex-col h-full w-[16rem] bg-background/80 backdrop-blur-xl border-r border-border research-scanline">
          <div className="shrink-0 border-b border-border px-6 py-6 flex flex-col gap-4">
            <div className="flex items-center gap-3">
              <div className="h-8 w-8 rounded bg-primary/20 flex items-center justify-center border border-primary/50 glow-border">
                <FlaskConical className="h-5 w-5 text-primary glow-text" />
              </div>
              <span className="font-bold text-lg tracking-tight glow-text">NEURAL LAB</span>
            </div>
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={() => navigate('/')}
              className="w-full justify-start gap-2 h-8 px-2 text-[10px] font-black uppercase tracking-widest text-muted-foreground hover:text-foreground"
            >
              <ChevronLeft size={12} />
              Return to Core
            </Button>
          </div>

          <div className="flex-1 min-h-0 overflow-y-auto px-3 py-4 space-y-1">
            <p className="px-3 pb-2 text-[10px] font-bold text-muted-foreground uppercase tracking-[0.2em]">Research Modules</p>
            {navItems.map((item) => (
              <Link key={item.id} to={item.href}>
                <SidebarItem 
                  icon={item.icon} 
                  label={item.label} 
                  active={location.pathname === item.href || (item.id === 'overview' && location.pathname === '/research/')}
                  className={cn(
                    "transition-all duration-300",
                    location.pathname === item.href ? "bg-primary/10 text-primary border-r-2 border-primary" : "hover:bg-primary/5"
                  )}
                />
              </Link>
            ))}
          </div>

          <div className="shrink-0 border-t border-border p-4 bg-muted/30">
            <Persona 
              name="Senior Researcher" 
              subtitle="Level 4 Access" 
              className="px-2"
            />
          </div>
        </div>
      </AppShellSidebar>

      <AppShellMain className="relative overflow-hidden min-h-screen bg-[#050505] research-grid">
        {/* Animated Background Element */}
        <div className="absolute top-[-10%] right-[-10%] w-[40%] h-[40%] bg-primary/5 rounded-full blur-[120px] animate-pulse-slow pointer-events-none" />
        
        <div className="md:hidden flex items-center gap-2 px-4 h-16 border-b border-border bg-background/50 backdrop-blur-md sticky top-0 z-50">
          <MobileSidebarTrigger />
          <span className="font-bold tracking-tight glow-text">NEURAL LAB</span>
        </div>

        <main className="p-6 md:p-8 max-w-7xl mx-auto w-full">
          <Outlet />
        </main>
      </AppShellMain>
    </AppShell>
  );
}