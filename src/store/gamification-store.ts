import { create } from "zustand";
import {
  getLevelFromXP,
  getXPToNextLevel,
  getLevelProgress,
  getLevelTitle,
  getGamificationState,
  type GamificationState,
} from "@/lib/gamification";

interface XPNotification {
  id: string;
  amount: number;
  source: string;
  timestamp: number;
}

interface GamificationStore {
  // State
  totalXP: number;
  currentStreak: number;
  longestStreak: number;
  lessonsCompleted: number;
  missionsCompleted: number;
  achievementsUnlocked: number;
  totalAchievements: number;
  notifications: XPNotification[];
  showLevelUp: boolean;
  newLevel: number | null;
  showAchievement: string | null;

  // Computed
  getState: () => GamificationState;

  // Actions
  addXP: (amount: number, source: string) => void;
  completeLesson: () => void;
  completeMission: () => void;
  unlockAchievement: (name: string) => void;
  dismissNotification: (id: string) => void;
  dismissLevelUp: () => void;
  dismissAchievement: () => void;
  updateStreak: (streak: number) => void;
}

export const useGamificationStore = create<GamificationStore>((set, get) => ({
  // Initial state (mock data for MVP)
  totalXP: 650,
  currentStreak: 5,
  longestStreak: 7,
  lessonsCompleted: 12,
  missionsCompleted: 5,
  achievementsUnlocked: 3,
  totalAchievements: 8,
  notifications: [],
  showLevelUp: false,
  newLevel: null,
  showAchievement: null,

  getState: () => {
    const s = get();
    return getGamificationState(
      s.totalXP,
      s.currentStreak,
      s.longestStreak,
      s.lessonsCompleted,
      s.missionsCompleted,
      s.achievementsUnlocked,
      s.totalAchievements
    );
  },

  addXP: (amount, source) => {
    const prevLevel = getLevelFromXP(get().totalXP);
    const newTotalXP = get().totalXP + amount;
    const newLevel = getLevelFromXP(newTotalXP);

    const id = `xp-${Date.now()}-${Math.random().toString(36).slice(2)}`;
    const notification: XPNotification = {
      id,
      amount,
      source,
      timestamp: Date.now(),
    };

    set((state) => ({
      totalXP: newTotalXP,
      notifications: [...state.notifications, notification],
      showLevelUp: newLevel > prevLevel,
      newLevel: newLevel > prevLevel ? newLevel : null,
    }));

    // Auto-dismiss notification after 3s
    setTimeout(() => {
      get().dismissNotification(id);
    }, 3000);

    // Auto-dismiss level up after 5s
    if (newLevel > prevLevel) {
      setTimeout(() => {
        get().dismissLevelUp();
      }, 5000);
    }
  },

  completeLesson: () => {
    set((state) => ({
      lessonsCompleted: state.lessonsCompleted + 1,
    }));
  },

  completeMission: () => {
    set((state) => ({
      missionsCompleted: state.missionsCompleted + 1,
    }));
  },

  unlockAchievement: (name) => {
    set((state) => ({
      achievementsUnlocked: state.achievementsUnlocked + 1,
      showAchievement: name,
    }));

    // Auto-dismiss after 4s
    setTimeout(() => {
      get().dismissAchievement();
    }, 4000);
  },

  dismissNotification: (id) => {
    set((state) => ({
      notifications: state.notifications.filter((n) => n.id !== id),
    }));
  },

  dismissLevelUp: () => {
    set({ showLevelUp: false, newLevel: null });
  },

  dismissAchievement: () => {
    set({ showAchievement: null });
  },

  updateStreak: (streak) => {
    set((state) => ({
      currentStreak: streak,
      longestStreak: Math.max(state.longestStreak, streak),
    }));
  },
}));