import { motion } from 'framer-motion';
import { Code2, Copy, Check, Terminal } from 'lucide-react';
import { useState } from 'react';
import { Button } from '@/components/ui/button';

interface SQLDisplayProps {
  sql: string;
}

export const SQLDisplay = ({ sql }: SQLDisplayProps) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(sql);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="p-6 rounded-2xl bg-card border border-border shadow-soft overflow-hidden"
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center">
            <Terminal className="w-5 h-5 text-primary" />
          </div>
          <div>
            <h2 className="text-lg font-display font-semibold text-foreground">Generated SQL</h2>
            <p className="text-sm text-muted-foreground">AI-generated query</p>
          </div>
        </div>
        <Button
          variant="outline"
          size="sm"
          onClick={handleCopy}
          className="gap-2 bg-secondary/50 hover:bg-secondary border-border"
        >
          {copied ? (
            <>
              <Check className="w-4 h-4 text-primary" />
              <span className="text-primary">Copied!</span>
            </>
          ) : (
            <>
              <Copy className="w-4 h-4" />
              Copy
            </>
          )}
        </Button>
      </div>

      {/* Code block with gradient accent */}
      <div className="relative rounded-xl overflow-hidden">
        <div className="absolute top-0 left-0 w-1 h-full gradient-bg" />
        <div className="bg-secondary/50 border border-border rounded-xl">
          <div className="flex items-center gap-2 px-4 py-2.5 border-b border-border bg-secondary/30">
            <div className="flex gap-1.5">
              <div className="w-2.5 h-2.5 rounded-full bg-destructive/50" />
              <div className="w-2.5 h-2.5 rounded-full bg-accent/50" />
              <div className="w-2.5 h-2.5 rounded-full bg-primary/50" />
            </div>
            <span className="text-xs text-muted-foreground font-mono ml-2">query.sql</span>
          </div>
          <pre className="p-4 overflow-x-auto bg-transparent border-none">
            <code className="text-sm font-mono text-foreground whitespace-pre-wrap break-words">
              {sql}
            </code>
          </pre>
        </div>
      </div>
    </motion.div>
  );
};
