"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Play, Star, Users, Zap, ChevronRight } from "lucide-react";

export function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16">
      {/* Background Effects */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-primary-400/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent-400/20 rounded-full blur-3xl animate-pulse delay-1000" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary-500/5 rounded-full blur-3xl" />

        {/* Grid Pattern */}
        <div
          className="absolute inset-0 opacity-[0.03] dark:opacity-[0.05]"
          style={{
            backgroundImage: `linear-gradient(#2563eb 1px, transparent 1px), linear-gradient(90deg, #2563eb 1px, transparent 1px)`,
            backgroundSize: "60px 60px",
          }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center max-w-4xl mx-auto">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-50 dark:bg-primary-900/30 border border-primary-200 dark:border-primary-700 mb-8"
          >
            <Star className="w-4 h-4 text-accent-500 fill-accent-500" />
            <span className="text-sm font-medium text-primary-700 dark:text-primary-300">
              Free for all Filipino students 🇵🇭
            </span>
          </motion.div>

          {/* Main Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight mb-6"
          >
            Learn Git & GitHub
            <br />
            <span className="gradient-text">the Fun Way</span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-lg sm:text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto mb-10 leading-relaxed"
          >
            Ang pinakamadaling paraan para matuto ng Git at GitHub. Interactive
            simulations, gamified lessons, at Filipino-friendly na paliwanag —
            hindi boring na documentation.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16"
          >
            <Link
              href="/login"
              className="group inline-flex items-center gap-2 px-8 py-4 bg-primary-500 text-white rounded-full text-lg font-semibold hover:bg-primary-600 transition-all hover:shadow-2xl hover:shadow-primary-500/30 active:scale-95"
            >
              Start Learning Free
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              href="/learn"
              className="inline-flex items-center gap-2 px-8 py-4 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 rounded-full text-lg font-semibold border border-gray-200 dark:border-gray-700 hover:border-primary-300 dark:hover:border-primary-600 transition-all active:scale-95"
            >
              <Play className="w-5 h-5" />
              Explore Courses
            </Link>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-3xl mx-auto"
          >
            {[
              { icon: Users, value: "5,000+", label: "Learners" },
              { icon: Zap, value: "25+", label: "Lessons" },
              { icon: Star, value: "50+", label: "Missions" },
              { icon: Play, value: "3", label: "Simulators" },
            ].map((stat, i) => (
              <div key={i} className="text-center">
                <stat.icon className="w-5 h-5 mx-auto mb-2 text-primary-500" />
                <div className="text-2xl font-bold gradient-text">
                  {stat.value}
                </div>
                <div className="text-sm text-gray-500 dark:text-gray-400">
                  {stat.label}
                </div>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Floating Terminal Preview */}
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.5 }}
          className="mt-16 max-w-2xl mx-auto"
        >
          <div className="bg-gray-900 rounded-xl shadow-2xl overflow-hidden border border-gray-700">
            {/* Terminal Header */}
            <div className="flex items-center gap-2 px-4 py-3 bg-gray-800 border-b border-gray-700">
              <div className="flex gap-1.5">
                <div className="w-3 h-3 rounded-full bg-red-500" />
                <div className="w-3 h-3 rounded-full bg-yellow-500" />
                <div className="w-3 h-3 rounded-full bg-green-500" />
              </div>
              <span className="text-xs text-gray-400 ml-2 font-mono">
                git-playground ~ GitHubPH
              </span>
            </div>
            {/* Terminal Content */}
            <div className="p-4 font-mono text-sm space-y-1">
              <div className="flex items-start gap-2">
                <span className="text-green-400 shrink-0">$</span>
                <span className="text-gray-300">
                  git init my-capstone-project
                </span>
              </div>
              <div className="text-gray-500 pl-4">
                Initialized empty Git repository in my-capstone-project/.git/
              </div>
              <div className="flex items-start gap-2 mt-2">
                <span className="text-green-400 shrink-0">$</span>
                <span className="text-gray-300">
                  git branch feature/login-system
                </span>
              </div>
              <div className="text-gray-500 pl-4">
                Created branch feature/login-system
              </div>
              <div className="flex items-start gap-2 mt-2">
                <span className="text-green-400 shrink-0">$</span>
                <span className="flex items-center gap-1">
                  <span className="text-gray-300">
                    git add . && git commit -m
                  </span>
                  <span className="text-accent-400">"Initial commit"</span>
                </span>
              </div>
              <div className="text-gray-500 pl-4">
                [main abc1234] Initial commit — 3 files changed
              </div>
              <div className="flex items-start gap-2 mt-2">
                <span className="text-green-400 shrink-0">$</span>
                <span className="inline-block w-2 h-5 bg-green-400 animate-pulse rounded-sm" />
              </div>
            </div>
          </div>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        >
          <span className="text-xs text-gray-400 dark:text-gray-500">
            Scroll to explore
          </span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            <ChevronRight className="w-5 h-5 text-gray-400 rotate-90" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
