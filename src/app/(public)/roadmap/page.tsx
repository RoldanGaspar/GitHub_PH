"use client";

import { motion } from "framer-motion";
import { CheckCircle2, Clock, Sparkles, ArrowRight } from "lucide-react";

const phases = [
  {
    phase: "Phase 1",
    title: "Foundation",
    status: "completed",
    items: [
      "Landing Page & Public Pages",
      "Authentication (GitHub & Google OAuth)",
      "Dashboard Shell",
      "Course & Lesson System",
      "Quiz System",
      "Progress Tracking",
    ],
  },
  {
    phase: "Phase 2",
    title: "Gamification",
    status: "in-progress",
    items: [
      "XP System & Leveling",
      "Achievement System",
      "Daily Streaks",
      "Missions System",
      "Leaderboards",
    ],
  },
  {
    phase: "Phase 3",
    title: "Simulators",
    status: "planned",
    items: [
      "Interactive Git Playground",
      "Branch Simulator (React Flow)",
      "Merge Conflict Simulator",
      "PR Simulator",
    ],
  },
  {
    phase: "Phase 4",
    title: "GitHub Integration",
    status: "planned",
    items: [
      "Repository Analysis",
      "Contribution Tracking",
      "PR Practice Mode",
      "Real GitHub Sync",
    ],
  },
  {
    phase: "Phase 5",
    title: "Community",
    status: "planned",
    items: [
      "Discussion Forums",
      "Study Groups",
      "Activity Feed",
      "Peer Reviews",
    ],
  },
  {
    phase: "Phase 6",
    title: "AI Layer",
    status: "planned",
    items: [
      "GitBuddy AI Tutor",
      "Smart Recommendations",
      "Code Review Assistant",
      "Personalized Learning Paths",
    ],
  },
];

export default function RoadmapPage() {
  return (
    <div className="pt-24 pb-16">
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl sm:text-5xl font-extrabold mb-6">
            Product <span className="gradient-text">Roadmap</span>
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400">
            Kung saan papunta ang GitHubPH. Lahat ng features ay libre
            magpakailanman.
          </p>
        </motion.div>

        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gray-200 dark:bg-gray-700 hidden md:block" />

          <div className="space-y-8">
            {phases.map((phase, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="relative pl-8 md:pl-20"
              >
                {/* Timeline dot */}
                <div
                  className={`absolute left-6 md:left-[30px] w-5 h-5 rounded-full border-4 -translate-x-1/2 mt-1.5 z-10 ${
                    phase.status === "completed"
                      ? "bg-green-500 border-green-200"
                      : phase.status === "in-progress"
                      ? "bg-accent-500 border-accent-200 animate-pulse"
                      : "bg-gray-300 dark:bg-gray-600 border-gray-200 dark:border-gray-700"
                  }`}
                />

                <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 border border-gray-200 dark:border-gray-700 shadow-sm">
                  <div className="flex items-center gap-3 mb-3">
                    <span
                      className={`text-xs font-bold px-3 py-1 rounded-full ${
                        phase.status === "completed"
                          ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400"
                          : phase.status === "in-progress"
                          ? "bg-accent-100 text-accent-700 dark:bg-accent-900/30 dark:text-accent-400"
                          : "bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-300"
                      }`}
                    >
                      {phase.phase}
                    </span>
                    <h3 className="text-xl font-bold">{phase.title}</h3>
                    {phase.status === "completed" && (
                      <CheckCircle2 className="w-5 h-5 text-green-500" />
                    )}
                    {phase.status === "in-progress" && (
                      <Clock className="w-5 h-5 text-accent-500" />
                    )}
                    {phase.status === "planned" && (
                      <Sparkles className="w-5 h-5 text-gray-400" />
                    )}
                  </div>
                  <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    {phase.items.map((item, j) => (
                      <li
                        key={j}
                        className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400"
                      >
                        <div className="w-1.5 h-1.5 rounded-full bg-primary-400" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
