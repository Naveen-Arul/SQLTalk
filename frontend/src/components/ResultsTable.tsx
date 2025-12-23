import { motion } from 'framer-motion';
import { Table as TableIcon, Clock, Hash, Rows3 } from 'lucide-react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

interface ResultsTableProps {
  columns: string[];
  rows: Record<string, unknown>[];
  rowCount: number;
  executionTime: number;
}

export const ResultsTable = ({ columns, rows, rowCount, executionTime }: ResultsTableProps) => {
  const formatValue = (value: unknown): string => {
    if (value === null || value === undefined) return '—';
    if (typeof value === 'number') {
      return value.toLocaleString(undefined, {
        minimumFractionDigits: 0,
        maximumFractionDigits: 2,
      });
    }
    return String(value);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="p-6 rounded-2xl bg-card border border-border shadow-soft"
    >
      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-xl gradient-bg flex items-center justify-center shadow-soft">
            <Rows3 className="w-5 h-5 text-primary-foreground" />
          </div>
          <div>
            <h2 className="text-lg font-display font-semibold text-foreground">Results</h2>
            <p className="text-sm text-muted-foreground">Query output</p>
          </div>
        </div>
        
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium">
            <Hash className="w-3.5 h-3.5" />
            <span>{rowCount} rows</span>
          </div>
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-accent/10 text-accent text-sm font-medium">
            <Clock className="w-3.5 h-3.5" />
            <span>{executionTime}ms</span>
          </div>
        </div>
      </div>

      <div className="rounded-xl overflow-hidden border border-border">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="bg-secondary/50 hover:bg-secondary/50 border-b border-border">
                {columns.map((column) => (
                  <TableHead key={column} className="font-display font-semibold text-foreground py-4">
                    {column}
                  </TableHead>
                ))}
              </TableRow>
            </TableHeader>
            <TableBody>
              {rows.map((row, rowIndex) => (
                <TableRow 
                  key={rowIndex} 
                  className="hover:bg-secondary/30 transition-colors duration-150 border-b border-border last:border-b-0"
                >
                  {columns.map((column) => (
                    <TableCell key={column} className="font-mono text-sm py-3.5">
                      {formatValue(row[column])}
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </motion.div>
  );
};
