"use client";

import { motion } from "framer-motion";
import {
  Trophy,
  Star,
  Zap,
  Lock,
  CheckCircle,
  Flame,
  BookOpen,
  Target,
  Terminal,
} from "lucide-react";

const achievements = [
  {
    name: "First Commit",
    description: "Complete your first lesson",
    icon: CheckCircle,
    unlocked: true,
    xp: 50,
    color: "from-green-500 to-emerald-500",
  },
  {
    name: "Git Explorer",
    description: "Complete 5 lessons",
    icon: BookOpen,
    unlocked: true,
    xp: 100,
    color: "from-blue-500 to-cyan-500",
  },
  {
    name: "Streak Starter",
    description: "Maintain a 3-day streak",
    icon: Flame,
    unlocked: true,
    xp: 150,
    color: "from-orange-500 to-red-500",
  },
  {
    name: "Quiz Master",
    description: "Get 100% on 3 quizzes",
    icon: Star,
    unlocked: false,
    xp: 200,
    color: "from-amber-500 to-yellow-500",
  },
  {
    name: "Branch Wizard",
    description: "Complete Branching & Merging course",
    icon: Zap,
    unlocked: false,
    xp: 300,
    color: "from-purple-500 to-pink-500",
  },
  {
    name: "Mission Complete",
    description: "Finish 10 missions",
    icon: Target,
    unlocked: false,
    xp: 250,
    color: "from-rose-500 to-red-500",
  },
  {
    name: "Terminal Pro",
    description: "Run 50 commands in Playground",
    icon: Terminal,
    unlocked: false,
    xp: 200,
    color: "from-teal-500 to-green-500",
  },
  {
    name: "Capstone Ready",
    description: "Complete all intermediate courses",
    icon: Trophy,
    unlocked: false,
    xp: 500,
    color: "from-indigo-500 to-violet-500",
  },
];

export default function AchievementsPage() {
  const unlockedCount = achievements.filter((a) => a.unlocked).length;

  return (
    <div className="p-6 lg:p-8 space-y-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="text-3xl font-extrabold mb-2">Achievements</h1>
        <p className="text-gray-600 dark:text-gray-400">
          {unlockedCount} / {achievements.length} unlocked
        </p>
      </motion.div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {achievements.map((achievement, i) => (
          <motion.div
            key={achievement.name}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
            className={`achievement-card ${
              achievement.unlocked ? "unlocked" : "locked"
            }`}
          >
            <div
              className={`w-12 h-12 rounded-xl bg-gradient-to-br ${achievement.color} flex items-center justify-center mb-3`}
            >
              <achievement.icon className="w-6 h-6 text-white" />
            </div>
            <h3 className="font-semibold text-sm mb-1">{achievement.name}</h3>
            <p className="text-xs text-gray-500 dark:text-gray-400 mb-2">
              {achievement.description}
            </p>
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-accent-600">
                +{achievement.xp} XP
              </span>
              {achievement.unlocked ? (
                <CheckCircle className="w-4 h-4 text-green-500" />
              ) : (
                <Lock className="w-4 h-4 text-gray-400" />
              )}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
