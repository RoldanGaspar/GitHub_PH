"use client";

import { motion } from "framer-motion";
import { useSession } from "next-auth/react";
import {
  Trophy,
  Flame,
  BookOpen,
  Target,
  Star,
  TrendingUp,
  Terminal,
  ArrowRight,
  Zap,
  Clock,
  CheckCircle,
} from "lucide-react";
import Link from "next/link";

const recentLessons = [
  {
    title: "Git Init & First Commit",
    course: "Git Basics",
    progress: 100,
    xp: 50,
  },
  {
    title: "Understanding Branches",
    course: "Git Basics",
    progress: 75,
    xp: 40,
  },
  { title: "Merge vs Rebase", course: "Git Intermediate", progress: 30, xp: 0 },
];

const activeMissions = [
  {
    title: "Complete 3 Lessons Today",
    type: "daily",
    progress: 2,
    target: 3,
    xp: 100,
  },
  {
    title: "First Branch Created",
    type: "story",
    progress: 1,
    target: 1,
    xp: 200,
  },
  { title: "Week Warrior", type: "weekly", progress: 4, target: 7, xp: 500 },
];

export default function DashboardPage() {
  const { data: session } = useSession();

  return (
    <div className="p-6 lg:p-8 space-y-8">
      {/* Welcome + Stats */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4"
      >
        {/* Welcome Card */}
        <div className="lg:col-span-2 bg-gradient-to-br from-primary-500 to-primary-700 text-white rounded-2xl p-6 shadow-lg">
          <h1 className="text-2xl font-bold mb-1">
            Kamusta, {session?.user?.name?.split(" ")[0] || "Developer"}! 👋
          </h1>
          <p className="text-primary-100 mb-4">
            Continue your Git journey. You're doing great!
          </p>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <Flame className="w-5 h-5 text-orange-300" />
              <span className="font-semibold">5-Day Streak</span>
            </div>
            <div className="flex items-center gap-2">
              <Zap className="w-5 h-5 text-accent-300" />
              <span className="font-semibold">Level 8</span>
            </div>
          </div>
        </div>

        {/* XP Card */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 border border-gray-200 dark:border-gray-700 shadow-sm">
          <Trophy className="w-8 h-8 text-accent-500 mb-3" />
          <p className="text-sm text-gray-500 dark:text-gray-400">Total XP</p>
          <p className="text-3xl font-bold gradient-text">650</p>
          <div className="xp-bar mt-2">
            <div className="xp-bar-fill" style={{ width: "65%" }} />
          </div>
          <p className="text-xs text-gray-400 mt-1">350 XP to Level 9</p>
        </div>

        {/* Progress Card */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 border border-gray-200 dark:border-gray-700 shadow-sm">
          <BookOpen className="w-8 h-8 text-primary-500 mb-3" />
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Lessons Done
          </p>
          <p className="text-3xl font-bold gradient-text">12</p>
          <p className="text-xs text-gray-400 mt-2">2 courses in progress</p>
        </div>
      </motion.div>

      {/* Middle Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Continue Learning */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="lg:col-span-2"
        >
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold">Continue Learning</h2>
            <Link
              href="/learn"
              className="text-sm text-primary-500 hover:text-primary-600 flex items-center gap-1"
            >
              View All <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="space-y-3">
            {recentLessons.map((lesson, i) => (
              <Link
                key={i}
                href="/learn"
                className="flex items-center gap-4 bg-white dark:bg-gray-800 rounded-xl p-4 border border-gray-200 dark:border-gray-700 hover:border-primary-300 dark:hover:border-primary-600 transition-all group"
              >
                <div
                  className={`shrink-0 w-10 h-10 rounded-lg flex items-center justify-center ${
                    lesson.progress === 100
                      ? "bg-green-100 dark:bg-green-900/30"
                      : lesson.progress > 0
                      ? "bg-primary-100 dark:bg-primary-900/30"
                      : "bg-gray-100 dark:bg-gray-700"
                  }`}
                >
                  {lesson.progress === 100 ? (
                    <CheckCircle className="w-5 h-5 text-green-600" />
                  ) : lesson.progress > 0 ? (
                    <Clock className="w-5 h-5 text-primary-600" />
                  ) : (
                    <BookOpen className="w-5 h-5 text-gray-400" />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-medium truncate">{lesson.title}</p>
                  <p className="text-xs text-gray-500">{lesson.course}</p>
                  <div className="flex items-center gap-2 mt-1">
                    <div className="flex-1 h-1.5 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-primary-500 rounded-full transition-all"
                        style={{ width: `${lesson.progress}%` }}
                      />
                    </div>
                    <span className="text-xs text-gray-400">
                      {lesson.progress}%
                    </span>
                  </div>
                </div>
                <div className="shrink-0 text-right">
                  <span className="text-sm font-bold gradient-text">
                    +{lesson.xp} XP
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </motion.div>

        {/* Active Missions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold">Active Missions</h2>
            <Link
              href="/missions"
              className="text-sm text-primary-500 hover:text-primary-600 flex items-center gap-1"
            >
              View All <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="space-y-3">
            {activeMissions.map((mission, i) => (
              <div
                key={i}
                className="bg-white dark:bg-gray-800 rounded-xl p-4 border border-gray-200 dark:border-gray-700"
              >
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <p className="text-sm font-medium">{mission.title}</p>
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
                  <Star className="w-4 h-4 text-accent-400" />
                </div>
                <div className="flex items-center gap-2 mt-2">
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
                <p className="text-xs font-semibold text-accent-600 dark:text-accent-400 mt-1">
                  +{mission.xp} XP reward
                </p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Quick Actions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <h2 className="text-lg font-bold mb-4">Quick Actions</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            {
              icon: Terminal,
              label: "Git Playground",
              href: "/playground",
              color: "from-blue-500 to-cyan-500",
            },
            {
              icon: BookOpen,
              label: "Browse Courses",
              href: "/learn",
              color: "from-emerald-500 to-teal-500",
            },
            {
              icon: Target,
              label: "View Missions",
              href: "/missions",
              color: "from-rose-500 to-red-500",
            },
            {
              icon: Trophy,
              label: "Achievements",
              href: "/achievements",
              color: "from-amber-500 to-orange-500",
            },
          ].map((action) => (
            <Link
              key={action.label}
              href={action.href}
              className="group bg-white dark:bg-gray-800 rounded-xl p-5 border border-gray-200 dark:border-gray-700 hover:border-primary-300 dark:hover:border-primary-600 transition-all hover:shadow-lg text-center"
            >
              <div
                className={`w-12 h-12 mx-auto mb-3 rounded-xl bg-gradient-to-br ${action.color} flex items-center justify-center group-hover:scale-110 transition-transform`}
              >
                <action.icon className="w-6 h-6 text-white" />
              </div>
              <p className="text-sm font-medium">{action.label}</p>
            </Link>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
