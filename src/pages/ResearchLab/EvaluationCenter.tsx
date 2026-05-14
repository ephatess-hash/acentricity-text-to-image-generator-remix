import React from 'react';
import { Target, Activity, Search, Filter } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent, Badge, Button, Progress } from '@blinkdotnew/ui';
import { useResearch } from '@/hooks/useResearch';

export default function EvaluationCenter() {
  const { metrics, loading } = useResearch();

  if (loading) return <div className="animate-pulse">Loading analysis engine...</div>;

  return (
    <div className="space-y-6 animate-in fade-in duration-700">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-4xl font-extrabold tracking-tighter glow-text uppercase italic">Evaluation Center</h1>
          <p className="text-muted-foreground">Automated image fidelity & compliance scoring</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="gap-2 border-border/50">
            <Search size={14} /> Inspect All
          </Button>
          <Button className="glow-border">Run New Batch</Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="bg-card/40 backdrop-blur border-border/40">
          <CardHeader>
            <CardTitle className="text-sm font-bold tracking-widest uppercase opacity-60">Spatial Accuracy</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="text-4xl font-black">{metrics.spatialScore}%</div>
            <Progress value={metrics.spatialScore} className="h-1.5" />
            <p className="text-xs text-muted-foreground">Relational positioning adherence across 142 samples.</p>
          </CardContent>
        </Card>

        <Card className="bg-card/40 backdrop-blur border-border/40">
          <CardHeader>
            <CardTitle className="text-sm font-bold tracking-widest uppercase opacity-60">Object Integrity</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="text-4xl font-black">{metrics.countingScore}%</div>
            <Progress value={metrics.countingScore} className="h-1.5" />
            <p className="text-xs text-muted-foreground">Counting accuracy for multi-instance prompts.</p>
          </CardContent>
        </Card>

        <Card className="bg-card/40 backdrop-blur border-border/40">
          <CardHeader>
            <CardTitle className="text-sm font-bold tracking-widest uppercase opacity-60">Text Precision</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="text-4xl font-black">{metrics.typographyScore}%</div>
            <Progress value={metrics.typographyScore} className="h-1.5" />
            <p className="text-xs text-muted-foreground">OCR-validated character consistency scores.</p>
          </CardContent>
        </Card>
      </div>

      <Card className="bg-card/40 backdrop-blur border-border/40 overflow-hidden">
        <div className="p-4 border-b border-border/40 bg-muted/20 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Activity size={16} className="text-primary" />
            <span className="text-sm font-bold tracking-widest uppercase opacity-70">Neural Inspection Logs</span>
          </div>
          <Badge variant="outline">Live Feed</Badge>
        </div>
        <CardContent className="p-0">
          <div className="divide-y divide-border/20">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="p-4 flex items-center justify-between hover:bg-white/[0.02] transition-colors cursor-pointer group">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-muted/40 rounded flex items-center justify-center border border-border/20 overflow-hidden">
                    <img src={`https://picsum.photos/seed/${i + 10}/100`} alt="sample" className="w-full h-full object-cover opacity-50 group-hover:opacity-100 transition-opacity" />
                  </div>
                  <div>
                    <div className="text-sm font-mono opacity-80 uppercase">sample_uuid_{i * 324}</div>
                    <div className="text-[10px] text-muted-foreground font-bold tracking-widest">PROMPT: "cybernetic forest with digital spores"</div>
                  </div>
                </div>
                <div className="flex items-center gap-8">
                  <div className="text-right">
                    <div className="text-xs font-bold opacity-60 tracking-widest">SCORE</div>
                    <div className="text-sm font-black text-primary">8.2/10</div>
                  </div>
                  <Badge className="bg-emerald-500/10 text-emerald-500 border-emerald-500/20">PASS</Badge>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
