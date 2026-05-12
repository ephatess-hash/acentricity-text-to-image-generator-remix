import React, { useEffect, useRef, useLayoutEffect } from 'react';
import { useAuth } from '../hooks/use-auth';
import { Button } from '../components/ui/button';
import { GridPattern } from '../components/ui/grid-pattern';
import { Marquee } from '../components/ui/marquee';
import { ShinyButton } from '../components/ui/shiny-button';
import { 
  Sparkles, 
  Zap, 
  Shield, 
  ArrowRight, 
  Layers, 
  Palette, 
  Globe, 
  Cpu, 
  History,
  CheckCircle2,
  Clock,
  Wand2,
  Monitor
} from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { TextPlugin } from 'gsap/TextPlugin';

gsap.registerPlugin(ScrollTrigger, TextPlugin);

export function LandingPage() {
  const { login } = useAuth();
  const containerRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // Global GSAP Settings for scroll interactions
      const revealElements = gsap.utils.toArray('.gsap-reveal');
      revealElements.forEach((el: any) => {
        gsap.fromTo(el, 
          { 
            opacity: 0, 
            y: 40 
          }, 
          {
            opacity: 1, 
            y: 0,
            duration: 1.2,
            ease: "power3.out",
            scrollTrigger: {
              trigger: el,
              start: "top 85%",
              toggleActions: "play none none none"
            }
          }
        );
      });

      // Typing Animation
      gsap.to(".typing-animation-text", {
        duration: 3,
        text: "A masterfully composed oil painting of a forgotten cathedral, dramatic chiaroscuro, high-contrast textures, editorial museum lighting...",
        ease: "none",
        scrollTrigger: {
          trigger: ".typing-animation-text",
          start: "top 80%",
          toggleActions: "play none none none"
        }
      });

      // Parallax Effects
      const parallaxImages = gsap.utils.toArray('.parallax-image');
      parallaxImages.forEach((img: any) => {
        gsap.to(img, {
          yPercent: 15,
          ease: "none",
          scrollTrigger: {
            trigger: img,
            start: "top bottom",
            end: "bottom top",
            scrub: true
          }
        });
      });

      // Timeline line drawing
      gsap.fromTo(".timeline-line", 
        { scaleX: 0 }, 
        { 
          scaleX: 1, 
          ease: "none",
          scrollTrigger: {
            trigger: ".timeline-section",
            start: "top center",
            end: "bottom center",
            scrub: true
          }
        }
      );

      // Gallery Staggered Reveal
      gsap.fromTo(".gallery-item", 
        { 
          opacity: 0, 
          y: 60,
          scale: 0.9,
          filter: "blur(10px)"
        }, 
        { 
          opacity: 1, 
          y: 0,
          scale: 1,
          filter: "blur(0px)",
          duration: 1.5,
          stagger: 0.15,
          ease: "expo.out",
          scrollTrigger: {
            trigger: ".gallery-grid",
            start: "top 80%",
          }
        }
      );

      // Mouse tracking for gallery items
      const galleryItems = gsap.utils.toArray('.gallery-item-inner');
      galleryItems.forEach((item: any) => {
        const img = item.querySelector('img');
        const overlay = item.querySelector('.gallery-overlay');
        
        item.addEventListener('mousemove', (e: MouseEvent) => {
          const rect = item.getBoundingClientRect();
          const x = e.clientX - rect.left;
          const y = e.clientY - rect.top;
          
          const xPercent = (x / rect.width - 0.5) * 20;
          const yPercent = (y / rect.height - 0.5) * 20;
          
          gsap.to(img, {
            x: xPercent,
            y: yPercent,
            duration: 0.6,
            ease: "power2.out"
          });
          
          if (overlay) {
            gsap.to(overlay, {
              background: `radial-gradient(circle at ${x}px ${y}px, rgba(122,30,44,0.3) 0%, transparent 70%)`,
              duration: 0.3
            });
          }
        });
        
        item.addEventListener('mouseleave', () => {
          gsap.to(img, {
            x: 0,
            y: 0,
            duration: 1,
            ease: "elastic.out(1, 0.3)"
          });
          
          if (overlay) {
            gsap.to(overlay, {
              background: "rgba(0,0,0,0.6)",
              duration: 0.5
            });
          }
        });
      });

      // Stats Count-up
      const stats = gsap.utils.toArray('.stat-number');
      stats.forEach((stat: any) => {
        const value = parseInt(stat.innerText);
        gsap.fromTo(stat, 
          { innerText: 0 }, 
          { 
            innerText: value, 
            duration: 2, 
            snap: { innerText: 1 },
            scrollTrigger: {
              trigger: stat,
              start: "top 90%",
            }
          }
        );
      });

      // Section 1 Specifics
      gsap.fromTo(".prompt-ui-slide", 
        { x: -100, opacity: 0 }, 
        { 
          x: 0, opacity: 1, 
          duration: 1.5, 
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".prompt-ui-slide",
            start: "top 80%"
          }
        }
      );

      gsap.fromTo(".image-preview-slide", 
        { x: 100, opacity: 0 }, 
        { 
          x: 0, opacity: 1, 
          duration: 1.5, 
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".image-preview-slide",
            start: "top 80%"
          }
        }
      );

      // Section 4 RotateY depth reveal
      const capabilityCards = gsap.utils.toArray('.capability-card');
      capabilityCards.forEach((card: any, i: number) => {
        gsap.fromTo(card, 
          { rotateY: 15, opacity: 0, y: 40 }, 
          { 
            rotateY: 0, opacity: 1, y: 0,
            duration: 1.2,
            delay: i * 0.1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: card,
              start: "top 85%"
            }
          }
        );
      });

      // Section 8 Background gradient shift
      gsap.to(".cta-bg-gradient", {
        backgroundPosition: "200% center",
        duration: 20,
        repeat: -1,
        ease: "none"
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="min-h-screen relative overflow-hidden bg-background selection:bg-primary selection:text-primary-foreground">
      {/* Texture Layers */}
      <div className="paper-grain" />
      <div className="animated-noise" />
      <div className="gallery-vignette" />
      
      {/* Geometric Art Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Diagonal Blueprint Grid - Subtle in hero, stronger elsewhere */}
        <div className="blueprint-grid opacity-[0.2]" />
      </div>

      <GridPattern
        width={80}
        height={80}
        x={-1}
        y={-1}
        strokeDasharray="0"
        className="opacity-[0.01] [mask-image:radial-gradient(1200px_circle_at_center,white,transparent)]"
      />
      
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center pt-20 overflow-hidden bg-gradient-to-b from-[hsl(var(--gallery-wall-1))] via-[hsl(var(--gallery-wall-2))] to-[hsl(var(--gallery-wall-3))]">
        {/* Realistic Gallery Layers */}
        <div className="gallery-wall-texture" />
        <div className="gallery-atmosphere-haze animate-cinematic-drift" />
        
        {/* Atmospheric Layers */}
        <div className="hero-atmosphere-layer opacity-20" />
        <div className="hero-atmospheric-gradient opacity-20" />
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-24">
            {/* Left Zone: Content */}
            <div className="flex-1 text-left space-y-10 order-2 lg:order-1 relative">
              {/* Text Light Integration */}
              <div className="text-light-highlight" />
              
              <div className="inline-flex items-center gap-4 px-4 py-2 border border-primary/10 bg-white/40 backdrop-blur-md text-primary/60 text-[10px] uppercase tracking-[0.4em] font-black animate-in fade-in slide-in-from-left-6 duration-1000">
                <span className="w-1.5 h-1.5 bg-accent rounded-full animate-pulse" />
                <span>Creative Studio Tool</span>
              </div>

              <div className="space-y-6">
                <h1 className="text-6xl lg:text-8xl font-serif font-black tracking-[-0.04em] text-foreground leading-[0.9] animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-100">
                  Aesthetic, <br />
                  <span className="text-gradient-constructed italic pr-2">
                    Refined.
                  </span>
                </h1>
                
                <p className="text-xl lg:text-2xl text-muted-foreground max-w-xl font-medium leading-relaxed tracking-tight animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-200">
                  The editorial canvas for your digital manifestation. Transform abstract thought into gallery-ready cinematic visuals with surgical precision.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row items-center gap-8 pt-4 animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-300">
                <button 
                  onClick={login}
                  className="group relative px-10 py-5 bg-[#1A1A1A] text-white text-sm font-black tracking-[0.2em] uppercase overflow-hidden hover:scale-[1.02] transition-all duration-500 shadow-2xl"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-accent/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <div className="absolute inset-0 border border-white/10 group-hover:border-accent/30 transition-colors duration-500" />
                  <span className="relative z-10 flex items-center gap-4">
                    Open Studio
                    <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1.5" />
                  </span>
                  {/* Soft glow */}
                  <div className="absolute -inset-1 bg-accent/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10" />
                </button>
                
                <button className="relative py-2 text-sm font-black tracking-[0.2em] uppercase text-foreground/80 hover:text-foreground transition-colors group">
                  <span>View Exhibition</span>
                  <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-accent transition-all duration-500 group-hover:w-full" />
                </button>
              </div>
            </div>

            {/* Right Zone: Living Canvas Frame */}
            <div className="flex-[0.85] lg:flex-[1.2] w-full max-w-[500px] lg:max-w-none order-1 lg:order-2 animate-in fade-in slide-in-from-right-12 duration-1000 delay-200 relative">
              {/* Primary Gallery Lighting - Behind Frame */}
              <div className="gallery-museum-spotlight" />
              
              <div className="relative aspect-square canvas-frame overflow-hidden bg-white group shadow-[0_50px_100px_-20px_rgba(0,0,0,0.3)] will-change-transform translate-z-0 z-10">
                {/* Artwork Container */}
                <div className="absolute inset-0 overflow-hidden">
                  <img 
                    src="https://images.unsplash.com/photo-1762718900538-70bb27cadde8?w=1200&q=90" 
                    alt="Generative AI Artwork" 
                    className="w-full h-full object-cover animate-slow-zoom grayscale-[0.2] group-hover:grayscale-0 transition-all duration-1000 parallax-image"
                  />
                  
                  {/* Light Sweep Effect */}
                  <div className="absolute inset-0 z-10 pointer-events-none">
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent w-1/2 h-full -skew-x-[25deg] -translate-x-full animate-light-sweep" />
                  </div>

                  {/* Artwork Overlay / Depth */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-60 pointer-events-none" />
                </div>

                {/* Frame Details */}
                <div className="absolute inset-0 border-[20px] border-white/10 pointer-events-none z-20" />
                <div className="absolute bottom-6 right-6 px-4 py-2 bg-white/90 backdrop-blur-sm text-[8px] font-black uppercase tracking-[0.3em] text-foreground/40 z-30">
                  Acentricity Studio / ver. 1.0
                </div>
              </div>

              {/* Decorative elements behind frame */}
              <div className="absolute -top-12 -right-12 w-48 h-48 border border-primary/5 -z-10 animate-rotate-slow" />
              <div className="absolute -bottom-8 -left-8 w-32 h-32 bg-accent/5 blur-3xl -z-10 animate-pulse" />
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 1: Interactive Prompt Generator */}
      <section className="py-32 relative z-10 overflow-hidden bg-white/30 backdrop-blur-sm border-y border-foreground/5">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-24">
            <div className="flex-1 space-y-12 prompt-ui-slide">
              <div className="space-y-6">
                <h2 className="text-4xl lg:text-6xl font-serif font-black tracking-tight leading-tight">
                  From Abstract Idea <br />
                  <span className="text-accent italic">to Visual Reality.</span>
                </h2>
                <p className="text-lg text-muted-foreground max-w-xl font-medium leading-relaxed">
                  Our interactive studio interface allows you to sculpt your vision with natural language. Experience the fluid transition from word to masterpiece.
                </p>
              </div>

              <div className="p-8 bg-white border border-primary/5 shadow-2xl space-y-6 max-w-lg relative group">
                <div className="flex items-center gap-3 text-[10px] font-black uppercase tracking-[0.2em] text-primary/40 mb-2">
                  <div className="w-2 h-2 bg-accent rounded-full" />
                  Prompt Engineering Console
                </div>
                <div className="h-24 bg-secondary/30 p-4 font-mono text-sm text-primary/70 relative overflow-hidden">
                  <div className="typing-animation-text"></div>
                  <span className="inline-block w-1.5 h-4 bg-accent ml-1 animate-pulse" />
                </div>
                <div className="flex justify-between items-center">
                  <div className="flex gap-2">
                    <div className="w-8 h-8 bg-secondary/50" />
                    <div className="w-8 h-8 bg-secondary/50" />
                    <div className="w-8 h-8 bg-secondary/50" />
                  </div>
                  <Button variant="outline" className="text-[10px] uppercase font-black tracking-widest px-8">
                    Generate
                  </Button>
                </div>
              </div>
            </div>

            <div className="flex-1 w-full max-w-2xl image-preview-slide">
              <div className="relative aspect-video canvas-frame overflow-hidden bg-[#1A1A1A] group">
                <img 
                  src="https://images.unsplash.com/photo-1614728263952-84ea256f9679?w=1200&q=90" 
                  alt="AI Generation Result" 
                  className="w-full h-full object-cover grayscale opacity-40 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-1000 parallax-image"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent pointer-events-none" />
                <div className="absolute top-4 left-4 flex gap-2">
                  <span className="px-2 py-1 bg-white/10 backdrop-blur-md text-[8px] text-white font-black uppercase tracking-widest">Constructing...</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 2: Style Explorer Grid */}
      <section className="py-32 relative z-10">
        <div className="container mx-auto px-4">
          <div className="mb-20 space-y-6 text-center lg:text-left gsap-reveal">
            <h2 className="text-4xl lg:text-6xl font-serif font-black tracking-tight">Diverse Visual <span className="italic">Dialects.</span></h2>
            <p className="text-lg text-muted-foreground max-w-2xl font-medium leading-relaxed">
              Explore a curated spectrum of artistic directions, from hyper-realism to avant-garde abstraction.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <StyleCard 
              image="https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?w=800&q=80"
              title="Cinematic"
              tag="Dramatic Lighting"
            />
            <StyleCard 
              image="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&q=80"
              title="Minimalist"
              tag="Negative Space"
            />
            <StyleCard 
              image="https://images.unsplash.com/photo-1634017839464-5c339ebe3cb4?w=800&q=80"
              title="Surrealist"
              tag="Dream Logic"
            />
            <StyleCard 
              image="https://images.unsplash.com/photo-1684643060433-cc0ea912deab?w=800&q=80"
              title="Architectural"
              tag="Structural Integrity"
            />
          </div>
        </div>
      </section>

      {/* SECTION 3: Creative Workflow Timeline */}
      <section className="py-32 bg-primary text-primary-foreground relative z-10 timeline-section overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-5 pointer-events-none" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="flex flex-col lg:flex-row items-end justify-between gap-8 mb-24 gsap-reveal">
            <h2 className="text-4xl lg:text-6xl font-serif font-black tracking-tight leading-tight">
              The Path of <br />
              <span className="text-accent italic">Construction.</span>
            </h2>
            <div className="h-px hidden lg:block flex-1 mx-12 bg-accent/20 mb-6 timeline-line origin-left" />
            <p className="text-accent/60 max-w-sm font-medium leading-relaxed tracking-tight">
              A streamlined trajectory from initial thought to high-fidelity manifestation.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-16">
            <TimelineStep 
              number="01"
              icon={<Sparkles className="w-6 h-6" />}
              title="Concept"
              description="Input your abstract vision using our precision-tuned language model."
            />
            <TimelineStep 
              number="02"
              icon={<Zap className="w-6 h-6" />}
              title="Synthesis"
              description="Acentricity algorithms interpret and construct visual hierarchies in real-time."
            />
            <TimelineStep 
              number="03"
              icon={<Monitor className="w-6 h-6" />}
              title="Manifest"
              description="Download your gallery-ready masterpiece in ultra-high resolution."
            />
          </div>
        </div>
      </section>

      {/* SECTION 4: Advanced Capabilities */}
      <section className="py-32 relative z-10">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <CapabilityCard 
              className="capability-card"
              icon={<Layers className="w-8 h-8 text-accent" />}
              title="Multi-Layer Depth"
              description="Intricate foreground-to-background spatial consistency in every generation."
            />
            <CapabilityCard 
              className="capability-card"
              icon={<Palette className="w-8 h-8 text-accent" />}
              title="Precision Grading"
              description="Advanced color theory applications for mood and narrative consistency."
            />
            <CapabilityCard 
              className="capability-card"
              icon={<Globe className="w-8 h-8 text-accent" />}
              title="Global Training"
              description="Models trained on a diverse repository of human artistic achievement."
            />
            <CapabilityCard 
              className="capability-card"
              icon={<Cpu className="w-8 h-8 text-accent" />}
              title="Neural Speed"
              description="Optimized GPU clusters ensure sub-second rendering for fluid iteration."
            />
            <CapabilityCard 
              className="capability-card"
              icon={<History className="w-8 h-8 text-accent" />}
              title="Studio History"
              description="Every creative decision preserved in your non-destructive project library."
            />
            <CapabilityCard 
              className="capability-card"
              icon={<Shield className="w-8 h-8 text-accent" />}
              title="Enterprise Grade"
              description="Commercial rights and secure storage for professional studio workflows."
            />
          </div>
        </div>
      </section>

      {/* SECTION 5: Live Gallery Masonry */}
      <section className="py-32 relative z-10 bg-[#1A1A1A] text-white overflow-hidden">
        <div className="container mx-auto px-4 mb-24 gsap-reveal text-center space-y-4">
          <div className="inline-block px-3 py-1 bg-accent/10 border border-accent/20 text-accent text-[8px] font-black uppercase tracking-[0.4em] mb-4">
            Curated Exhibition
          </div>
          <h2 className="text-5xl lg:text-8xl font-serif font-black tracking-tight leading-none">
            Recent <br />
            <span className="italic text-accent">Discoveries.</span>
          </h2>
        </div>
        
        <div className="columns-1 md:columns-2 lg:columns-4 gap-6 px-6 max-w-[1800px] mx-auto space-y-6 gallery-grid">
          {galleryImages.map((src, i) => (
            <div 
              key={i} 
              className="gallery-item break-inside-avoid"
            >
              <div className="gallery-item-inner group overflow-hidden relative canvas-frame bg-[#222] border-white/5 cursor-crosshair">
                <img 
                  src={src} 
                  alt={`Gallery ${i}`} 
                  className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 scale-[1.15]"
                />
                <div className="gallery-overlay absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-end p-8 pointer-events-none">
                  <div className="space-y-3 translate-y-6 group-hover:translate-y-0 transition-transform duration-700 ease-expo">
                    <div className="flex items-center gap-2">
                      <span className="w-8 h-px bg-accent" />
                      <div className="text-[10px] font-black uppercase tracking-[0.3em] text-accent">Manifestation 0{i + 1}</div>
                    </div>
                    <div className="text-lg font-serif font-black italic text-white/90 leading-tight">
                      {galleryPrompts[i] || "Structural manifested geometry in void"}
                    </div>
                    <div className="pt-4 flex items-center gap-4 text-[8px] font-black uppercase tracking-[0.2em] text-white/40">
                      <span>4K / Studio</span>
                      <span>•</span>
                      <span>Seed: {Math.floor(Math.random() * 999999)}</span>
                    </div>
                  </div>
                </div>
                
                {/* Corner Accents */}
                <div className="absolute top-0 right-0 w-8 h-8 border-t border-r border-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="absolute bottom-0 left-0 w-8 h-8 border-b border-l border-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* SECTION 6: Platform Metrics */}
      <section className="py-48 relative z-10 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-24 text-center">
            <div className="gsap-reveal space-y-4">
              <div className="text-7xl lg:text-8xl font-serif font-black tracking-tighter stat-number">500000</div>
              <div className="text-xs font-black uppercase tracking-[0.4em] text-muted-foreground">Images Constructed</div>
            </div>
            <div className="gsap-reveal space-y-4">
              <div className="text-7xl lg:text-8xl font-serif font-black tracking-tighter stat-number">98</div>
              <div className="text-xs font-black uppercase tracking-[0.4em] text-muted-foreground">Studio Precision %</div>
            </div>
            <div className="gsap-reveal space-y-4">
              <div className="text-7xl lg:text-8xl font-serif font-black tracking-tighter stat-number">1200</div>
              <div className="text-xs font-black uppercase tracking-[0.4em] text-muted-foreground">Creative Partners</div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 7: Pricing Plans */}
      <section className="py-32 relative z-10 bg-secondary/30">
        <div className="container mx-auto px-4">
          <div className="max-w-xl mx-auto text-center mb-24 gsap-reveal space-y-6">
            <h2 className="text-4xl lg:text-6xl font-serif font-black tracking-tight">Studio <span className="italic">Access.</span></h2>
            <p className="text-muted-foreground font-medium">Choose the tier that aligns with your creative output.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center max-w-6xl mx-auto">
            <PricingCard 
              title="Individual"
              price="0"
              features={["10 Generations / month", "Standard Quality", "Community Access"]}
            />
            <PricingCard 
              title="Studio Pro"
              price="29"
              featured
              features={["Unlimited Generations", "Ultra HD Manifestation", "Private Gallery", "Priority Rendering"]}
            />
            <PricingCard 
              title="Creative Agency"
              price="99"
              features={["Team Collaboration", "API Manifestation", "Custom Model Tuning", "24/7 Curator Support"]}
            />
          </div>
        </div>
      </section>

      {/* SECTION 8: Cinematic Final CTA */}
      <section className="py-48 relative z-10 bg-[#0A0A0A] text-white overflow-hidden">
        {/* Animated Background Gradient */}
        <div className="absolute inset-0 cta-bg-gradient bg-[linear-gradient(135deg,rgba(122,30,44,0.1)_0%,transparent_50%,rgba(74,14,25,0.2)_100%)] bg-[length:200%_200%] pointer-events-none" />
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-10" />
        
        <div className="container mx-auto px-4 relative z-10 text-center space-y-12 gsap-reveal">
          <h2 className="text-6xl lg:text-9xl font-serif font-black tracking-tighter leading-tight">
            Ready to <br />
            <span className="text-accent italic">Manifest?</span>
          </h2>
          <p className="text-xl lg:text-2xl text-white/60 max-w-2xl mx-auto font-medium leading-relaxed italic">
            "The only limit to manifestation is the boundary of your own imagination."
          </p>
          <div className="pt-8">
            <button 
              onClick={login}
              className="group relative px-16 py-8 bg-white text-black text-sm font-black tracking-[0.3em] uppercase overflow-hidden hover:scale-105 transition-all duration-500"
            >
              <div className="absolute inset-0 bg-accent group-hover:translate-y-0 translate-y-full transition-transform duration-500" />
              <span className="relative z-10 group-hover:text-white transition-colors duration-500">Initialize Studio Access</span>
            </button>
          </div>
        </div>
      </section>

      {/* Marquee Section / Gallery Strip */}
      <section className="py-24 overflow-hidden border-y border-foreground/5 bg-[#1A1A1A] relative z-10">
        <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:40px_40px]" />
        <div className="container mx-auto px-4 mb-12">
          <div className="flex items-center gap-6">
            <h2 className="text-sm font-black uppercase tracking-[0.5em] text-white/40">Studio Discoveries</h2>
            <div className="h-px flex-1 bg-white/10" />
          </div>
        </div>
        <Marquee pauseOnHover className="[--duration:50s]">
          {sampleImages.map((src, i) => (
            <div key={i} className="group relative px-6">
              <div className="relative aspect-[3/4] w-72 overflow-hidden canvas-frame border-white/5 bg-white/5">
                <img
                  src={src}
                  alt={`Sample ${i}`}
                  className="w-full h-full object-cover grayscale opacity-60 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-1000 scale-110 group-hover:scale-100"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
              </div>
            </div>
          ))}
        </Marquee>
      </section>
    </div>
  );
}

