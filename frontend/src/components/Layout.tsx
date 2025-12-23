import { ReactNode } from 'react';
import { Navbar } from './Navbar';

interface LayoutProps {
  children: ReactNode;
}

export const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="min-h-screen bg-background">
      {/* Subtle background pattern */}
      <div className="fixed inset-0 pattern-dots opacity-50 pointer-events-none" />
      
      {/* Gradient orbs */}
      <div className="fixed top-0 right-0 w-[600px] h-[600px] bg-gradient-radial from-primary/5 via-transparent to-transparent pointer-events-none" />
      <div className="fixed bottom-0 left-0 w-[400px] h-[400px] bg-gradient-radial from-accent/5 via-transparent to-transparent pointer-events-none" />
      
      <Navbar />
      <main className="relative pt-20">{children}</main>
    </div>
  );
};
