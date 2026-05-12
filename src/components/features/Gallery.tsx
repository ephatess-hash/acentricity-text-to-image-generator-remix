import React, { useEffect, useState } from 'react';
import { blink } from '../../lib/blink';
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
}

export function Gallery({ refreshKey }: { refreshKey: number }) {
  const { user } = useAuth();
  const [images, setImages] = useState<GeneratedImage[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchImages = async () => {
    if (!user) return;
    try {
      const data = await blink.db.generatedImages.list<GeneratedImage>({
        where: { userId: user.id },
        orderBy: { createdAt: 'desc' },
      });
      setImages(data);
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
      await blink.db.generatedImages.delete(id);
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
          <h3 className="text-xl font-serif font-semibold">No images yet</h3>
          <p className="text-muted-foreground">Generated images will appear here</p>
        </div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 animate-in fade-in duration-1000">
      {images.map((image) => (
        <Card key={image.id} className="group overflow-hidden rounded-2xl border-none shadow-md bg-white aspect-square relative">
          <img 
            src={image.imageUrl} 
            alt={image.prompt} 
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
            <p className="text-white text-xs font-medium mb-3 line-clamp-2">{image.prompt}</p>
            <div className="flex gap-2">
              <Button variant="secondary" size="icon" className="h-8 w-8 rounded-full bg-white/20 backdrop-blur-md border-white/20 text-white hover:bg-white/40" asChild>
                <a href={image.imageUrl} download target="_blank" rel="noopener noreferrer">
                  <Download size={14} />
                </a>
              </Button>
              <Button 
                variant="destructive" 
                size="icon" 
                className="h-8 w-8 rounded-full bg-destructive/20 backdrop-blur-md border-destructive/20 text-destructive hover:bg-destructive/40"
                onClick={() => handleDelete(image.id)}
              >
                <Trash2 size={14} />
              </Button>
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
}