function StyleCard({ image, title, tag }: { image: string, title: string, tag: string }) {
  return (
    <div className="gsap-reveal group relative aspect-[4/5] overflow-hidden canvas-frame bg-white shadow-lg hover:shadow-2xl transition-all duration-700 hover:scale-[1.04] will-change-transform">
      <img src={image} alt={title} className="w-full h-full object-cover grayscale opacity-80 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-1000 parallax-image" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
      <div className="absolute bottom-6 left-6 text-white translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
        <div className="text-[10px] font-black uppercase tracking-[0.3em] text-accent mb-2">{tag}</div>
        <div className="text-xl font-serif font-black italic">{title}</div>
      </div>
    </div>
  );
}

function TimelineStep({ number, icon, title, description }: { number: string, icon: React.ReactNode, title: string, description: string }) {
  return (
    <div className="gsap-reveal space-y-8 group">
      <div className="flex items-center gap-6">
        <div className="text-4xl font-serif font-black italic text-accent/40 group-hover:text-accent transition-colors duration-500">{number}</div>
        <div className="w-12 h-12 rounded-none border border-accent/20 flex items-center justify-center text-accent group-hover:bg-accent group-hover:text-primary transition-all duration-500">
          {icon}
        </div>
      </div>
      <div className="space-y-4">
        <h3 className="text-2xl font-serif font-black tracking-tight">{title}</h3>
        <p className="text-accent/60 leading-relaxed font-medium text-sm">{description}</p>
      </div>
    </div>
  );
}

