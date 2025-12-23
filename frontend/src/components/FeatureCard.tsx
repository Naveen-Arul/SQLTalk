import { motion } from 'framer-motion';
import { ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface FeatureCardProps {
  icon: ReactNode;
  title: string;
  description: string;
  delay?: number;
  className?: string;
}

export const FeatureCard = ({ icon, title, description, delay = 0, className }: FeatureCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay }}
      whileHover={{ y: -4, scale: 1.02 }}
      className={cn(
        'group relative p-6 rounded-2xl bg-card border border-border shadow-soft hover:shadow-medium transition-all duration-300',
        className
      )}
    >
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-primary/5 via-transparent to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      
      <div className="relative">
        <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-primary/10 to-accent/10 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300">
          <div className="text-primary">{icon}</div>
        </div>
        
        <h3 className="text-lg font-display font-semibold text-foreground mb-2">{title}</h3>
        <p className="text-muted-foreground text-sm leading-relaxed">{description}</p>
      </div>

      {/* Decorative corner accent */}
      <div className="absolute top-4 right-4 w-2 h-2 rounded-full bg-accent/30 group-hover:bg-accent transition-colors duration-300" />
    </motion.div>
  );
};
