import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Flame, Trophy, Plus, AlertCircle, Sparkles, Code, Link, Shield, Moon, Zap } from 'lucide-react';
import { format, differenceInDays, isSameDay } from 'date-fns';
import Heatmap from '../components/Heatmap';
import Timer from '../components/Timer';

export default function Dashboard({ history, onAddEntry, displayName }) {
  const [inputValue, setInputValue] = useState('');
  const [githubUrl, setGithubUrl] = useState('');
  const [streak, setStreak] = useState(0);

  useEffect(() => {
    calculateStreak(history);
  }, [history]);

  const calculateStreak = (data) => {
    if (data.length === 0) {
      setStreak(0);
      return;
    }
    const sortedData = [...data].sort((a, b) => new Date(b.date) - new Date(a.date));
    let currentStreak = 0;
    let today = new Date();
    const firstEntryDate = new Date(sortedData[0].date);
    const diffToToday = differenceInDays(today, firstEntryDate);

    if (diffToToday > 1 && !isSameDay(today, firstEntryDate)) {
      setStreak(0);
      return;
    }

    let checkDate = firstEntryDate;
    const processedDates = new Set();

    for (let i = 0; i < sortedData.length; i++) {
      const entryDate = new Date(sortedData[i].date);
      const dateKey = format(entryDate, 'yyyy-MM-dd');
      
      if (processedDates.has(dateKey)) continue;
      
      if (isSameDay(entryDate, checkDate)) {
        currentStreak++;
        processedDates.add(dateKey);
        checkDate = new Date(checkDate.setDate(checkDate.getDate() - 1));
      } else {
        break;
      }
    }
    setStreak(currentStreak);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!inputValue.trim()) return;
    
    let normalizedUrl = githubUrl.trim();
    if (normalizedUrl && !normalizedUrl.startsWith('http')) {
      normalizedUrl = `https://${normalizedUrl}`;
    }
    onAddEntry(inputValue, normalizedUrl);
    setInputValue('');
    setGithubUrl('');
  };

  const hasLoggedToday = history.some(entry => isSameDay(new Date(entry.date), new Date()));

  const getLevel = () => {
    if (streak >= 30) return { name: 'Master Builder', color: 'text-purple-400' };
    if (streak >= 14) return { name: 'Architect', color: 'text-blue-400' };
    if (streak >= 7) return { name: 'Developer', color: 'text-green-400' };
    if (streak >= 3) return { name: 'Apprentice', color: 'text-yellow-400' };
    return { name: 'Novice', color: 'text-gray-400' };
  };

  const level = getLevel();

  const achievements = [
    { id: '1', title: 'Novice Builder', desc: 'First build logged', icon: Code, unlocked: history.length > 0, color: 'text-blue-500' },
    { id: '2', title: '3-Day Warrior', desc: 'Maintain a 3-day streak', icon: Flame, unlocked: streak >= 3, color: 'text-orange-500' },
    { id: '3', title: 'GitHub Linker', desc: 'Attach a repo to a build', icon: Link, unlocked: history.some(e => e.githubUrl), color: 'text-green-500' },
    { id: '4', title: 'Night Owl', desc: 'Log a build after 10 PM', icon: Moon, unlocked: history.some(e => new Date(e.date).getHours() >= 22), color: 'text-purple-500' },
    { id: '5', title: 'Power Builder', desc: 'Log 10 total builds', icon: Zap, unlocked: history.length >= 10, color: 'text-yellow-500' },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="max-w-5xl mx-auto p-6 md:p-10 space-y-8"
    >
      {/* Welcome Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-black tracking-tight flex items-center gap-3">
            Welcome, <span className="text-blue-500">{displayName}</span>
            <motion.span 
              animate={{ rotate: [0, 20, 0] }} 
              transition={{ repeat: Infinity, duration: 2 }}
            >
              👋
            </motion.span>
          </h1>
          <p className="text-muted-foreground mt-1 text-sm">Ready to keep your streak alive today?</p>
        </div>
      </div>
      {/* Smart Banner */}
      {!hasLoggedToday && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: 'auto', opacity: 1 }}
          className="bg-yellow-500/10 border border-yellow-500/20 rounded-2xl p-4 flex items-center gap-4"
        >
          <div className="bg-yellow-500/20 p-2 rounded-lg">
            <AlertCircle className="w-5 h-5 text-yellow-500" />
          </div>
          <div className="flex-1">
            <h4 className="text-sm font-bold text-yellow-500">Don't break your streak!</h4>
            <p className="text-xs text-yellow-500/80">You haven't logged any activity today. Build something small to keep going!</p>
          </div>
        </motion.div>
      )}

      {/* Hero Stats & Achievements */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-6">
          <section className="bg-card border border-border rounded-3xl p-8 text-center flex flex-col items-center justify-center relative overflow-hidden group">
             <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
                <Flame className="w-32 h-32" />
              </div>
              <h2 className="text-sm font-bold uppercase tracking-[0.2em] text-muted-foreground mb-4">Current Streak</h2>
              <div className="flex items-center gap-2">
                <Flame className="w-12 h-12 text-orange-500 fill-orange-500/20 animate-pulse" />
                <span className="text-7xl font-black text-white">{streak}</span>
              </div>
              <p className="text-sm font-medium text-muted-foreground mt-2">days of consistency</p>
          </section>

          <section className="bg-card border border-border rounded-3xl p-8 text-center flex flex-col items-center justify-center">
              <Trophy className="w-12 h-12 text-yellow-500 mb-4" />
              <h2 className="text-sm font-bold uppercase tracking-[0.2em] text-muted-foreground mb-1">Rank</h2>
              <span className={`text-2xl font-black ${level.color}`}>{level.name}</span>
              <div className="w-full bg-secondary h-2 rounded-full mt-6 overflow-hidden">
                <div className="bg-blue-600 h-full" style={{ width: `${(streak % 7) * 14.2}%` }}></div>
              </div>
              <p className="text-[10px] text-muted-foreground mt-2">{7 - (streak % 7)} days to next milestone</p>
          </section>
        </div>

        {/* Achievements Quick View */}
        <section className="bg-card border border-border rounded-3xl p-6 overflow-hidden relative">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-sm font-bold uppercase tracking-[0.2em] text-muted-foreground">Achievements</h2>
            <Shield className="w-4 h-4 text-blue-500" />
          </div>
          <div className="space-y-3">
            {achievements.map((ach) => (
              <div key={ach.id} className={`flex items-center gap-3 p-3 rounded-xl border transition-all ${
                ach.unlocked ? 'bg-blue-600/5 border-blue-500/20 opacity-100' : 'bg-secondary/50 border-transparent opacity-40 grayscale'
              }`}>
                <div className={`p-2 rounded-lg ${ach.unlocked ? 'bg-blue-600/10' : 'bg-secondary'}`}>
                  <ach.icon className={`w-4 h-4 ${ach.unlocked ? ach.color : 'text-muted-foreground'}`} />
                </div>
                <div>
                  <h4 className="text-xs font-bold">{ach.title}</h4>
                  <p className="text-[10px] text-muted-foreground">{ach.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>

      {/* Tools Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <Timer />
        <section className="bg-card border border-border rounded-3xl p-8 flex flex-col items-center justify-center">
            <div className="bg-blue-600/10 p-4 rounded-2xl mb-4">
              <Sparkles className="w-8 h-8 text-blue-500" />
            </div>
            <h2 className="text-sm font-bold uppercase tracking-[0.2em] text-muted-foreground mb-2">AI Suggestion</h2>
            <div className="bg-blue-600/10 border border-blue-500/20 rounded-xl p-3 text-xs text-center font-bold text-blue-400">
              Consistency is the key to mastery. Try building a custom UI hook today!
            </div>
        </section>
      </div>

      {/* Activity Log */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <section className="space-y-6">
          <div className="bg-card border border-border rounded-3xl p-8 shadow-sm">
            <h2 className="text-xl font-bold mb-6">What's the progress today?</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="relative group">
                <input
                  type="text"
                  placeholder="Briefly describe what you built..."
                  className="w-full bg-background border border-border rounded-2xl px-6 py-4 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all text-sm shadow-inner"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                />
              </div>
              <div className="flex gap-3">
                <div className="relative flex-1 group">
                  <Code className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground group-focus-within:text-blue-500 transition-colors" />
                  <input
                    type="text"
                    placeholder="GitHub Repo link (optional)"
                    className="w-full bg-background border border-border rounded-xl pl-12 pr-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all text-xs"
                    value={githubUrl}
                    onChange={(e) => setGithubUrl(e.target.value)}
                  />
                </div>
                <button
                  type="submit"
                  className="bg-blue-600 hover:bg-blue-700 text-white px-8 rounded-xl font-medium transition-all shadow-lg shadow-blue-500/20 active:scale-95 flex items-center gap-2"
                >
                  <Plus className="w-5 h-5" />
                  Log
                </button>
              </div>
            </form>
          </div>

          <Heatmap history={history} />
        </section>

        {/* Recent History Preview */}
        <section className="bg-card border border-border rounded-3xl p-8">
           <h2 className="text-xl font-bold mb-6">Recent Activity</h2>
           <div className="space-y-4">
              {history.slice(0, 5).map((entry, idx) => (
                <div key={entry.id} className="flex gap-4 group">
                  <div className="flex flex-col items-center">
                    <div className="w-2 h-2 rounded-full bg-blue-600 mt-2"></div>
                    {idx !== 4 && <div className="w-px flex-1 bg-border my-1"></div>}
                  </div>
                  <div className="pb-4 flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <p className="text-xs text-muted-foreground">{format(new Date(entry.date), 'MMM dd, h:mm a')}</p>
                    </div>
                    <p className="text-sm font-medium group-hover:text-blue-400 transition-colors">{entry.text}</p>
                    {entry.githubUrl && (
                      <a 
                        href={entry.githubUrl} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 text-[10px] font-bold text-blue-500 bg-blue-500/10 px-2 py-0.5 rounded-md mt-2 hover:bg-blue-500 hover:text-white transition-all"
                      >
                        <Code className="w-3 h-3" />
                        View Project
                      </a>
                    )}
                  </div>
                </div>
              ))}
              {history.length === 0 && (
                <p className="text-sm text-muted-foreground text-center py-10 italic">No activity yet. Start your journey!</p>
              )}
           </div>
        </section>
      </div>
    </motion.div>
  );
}
