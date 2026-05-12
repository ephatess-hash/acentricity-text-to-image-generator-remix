import React from 'react';
import { cn } from '../../lib/utils';
import { Aperture } from 'lucide-react';

interface LogoProps {
  className?: string;
  iconOnly?: boolean;
}

export function Logo({ className, iconOnly = false }: LogoProps) {
  return (
    <div className={cn("flex items-center gap-4 group", className)}>
      <div className="relative w-12 h-12 flex items-center justify-center">
        {/* Main Icon Container */}
        <div className="relative z-10 w-8 h-8 flex items-center justify-center bg-primary text-primary-foreground shadow-2xl transition-all duration-500 group-hover:bg-accent group-hover:shadow-accent/40">
          <Aperture size={18} className="animate-spin-slow" />
        </div>
      </div>

      {!iconOnly && (
        <div className="flex flex-col -space-y-1">
          <span className="font-serif text-2xl font-black tracking-tighter uppercase text-primary leading-none group-hover:text-accent transition-colors duration-500">
            Acentricity
          </span>
          <span className="text-[8px] font-black uppercase tracking-[0.6em] text-muted-foreground/60 pl-0.5">
            Creative Studio
          </span>
        </div>
      )}
    </div>
  );
}
