import { Link, useLocation } from 'react-router-dom';
import { Database, BarChart3, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

export const Navbar = () => {
  const location = useLocation();

  const navItems = [
    { path: '/', label: 'Home', icon: Sparkles },
    { path: '/analyze', label: 'Analyze', icon: BarChart3 },
  ];

  return (
    <motion.nav
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-xl border-b border-border"
    >
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center gap-3 group">
            <div className="relative">
              <div className="w-10 h-10 rounded-xl gradient-bg flex items-center justify-center shadow-medium group-hover:shadow-glow transition-shadow duration-300">
                <Database className="w-5 h-5 text-primary-foreground" />
              </div>
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-display font-bold text-foreground">SQLTalk</span>
              <span className="text-[10px] uppercase tracking-widest text-muted-foreground -mt-1">AI Analytics</span>
            </div>
          </Link>

          <div className="flex items-center gap-1 p-1 rounded-xl bg-secondary/50">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;
              
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={cn(
                    'flex items-center gap-2 px-5 py-2.5 rounded-lg font-medium transition-all duration-300',
                    isActive
                      ? 'bg-card text-foreground shadow-soft'
                      : 'text-muted-foreground hover:text-foreground'
                  )}
                >
                  <Icon className="w-4 h-4" />
                  {item.label}
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </motion.nav>
  );
};
