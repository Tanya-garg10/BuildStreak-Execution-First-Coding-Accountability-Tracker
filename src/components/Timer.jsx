import { useState, useEffect } from 'react';
import { Play, Pause, RotateCcw, Timer as TimerIcon } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Timer() {
  const [timeLeft, setTimeLeft] = useState(25 * 60);
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    let interval = null;
    if (isActive && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((time) => time - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      setIsActive(false);
      alert("Time's up! Take a break.");
    }
    return () => clearInterval(interval);
  }, [isActive, timeLeft]);

  const toggle = () => setIsActive(!isActive);
  const reset = () => {
    setIsActive(false);
    setTimeLeft(25 * 60);
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="bg-card border border-border rounded-3xl p-8 flex flex-col items-center justify-center relative overflow-hidden">
      <div className="absolute top-0 right-0 p-4 opacity-5">
        <TimerIcon className="w-24 h-24" />
      </div>
      <h2 className="text-sm font-bold uppercase tracking-[0.2em] text-muted-foreground mb-4">Focus Timer</h2>
      <div className="text-5xl font-black mb-6 font-mono text-blue-500">{formatTime(timeLeft)}</div>
      <div className="flex gap-4">
        <button
          onClick={toggle}
          className={`p-3 rounded-xl transition-all ${
            isActive ? 'bg-yellow-500/10 text-yellow-500' : 'bg-blue-600 text-white shadow-lg shadow-blue-500/20'
          }`}
        >
          {isActive ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
        </button>
        <button
          onClick={reset}
          className="p-3 bg-secondary rounded-xl hover:bg-border transition-all"
        >
          <RotateCcw className="w-5 h-5 text-muted-foreground" />
        </button>
      </div>
      <p className="text-[10px] text-muted-foreground mt-4">25m Pomodoro Session</p>
    </div>
  );
}
