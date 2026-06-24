"use client";
import { motion } from "framer-motion";
import {
  TrendingUp,
  BookOpen,
  Clock,
  Star,
  CheckCircle,
  ArrowRight,
} from "lucide-react";
import Link from "next/link";

const paths = [
  { title: "Git Beginner Path", courses: 3, weeks: 2, xp: 1000, progress: 62 },
  { title: "Capstone Ready Path", courses: 4, weeks: 3, xp: 1500, progress: 0 },
  { title: "Git Master Path", courses: 6, weeks: 5, xp: 2500, progress: 0 },
];

export default function PathPage() {
  return (
    <div className="p-6 lg:p-8 space-y-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="text-3xl font-extrabold mb-2">Learning Paths</h1>
        <p className="text-gray-600 dark:text-gray-400">
          Structured learning journeys for your goals.
        </p>
      </motion.div>
      <div className="space-y-4">
        {paths.map((path, i) => (
          <motion.div
            key={path.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="bg-white dark:bg-gray-800 rounded-2xl p-6 border border-gray-200 dark:border-gray-700 hover:border-primary-300 dark:hover:border-primary-600 transition-all hover:shadow-lg"
          >
            <div className="flex items-center justify-between flex-wrap gap-4">
              <div>
                <h3 className="text-lg font-bold">{path.title}</h3>
                <div className="flex items-center gap-3 text-sm text-gray-500 mt-1">
                  <span className="flex items-center gap-1">
                    <BookOpen className="w-4 h-4" />
                    {path.courses} courses
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    {path.weeks} weeks
                  </span>
                  <span className="flex items-center gap-1">
                    <Star className="w-4 h-4" />
                    {path.xp} XP
                  </span>
                </div>
              </div>
              <Link
                href={path.progress > 0 ? "/learn/git-basics" : "/learn"}
                className={`px-6 py-2.5 rounded-full font-semibold transition-all flex items-center gap-1 ${
                  path.progress > 0
                    ? "bg-primary-500 text-white hover:bg-primary-600"
                    : "border border-primary-500 text-primary-500 hover:bg-primary-50 dark:hover:bg-primary-900/20"
                }`}
              >
                {path.progress > 0 ? (
                  <>
                    Continue <ArrowRight className="w-4 h-4" />
                  </>
                ) : (
                  "Start Path"
                )}
              </Link>
            </div>
            {path.progress > 0 && (
              <div className="mt-4 flex items-center gap-3">
                <div className="flex-1 h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-primary-500 rounded-full"
                    style={{ width: `${path.progress}%` }}
                  />
                </div>
                <span className="text-sm text-gray-500">{path.progress}%</span>
              </div>
            )}
          </motion.div>
        ))}
      </div>
    </div>
  );
}
