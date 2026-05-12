import React, { useState } from 'react';
import { blink } from '../../lib/blink';
import { useAuth } from '../../hooks/use-auth';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Card } from '../ui/card';
import { Sparkles, Loader2, Download } from 'lucide-react';
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

      // Save to database with error handling for DB part specifically
      try {
        await blink.db.generatedImages.create({
          id: crypto.randomUUID(),
          userId: user.id,
          prompt: prompt.trim(),
          imageUrl,
        });
        toast.success('Image generated and saved!');
        setPrompt(''); // Clear prompt on success
        onImageGenerated();
      } catch (dbError) {
        console.error('Database save failed:', dbError);
        toast.error('Image generated but failed to save to gallery.');
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
    <div className="space-y-8 w-full max-w-4xl mx-auto">
      <Card className="p-1.5 rounded-none bg-background/40 backdrop-blur-xl border border-foreground/10 shadow-[20px_20px_0px_rgba(0,0,0,0.03)] overflow-hidden">
        <form onSubmit={handleGenerate} className="flex flex-col sm:flex-row gap-2">
          <Input
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="A futuristic city with floating gardens at sunset..."
            className="flex-1 bg-transparent border-none focus-visible:ring-0 text-lg py-6 px-4 rounded-none font-medium"
            disabled={generating}
          />
          <Button 
            type="submit" 
            disabled={generating || !prompt.trim()} 
            className="rounded-none h-auto py-3 px-8 gap-2 font-black tracking-widest uppercase"
          >
            {generating ? (
              <>
                <Loader2 className="animate-spin" size={20} />
                Generating...
              </>
            ) : (
              <>
                <Sparkles size={20} />
                Generate
              </>
            )}
          </Button>
        </form>
      </Card>

      {generatedImage && (
        <div className="animate-in fade-in slide-in-from-bottom-4 duration-700">
          <Card className="overflow-hidden rounded-3xl border-none shadow-2xl bg-black/5 aspect-square relative group">
            <img 
              src={generatedImage} 
              alt={prompt} 
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
              <div className="flex w-full items-center justify-between">
                <p className="text-white text-sm font-medium line-clamp-1 max-w-[70%]">{prompt}</p>
                <div className="flex gap-2">
                  <Button variant="secondary" size="icon" className="rounded-full bg-white/20 backdrop-blur-md border-white/20 text-white hover:bg-white/40" asChild>
                    <a href={generatedImage} download target="_blank" rel="noopener noreferrer">
                      <Download size={18} />
                    </a>
                  </Button>
                </div>
              </div>
            </div>
          </Card>
        </div>
      )}
    </div>
  );
}
