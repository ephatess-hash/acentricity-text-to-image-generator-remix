import React, { useState } from 'react';
import { blink } from '../../lib/blink';
import { supabase } from '../../lib/supabase';
import { useAuth } from '../../hooks/use-auth';
import { Button } from '../ui/button';
import { Textarea } from '../ui/textarea';
import { Card } from '../ui/card';
import { Sparkles, Loader2, Download, Image as ImageIcon } from 'lucide-react';
import { toast } from 'react-hot-toast';

export function ImageGenerator({ onImageGenerated }: { onImageGenerated: () => void }) {
  const { user } = useAuth();
  const [prompt, setPrompt] = useState('');
  const [generating, setGenerating] = useState(false);
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);

  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!prompt.trim()) return;

    if (!user) {
      toast.error('Please login to generate images');
      blink.auth.login();
      return;
    }

    setGenerating(true);
    try {
      const { data } = await blink.ai.generateImage({
        prompt,
        model: 'fal-ai/nano-banana-pro',
        size: '1024x1024',
      });

      const imageUrl = data[0].url;
      setGeneratedImage(imageUrl);

      // Save to Supabase
      try {
        const { error } = await supabase
          .from('generated_images')
          .insert({
            id: crypto.randomUUID(),
            user_id: user.id,
            prompt: prompt.trim(),
            image_url: imageUrl,
          });

        if (error) throw error;
        
        toast.success('Image generated and saved to Supabase!');
        setPrompt(''); // Clear prompt on success
        onImageGenerated();
      } catch (dbError) {
        console.error('Supabase save failed:', dbError);
        // Fallback to Blink DB if Supabase fails
        try {
          await blink.db.generatedImages.create({
            id: crypto.randomUUID(),
            userId: user.id,
            prompt: prompt.trim(),
            imageUrl,
          });
          toast.success('Image generated and saved to Gallery!');
          onImageGenerated();
        } catch (blinkDbError) {
          console.error('Blink DB save failed:', blinkDbError);
          toast.error('Image generated but failed to save.');
        }
      }
    } catch (error: any) {
      console.error('Generation failed:', error);
      const errorMessage = error?.message || 'Failed to generate image. Please try again.';
      toast.error(errorMessage);
    } finally {
      setGenerating(false);
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 w-full max-w-6xl mx-auto items-stretch">
      {/* Left: Input Section */}
      <Card className="p-0 rounded-none bg-background/40 backdrop-blur-xl border border-foreground/10 shadow-[20px_20px_0px_rgba(0,0,0,0.03)] overflow-hidden flex flex-col h-full">
        <form onSubmit={handleGenerate} className="flex flex-col h-full">
          <div className="flex-1 flex flex-col min-h-[400px]">
            <div className="p-4 border-b border-foreground/5 bg-foreground/[0.02]">
              <span className="text-[10px] font-black tracking-[0.3em] text-foreground/40 uppercase">Manifesto Prompt</span>
            </div>
            <Textarea
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="Describe your vision here... (e.g., A floating glass sanctuary in a nebula of purple gas, hyper-realistic, 8k)"
              className="flex-1 bg-transparent border-none focus-visible:ring-0 text-lg p-8 rounded-none font-medium resize-none placeholder:text-foreground/20 leading-relaxed"
              disabled={generating}
            />
          </div>
          <div className="p-4 bg-foreground/[0.02] border-t border-foreground/5">
            <Button 
              type="submit" 
              disabled={generating || !prompt.trim()} 
              className="rounded-none w-full py-6 px-8 gap-3 font-black tracking-[0.2em] uppercase transition-all hover:gap-5"
            >
              {generating ? (
                <>
                  <Loader2 className="animate-spin" size={20} />
                  Constructing...
                </>
              ) : (
                <>
                  <Sparkles size={20} />
                  Construct Visual
                </>
              )}
            </Button>
          </div>
        </form>
      </Card>

      {/* Right: Output Section */}
      <div className="flex flex-col h-full">
        {generatedImage ? (
          <div className="animate-in fade-in zoom-in-95 duration-700 h-full">
            <Card className="overflow-hidden rounded-none border border-foreground/10 shadow-2xl bg-black/5 aspect-square relative group h-full">
              <img 
                src={generatedImage} 
                alt={prompt} 
                className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end p-8">
                <div className="flex w-full items-center justify-between gap-4">
                  <p className="text-white text-sm font-medium line-clamp-2 flex-1 leading-snug">{prompt}</p>
                  <Button variant="secondary" size="icon" className="rounded-full bg-white/10 backdrop-blur-md border-white/20 text-white hover:bg-white/30 h-12 w-12 shrink-0 transition-all hover:scale-110" asChild>
                    <a href={generatedImage} download target="_blank" rel="noopener noreferrer">
                      <Download size={22} />
                    </a>
                  </Button>
                </div>
              </div>
            </Card>
          </div>
        ) : (
          <Card className="aspect-square flex flex-col items-center justify-center text-muted-foreground bg-foreground/[0.02] rounded-none border border-dashed border-foreground/10 h-full group relative overflow-hidden">
            <div className="absolute inset-0 bg-grid-slate-900/[0.02] [mask-image:linear-gradient(0deg,white,rgba(255,255,255,0.6))] -z-10" />
            <div className="flex flex-col items-center gap-4 transition-all group-hover:scale-110 duration-500">
              <div className="w-16 h-16 rounded-full bg-foreground/[0.03] flex items-center justify-center border border-foreground/5">
                <ImageIcon size={32} className="opacity-20" />
              </div>
              <div className="text-center">
                <p className="text-xs font-black tracking-[0.2em] uppercase opacity-30">Projection Chamber</p>
                <p className="text-[10px] opacity-20 mt-1">Ready for construction</p>
              </div>
            </div>
          </Card>
        )}
      </div>
    </div>
  );
}
