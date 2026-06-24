"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import {
  ArrowLeft,
  BookOpen,
  CheckCircle,
  Play,
  Clock,
  Star,
  ChevronRight,
} from "lucide-react";
import { useParams } from "next/navigation";

const courseData: Record<
  string,
  {
    title: string;
    description: string;
    lessons: {
      id: string;
      title: string;
      duration: string;
      xp: number;
      completed: boolean;
    }[];
  }
> = {
  "git-basics": {
    title: "Git Basics",
    description: "Matuto ng fundamentals ng Git mula sa simula.",
    lessons: [
      {
        id: "what-is-git",
        title: "Ano ang Git at Bakit Kailangan Mo Ito?",
        duration: "10 min",
        xp: 50,
        completed: true,
      },
      {
        id: "installing-git",
        title: "Pag-install ng Git",
        duration: "15 min",
        xp: 50,
        completed: true,
      },
      {
        id: "git-init",
        title: "Git Init — Simulan ang Iyong Unang Repository",
        duration: "20 min",
        xp: 50,
        completed: true,
      },
      {
        id: "staging-committing",
        title: "Staging Area at Pag-commit ng Changes",
        duration: "25 min",
        xp: 50,
        completed: true,
      },
      {
        id: "git-log",
        title: "Pagtingin ng Commit History gamit ang Git Log",
        duration: "15 min",
        xp: 50,
        completed: true,
      },
      {
        id: "undoing-changes",
        title: "Pag-undo ng Mistakes: Checkout, Reset, Revert",
        duration: "25 min",
        xp: 50,
        completed: false,
      },
      {
        id: "gitignore",
        title: ".gitignore — Ano ang Dapat Hindi I-track",
        duration: "10 min",
        xp: 50,
        completed: false,
      },
      {
        id: "basics-quiz",
        title: "Git Basics Quiz",
        duration: "15 min",
        xp: 100,
        completed: false,
      },
    ],
  },
};

export default function CourseDetailPage() {
  const params = useParams();
  const courseId = params.courseId as string;
  const course = courseData[courseId];

  if (!course) {
    return (
      <div className="p-6 lg:p-8">
        <div className="text-center py-20">
          <BookOpen className="w-16 h-16 mx-auto text-gray-300 dark:text-gray-600 mb-4" />
          <h2 className="text-xl font-bold mb-2">Course Not Found</h2>
          <p className="text-gray-500 mb-4">
            This course is not available yet.
          </p>
          <Link href="/learn" className="text-primary-500 hover:underline">
            Back to Courses
          </Link>
        </div>
      </div>
    );
  }

  const completedCount = course.lessons.filter((l) => l.completed).length;

  return (
    <div className="p-6 lg:p-8 space-y-6">
      {/* Back */}
      <Link
        href="/learn"
        className="inline-flex items-center gap-1 text-sm text-gray-500 hover:text-primary-500 transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to Courses
      </Link>

      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="flex items-start justify-between flex-wrap gap-4">
          <div>
            <h1 className="text-3xl font-extrabold mb-2">{course.title}</h1>
            <p className="text-gray-600 dark:text-gray-400">
              {course.description}
            </p>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-xl p-4 border border-gray-200 dark:border-gray-700 text-center">
            <p className="text-2xl font-bold gradient-text">
              {completedCount}/{course.lessons.length}
            </p>
            <p className="text-xs text-gray-500">Lessons Complete</p>
            <div className="xp-bar w-24 mt-2">
              <div
                className="xp-bar-fill"
                style={{
                  width: `${(completedCount / course.lessons.length) * 100}%`,
                }}
              />
            </div>
          </div>
        </div>
      </motion.div>

      {/* Lessons */}
      <div className="space-y-3">
        {course.lessons.map((lesson, i) => (
          <motion.div
            key={lesson.id}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.05 }}
          >
            <Link
              href={`/learn/${courseId}/${lesson.id}`}
              className="flex items-center gap-4 bg-white dark:bg-gray-800 rounded-xl p-4 border border-gray-200 dark:border-gray-700 hover:border-primary-300 dark:hover:border-primary-600 transition-all group"
            >
              <div
                className={`shrink-0 w-10 h-10 rounded-lg flex items-center justify-center ${
                  lesson.completed
                    ? "bg-green-100 dark:bg-green-900/30"
                    : "bg-gray-100 dark:bg-gray-700"
                }`}
              >
                {lesson.completed ? (
                  <CheckCircle className="w-5 h-5 text-green-600" />
                ) : (
                  <Play className="w-5 h-5 text-gray-400 group-hover:text-primary-500 transition-colors" />
                )}
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-medium truncate">{lesson.title}</p>
                <div className="flex items-center gap-3 text-xs text-gray-500 mt-0.5">
                  <span className="flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {lesson.duration}
                  </span>
                  <span className="flex items-center gap-1">
                    <Star className="w-3 h-3" />+{lesson.xp} XP
                  </span>
                </div>
              </div>
              <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-primary-500 group-hover:translate-x-1 transition-all" />
            </Link>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
