import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Sidebar from './components/Sidebar';
import Dashboard from './pages/Dashboard';
import History from './pages/History';
import Analytics from './pages/Analytics';
import Challenges from './pages/Challenges';
import SettingsPage from './pages/Settings';

function App() {
  const [history, setHistory] = useState(() => {
    const saved = localStorage.getItem('buildstreak_history');
    return saved ? JSON.parse(saved) : [];
  });

  const [displayName, setDisplayName] = useState(() => {
    return localStorage.getItem('buildstreak_name') || 'Builder';
  });

  const [accentColor, setAccentColor] = useState(() => {
    return localStorage.getItem('buildstreak_accent') || 'blue';
  });

  useEffect(() => {
    localStorage.setItem('buildstreak_history', JSON.stringify(history));
  }, [history]);

  useEffect(() => {
    localStorage.setItem('buildstreak_name', displayName);
  }, [displayName]);

  useEffect(() => {
    localStorage.setItem('buildstreak_accent', accentColor);
    document.documentElement.setAttribute('data-accent', accentColor);
  }, [accentColor]);

  const addEntry = (text, githubUrl = '') => {
    const newEntry = {
      id: Date.now(),
      text,
      githubUrl,
      date: new Date().toISOString(),
    };
    setHistory((prev) => [newEntry, ...prev]);
  };

  return (
    <Router>
      <div className="flex min-h-screen bg-background text-foreground selection:bg-blue-500/30">
        <Sidebar />
        <main className="flex-1 overflow-y-auto relative pb-20 md:pb-0">
          <Routes>
            <Route path="/" element={<Dashboard history={history} onAddEntry={addEntry} displayName={displayName} />} />
            <Route path="/history" element={<History history={history} />} />
            <Route path="/analytics" element={<Analytics history={history} />} />
            <Route path="/challenges" element={<Challenges />} />
            <Route path="/settings" element={<SettingsPage displayName={displayName} setDisplayName={setDisplayName} accentColor={accentColor} setAccentColor={setAccentColor} />} />
            <Route path="*" element={<Dashboard history={history} onAddEntry={addEntry} displayName={displayName} />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
