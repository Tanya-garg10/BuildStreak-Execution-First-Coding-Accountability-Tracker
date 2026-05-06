import { useState, useEffect } from 'react';
import { Flame, Trophy, CalendarDays, Code2, Plus } from 'lucide-react';
import ActivityChart from './ActivityChart';
import { format, differenceInDays, isSameDay } from 'date-fns';

export default function Dashboard() {
  const [inputValue, setInputValue] = useState('');
  const [history, setHistory] = useState(() => {
    const saved = localStorage.getItem('buildstreak_history');
    return saved ? JSON.parse(saved) : [];
  });
  const [streak, setStreak] = useState(0);

  // Streak logic
  useEffect(() => {
    localStorage.setItem('buildstreak_history', JSON.stringify(history));
    calculateStreak(history);
  }, [history]);

  const calculateStreak = (data) => {
    if (data.length === 0) {
      setStreak(0);
      return;
    }

    // Sort descending
    const sortedData = [...data].sort((a, b) => new Date(b.date) - new Date(a.date));
    let currentStreak = 0;
    let today = new Date();

    // Check if the first entry is today or yesterday
    const firstEntryDate = new Date(sortedData[0].date);
    const diffToToday = differenceInDays(today, firstEntryDate);

    if (diffToToday > 1 && !isSameDay(today, firstEntryDate)) {
      setStreak(0);
      return;
    }

    let checkDate = firstEntryDate;

    for (let i = 0; i < sortedData.length; i++) {
      const entryDate = new Date(sortedData[i].date);
      if (isSameDay(entryDate, checkDate)) {
        currentStreak++;
        checkDate = new Date(checkDate.setDate(checkDate.getDate() - 1));
      } else {
        break;
      }
    }

    setStreak(currentStreak);
  };

  const handleLogActivity = (e) => {
    e.preventDefault();
    if (!inputValue.trim()) return;

    const newEntry = {
      id: Date.now(),
      text: inputValue,
      date: new Date().toISOString(),
    };

    // Check if already logged today
    const today = new Date();
    const alreadyLoggedToday = history.some((entry) =>
      isSameDay(new Date(entry.date), today)
    );

    if (alreadyLoggedToday) {
      alert("You already logged an activity today! Great job!");
      setInputValue('');
      return;
    }

    setHistory((prev) => [newEntry, ...prev]);
    setInputValue('');
  };

  // AI Feedback Logic
  const getFeedback = () => {
    if (streak === 0) return "Start your streak today!";
    if (streak >= 7) return "Unstoppable! 🚀";
    if (streak >= 3) return "Great consistency 🔥";
    return "Keep it up, build daily! 💻";
  };

  const todayEntries = history.filter((entry) => isSameDay(new Date(entry.date), new Date()));

  return (
    <div className="max-w-4xl mx-auto p-6 md:p-10 space-y-8">
      {/* Header */}
      <header className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="bg-blue-600 p-2 rounded-xl">
            <Code2 className="w-6 h-6 text-white" />
          </div>
          <h1 className="text-2xl font-bold tracking-tight">BuildStreak</h1>
        </div>
        <div className="text-sm font-medium px-4 py-2 bg-secondary rounded-full text-secondary-foreground border border-border">
          {getFeedback()}
        </div>
      </header>

      {/* Main Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2 space-y-6">
          {/* Input Section */}
          <section className="bg-card border border-border rounded-2xl p-6 shadow-sm">
            <h2 className="text-lg font-semibold mb-4">What did you build today?</h2>
            <form onSubmit={handleLogActivity} className="flex gap-3">
              <input
                type="text"
                placeholder="e.g., Added authentication to my app..."
                className="flex-1 bg-background border border-border rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all text-sm"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
              />
              <button
                type="submit"
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-medium flex items-center gap-2 transition-all shadow-lg shadow-blue-500/20"
              >
                <Plus className="w-4 h-4" />
                Log
              </button>
            </form>
            
            {todayEntries.length > 0 && (
              <div className="mt-6 pt-6 border-t border-border">
                <h3 className="text-sm font-medium text-muted-foreground mb-3">Today's Activity</h3>
                <div className="space-y-3">
                  {todayEntries.map(entry => (
                    <div key={entry.id} className="bg-background/50 rounded-lg p-3 text-sm border border-border/50">
                      {entry.text}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </section>

          {/* Chart Section */}
          <section className="bg-card border border-border rounded-2xl p-6 shadow-sm">
            <div className="flex items-center gap-2 mb-6">
              <CalendarDays className="w-5 h-5 text-blue-500" />
              <h2 className="text-lg font-semibold">Weekly Progress</h2>
            </div>
            <ActivityChart history={history} />
          </section>
        </div>

        {/* Sidebar Stats */}
        <div className="space-y-6">
          {/* Streak Card */}
          <section className="bg-gradient-to-br from-orange-500/10 to-red-500/10 border border-orange-500/20 rounded-2xl p-6 text-center shadow-sm relative overflow-hidden">
            <div className="absolute top-0 right-0 p-4 opacity-10">
              <Flame className="w-24 h-24" />
            </div>
            <h2 className="text-sm font-medium text-orange-400 mb-2 uppercase tracking-wider relative z-10">Current Streak</h2>
            <div className="flex items-center justify-center gap-2 relative z-10">
              <Flame className="w-10 h-10 text-orange-500 fill-orange-500/20" />
              <span className="text-6xl font-black tracking-tighter text-white">{streak}</span>
            </div>
            <p className="text-sm text-muted-foreground mt-2 relative z-10">days in a row</p>
          </section>

          {/* Badges Section */}
          <section className="bg-card border border-border rounded-2xl p-6 shadow-sm">
            <div className="flex items-center gap-2 mb-4">
              <Trophy className="w-5 h-5 text-yellow-500" />
              <h2 className="text-lg font-semibold">Badges</h2>
            </div>
            <div className="space-y-3">
              <div className={`flex items-center gap-3 p-3 rounded-xl border transition-all ${streak >= 3 ? 'bg-background border-yellow-500/30 shadow-[0_0_15px_rgba(234,179,8,0.1)]' : 'bg-background/50 border-border opacity-50 grayscale'}`}>
                <div className="bg-yellow-500/20 p-2 rounded-lg">
                  <Flame className="w-5 h-5 text-yellow-500" />
                </div>
                <div>
                  <div className="text-sm font-bold text-white">3-Day Streak</div>
                  <div className="text-xs text-muted-foreground">Keep the momentum</div>
                </div>
              </div>
              <div className={`flex items-center gap-3 p-3 rounded-xl border transition-all ${streak >= 7 ? 'bg-background border-purple-500/30 shadow-[0_0_15px_rgba(168,85,247,0.1)]' : 'bg-background/50 border-border opacity-50 grayscale'}`}>
                <div className="bg-purple-500/20 p-2 rounded-lg">
                  <Trophy className="w-5 h-5 text-purple-500" />
                </div>
                <div>
                  <div className="text-sm font-bold text-white">7-Day Streak</div>
                  <div className="text-xs text-muted-foreground">A full week of building!</div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
