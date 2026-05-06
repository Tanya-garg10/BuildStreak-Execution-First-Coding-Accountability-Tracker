import { motion } from 'framer-motion';
import ActivityChart from '../components/ActivityChart';
import { BarChart3, TrendingUp, Calendar, Zap, Flame } from 'lucide-react';
import { format, differenceInDays } from 'date-fns';

export default function Analytics({ history }) {
  const totalBuilds = history.length;
  const activeDays = new Set(history.map(e => new Date(e.date).toDateString())).size;
  const consistency = totalBuilds > 0 ? Math.round((activeDays / 30) * 100) : 0; // Rough 30 day consistency

  const calculateLongestStreak = (data) => {
    if (data.length === 0) return 0;
    const dates = [...new Set(data.map(e => format(new Date(e.date), 'yyyy-MM-dd')))]
      .sort((a, b) => new Date(b) - new Date(a));
    
    let max = 0;
    let current = 0;
    let lastDate = null;

    dates.forEach(dateStr => {
      const date = new Date(dateStr);
      if (!lastDate || differenceInDays(lastDate, date) === 1) {
        current++;
      } else {
        current = 1;
      }
      if (current > max) max = current;
      lastDate = date;
    });
    return max;
  };

  const longestStreak = calculateLongestStreak(history);

  const last7Days = history.filter(e => differenceInDays(new Date(), new Date(e.date)) < 7);
  const weeklyConsistency = Math.round((new Set(last7Days.map(e => new Date(e.date).toDateString())).size / 7) * 100);

  const stats = [
    { label: 'Total Days Active', value: activeDays, icon: Calendar, color: 'text-green-500' },
    { label: 'Longest Streak', value: longestStreak, icon: Flame, color: 'text-orange-500' },
    { label: 'Weekly Consistency', value: `${weeklyConsistency}%`, icon: TrendingUp, color: 'text-purple-500' },
    { label: 'Power Score', value: totalBuilds * 10, icon: Zap, color: 'text-yellow-500' },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 1.05 }}
      className="max-w-5xl mx-auto p-6 md:p-10 space-y-8"
    >
      <header>
        <h1 className="text-3xl font-bold tracking-tight">Analytics</h1>
        <p className="text-muted-foreground mt-2">Deep dive into your building habits.</p>
      </header>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="bg-card border border-border rounded-2xl p-6"
          >
            <stat.icon className={`w-5 h-5 ${stat.color} mb-4`} />
            <div className="text-2xl font-black">{stat.value}</div>
            <div className="text-xs text-muted-foreground uppercase tracking-widest mt-1">{stat.label}</div>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 bg-card border border-border rounded-3xl p-8">
          <h2 className="text-lg font-bold mb-6">Velocity Trend</h2>
          <div className="h-[300px]">
             <ActivityChart history={history} />
          </div>
        </div>

        <div className="bg-gradient-to-br from-blue-600 to-indigo-700 rounded-3xl p-8 text-white shadow-xl shadow-blue-500/20">
          <h2 className="text-lg font-bold mb-4">Pro Insights</h2>
          <div className="space-y-4">
            <p className="text-sm text-blue-100 leading-relaxed">
              You are most productive on <span className="bg-white text-blue-600 px-2 py-0.5 rounded-md font-bold mx-1">Tuesdays</span>. Your average build sessions last 45 minutes.
            </p>
            <div className="pt-4 border-t border-white/20">
              <h4 className="text-xs font-bold uppercase tracking-widest opacity-70 mb-2">Recommendation</h4>
              <p className="text-sm text-blue-500 bg-white rounded-xl p-3 font-medium">
                Try a 7-day sprint on Backend APIs next week to increase your Power Score by 50!
              </p>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
