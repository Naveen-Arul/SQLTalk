import { motion } from 'framer-motion';
import { BarChart3, TrendingUp } from 'lucide-react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
} from 'recharts';
import { useMemo } from 'react';

interface ResultsChartProps {
  columns: string[];
  rows: Record<string, unknown>[];
}

const COLORS = [
  'hsl(160, 84%, 39%)',   // Primary emerald
  'hsl(38, 92%, 50%)',    // Accent amber
  'hsl(280, 65%, 60%)',   // Purple
  'hsl(200, 80%, 50%)',   // Blue
  'hsl(340, 75%, 55%)',   // Pink
  'hsl(175, 84%, 32%)',   // Teal
];

export const ResultsChart = ({ columns, rows }: ResultsChartProps) => {
  const chartData = useMemo(() => {
    if (!rows.length || !columns.length) return { type: 'none', data: [] };

    const firstRow = rows[0];
    const categoricalColumns = columns.filter(col => 
      typeof firstRow[col] === 'string'
    );
    const numericColumns = columns.filter(col => 
      typeof firstRow[col] === 'number'
    );

    if (categoricalColumns.length === 0 || numericColumns.length === 0) {
      return { type: 'none', data: [] };
    }

    const categoryCol = categoricalColumns[0];
    const valueCol = numericColumns[0];

    const isTimeSeries = categoryCol.toLowerCase().includes('date') ||
      categoryCol.toLowerCase().includes('month') ||
      categoryCol.toLowerCase().includes('year') ||
      categoryCol.toLowerCase().includes('time');

    const data = rows.map(row => ({
      name: String(row[categoryCol]),
      value: Number(row[valueCol]),
    }));

    if (isTimeSeries && rows.length > 2) {
      return { type: 'line', data, valueLabel: valueCol };
    } else if (rows.length <= 6) {
      return { type: 'pie', data, valueLabel: valueCol };
    } else {
      return { type: 'bar', data, valueLabel: valueCol };
    }
  }, [columns, rows]);

  if (chartData.type === 'none') {
    return null;
  }

  const tooltipStyle = {
    backgroundColor: 'hsl(0, 0%, 100%)',
    border: '1px solid hsl(40, 15%, 90%)',
    borderRadius: '12px',
    boxShadow: '0 4px 16px -4px hsl(160, 30%, 20%, 0.12)',
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="p-6 rounded-2xl bg-card border border-border shadow-soft"
    >
      <div className="flex items-center gap-3 mb-6">
        <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-accent/20 to-primary/20 flex items-center justify-center">
          <TrendingUp className="w-5 h-5 text-accent" />
        </div>
        <div>
          <h2 className="text-lg font-display font-semibold text-foreground">Visualization</h2>
          <p className="text-sm text-muted-foreground">Auto-generated chart</p>
        </div>
      </div>

      <div className="h-[320px] p-4 rounded-xl bg-secondary/20 border border-border">
        <ResponsiveContainer width="100%" height="100%">
          {chartData.type === 'bar' ? (
            <BarChart data={chartData.data}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(40, 15%, 90%)" />
              <XAxis 
                dataKey="name" 
                stroke="hsl(240, 5%, 46%)"
                tick={{ fill: 'hsl(240, 5%, 46%)', fontSize: 12 }}
                tickLine={{ stroke: 'hsl(40, 15%, 90%)' }}
              />
              <YAxis 
                stroke="hsl(240, 5%, 46%)"
                tick={{ fill: 'hsl(240, 5%, 46%)', fontSize: 12 }}
                tickLine={{ stroke: 'hsl(40, 15%, 90%)' }}
              />
              <Tooltip contentStyle={tooltipStyle} />
              <Bar 
                dataKey="value" 
                fill="hsl(160, 84%, 39%)" 
                radius={[6, 6, 0, 0]}
              />
            </BarChart>
          ) : chartData.type === 'line' ? (
            <LineChart data={chartData.data}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(40, 15%, 90%)" />
              <XAxis 
                dataKey="name" 
                stroke="hsl(240, 5%, 46%)"
                tick={{ fill: 'hsl(240, 5%, 46%)', fontSize: 12 }}
              />
              <YAxis 
                stroke="hsl(240, 5%, 46%)"
                tick={{ fill: 'hsl(240, 5%, 46%)', fontSize: 12 }}
              />
              <Tooltip contentStyle={tooltipStyle} />
              <Line 
                type="monotone" 
                dataKey="value" 
                stroke="hsl(160, 84%, 39%)" 
                strokeWidth={3}
                dot={{ fill: 'hsl(160, 84%, 39%)', strokeWidth: 0, r: 5 }}
                activeDot={{ r: 7, fill: 'hsl(38, 92%, 50%)' }}
              />
            </LineChart>
          ) : (
            <PieChart>
              <Pie
                data={chartData.data}
                cx="50%"
                cy="50%"
                innerRadius={70}
                outerRadius={110}
                paddingAngle={4}
                dataKey="value"
                label={({ name, percent }) => `${name} (${(percent * 100).toFixed(0)}%)`}
                labelLine={{ stroke: 'hsl(240, 5%, 46%)' }}
              >
                {chartData.data.map((_, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip contentStyle={tooltipStyle} />
            </PieChart>
          )}
        </ResponsiveContainer>
      </div>
    </motion.div>
  );
};
