import React from 'react';
import { 
  StatGroup, 
  Stat, 
  Card, 
  CardHeader, 
  CardTitle, 
  CardContent,
  Progress,
  Badge,
  AreaChart
} from '@blinkdotnew/ui';
import { 
  Activity, 
  Zap, 
  ShieldAlert, 
  Binary,
  ArrowUpRight,
  RefreshCw
} from 'lucide-react';
import { useResearch } from '@/hooks/useResearch';

export default function Overview() {
  const { metrics, loading } = useResearch();

  const chartData = [
    { month: 'Jan', score: 65 },
    { month: 'Feb', score: 68 },
    { month: 'Mar', score: 75 },
    { month: 'Apr', score: 72 },
    { month: 'May', score: 80 },
    { month: 'Jun', score: 82 },
  ];

  if (loading) return <div className="animate-pulse text-muted-foreground">Initializing research environment...</div>;

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-4xl font-extrabold tracking-tighter mb-2 glow-text">SYSTEM OVERVIEW</h1>
          <p className="text-muted-foreground flex items-center gap-2">
            <Activity className="h-4 w-4 text-primary animate-pulse" />
            Active Evaluation: <span className="text-foreground font-mono">NEURAL-DYNAMICS-V4.2</span>
          </p>
        </div>
        <div className="flex gap-3">
          <Badge variant="outline" className="px-3 py-1 bg-primary/5 border-primary/20 text-primary glow-border">
            STABLE
          </Badge>
          <button className="flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary text-primary-foreground text-sm font-medium hover:opacity-90 transition-all glow-border">
            <RefreshCw className="h-4 w-4" />
            Resync Node
          </button>
        </div>
      </div>

      <StatGroup className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Stat 
          label="Overall Score" 
          value={`${metrics.overallScore}%`} 
          trend={+4.2} 
          trendLabel="vs last week" 
          icon={<Zap className="text-primary" />}
          className="bg-card/50 backdrop-blur border-border/50 glow-border"
        />
        <Stat 
          label="Model Latency" 
          value="420ms" 
          trend={-12} 
          trendLabel="optimized" 
          icon={<Binary className="text-blue-500" />}
          className="bg-card/50 backdrop-blur border-border/50"
        />
        <Stat 
          label="Total Benchmarks" 
          value="12,840" 
          icon={<FlaskConical className="text-purple-500" />}
          className="bg-card/50 backdrop-blur border-border/50"
        />
        <Stat 
          label="Anomalies Detected" 
          value="3" 
          trend={-5} 
          trendLabel="reduced" 
          icon={<ShieldAlert className="text-destructive" />}
          className="bg-card/50 backdrop-blur border-border/50"
        />
      </StatGroup>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2 bg-card/40 backdrop-blur border-border/40 overflow-hidden">
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle className="text-xl font-bold">Optimization Trajectory</CardTitle>
              <p className="text-xs text-muted-foreground">Aggregate scoring across last 6 training cycles</p>
            </div>
            <ArrowUpRight className="h-5 w-5 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="h-[300px] w-full pt-4">
              <AreaChart 
                data={chartData} 
                dataKey="score" 
                xAxisKey="month" 
                height={300}
              />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-card/40 backdrop-blur border-border/40">
          <CardHeader>
            <CardTitle className="text-xl font-bold">Core Competencies</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Spatial Understanding</span>
                <span className="font-mono text-primary">{metrics.spatialScore}%</span>
              </div>
              <Progress value={metrics.spatialScore} className="h-1.5 bg-primary/10" indicatorClassName="bg-primary glow-border" />
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Object Counting</span>
                <span className="font-mono text-blue-500">{metrics.countingScore}%</span>
              </div>
              <Progress value={metrics.countingScore} className="h-1.5 bg-blue-500/10" indicatorClassName="bg-blue-500 shadow-[0_0_10px_rgba(59,130,246,0.5)]" />
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Visual Realism</span>
                <span className="font-mono text-emerald-500">{metrics.realismScore}%</span>
              </div>
              <Progress value={metrics.realismScore} className="h-1.5 bg-emerald-500/10" indicatorClassName="bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.5)]" />
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Text Rendering</span>
                <span className="font-mono text-amber-500">{metrics.typographyScore}%</span>
              </div>
              <Progress value={metrics.typographyScore} className="h-1.5 bg-amber-500/10" indicatorClassName="bg-amber-500 shadow-[0_0_10px_rgba(245,158,11,0.5)]" />
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="bg-card/40 backdrop-blur border-border/40">
          <CardHeader>
            <CardTitle className="text-lg font-bold">Protocol Deviations</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-3">
              {metrics.failureExplanations.map((fail, i) => (
                <li key={i} className="flex gap-3 text-sm p-3 rounded bg-destructive/5 border border-destructive/10">
                  <span className="text-destructive font-bold font-mono">0{i+1}</span>
                  <span className="text-muted-foreground">{fail}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        <Card className="bg-card/40 backdrop-blur border-border/40">
          <CardHeader>
            <CardTitle className="text-lg font-bold">Neural Connectivity</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {['LORA-7X', 'VAE-840K', 'U-NET-S2', 'CLIP-VIT-L14', 'REFINER-V1'].map(tag => (
                <Badge key={tag} variant="outline" className="bg-muted/50 border-border/50 text-[10px] py-0 px-2 font-mono">
                  {tag}
                </Badge>
              ))}
            </div>
            <div className="mt-6 p-4 rounded-lg bg-black/40 border border-border/20 border-dashed">
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs text-muted-foreground uppercase font-bold tracking-widest">Active Link</span>
                <span className="h-2 w-2 rounded-full bg-primary animate-pulse" />
              </div>
              <div className="h-24 flex items-end gap-1 px-2">
                {[40, 70, 45, 90, 65, 30, 80, 55, 95, 60, 40, 75].map((h, i) => (
                  <div 
                    key={i} 
                    className="flex-1 bg-primary/20 hover:bg-primary transition-colors cursor-help rounded-t-sm" 
                    style={{ height: `${h}%` }}
                  />
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

import { FlaskConical } from 'lucide-react';