function CapabilityCard({ icon, title, description, className }: { icon: React.ReactNode, title: string, description: string, className?: string }) {
  return (
    <div className={`p-12 bg-white/50 backdrop-blur-sm border border-primary/5 hover:border-accent/20 transition-all duration-700 group will-change-transform hover:-translate-y-2 ${className}`}>
      <div className="mb-8 p-4 w-fit border border-accent/10 group-hover:bg-accent/5 transition-colors duration-500">
        {icon}
      </div>
      <h3 className="text-2xl font-serif font-black mb-6 tracking-tight">{title}</h3>
      <p className="text-muted-foreground leading-relaxed font-medium text-sm">{description}</p>
    </div>
  );
}

function PricingCard({ title, price, features, featured }: { title: string, price: string, features: string[], featured?: boolean }) {
  return (
    <div className={`gsap-reveal p-12 bg-white border ${featured ? 'border-accent ring-1 ring-accent scale-105 z-10 shadow-2xl' : 'border-primary/5 shadow-xl'} flex flex-col h-full`}>
      <div className="mb-12">
        <div className="text-[10px] font-black uppercase tracking-[0.3em] text-accent mb-4">{title}</div>
        <div className="flex items-baseline gap-1">
          <span className="text-4xl font-serif font-black">$</span>
          <span className="text-7xl font-serif font-black tracking-tighter">{price}</span>
          <span className="text-muted-foreground text-xs font-black uppercase tracking-widest">/mo</span>
        </div>
      </div>
      <div className="flex-1 space-y-6 mb-12">
        {features.map((feature, i) => (
          <div key={i} className="flex items-start gap-3">
            <CheckCircle2 className="w-4 h-4 text-accent shrink-0 mt-0.5" />
            <span className="text-xs font-medium text-muted-foreground leading-relaxed">{feature}</span>
          </div>
        ))}
      </div>
      <Button 
        variant={featured ? "default" : "outline"} 
        className={`w-full h-14 rounded-none uppercase text-[10px] font-black tracking-[0.3em] ${featured ? 'bg-accent hover:bg-accent/90' : ''}`}
      >
        Select Tier
      </Button>
    </div>
  );
}

