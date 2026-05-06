import { NavLink } from 'react-router-dom';
import { LayoutDashboard, History as HistoryIcon, BarChart3, Trophy, Code2, Settings } from 'lucide-react';
import { motion } from 'framer-motion';

const menuItems = [
  { path: '/', icon: LayoutDashboard, label: 'Dashboard' },
  { path: '/history', icon: HistoryIcon, label: 'History' },
  { path: '/analytics', icon: BarChart3, label: 'Analytics' },
  { path: '/challenges', icon: Trophy, label: 'Challenges' },
];

export default function Sidebar() {
  return (
    <>
    <aside className="w-64 border-r border-border bg-card/50 backdrop-blur-xl hidden md:flex flex-col shrink-0">
      <div className="p-6 flex items-center gap-3">
        <div className="bg-blue-600 p-2 rounded-xl">
          <Code2 className="w-6 h-6 text-white" />
        </div>
        <h1 className="text-xl font-bold tracking-tight">BuildStreak</h1>
      </div>

      <nav className="flex-1 px-4 py-4 space-y-2">
        {menuItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group ${
                isActive
                  ? 'bg-blue-600/10 text-blue-500 border border-blue-500/20'
                  : 'hover:bg-secondary text-muted-foreground hover:text-foreground'
              }`
            }
          >
            <item.icon className="w-5 h-5 transition-transform group-hover:scale-110" />
            <span className="font-medium">{item.label}</span>
          </NavLink>
        ))}
      </nav>

      <div className="p-6 border-t border-border">
        <NavLink
          to="/settings"
          className={({ isActive }) =>
            `flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
              isActive
                ? 'bg-blue-600/10 text-blue-500 border border-blue-500/20'
                : 'hover:bg-secondary text-muted-foreground hover:text-foreground'
            }`
          }
        >
          <Settings className="w-5 h-5" />
          <span className="font-medium">Settings</span>
        </NavLink>
      </div>
    </aside>

    <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-card border-t border-border px-6 py-3 flex justify-between items-center z-50 backdrop-blur-lg bg-card/80">
      {menuItems.map((item) => (
        <NavLink
          key={item.path}
          to={item.path}
          className={({ isActive }) =>
            `p-3 rounded-xl transition-all ${
              isActive ? 'bg-blue-600 text-white' : 'text-muted-foreground'
            }`
          }
        >
          <item.icon className="w-5 h-5" />
        </NavLink>
      ))}
    </nav>
    </>
  );
}
