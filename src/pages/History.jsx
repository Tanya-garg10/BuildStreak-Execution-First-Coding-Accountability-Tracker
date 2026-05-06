import { motion } from 'framer-motion';
import { format } from 'date-fns';
import { Search, Calendar, Code } from 'lucide-react';
import { useState } from 'react';

export default function History({ history }) {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredHistory = history.filter(entry => 
    entry.text.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="max-w-4xl mx-auto p-6 md:p-10 space-y-8"
    >
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Build History</h1>
          <p className="text-muted-foreground mt-2">A timeline of everything you've created.</p>
        </div>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search logs..."
            className="bg-card border border-border rounded-xl pl-10 pr-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all w-full md:w-64"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </header>

      <div className="space-y-4">
        {filteredHistory.map((entry) => (
          <motion.div
            key={entry.id}
            layout
            className="bg-card border border-border rounded-2xl p-6 flex flex-col md:flex-row md:items-center gap-4 hover:border-blue-500/30 transition-colors group"
          >
            <div className="flex items-center gap-3 md:w-48 shrink-0">
              <div className="bg-secondary p-2 rounded-lg group-hover:bg-blue-600/10 transition-colors">
                <Calendar className="w-4 h-4 text-muted-foreground group-hover:text-blue-500" />
              </div>
              <div className="text-xs font-medium text-muted-foreground">
                {format(new Date(entry.date), 'MMM dd, yyyy')}
              </div>
            </div>
            <div className="flex-1 flex flex-col md:flex-row md:items-center justify-between gap-4">
              <p className="text-sm font-semibold text-foreground group-hover:text-blue-400 transition-colors">{entry.text}</p>
              {entry.githubUrl && (
                <a 
                  href={entry.githubUrl} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-[10px] font-bold text-blue-500 bg-blue-500/10 px-3 py-1 rounded-lg hover:bg-blue-500 hover:text-white transition-all w-fit"
                >
                  <Code className="w-3 h-3" />
                  View Repo
                </a>
              )}
            </div>
          </motion.div>
        ))}

        {filteredHistory.length === 0 && (
          <div className="text-center py-20 bg-card/30 border border-dashed border-border rounded-3xl">
            <p className="text-muted-foreground italic">No entries found matching your search.</p>
          </div>
        )}
      </div>
    </motion.div>
  );
}
