import React, { useState } from 'react';
import { ImageGenerator } from '../components/features/ImageGenerator';
import { Gallery } from '../components/features/Gallery';
import { GridPattern } from '../components/ui/grid-pattern';
import { Sparkles, History } from 'lucide-react';

export function DashboardPage() {
  const [refreshKey, setRefreshKey] = useState(0);

  const handleImageGenerated = () => {
    setRefreshKey(prev => prev + 1);
  };

  return (
    <div className="min-h-screen pt-24 pb-20 relative overflow-hidden bg-background">
      {/* Texture Layers */}
      <div className="paper-grain" />
      <div className="animated-noise" />
      <div className="gallery-vignette" />
      
      <div className="blueprint-grid" />
      
      <div className="container max-w-[1400px] mx-auto px-4 space-y-24 relative z-10">
        {/* Generator Section */}
        <section className="space-y-12">
          <div className="text-center max-w-2xl mx-auto space-y-6">
            <div className="inline-flex items-center gap-3 px-4 py-1.5 border border-foreground/10 bg-white/40 backdrop-blur-md text-foreground/70 text-[10px] uppercase tracking-[0.2em] font-black">
              <span className="w-1.5 h-1.5 bg-primary rounded-none" />
              <span>Creation Laboratory</span>
              <span className="w-1.5 h-1.5 bg-primary rounded-none" />
            </div>
            <h2 className="text-5xl lg:text-7xl font-serif font-black tracking-[-0.04em]">What will you <span className="text-accent italic drop-shadow-sm">construct</span> today?</h2>
            <p className="text-lg text-muted-foreground font-medium leading-tight">Enter a detailed prompt below to bring your visual manifesto to life.</p>
          </div>
          <ImageGenerator onImageGenerated={handleImageGenerated} />
        </section>

        {/* Gallery Section */}
        <section className="space-y-12">
          <div className="flex items-center justify-between border-b border-foreground/10 pb-6">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 bg-primary/10 flex items-center justify-center">
                <History className="text-primary" size={20} />
              </div>
              <h2 className="text-3xl font-serif font-black tracking-tight uppercase">Archive</h2>
            </div>
            <span className="text-[10px] font-black tracking-[0.3em] text-foreground/40 uppercase">Constructed Exhibits</span>
          </div>
          <Gallery refreshKey={refreshKey} />
        </section>
      </div>
    </div>
  );
}
