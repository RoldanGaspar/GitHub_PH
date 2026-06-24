"use client";

import { motion } from "framer-motion";
import { Trophy, Medal, Star, Zap } from "lucide-react";

const leaderboard = [
  { rank: 1, name: "Juan Dela Cruz", xp: 2500, level: 15, avatar: "J" },
  { rank: 2, name: "Maria Santos", xp: 2350, level: 14, avatar: "M" },
  { rank: 3, name: "Jose Rizal", xp: 2100, level: 13, avatar: "J" },
  { rank: 4, name: "Ana Reyes", xp: 1800, level: 12, avatar: "A" },
  { rank: 5, name: "You", xp: 650, level: 8, avatar: "Y", isYou: true },
  { rank: 6, name: "Carlos Garcia", xp: 1200, level: 10, avatar: "C" },
  { rank: 7, name: "Elena Cruz", xp: 1000, level: 9, avatar: "E" },
];

export default function LeaderboardPage() {
  return (
    <div className="p-6 lg:p-8 space-y-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="text-3xl font-extrabold mb-2">Leaderboard</h1>
        <p className="text-gray-600 dark:text-gray-400">
          Top learners this week. Keep learning to climb the ranks!
        </p>
      </motion.div>

      {/* Top 3 */}
      <div className="grid grid-cols-3 gap-4 max-w-lg mx-auto mb-8">
        {[leaderboard[1], leaderboard[0], leaderboard[2]].map((user, i) => {
          const isFirst = user.rank === 1;
          return (
            <motion.div
              key={user.rank}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className={`text-center ${isFirst ? "-mt-4" : ""}`}
            >
              <div
                className={`w-16 h-16 mx-auto rounded-full flex items-center justify-center text-xl font-bold mb-2 ${
                  isFirst
                    ? "bg-gradient-to-br from-accent-400 to-accent-600 text-white shadow-lg shadow-accent-500/30 w-20 h-20 text-2xl"
                    : user.rank === 2
                    ? "bg-gradient-to-br from-gray-300 to-gray-400 text-gray-700"
                    : "bg-gradient-to-br from-amber-600 to-amber-700 text-white"
                }`}
              >
                {user.avatar}
              </div>
              <p className="font-semibold text-sm truncate">{user.name}</p>
              <p className="text-xs text-accent-600 font-bold">{user.xp} XP</p>
              <p className="text-[10px] text-gray-400">Level {user.level}</p>
            </motion.div>
          );
        })}
      </div>

      {/* List */}
      <div className="space-y-2">
        {leaderboard.map((user, i) => (
          <motion.div
            key={user.rank}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.05 }}
            className={`flex items-center gap-4 p-4 rounded-xl ${
              user.isYou
                ? "bg-primary-50 dark:bg-primary-900/20 border border-primary-200 dark:border-primary-800"
                : "bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700"
            }`}
          >
            <span
              className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                user.rank <= 3
                  ? "bg-accent-100 text-accent-700 dark:bg-accent-900/30 dark:text-accent-400"
                  : "bg-gray-100 dark:bg-gray-700 text-gray-500"
              }`}
            >
              {user.rank}
            </span>
            <div className="flex-1 flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-primary-100 dark:bg-primary-900/30 flex items-center justify-center font-bold text-primary-600">
                {user.avatar}
              </div>
              <div>
                <p className="font-medium">{user.name}</p>
                <p className="text-xs text-gray-500">Level {user.level}</p>
              </div>
            </div>
            <div className="text-right">
              <p className="font-bold gradient-text">{user.xp} XP</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
