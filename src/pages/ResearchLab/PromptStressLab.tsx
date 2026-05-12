import React from 'react';
import { 
  DataTable, 
  Page, 
  PageHeader, 
  PageTitle, 
  PageDescription, 
  PageBody,
  Badge,
  Button,
  Card,
  CardContent,
  StatGroup,
  Stat
} from '@blinkdotnew/ui';
import { 
  Plus, 
  Play, 
  History, 
  Terminal,
  Zap,
  Target
} from 'lucide-react';
import { useResearch } from '@/hooks/useResearch';
import type { ColumnDef } from '@tanstack/react-table';
import { Benchmark } from '@/types/research';

const columns: ColumnDef<Benchmark>[] = [
  {
    accessorKey: 'id',
    header: 'ID',
    cell: ({ row }) => <span className="font-mono text-[10px] text-muted-foreground uppercase">{row.original.id}</span>,
  },
  {
    accessorKey: 'category',
    header: 'Category',
    cell: ({ row }) => (
      <Badge variant="outline" className="capitalize bg-muted/50 border-border/50">
        {row.original.category}
      </Badge>
    ),
  },
  {
    accessorKey: 'difficulty',
    header: 'Difficulty',
    cell: ({ row }) => {
      const colors: Record<string, string> = {
        easy: 'text-emerald-500 bg-emerald-500/10 border-emerald-500/20',
        medium: 'text-blue-500 bg-blue-500/10 border-blue-500/20',
        hard: 'text-amber-500 bg-amber-500/10 border-amber-500/20',
        adversarial: 'text-primary bg-primary/10 border-primary/20',
      };
      return (
        <Badge className={colors[row.original.difficulty] || ''}>
          {row.original.difficulty}
        </Badge>
      );
    },
  },
  {
    accessorKey: 'prompt',
    header: 'Prompt String',
    cell: ({ row }) => (
      <div className="max-w-[400px] truncate font-mono text-xs italic opacity-80" title={row.original.prompt}>
        "{row.original.prompt}"
      </div>
    ),
  },
  {
    id: 'actions',
    header: '',
    cell: () => (
      <div className="flex justify-end gap-2">
        <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-primary">
          <Play className="h-4 w-4" />
        </Button>
      </div>
    ),
  },
];

export default function PromptStressLab() {
  const { benchmarks, loading } = useResearch();

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-4xl font-extrabold tracking-tighter mb-2 glow-text uppercase italic">Prompt Stress Lab</h1>
          <p className="text-muted-foreground flex items-center gap-2">
            <Terminal className="h-4 w-4 text-primary" />
            Adversarial testing & benchmarking suite
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="gap-2 border-border/50 bg-muted/20">
            <History className="h-4 w-4" /> History
          </Button>
          <Button className="gap-2 glow-border">
            <Plus className="h-4 w-4" /> New Benchmark
          </Button>
        </div>
      </div>

      <StatGroup className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Stat label="Average Accuracy" value="76.4%" icon={<Target className="text-blue-500" />} />
        <Stat label="Failure Rate" value="12.2%" icon={<Zap className="text-primary" />} />
        <Stat label="Active Tests" value="24" icon={<Play className="text-emerald-500" />} />
      </StatGroup>

      <Card className="bg-card/40 backdrop-blur border-border/40 overflow-hidden">
        <CardContent className="p-0">
          <div className="p-4 border-b border-border/40 bg-muted/20 flex items-center justify-between">
            <div className="text-sm font-bold tracking-widest uppercase opacity-70">Stress Test Registry</div>
            <div className="flex gap-2">
              <input 
                type="text" 
                placeholder="Search prompts..." 
                className="bg-black/40 border border-border/40 rounded px-3 py-1 text-xs focus:outline-none focus:border-primary transition-all w-48 md:w-64"
              />
            </div>
          </div>
          <DataTable 
            columns={columns} 
            data={benchmarks} 
            loading={loading}
          />
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="bg-card/40 backdrop-blur border-border/40">
          <CardContent className="p-6">
            <div className="flex items-center gap-4 mb-6">
              <div className="h-10 w-10 rounded-full bg-primary/20 flex items-center justify-center border border-primary/40">
                <Zap className="h-5 w-5 text-primary" />
              </div>
              <div>
                <h3 className="font-bold">Automated Stresser</h3>
                <p className="text-xs text-muted-foreground">AI-driven prompt perturbation system</p>
              </div>
            </div>
            <div className="space-y-4">
              <div className="p-4 rounded border border-border/20 bg-muted/10 space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-xs font-bold opacity-60">PERTURBATION LEVEL</span>
                  <span className="text-xs font-mono text-primary">HIGH-ADVERSARIAL</span>
                </div>
                <div className="h-1 bg-muted rounded-full overflow-hidden">
                  <div className="h-full bg-primary w-[85%] glow-border" />
                </div>
              </div>
              <Button className="w-full variant-outline border-primary/20 hover:bg-primary/10">Initialize Chaos Engine</Button>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-card/40 backdrop-blur border-border/40">
          <CardContent className="p-6">
            <div className="flex items-center gap-4 mb-6">
              <div className="h-10 w-10 rounded-full bg-blue-500/20 flex items-center justify-center border border-blue-500/40">
                <Target className="h-5 w-5 text-blue-500" />
              </div>
              <div>
                <h3 className="font-bold">Benchmarking Protocols</h3>
                <p className="text-xs text-muted-foreground">Select active validation standards</p>
              </div>
            </div>
            <div className="flex flex-wrap gap-2">
              {['V-BENCH-1.0', 'DYNAMICS-STRESS', 'SPATIAL-AGI', 'TI-LEADERBOARD', 'NEURAL-TEXT-V2'].map(p => (
                <button key={p} className="px-3 py-1 rounded border border-border/40 hover:border-blue-500/50 hover:bg-blue-500/5 text-[10px] font-mono transition-all">
                  {p}
                </button>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
