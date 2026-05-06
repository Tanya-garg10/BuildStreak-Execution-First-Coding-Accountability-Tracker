import { format, subDays, isSameDay } from 'date-fns';
import { motion } from 'framer-motion';

export default function Heatmap({ history }) {
  // Last 12 weeks of data
  const days = Array.from({ length: 84 }).map((_, i) => {
    return subDays(new Date(), 83 - i);
  });

  const getIntensity = (date) => {
    const count = history.filter((entry) => isSameDay(new Date(entry.date), date)).length;
    if (count === 0) return 'bg-secondary/50';
    if (count === 1) return 'bg-blue-600/40';
    if (count === 2) return 'bg-blue-600/70';
    return 'bg-blue-600';
  };

  return (
    <div className="bg-card border border-border rounded-2xl p-6 overflow-hidden">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">Activity Heatmap</h3>
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <span>Less</span>
          <div className="w-3 h-3 rounded-sm bg-secondary/50"></div>
          <div className="w-3 h-3 rounded-sm bg-blue-600/40"></div>
          <div className="w-3 h-3 rounded-sm bg-blue-600/70"></div>
          <div className="w-3 h-3 rounded-sm bg-blue-600"></div>
          <span>More</span>
        </div>
      </div>
      
      <div className="grid grid-flow-col grid-rows-7 gap-1">
        {days.map((day, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.005 }}
            title={format(day, 'MMM dd, yyyy')}
            className={`w-3 h-3 rounded-sm ${getIntensity(day)} transition-colors cursor-help`}
          />
        ))}
      </div>
      <div className="flex justify-between mt-4 text-[10px] text-muted-foreground uppercase tracking-widest px-1">
        <span>Mar</span>
        <span>Apr</span>
        <span>May</span>
      </div>
    </div>
  );
}
