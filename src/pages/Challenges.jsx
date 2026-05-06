import { motion } from 'framer-motion';
import { Target, Rocket, Code, Globe, Shield, Link } from 'lucide-react';

const challenges = [
  { 
    id: 1, 
    title: 'LeetCode Daily', 
    desc: 'Solve today\'s daily coding challenge on LeetCode.', 
    icon: Target, 
    difficulty: 'Variable',
    url: 'https://leetcode.com/problemset/all/'
  },
  { 
    id: 2, 
    title: 'Codeforces Contest', 
    desc: 'Participate in the upcoming Codeforces round.', 
    icon: Globe, 
    difficulty: 'Hard',
    url: 'https://codeforces.com/contests'
  },
  { 
    id: 3, 
    title: 'GeeksforGeeks POTD', 
    desc: 'Problem of the day on GeeksforGeeks.', 
    icon: Shield, 
    difficulty: 'Medium',
    url: 'https://www.geeksforgeeks.org/problem-of-the-day'
  },
  { 
    id: 4, 
    title: 'Frontend Mentor', 
    desc: 'Build a real-world frontend project from Frontend Mentor.', 
    icon: Rocket, 
    difficulty: 'Medium',
    url: 'https://www.frontendmentor.io/challenges'
  },
  { 
    id: 5, 
    title: 'Codewars Training', 
    desc: 'Improve your skills by solving Katas on Codewars.', 
    icon: Code, 
    difficulty: 'Easy',
    url: 'https://www.codewars.com/dashboard'
  },
  { 
    id: 6, 
    title: 'Exercism Track', 
    desc: 'Master a new programming language with Exercism.', 
    icon: Target, 
    difficulty: 'Medium',
    url: 'https://exercism.org/tracks'
  },
  { 
    id: 7, 
    title: 'Open Source Contribution', 
    desc: 'Find a "good first issue" on GitHub to contribute.', 
    icon: Globe, 
    difficulty: 'Medium',
    url: 'https://github.com/explore'
  },
  { 
    id: 8, 
    title: 'Dev.to Article', 
    desc: 'Write a technical blog post about what you built today.', 
    icon: Shield, 
    difficulty: 'Easy',
    url: 'https://dev.to/'
  },
  { 
    id: 9, 
    title: 'UI/UX Design Challenge', 
    desc: 'Recreate a trending design from Dribbble.', 
    icon: Code, 
    difficulty: 'Medium',
    url: 'https://dribbble.com/shots'
  },
];

export default function Challenges() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="max-w-4xl mx-auto p-6 md:p-10 space-y-8"
    >
      <header>
        <h1 className="text-3xl font-bold tracking-tight">Real-World Challenges</h1>
        <p className="text-muted-foreground mt-2">Open these platforms to solve real problems and build your skills.</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {challenges.map((ch, i) => (
          <motion.a
            key={ch.id}
            href={ch.url}
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.1 }}
            whileHover={{ y: -5, scale: 1.02 }}
            className="bg-card border border-border rounded-2xl p-6 hover:shadow-xl transition-all cursor-pointer group block relative"
          >
            <div className="absolute top-4 right-4 text-muted-foreground group-hover:text-blue-500 transition-colors">
              <Link className="w-4 h-4" />
            </div>
            <div className="flex items-start gap-4">
              <div className="bg-secondary p-3 rounded-xl group-hover:bg-blue-600 transition-colors">
                <ch.icon className="w-6 h-6 text-foreground group-hover:text-white" />
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between mb-1">
                  <h3 className="font-bold pr-6">{ch.title}</h3>
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${
                    ch.difficulty === 'Easy' ? 'border-green-500/50 text-green-500' :
                    ch.difficulty === 'Medium' ? 'border-yellow-500/50 text-yellow-500' :
                    'border-red-500/50 text-red-500'
                  }`}>
                    {ch.difficulty}
                  </span>
                </div>
                <p className="text-sm text-muted-foreground">{ch.desc}</p>
              </div>
            </div>
          </motion.a>
        ))}
      </div>
      
      <div className="bg-blue-600/5 border border-dashed border-blue-500/20 rounded-3xl p-10 text-center">
        <Rocket className="w-10 h-10 text-blue-500/50 mx-auto mb-4" />
        <h3 className="text-lg font-bold">New platforms added weekly</h3>
        <p className="text-sm text-muted-foreground max-w-sm mx-auto mt-2">
          Keep exploring new horizons to become a top-tier developer!
        </p>
      </div>
    </motion.div>
  );
}
