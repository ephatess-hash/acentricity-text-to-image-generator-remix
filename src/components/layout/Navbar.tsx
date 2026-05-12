import React from 'react';
import { useAuth } from '../../hooks/use-auth';
import { Button } from '../ui/button';
import { ShinyButton } from '../ui/shiny-button';
import { Logo } from '../ui/logo';
import { LogOut, User } from 'lucide-react';

export function Navbar() {
  const { user, logout, login, isAuthenticated } = useAuth();

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b border-foreground/5 bg-background/80 backdrop-blur-xl">
      <div className="container mx-auto px-4 h-24 flex items-center justify-between">
        <Logo />

        <div className="flex items-center gap-6">
          {isAuthenticated ? (
            <>
              <div className="flex items-center gap-2 text-sm font-bold text-muted-foreground mr-4 hidden sm:flex uppercase tracking-widest">
                <User size={16} className="text-primary" />
                <span>{user?.email?.split('@')[0]}</span>
              </div>
              <Button variant="outline" size="sm" onClick={logout} className="gap-2 rounded-none border-foreground/10 font-bold uppercase tracking-wider h-11 px-6">
                <LogOut size={16} />
                <span className="hidden sm:inline">Logout</span>
              </Button>
            </>
          ) : (
            <ShinyButton onClick={login} className="px-8 h-12 text-sm font-black rounded-none bg-foreground text-background">
              Sign In
            </ShinyButton>
          )}
        </div>
      </div>
    </nav>
  );
}
