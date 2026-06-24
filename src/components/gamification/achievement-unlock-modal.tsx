"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Trophy, Star, X, Sparkles } from "lucide-react";
import { useGamificationStore } from "@/store/gamification-store";

export function AchievementUnlockModal() {
  const showAchievement = useGamificationStore((s) => s.showAchievement);
  const dismissAchievement = useGamificationStore((s) => s.dismissAchievement);

  return (
    <AnimatePresence>
      {showAchievement && (
        <>
          {/* Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={dismissAchievement}
          >
            {/* Modal */}
            <motion.div
              initial={{ scale: 0.5, opacity: 0, rotateZ: -5 }}
              animate={{ scale: 1, opacity: 1, rotateZ: 0 }}
              exit={{ scale: 0.5, opacity: 0, rotateZ: 5 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              className="bg-white dark:bg-gray-800 rounded-3xl shadow-2xl p-8 max-w-sm w-full text-center relative overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Sparkles */}
              <Sparkles className="absolute top-4 left-4 w-6 h-6 text-accent-400 animate-pulse" />
              <Sparkles className="absolute top-8 right-6 w-4 h-4 text-accent-300 animate-pulse delay-300" />
              <Sparkles className="absolute bottom-20 left-8 w-5 h-5 text-accent-400 animate-pulse delay-500" />

              <button
                onClick={dismissAchievement}
                className="absolute top-4 right-4 p-1 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 z-10"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Achievement Icon */}
              <motion.div
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                className="w-20 h-20 mx-auto mb-5 rounded-2xl bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center shadow-xl shadow-amber-500/30"
              >
                <Trophy className="w-10 h-10 text-white" />
              </motion.div>

              <h2 className="text-xl font-extrabold mb-1">
                Achievement Unlocked! 🏆
              </h2>
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="text-lg font-semibold text-accent-600 dark:text-accent-400 mb-1"
              >
                {showAchievement}
              </motion.p>
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">
                Keep up the great work!
              </p>

              <motion.button
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                onClick={dismissAchievement}
                className="px-8 py-3 bg-gradient-to-r from-primary-500 to-accent-500 text-white rounded-full font-bold hover:shadow-lg active:scale-95 transition-all"
              >
                Awesome!
              </motion.button>
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
