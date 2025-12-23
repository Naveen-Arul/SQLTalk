import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, Database, Table, Columns3, Layers } from 'lucide-react';
import { useState } from 'react';
import { databaseSchema } from '@/lib/schema';
import { cn } from '@/lib/utils';

export const SchemaPanel = () => {
  const [expandedTable, setExpandedTable] = useState<string | null>(null);

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      className="p-6 rounded-2xl bg-card border border-border shadow-soft"
    >
      <div className="flex items-center gap-3 mb-6">
        <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-accent/20 to-primary/20 flex items-center justify-center">
          <Layers className="w-5 h-5 text-accent" />
        </div>
        <div>
          <h2 className="text-lg font-display font-semibold text-foreground">Database Schema</h2>
          <p className="text-sm text-muted-foreground flex items-center gap-1.5">
            <Database className="w-3 h-3" />
            {databaseSchema.database}
          </p>
        </div>
      </div>

      <div className="space-y-2">
        {databaseSchema.tables.map((table, tableIndex) => (
          <motion.div 
            key={table.name} 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: tableIndex * 0.05 }}
            className="rounded-xl overflow-hidden border border-border bg-secondary/20"
          >
            <button
              onClick={() => setExpandedTable(expandedTable === table.name ? null : table.name)}
              className={cn(
                'w-full flex items-center justify-between p-4 transition-all duration-200',
                'hover:bg-secondary/50',
                expandedTable === table.name && 'bg-secondary/50'
              )}
            >
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                  <Table className="w-4 h-4 text-primary" />
                </div>
                <div className="text-left">
                  <span className="font-medium text-foreground">{table.name}</span>
                  <p className="text-xs text-muted-foreground">{table.description}</p>
                </div>
              </div>
              <motion.div
                animate={{ rotate: expandedTable === table.name ? 180 : 0 }}
                transition={{ duration: 0.2 }}
              >
                <ChevronDown className="w-4 h-4 text-muted-foreground" />
              </motion.div>
            </button>

            <AnimatePresence>
              {expandedTable === table.name && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="overflow-hidden"
                >
                  <div className="p-4 pt-0 space-y-1.5">
                    {table.columns.map((column, colIndex) => (
                      <motion.div
                        key={column.name}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: colIndex * 0.03 }}
                        className="flex items-center gap-3 p-2.5 rounded-lg bg-card border border-border"
                      >
                        <Columns3 className="w-3.5 h-3.5 text-muted-foreground flex-shrink-0" />
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2">
                            <span className="text-sm font-mono font-medium text-foreground">{column.name}</span>
                            <span className="text-[10px] px-2 py-0.5 rounded-full bg-accent/10 text-accent font-medium uppercase">
                              {column.type}
                            </span>
                          </div>
                          <p className="text-xs text-muted-foreground truncate mt-0.5">{column.description}</p>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};
