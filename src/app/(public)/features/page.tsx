"use client";

import { motion } from "framer-motion";
import {
  Terminal,
  GitBranch,
  Trophy,
  BookOpen,
  Puzzle,
  Shield,
  Rocket,
  Zap,
  Star,
  Users,
  ChevronRight,
} from "lucide-react";
import Link from "next/link";

const allFeatures = [
  {
    icon: Terminal,
    title: "Interactive Git Playground",
    description:
      "Live terminal simulation kung saan pwedeng mag-practice ng Git commands nang walang kailangan i-install. Makita ang real-time visualization ng repository state.",
    color: "from-blue-500 to-cyan-500",
    status: "Available",
  },
  {
    icon: GitBranch,
    title: "Branch Simulator",
    description:
      "Visual na pag-explore ng branching. Makita ang branch tree, mag-merge ng branches, at intindihin kung paano gumagana ang collaboration.",
    color: "from-purple-500 to-pink-500",
    status: "Available",
  },
  {
    icon: Puzzle,
    title: "Merge Conflict Simulator",
    description:
      "Interactive conflict resolution. Matutunan kung paano i-resolve ang merge conflicts nang hindi nasisira ang project — sa safe environment.",
    color: "from-rose-500 to-red-500",
    status: "Available",
  },
  {
    icon: Trophy,
    title: "XP & Achievement System",
    description:
      "Earn XP, level up, unlock achievements, at maintain streaks. Gamification na pwedeng i-share — friendly competition with friends.",
    color: "from-amber-500 to-orange-500",
    status: "Available",
  },
  {
    icon: BookOpen,
    title: "Structured Courses",
    description:
      "Mula Git Basics hanggang Advanced Workflows. Bawat course may quizzes, missions, at real-world Filipino scenarios.",
    color: "from-emerald-500 to-teal-500",
    status: "Available",
  },
  {
    icon: Rocket,
    title: "Mission-Based Learning",
    description:
      "Lessons become quests! Kumpletuhin ang daily, weekly, at story missions para ma-apply ang natutunan sa realistic situations.",
    color: "from-indigo-500 to-violet-500",
    status: "Available",
  },
  {
    icon: Users,
    title: "Leaderboards",
    description:
      "Makipag-kumpitensya sa kapwa learners. Tingnan kung sino ang may pinakamaraming XP, achievements, at completed courses.",
    color: "from-orange-500 to-red-500",
    status: "Available",
  },
  {
    icon: Shield,
    title: "Safe Sandbox",
    description:
      "Walang pwedeng masirang project. Mag-practice nang mag-practice sa sandbox environment hanggang maging confident.",
    color: "from-sky-500 to-indigo-500",
    status: "Available",
  },
  {
    icon: Zap,
    title: "GitHub Integration",
    description:
      "I-connect ang GitHub account para sa real repository analysis, contribution tracking, at PR practice.",
    color: "from-gray-500 to-gray-700",
    status: "Coming Soon",
  },
  {
    icon: Star,
    title: "AI GitBuddy Tutor",
    description:
      "AI-powered assistant na sasagot sa tanong mo tungkol sa Git. Personalized help habang nag-aaral.",
    color: "from-violet-500 to-fuchsia-500",
    status: "Future",
  },
];

export default function FeaturesPage() {
  return (
    <div className="pt-24 pb-16">
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <h1 className="text-4xl sm:text-5xl font-extrabold mb-6">
            Lahat ng <span className="gradient-text">Features</span>
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed">
            Ang GitHubPH ay puno ng features para gawing masaya at epektibo ang
            pag-aaral ng Git at GitHub. Mula interactive simulators hanggang
            gamification — lahat libre.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {allFeatures.map((feature, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: (i % 4) * 0.1 }}
              className="relative bg-white dark:bg-gray-800 rounded-2xl p-6 border border-gray-200 dark:border-gray-700 hover:border-primary-300 dark:hover:border-primary-600 transition-all duration-300 hover:shadow-lg"
            >
              <div className="flex items-start gap-4">
                <div
                  className={`shrink-0 w-12 h-12 rounded-xl bg-gradient-to-br ${feature.color} flex items-center justify-center`}
                >
                  <feature.icon className="w-6 h-6 text-white" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                      {feature.title}
                    </h3>
                    <span
                      className={`text-xs px-2 py-0.5 rounded-full ${
                        feature.status === "Available"
                          ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400"
                          : feature.status === "Coming Soon"
                          ? "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400"
                          : "bg-gray-100 text-gray-500 dark:bg-gray-700 dark:text-gray-400"
                      }`}
                    >
                      {feature.status}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <Link
            href="/login"
            className="inline-flex items-center gap-2 px-8 py-4 bg-primary-500 text-white rounded-full text-lg font-semibold hover:bg-primary-600 transition-all hover:shadow-2xl active:scale-95"
          >
            Try All Features Free
            <ChevronRight className="w-5 h-5" />
          </Link>
        </motion.div>
      </section>
    </div>
  );
}
