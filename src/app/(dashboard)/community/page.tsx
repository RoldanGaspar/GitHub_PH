"use client";

import { motion } from "framer-motion";
import {
  MessageSquare,
  Users,
  Heart,
  Share2,
  TrendingUp,
  ArrowRight,
  Globe,
  Sparkles,
} from "lucide-react";
import Link from "next/link";

const discussions = [
  {
    title: "Best Git workflow for capstone projects?",
    author: "Maria",
    replies: 12,
    category: "Help",
    time: "2h ago",
  },
  {
    title: "Share your first Git commit story!",
    author: "Juan",
    replies: 28,
    category: "Discussion",
    time: "5h ago",
  },
  {
    title: "Tips for resolving merge conflicts",
    author: "Ana",
    replies: 8,
    category: "Tips",
    time: "8h ago",
  },
  {
    title: "Git vs GitHub - what helped you understand?",
    author: "Carlos",
    replies: 15,
    category: "Discussion",
    time: "1d ago",
  },
];

export default function CommunityPage() {
  return (
    <div className="p-6 lg:p-8 space-y-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="text-3xl font-extrabold mb-2">
          Community <span className="gradient-text">Forums</span>
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          Connect with fellow Filipino developers learning Git and GitHub.
        </p>
      </motion.div>

      {/* Coming Soon Banner */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="bg-gradient-to-r from-purple-500/10 to-pink-500/10 dark:from-purple-500/5 dark:to-pink-500/5 rounded-2xl border border-purple-200 dark:border-purple-800 p-6 text-center"
      >
        <Sparkles className="w-10 h-10 mx-auto mb-3 text-purple-500" />
        <h2 className="text-xl font-bold mb-2">Community Coming Soon! 🚀</h2>
        <p className="text-gray-600 dark:text-gray-400 max-w-lg mx-auto">
          Discussion forums, study groups, activity feeds, and peer reviews are
          on the way!
        </p>
      </motion.div>

      {/* Preview Discussions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <h3 className="font-bold mb-4">Preview Discussions</h3>
        <div className="space-y-3">
          {discussions.map((d) => (
            <div
              key={d.title}
              className="bg-white dark:bg-gray-800 rounded-xl p-4 border border-gray-200 dark:border-gray-700 hover:border-primary-300 transition-all cursor-not-allowed opacity-70"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1 min-w-0">
                  <h4 className="font-medium truncate">{d.title}</h4>
                  <div className="flex items-center gap-3 mt-1 text-xs text-gray-500">
                    <span>{d.author}</span>
                    <span className="flex items-center gap-1">
                      <MessageSquare className="w-3 h-3" />
                      {d.replies} replies
                    </span>
                    <span>{d.time}</span>
                  </div>
                </div>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-primary-50 dark:bg-primary-900/20 text-primary-600 dark:text-primary-400">
                  {d.category}
                </span>
              </div>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Features */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {[
          {
            icon: MessageSquare,
            title: "Discussion Forums",
            desc: "Ask questions and share knowledge",
          },
          {
            icon: Users,
            title: "Study Groups",
            desc: "Learn together with peers",
          },
          {
            icon: Share2,
            title: "Activity Feed",
            desc: "See what others are learning",
          },
        ].map((f) => (
          <div
            key={f.title}
            className="bg-white dark:bg-gray-800 rounded-xl p-5 border border-gray-200 dark:border-gray-700 text-center opacity-60"
          >
            <f.icon className="w-8 h-8 mx-auto mb-3 text-gray-400" />
            <h4 className="font-semibold mb-1">{f.title}</h4>
            <p className="text-xs text-gray-500">{f.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
