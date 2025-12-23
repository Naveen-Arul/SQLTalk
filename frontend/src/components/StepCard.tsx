import { motion } from 'framer-motion';
import { ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface StepCardProps {
  step: number;
  icon: ReactNode;
  title: string;
  description: string;
  isLast?: boolean;
}

export const StepCard = ({ step, icon, title, description, isLast = false }: StepCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: step * 0.1 }}
      className="relative flex gap-6"
    >
      {/* Connection line */}
      {!isLast && (
        <div className="absolute left-7 top-16 w-0.5 h-[calc(100%-2rem)] bg-gradient-to-b from-primary/40 via-accent/40 to-transparent" />
      )}

      {/* Step indicator */}
      <div className="relative z-10 flex-shrink-0">
        <motion.div
          whileHover={{ scale: 1.1, rotate: 5 }}
          className={cn(
            'w-14 h-14 rounded-2xl flex items-center justify-center shadow-medium',
            'gradient-bg'
          )}
        >
          <div className="text-primary-foreground">{icon}</div>
        </motion.div>
      </div>

      {/* Content */}
      <div className="flex-1 pb-10">
        <div className="flex items-center gap-3 mb-2">
          <span className="text-xs font-mono px-2.5 py-1 rounded-full bg-primary/10 text-primary font-medium">
            Step {step}
          </span>
        </div>
        <h3 className="text-xl font-display font-semibold text-foreground mb-2">{title}</h3>
        <p className="text-muted-foreground leading-relaxed">{description}</p>
      </div>
    </motion.div>
  );
};
