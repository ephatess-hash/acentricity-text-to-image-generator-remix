import React, { useEffect, useState } from 'react';
import { blink } from '../../lib/blink';
import { supabase } from '../../lib/supabase';
import { useAuth } from '../../hooks/use-auth';
import { Card } from '../ui/card';
import { Button } from '../ui/button';
import { Download, Trash2, Loader2, ImageIcon } from 'lucide-react';
import { toast } from 'react-hot-toast';

interface GeneratedImage {
  id: string;
  prompt: string;
  imageUrl: string;
  createdAt: string;
  user_id?: string;
  image_url?: string; // For Supabase compatibility
}

export function Gallery({ refreshKey }: { refreshKey: number }) {
  const { user } = useAuth();
  const [images, setImages] = useState<GeneratedImage[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchImages = async () => {
    if (!user) return;
    try {
      // Fetch from Supabase
      const { data: supabaseData, error: supabaseError } = await supabase
        .from('generated_images')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      if (supabaseError) {
        console.error('Supabase fetch failed:', supabaseError);
      }

      // Fetch from Blink DB (Legacy/Backup)
      const blinkData = await blink.db.generatedImages.list<GeneratedImage>({
        where: { userId: user.id },
        orderBy: { createdAt: 'desc' },
      });

      // Normalize and Merge
      const normalizedSupabase = (supabaseData || []).map(img => ({
        id: img.id,
        prompt: img.prompt,
        imageUrl: img.image_url || img.imageUrl,
        createdAt: img.created_at || img.createdAt,
      }));

      const normalizedBlink = (blinkData || []).map(img => ({
        id: img.id,
        prompt: img.prompt,
        imageUrl: img.imageUrl,
        createdAt: img.createdAt,
      }));

      // Deduplicate by ID if needed (though IDs should be unique)
      const combined = [...normalizedSupabase, ...normalizedBlink].sort((a, b) => 
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      );

      setImages(combined);
    } catch (error) {
      console.error('Failed to fetch images:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchImages();
  }, [user, refreshKey]);

  const handleDelete = async (id: string) => {
    try {
      // Try deleting from Supabase
      await supabase.from('generated_images').delete().eq('id', id);
      
      // Try deleting from Blink DB
      try {
        await blink.db.generatedImages.delete(id);
      } catch (e) {
        // Ignore if not in Blink DB
      }

      setImages(images.filter((img) => img.id !== id));
      toast.success('Image deleted');
    } catch (error) {
      toast.error('Failed to delete image');
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center py-20">
        <Loader2 className="animate-spin text-primary" size={40} />
      </div>
    );
  }

  if (images.length === 0) {
    return (
      <div className="text-center py-20 space-y-4 animate-in fade-in duration-1000">
        <div className="bg-secondary w-16 h-16 rounded-full flex items-center justify-center mx-auto text-secondary-foreground">
          <ImageIcon size={32} />
        </div>
        <div>
          <h3 className="text-xl font-serif font-semibold text-foreground">No images yet</h3>
          <p className="text-muted-foreground">Generated images will appear here</p>
        </div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 animate-in fade-in duration-1000">
      {images.map((image) => (
        <Card key={image.id} className="group overflow-hidden rounded-none border border-foreground/10 shadow-lg bg-background aspect-square relative">
          <img 
            src={image.imageUrl} 
            alt={image.prompt} 
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-end p-6">
            <p className="text-white text-xs font-medium mb-4 line-clamp-2 leading-relaxed opacity-80 italic">"{image.prompt}"</p>
            <div className="flex gap-2">
              <Button variant="secondary" size="icon" className="h-10 w-10 rounded-full bg-white/10 backdrop-blur-md border-white/20 text-white hover:bg-white/30 transition-all hover:scale-110" asChild>
                <a href={image.imageUrl} download target="_blank" rel="noopener noreferrer">
                  <Download size={16} />
                </a>
              </Button>
              <Button 
                variant="destructive" 
                size="icon" 
                className="h-10 w-10 rounded-full bg-destructive/20 backdrop-blur-md border-destructive/20 text-destructive hover:bg-destructive/40 transition-all hover:scale-110"
                onClick={() => handleDelete(image.id)}
              >
                <Trash2 size={16} />
              </Button>
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
}
