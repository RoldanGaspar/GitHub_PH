"use client";

import { motion, AnimatePresence } from "framer-motion";
import {
  Zap,
  Star,
  Target,
  BookOpen,
  CheckCircle,
  Trophy,
  Flame,
} from "lucide-react";
import { useGamificationStore } from "@/store/gamification-store";

const sourceIcons: Record<string, React.ElementType> = {
  lesson_complete: BookOpen,
  mission: Target,
  achievement: Trophy,
  streak: Flame,
  quiz: Star,
  default: Zap,
};

const sourceColors: Record<string, string> = {
  lesson_complete: "from-blue-500 to-cyan-500",
  mission: "from-rose-500 to-red-500",
  achievement: "from-amber-500 to-orange-500",
  streak: "from-orange-500 to-red-500",
  quiz: "from-purple-500 to-pink-500",
  default: "from-primary-500 to-accent-500",
};

export function XPToast() {
  const notifications = useGamificationStore((s) => s.notifications);
  const dismissNotification = useGamificationStore(
    (s) => s.dismissNotification
  );

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-2 pointer-events-none">
      <AnimatePresence>
        {notifications.map((notification) => {
          const Icon = sourceIcons[notification.source] || sourceIcons.default;
          const color =
            sourceColors[notification.source] || sourceColors.default;
          return (
            <motion.div
              key={notification.id}
              initial={{ opacity: 0, x: 100, scale: 0.9 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: 100, scale: 0.9 }}
              transition={{ type: "spring", stiffness: 400, damping: 25 }}
              className="pointer-events-auto"
            >
              <div className="flex items-center gap-3 bg-white dark:bg-gray-800 rounded-xl p-3 shadow-xl border border-gray-200 dark:border-gray-700 min-w-[240px]">
                <div
                  className={`shrink-0 w-10 h-10 rounded-lg bg-gradient-to-br ${color} flex items-center justify-center`}
                >
                  <Icon className="w-5 h-5 text-white" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-bold gradient-text">
                    +{notification.amount} XP
                  </p>
                  <p className="text-xs text-gray-500 capitalize">
                    {notification.source.replace(/_/g, " ")}
                  </p>
                </div>
                <button
                  onClick={() => dismissNotification(notification.id)}
                  className="shrink-0 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
                >
                  <CheckCircle className="w-5 h-5 text-green-500" />
                </button>
              </div>
            </motion.div>
          );
        })}
      </AnimatePresence>
    </div>
  );
}
