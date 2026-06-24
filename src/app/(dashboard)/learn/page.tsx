"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import {
  BookOpen,
  Clock,
  BarChart3,
  ArrowRight,
  Star,
  Zap,
  CheckCircle,
  Play,
} from "lucide-react";

const courses = [
  {
    id: "git-basics",
    title: "Git Basics",
    description:
      "Matuto ng fundamentals ng Git: repository, commits, staging area, at ang Git workflow. Perfect para sa absolute beginners.",
    difficulty: "beginner",
    lessons: 8,
    estimatedHours: 3,
    xpReward: 400,
    progress: 75,
    icon: "🚀",
  },
  {
    id: "branching-merging",
    title: "Branching & Merging",
    description:
      "Master ang branching at merging strategies. Matuto kung paano magtrabaho sa branches at i-merge ang changes nang walang conflict.",
    difficulty: "beginner",
    lessons: 6,
    estimatedHours: 2.5,
    xpReward: 300,
    progress: 0,
    icon: "🌿",
  },
  {
    id: "github-collaboration",
    title: "GitHub Collaboration",
    description:
      "Matuto ng pull requests, code reviews, issues, at kung paano makipag-collaborate sa GitHub projects bilang team.",
    difficulty: "intermediate",
    lessons: 10,
    estimatedHours: 4,
    xpReward: 500,
    progress: 0,
    icon: "🤝",
  },
  {
    id: "git-workflows",
    title: "Advanced Git Workflows",
    description:
      "Explore ang Git Flow, GitHub Flow, rebase strategies, cherry-pick, stash, at iba pang advanced techniques.",
    difficulty: "advanced",
    lessons: 8,
    estimatedHours: 3.5,
    xpReward: 400,
    progress: 30,
    icon: "⚡",
  },
  {
    id: "capstone-git",
    title: "Git para sa Capstone Project",
    description:
      "Practical Git workflow para sa capstone groups. Matuto ng version control, task management, at deployment strategies.",
    difficulty: "intermediate",
    lessons: 6,
    estimatedHours: 2,
    xpReward: 300,
    progress: 0,
    icon: "🎓",
  },
  {
    id: "git-troubleshooting",
    title: "Git Troubleshooting",
    description:
      "Common Git problems at solutions. Matuto kung paano i-undo ang mistakes, i-resolve ang conflicts, at i-recover ang lost work.",
    difficulty: "intermediate",
    lessons: 5,
    estimatedHours: 2,
    xpReward: 250,
    progress: 0,
    icon: "🔧",
  },
];

const difficultyColors = {
  beginner:
    "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400",
  intermediate:
    "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400",
  advanced: "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400",
};

export default function LearnPage() {
  return (
    <div className="p-6 lg:p-8 space-y-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="text-3xl font-extrabold mb-2">
          Browse <span className="gradient-text">Courses</span>
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          Pumili ng course at simulan ang iyong Git learning journey!
        </p>
      </motion.div>

      {/* Course Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {courses.map((course, i) => (
          <motion.div
            key={course.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
          >
            <Link
              href={`/learn/${course.id}`}
              className="block group bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 hover:border-primary-300 dark:hover:border-primary-600 transition-all duration-300 hover:shadow-xl hover:-translate-y-1 overflow-hidden"
            >
              {/* Course Banner */}
              <div className="relative h-32 bg-gradient-to-br from-primary-500 via-primary-600 to-accent-500 flex items-center justify-center">
                <span className="text-5xl">{course.icon}</span>
                {course.progress > 0 && (
                  <div className="absolute bottom-0 left-0 right-0 h-1.5 bg-black/20">
                    <div
                      className="h-full bg-white/80"
                      style={{ width: `${course.progress}%` }}
                    />
                  </div>
                )}
              </div>

              {/* Course Info */}
              <div className="p-5">
                <div className="flex items-start justify-between mb-2">
                  <h3 className="font-bold text-lg group-hover:text-primary-500 transition-colors">
                    {course.title}
                  </h3>
                  <span
                    className={`text-[10px] px-2 py-0.5 rounded-full font-bold uppercase shrink-0 ml-2 ${
                      difficultyColors[
                        course.difficulty as keyof typeof difficultyColors
                      ]
                    }`}
                  >
                    {course.difficulty}
                  </span>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-4 line-clamp-2">
                  {course.description}
                </p>

                <div className="flex items-center gap-4 text-xs text-gray-500 mb-4">
                  <span className="flex items-center gap-1">
                    <BookOpen className="w-3.5 h-3.5" />
                    {course.lessons} lessons
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5" />
                    {course.estimatedHours}h
                  </span>
                  <span className="flex items-center gap-1">
                    <Star className="w-3.5 h-3.5" />
                    {course.xpReward} XP
                  </span>
                </div>

                {/* Button */}
                <div className="flex items-center justify-between">
                  {course.progress > 0 ? (
                    <span className="text-sm font-medium text-primary-600 dark:text-primary-400 flex items-center gap-1">
                      <Play className="w-4 h-4" />
                      Continue ({course.progress}%)
                    </span>
                  ) : (
                    <span className="text-sm font-medium text-gray-400 flex items-center gap-1">
                      <Play className="w-4 h-4" />
                      Start Course
                    </span>
                  )}
                  <ArrowRight className="w-4 h-4 text-gray-400 group-hover:text-primary-500 group-hover:translate-x-1 transition-all" />
                </div>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
