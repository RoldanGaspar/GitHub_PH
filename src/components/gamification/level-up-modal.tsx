"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Zap, Star, X } from "lucide-react";
import ReactConfetti from "react-confetti";
import { useGamificationStore } from "@/store/gamification-store";
import { getLevelTitle } from "@/lib/gamification";

export function LevelUpModal() {
  const showLevelUp = useGamificationStore((s) => s.showLevelUp);
  const newLevel = useGamificationStore((s) => s.newLevel);
  const dismissLevelUp = useGamificationStore((s) => s.dismissLevelUp);

  return (
    <AnimatePresence>
      {showLevelUp && newLevel && (
        <>
          {/* Confetti */}
          <ReactConfetti
            width={window.innerWidth}
            height={window.innerHeight}
            numberOfPieces={150}
            colors={["#2563eb", "#f59e0b", "#16a34a", "#dc2626", "#7c3aed"]}
            recycle={false}
            gravity={0.15}
          />

          {/* Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={dismissLevelUp}
          >
            {/* Modal */}
            <motion.div
              initial={{ scale: 0.5, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.5, opacity: 0, y: 20 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              className="bg-white dark:bg-gray-800 rounded-3xl shadow-2xl p-8 max-w-md w-full text-center relative overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Background glow */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-accent-400/20 rounded-full blur-3xl" />

              <button
                onClick={dismissLevelUp}
                className="absolute top-4 right-4 p-1 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 z-10"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Level Badge */}
              <motion.div
                initial={{ rotate: -10, scale: 0 }}
                animate={{ rotate: 0, scale: 1 }}
                transition={{ delay: 0.3, type: "spring" }}
                className="relative z-10 w-24 h-24 mx-auto mb-6 rounded-full bg-gradient-to-br from-accent-400 to-accent-600 flex items-center justify-center shadow-2xl shadow-accent-500/40"
              >
                <span className="text-4xl font-extrabold text-white">
                  {newLevel}
                </span>
              </motion.div>

              <h2 className="text-2xl font-extrabold mb-2 relative z-10">
                Level Up! 🎉
              </h2>
              <p className="text-gray-500 dark:text-gray-400 mb-1 relative z-10">
                You reached Level {newLevel}
              </p>
              <p className="text-sm font-semibold text-accent-600 dark:text-accent-400 mb-6 relative z-10">
                {getLevelTitle(newLevel)}
              </p>

              <motion.button
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                onClick={dismissLevelUp}
                className="relative z-10 px-8 py-3 bg-gradient-to-r from-primary-500 to-accent-500 text-white rounded-full font-bold hover:shadow-lg active:scale-95 transition-all"
              >
                Continue Learning
              </motion.button>
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
