import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Layout } from '@/components/Layout';
import { SchemaPanel } from '@/components/SchemaPanel';
import { QueryInput } from '@/components/QueryInput';
import { SQLDisplay } from '@/components/SQLDisplay';
import { ResultsTable } from '@/components/ResultsTable';
import { ResultsChart } from '@/components/ResultsChart';
import { ExportPanel } from '@/components/ExportPanel';
import { analyzeQuery, AnalyzeResponse } from '@/lib/api';
import { useToast } from '@/hooks/use-toast';
import { AlertCircle, Sparkles, Database, Zap } from 'lucide-react';

const AnalyzePage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [lastQuery, setLastQuery] = useState<string>('');
  const [result, setResult] = useState<AnalyzeResponse | null>(null);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  const handleSubmit = async (query: string) => {
    setIsLoading(true);
    setError(null);
    setLastQuery(query);

    try {
      const response = await analyzeQuery(query);
      setResult(response);
      toast({
        title: 'Analysis Complete',
        description: `Found ${response.row_count} results in ${response.execution_time_ms}ms`,
      });
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to analyze query';
      setError(errorMessage);
      toast({
        title: 'Analysis Failed',
        description: errorMessage,
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Layout>
      <div className="container mx-auto px-6 py-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-10"
        >
          <div className="flex items-center gap-4 mb-3">
            <div className="w-12 h-12 rounded-2xl gradient-bg flex items-center justify-center shadow-medium">
              <Zap className="w-6 h-6 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-3xl lg:text-4xl font-display font-bold text-foreground">
                Analytics Dashboard
              </h1>
              <p className="text-muted-foreground">
                Query your database using natural language
              </p>
            </div>
          </div>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Column - Query & Schema */}
          <div className="lg:col-span-1 space-y-6">
            <QueryInput onSubmit={handleSubmit} isLoading={isLoading} />
            <SchemaPanel />
          </div>

          {/* Right Column - Results */}
          <div className="lg:col-span-2 space-y-6">
            <AnimatePresence mode="wait">
              {isLoading && (
                <motion.div
                  key="loading"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="p-16 rounded-2xl bg-card border border-border shadow-soft flex flex-col items-center justify-center"
                >
                  <div className="relative mb-6">
                    <div className="w-20 h-20 rounded-full border-4 border-primary/20 border-t-primary animate-spin" />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <Sparkles className="w-8 h-8 text-primary animate-pulse" />
                    </div>
                  </div>
                  <p className="text-lg font-display font-medium text-foreground mb-2">Analyzing your query...</p>
                  <p className="text-muted-foreground">Generating SQL and fetching results</p>
                </motion.div>
              )}

              {error && !isLoading && (
                <motion.div
                  key="error"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="p-8 rounded-2xl bg-destructive/5 border border-destructive/20 flex items-start gap-4"
                >
                  <div className="w-12 h-12 rounded-xl bg-destructive/10 flex items-center justify-center flex-shrink-0">
                    <AlertCircle className="w-6 h-6 text-destructive" />
                  </div>
                  <div>
                    <h3 className="font-display font-semibold text-foreground mb-1 text-lg">Analysis Failed</h3>
                    <p className="text-muted-foreground mb-3">{error}</p>
                    <p className="text-sm text-muted-foreground/70">
                      Make sure the backend server is running at localhost:5000
                    </p>
                  </div>
                </motion.div>
              )}

              {!isLoading && !error && !result && (
                <motion.div
                  key="empty"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="p-16 rounded-2xl bg-card border-2 border-dashed border-border flex flex-col items-center justify-center text-center"
                >
                  <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-primary/10 to-accent/10 flex items-center justify-center mb-6">
                    <Database className="w-10 h-10 text-primary" />
                  </div>
                  <h3 className="text-xl font-display font-semibold text-foreground mb-3">Ready to Analyze</h3>
                  <p className="text-muted-foreground max-w-md leading-relaxed">
                    Enter a natural language question in the query box to get started.
                    Try asking about revenue, sales trends, or customer data.
                  </p>
                </motion.div>
              )}

              {result && !isLoading && (
                <motion.div
                  key="results"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="space-y-6"
                >
                  <SQLDisplay sql={result.sql} />
                  
                  <div className="grid lg:grid-cols-3 gap-6">
                    <div className="lg:col-span-2">
                      <ResultsTable
                        columns={result.columns}
                        rows={result.rows}
                        rowCount={result.row_count}
                        executionTime={result.execution_time_ms}
                      />
                    </div>
                    <div className="lg:col-span-1">
                      <ExportPanel
                        data={{
                          columns: result.columns,
                          rows: result.rows,
                          query: lastQuery,
                          sql: result.sql,
                        }}
                      />
                    </div>
                  </div>

                  <ResultsChart columns={result.columns} rows={result.rows} />
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default AnalyzePage;
