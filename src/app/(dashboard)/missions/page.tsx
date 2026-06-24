"use client";

import { motion } from "framer-motion";
import { Target, Star, Clock, CheckCircle, ArrowRight } from "lucide-react";

const missions = [
  {
    title: "Complete 3 Lessons Today",
    type: "daily",
    progress: 2,
    target: 3,
    xp: 100,
    expiresIn: "6h",
  },
  {
    title: "Run Your First Git Command",
    type: "story",
    progress: 1,
    target: 1,
    xp: 200,
  },
  {
    title: "Week Warrior",
    type: "weekly",
    progress: 4,
    target: 7,
    xp: 500,
    expiresIn: "3d",
  },
  {
    title: "Quiz Perfect",
    type: "daily",
    progress: 0,
    target: 1,
    xp: 150,
    expiresIn: "8h",
  },
  { title: "Branch Explorer", type: "story", progress: 0, target: 1, xp: 300 },
  { title: "Capstone Starter", type: "story", progress: 0, target: 1, xp: 400 },
];

export default function MissionsPage() {
  return (
    <div className="p-6 lg:p-8 space-y-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="text-3xl font-extrabold mb-2">Missions</h1>
        <p className="text-gray-600 dark:text-gray-400">
          Complete missions to earn XP and unlock achievements.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {missions.map((mission, i) => (
          <motion.div
            key={mission.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
            className="bg-white dark:bg-gray-800 rounded-xl p-5 border border-gray-200 dark:border-gray-700"
          >
            <div className="flex items-start justify-between mb-3">
              <div>
                <h3 className="font-semibold">{mission.title}</h3>
                <span
                  className={`text-[10px] px-2 py-0.5 rounded-full uppercase font-bold ${
                    mission.type === "daily"
                      ? "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400"
                      : mission.type === "weekly"
                      ? "bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400"
                      : "bg-accent-100 text-accent-700 dark:bg-accent-900/30 dark:text-accent-400"
                  }`}
                >
                  {mission.type}
                </span>
              </div>
              <div className="text-right">
                <span className="text-sm font-bold text-accent-600">
                  +{mission.xp} XP
                </span>
                {mission.expiresIn && (
                  <p className="text-[10px] text-gray-400 flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {mission.expiresIn}
                  </p>
                )}
              </div>
            </div>
            <div className="flex items-center gap-2">
              <div className="flex-1 h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                <div
                  className={`h-full rounded-full ${
                    mission.progress >= mission.target
                      ? "bg-green-500"
                      : "bg-accent-500"
                  }`}
                  style={{
                    width: `${(mission.progress / mission.target) * 100}%`,
                  }}
                />
              </div>
              <span className="text-xs text-gray-500">
                {mission.progress}/{mission.target}
              </span>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
