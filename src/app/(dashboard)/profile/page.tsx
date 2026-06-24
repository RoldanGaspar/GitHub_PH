"use client";

import { motion } from "framer-motion";
import { useSession } from "next-auth/react";
import {
  User,
  Zap,
  Flame,
  Star,
  Settings,
  Github,
  Mail,
  Calendar,
} from "lucide-react";

export default function ProfilePage() {
  const { data: session } = useSession();

  return (
    <div className="p-6 lg:p-8 space-y-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="text-3xl font-extrabold mb-2">Profile</h1>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Profile Card */}
        <div className="lg:col-span-1">
          <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 p-6 text-center">
            <img
              src={session?.user?.image || "/default-avatar.png"}
              alt=""
              className="w-24 h-24 rounded-full mx-auto mb-4 border-4 border-primary-500"
            />
            <h2 className="text-xl font-bold">
              {session?.user?.name || "Developer"}
            </h2>
            <p className="text-sm text-gray-500 mb-4">{session?.user?.email}</p>
            <div className="flex items-center justify-center gap-3 mb-6">
              <span className="level-badge w-10 h-10 text-sm">8</span>
              <div>
                <p className="text-xs text-gray-500">Level 8</p>
                <p className="text-sm font-bold gradient-text">650 XP</p>
              </div>
            </div>
            <div className="flex items-center justify-center gap-3 text-sm text-gray-500">
              <span className="flex items-center gap-1">
                <Flame className="w-4 h-4 text-orange-500" />
                5-day streak
              </span>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="lg:col-span-2 space-y-6">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {[
              {
                icon: Zap,
                label: "Total XP",
                value: "650",
                color: "text-accent-500",
              },
              {
                icon: Star,
                label: "Achievements",
                value: "3/8",
                color: "text-amber-500",
              },
              {
                icon: Flame,
                label: "Best Streak",
                value: "7 days",
                color: "text-orange-500",
              },
              {
                icon: Calendar,
                label: "Member Since",
                value: "Jun 2026",
                color: "text-primary-500",
              },
            ].map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                className="bg-white dark:bg-gray-800 rounded-xl p-4 border border-gray-200 dark:border-gray-700 text-center"
              >
                <stat.icon className={`w-6 h-6 mx-auto mb-2 ${stat.color}`} />
                <p className="text-xs text-gray-500">{stat.label}</p>
                <p className="text-lg font-bold">{stat.value}</p>
              </motion.div>
            ))}
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 p-6">
            <h3 className="font-bold mb-4">Connected Accounts</h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-900 rounded-lg">
                <div className="flex items-center gap-3">
                  <Github className="w-5 h-5" />
                  <div>
                    <p className="font-medium text-sm">GitHub</p>
                    <p className="text-xs text-gray-500">Connected</p>
                  </div>
                </div>
                <span className="text-xs text-green-600 font-medium">
                  Active
                </span>
              </div>
              <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-900 rounded-lg">
                <div className="flex items-center gap-3">
                  <Mail className="w-5 h-5" />
                  <div>
                    <p className="font-medium text-sm">Google</p>
                    <p className="text-xs text-gray-500">Connected</p>
                  </div>
                </div>
                <span className="text-xs text-green-600 font-medium">
                  Active
                </span>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 p-6">
            <h3 className="font-bold mb-3 flex items-center gap-2">
              <Settings className="w-5 h-5" />
              Settings
            </h3>
            <p className="text-sm text-gray-500">
              Profile settings and preferences coming soon! 🚀
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