const galleryImages = [
  "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&q=80",
  "https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?w=800&q=80",
  "https://images.unsplash.com/photo-1633167606207-d840b5070fc2?w=800&q=80",
  "https://images.unsplash.com/photo-1634017839464-5c339ebe3cb4?w=800&q=80",
  "https://images.unsplash.com/photo-1684643060433-cc0ea912deab?w=800&q=80",
  "https://images.unsplash.com/photo-1677977226286-010ba526a57d?w=800&q=80",
  "https://images.unsplash.com/photo-1614728263952-84ea256f9679?w=800&q=80",
  "https://images.unsplash.com/photo-1762718900538-70bb27cadde8?w=800&q=80",
];

const galleryPrompts = [
  "Editorial portrait of a high-fashion model, grain finish, deep shadows",
  "Brutalist architecture in a vast desert landscape, 8k resolution, minimalist",
  "Fluid manifested glass forms in a deep burgundy void",
  "Renaissance style digital painting of a cosmic nebula"
];

const sampleImages = [
  "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&q=80",
  "https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?w=800&q=80",
  "https://images.unsplash.com/photo-1633167606207-d840b5070fc2?w=800&q=80",
  "https://images.unsplash.com/photo-1634017839464-5c339ebe3cb4?w=800&q=80",
  "https://images.unsplash.com/photo-1684643060433-cc0ea912deab?w=800&q=80",
  "https://images.unsplash.com/photo-1677977226286-010ba526a57d?w=800&q=80",
];