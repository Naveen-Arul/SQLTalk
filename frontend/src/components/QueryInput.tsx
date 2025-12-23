import { motion } from 'framer-motion';
import { Search, Sparkles, Loader2, Lightbulb } from 'lucide-react';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { sampleQueries } from '@/lib/schema';

interface QueryInputProps {
  onSubmit: (query: string) => void;
  isLoading: boolean;
}

export const QueryInput = ({ onSubmit, isLoading }: QueryInputProps) => {
  const [query, setQuery] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim() && !isLoading) {
      onSubmit(query.trim());
    }
  };

  const handleSampleClick = (sample: string) => {
    setQuery(sample);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="p-6 rounded-2xl bg-card border border-border shadow-soft"
    >
      <div className="flex items-center gap-3 mb-5">
        <div className="w-11 h-11 rounded-xl gradient-bg flex items-center justify-center shadow-soft">
          <Search className="w-5 h-5 text-primary-foreground" />
        </div>
        <div>
          <h2 className="text-lg font-display font-semibold text-foreground">Ask a Question</h2>
          <p className="text-sm text-muted-foreground">Describe what you want to know</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <Textarea
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="e.g., Show total revenue by category..."
          className="min-h-[120px] bg-secondary/30 border-border focus:border-primary focus:ring-primary/20 resize-none text-foreground placeholder:text-muted-foreground"
          disabled={isLoading}
        />

        <Button
          type="submit"
          disabled={!query.trim() || isLoading}
          className="w-full gradient-bg text-primary-foreground shadow-soft hover:shadow-glow transition-all duration-300"
          size="lg"
        >
          {isLoading ? (
            <>
              <Loader2 className="w-5 h-5 mr-2 animate-spin" />
              Analyzing...
            </>
          ) : (
            <>
              <Sparkles className="w-5 h-5 mr-2" />
              Analyze Query
            </>
          )}
        </Button>
      </form>

      <div className="mt-6 pt-5 border-t border-border">
        <div className="flex items-center gap-2 mb-3">
          <Lightbulb className="w-4 h-4 text-accent" />
          <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Try these examples</p>
        </div>
        <div className="flex flex-wrap gap-2">
          {sampleQueries.map((sample, index) => (
            <motion.button
              key={index}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => handleSampleClick(sample)}
              disabled={isLoading}
              className="text-xs px-3.5 py-2 rounded-full bg-secondary text-secondary-foreground hover:bg-primary/10 hover:text-primary border border-transparent hover:border-primary/20 transition-all duration-200 disabled:opacity-50"
            >
              {sample}
            </motion.button>
          ))}
        </div>
      </div>
    </motion.div>
  );
};
