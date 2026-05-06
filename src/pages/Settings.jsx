import { motion } from 'framer-motion';
import { User, Bell, Shield, Trash2, Save, Palette } from 'lucide-react';
import { useState } from 'react';

export default function Settings({ displayName, setDisplayName, accentColor, setAccentColor }) {
  const [localName, setLocalName] = useState(displayName);
  const [saved, setSaved] = useState(false);

  const handleSave = (e) => {
    e.preventDefault();
    setDisplayName(localName);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const handleReset = () => {
    if (confirm("Are you sure you want to reset all your streak data? This cannot be undone.")) {
      localStorage.removeItem('buildstreak_history');
      localStorage.removeItem('buildstreak_name');
      window.location.reload();
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-4xl mx-auto p-6 md:p-10 space-y-8"
    >
      <header>
        <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
        <p className="text-muted-foreground mt-2">Manage your preferences and data.</p>
      </header>

      <div className="space-y-6">
        <section className="bg-card border border-border rounded-2xl overflow-hidden">
          <div className="p-6 border-b border-border flex items-center gap-4">
             <User className="w-5 h-5 text-blue-500" />
             <h2 className="font-bold">Profile Settings</h2>
          </div>
          <form onSubmit={handleSave} className="p-6 space-y-4">
            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium text-muted-foreground">Display Name</label>
              <div className="flex gap-3">
                <input 
                  type="text" 
                  placeholder="Enter your name..." 
                  className="bg-background border border-border rounded-xl px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 flex-1 md:flex-none md:w-64" 
                  value={localName}
                  onChange={(e) => setLocalName(e.target.value)}
                />
                <button 
                  type="submit"
                  className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-xl text-sm font-medium flex items-center gap-2 transition-all shadow-lg shadow-blue-500/20"
                >
                  <Save className="w-4 h-4" />
                  {saved ? 'Saved!' : 'Save'}
                </button>
              </div>
              <p className="text-[10px] text-muted-foreground mt-1">This name will be shown on your Dashboard.</p>
            </div>
          </form>
        </section>

        <section className="bg-card border border-border rounded-2xl overflow-hidden">
          <div className="p-6 border-b border-border flex items-center gap-4">
             <Bell className="w-5 h-5 text-yellow-500" />
             <h2 className="font-bold">Notifications</h2>
          </div>
          <div className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium">Daily Reminders</p>
                <p className="text-xs text-muted-foreground">Get notified if you haven't logged a build by 8 PM.</p>
              </div>
              <div className="w-10 h-6 bg-blue-600 rounded-full relative cursor-pointer">
                <div className="absolute right-1 top-1 w-4 h-4 bg-white rounded-full"></div>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-card border border-border rounded-2xl overflow-hidden">
          <div className="p-6 border-b border-border flex items-center gap-4">
             <Palette className="w-5 h-5 text-purple-500" />
             <h2 className="font-bold">Appearance</h2>
          </div>
          <div className="p-6">
            <div className="flex flex-col gap-3">
              <label className="text-sm font-medium text-muted-foreground">Accent Color</label>
              <div className="flex gap-4">
                {['blue', 'purple', 'green'].map((color) => (
                  <button
                    key={color}
                    onClick={() => setAccentColor(color)}
                    className={`w-10 h-10 rounded-full border-2 transition-all ${
                      accentColor === color ? 'border-white scale-110 shadow-lg' : 'border-transparent opacity-60'
                    } ${
                      color === 'blue' ? 'bg-blue-600' : color === 'purple' ? 'bg-purple-600' : 'bg-green-600'
                    }`}
                  />
                ))}
              </div>
              <p className="text-[10px] text-muted-foreground mt-1">Pick a color that fits your style.</p>
            </div>
          </div>
        </section>

        <section className="bg-card border border-border rounded-2xl overflow-hidden">
          <div className="p-6 border-b border-border flex items-center gap-4 text-red-500">
             <Shield className="w-5 h-5" />
             <h2 className="font-bold">Danger Zone</h2>
          </div>
          <div className="p-6">
            <button 
              onClick={handleReset}
              className="flex items-center gap-2 px-4 py-2 bg-red-500/10 text-red-500 hover:bg-red-500 hover:text-white border border-red-500/20 rounded-xl transition-all font-medium text-sm"
            >
              <Trash2 className="w-4 h-4" />
              Reset All Data
            </button>
          </div>
        </section>
      </div>
    </motion.div>
  );
}
