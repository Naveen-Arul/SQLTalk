import { motion } from 'framer-motion';
import { Download, FileSpreadsheet, FileText, FileType } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { exportToCSV, exportToExcel, exportToPDF, ExportData } from '@/lib/export';

interface ExportPanelProps {
  data: ExportData;
}

export const ExportPanel = ({ data }: ExportPanelProps) => {
  const handleExportCSV = () => {
    exportToCSV(data, 'sqltalk-results');
  };

  const handleExportExcel = () => {
    exportToExcel(data, 'sqltalk-results');
  };

  const handleExportPDF = () => {
    exportToPDF(data, 'sqltalk-results');
  };

  const exportOptions = [
    {
      label: 'CSV',
      icon: FileType,
      onClick: handleExportCSV,
      color: 'text-primary',
      bgHover: 'hover:bg-primary/10 hover:border-primary/30',
    },
    {
      label: 'Excel',
      icon: FileSpreadsheet,
      onClick: handleExportExcel,
      color: 'text-emerald-600',
      bgHover: 'hover:bg-emerald-500/10 hover:border-emerald-500/30',
    },
    {
      label: 'PDF',
      icon: FileText,
      onClick: handleExportPDF,
      color: 'text-destructive',
      bgHover: 'hover:bg-destructive/10 hover:border-destructive/30',
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="p-6 rounded-2xl bg-card border border-border shadow-soft"
    >
      <div className="flex items-center gap-3 mb-5">
        <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center">
          <Download className="w-5 h-5 text-primary" />
        </div>
        <div>
          <h2 className="text-lg font-display font-semibold text-foreground">Export</h2>
          <p className="text-sm text-muted-foreground">Download results</p>
        </div>
      </div>

      <div className="space-y-2">
        {exportOptions.map((option, index) => {
          const Icon = option.icon;
          return (
            <motion.div
              key={option.label}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.05 }}
            >
              <Button
                variant="outline"
                onClick={option.onClick}
                className={`w-full justify-start gap-3 h-12 bg-secondary/30 border-border ${option.bgHover} transition-all duration-200`}
              >
                <Icon className={`w-5 h-5 ${option.color}`} />
                <span className="font-medium">Export as {option.label}</span>
              </Button>
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
};
