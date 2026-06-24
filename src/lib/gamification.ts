/**
 * GitHubPH Gamification Engine
 *
 * Calculates XP, levels, and streaks based on user activity.
 *
 * Level Formula: Logarithmic scaling based on total XP.
 * Level = floor(sqrt(XP / 100)) + 1
 *
 * XP to Next Level: (level + 1)^2 * 100 - currentXP
 *
 * Streak: Consecutive days with activity (lesson completion, quiz, mission).
 */

// Level thresholds (total XP required for each level)
export function getLevelFromXP(totalXP: number): number {
  return Math.floor(Math.sqrt(totalXP / 100)) + 1;
}

// XP required to reach next level
export function getXPToNextLevel(totalXP: number): number {
  const currentLevel = getLevelFromXP(totalXP);
  const xpForNextLevel = Math.pow(currentLevel, 2) * 100;
  return Math.max(0, xpForNextLevel - totalXP);
}

// Total XP required for a given level
export function getXPForLevel(level: number): number {
  return Math.pow(level - 1, 2) * 100;
}

// Progress percentage to next level (0-100)
export function getLevelProgress(totalXP: number): number {
  const currentLevel = getLevelFromXP(totalXP);
  const xpCurrentLevel = getXPForLevel(currentLevel);
  const xpNextLevel = getXPForLevel(currentLevel + 1);
  const progress = ((totalXP - xpCurrentLevel) / (xpNextLevel - xpCurrentLevel)) * 100;
  return Math.min(100, Math.max(0, Math.round(progress)));
}

// Level title based on level range
export function getLevelTitle(level: number): string {
  if (level < 5) return "Git Beginner";
  if (level < 10) return "Git Explorer";
  if (level < 15) return "Git Apprentice";
  if (level < 20) return "Git Adventurer";
  if (level < 30) return "Git Warrior";
  if (level < 40) return "Git Expert";
  if (level < 50) return "Git Master";
  if (level < 75) return "Git Legend";
  return "Git Grandmaster";
}

// XP rewards for various actions
export const XP_REWARDS = {
  LESSON_COMPLETE: 50,
  QUIZ_PERFECT: 25,       // Bonus for 100% on quiz
  QUIZ_GOOD: 10,          // Bonus for >= 75% on quiz
  MISSION_DAILY: 100,
  MISSION_WEEKLY: 500,
  MISSION_STORY: 200,
  ACHIEVEMENT: 150,       // Bonus XP when achievement unlocked
  STREAK_3: 50,           // 3-day streak bonus
  STREAK_7: 150,          // 7-day streak bonus
  STREAK_30: 500,         // 30-day streak bonus
  STREAK_100: 2000,       // 100-day streak bonus
  SIMULATION_COMPLETE: 75,
  COURSE_COMPLETE: 200,
} as const;

// Streak calculation
export function calculateStreak(
  lastActiveAt: Date,
  currentStreak: number
): { streak: number; isBroken: boolean } {
  const now = new Date();
  const lastActive = new Date(lastActiveAt);

  // Reset time to compare dates only
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const yesterday = new Date(today);
  yesterday.setDate(yesterday.getDate() - 1);
  const lastDay = new Date(
    lastActive.getFullYear(),
    lastActive.getMonth(),
    lastActive.getDate()
  );

  // If last activity was today, streak stays
  if (lastDay.getTime() === today.getTime()) {
    return { streak: currentStreak, isBroken: false };
  }

  // If last activity was yesterday, streak continues
  if (lastDay.getTime() === yesterday.getTime()) {
    return { streak: currentStreak + 1, isBroken: false };
  }

  // Streak broken - more than 1 day gap
  return { streak: 1, isBroken: true };
}

// Streak bonus XP
export function getStreakBonus(streak: number): number {
  if (streak >= 100) return XP_REWARDS.STREAK_100;
  if (streak >= 30) return XP_REWARDS.STREAK_30;
  if (streak >= 7) return XP_REWARDS.STREAK_7;
  if (streak >= 3) return XP_REWARDS.STREAK_3;
  return 0;
}

// Achievement check logic
export interface AchievementCriteria {
  type:
    | "lessons_completed"
    | "xp_earned"
    | "streak_days"
    | "missions_completed"
    | "quiz_perfect"
    | "course_completed"
    | "simulations_run";
  threshold: number;
}

export function checkAchievement(
  criteria: AchievementCriteria,
  currentValue: number
): boolean {
  return currentValue >= criteria.threshold;
}

// Calculate quiz XP based on score percentage
export function getQuizXP(score: number, totalQuestions: number): {
  baseXP: number;
  bonusXP: number;
  totalXP: number;
} {
  const percentage = (score / totalQuestions) * 100;
  let bonusXP = 0;

  if (percentage === 100) {
    bonusXP = XP_REWARDS.QUIZ_PERFECT;
  } else if (percentage >= 75) {
    bonusXP = XP_REWARDS.QUIZ_GOOD;
  }

  return {
    baseXP: XP_REWARDS.LESSON_COMPLETE * (percentage / 100),
    bonusXP,
    totalXP: Math.round(XP_REWARDS.LESSON_COMPLETE * (percentage / 100)) + bonusXP,
  };
}

// Mock user gamification state for dashboard
export interface GamificationState {
  totalXP: number;
  level: number;
  xpToNextLevel: number;
  levelProgress: number;
  levelTitle: string;
  currentStreak: number;
  longestStreak: number;
  lessonsCompleted: number;
  missionsCompleted: number;
  achievementsUnlocked: number;
  totalAchievements: number;
}

export function getGamificationState(
  totalXP: number,
  currentStreak: number,
  longestStreak: number,
  lessonsCompleted: number,
  missionsCompleted: number,
  achievementsUnlocked: number,
  totalAchievements: number
): GamificationState {
  const level = getLevelFromXP(totalXP);
  const xpToNextLevel = getXPToNextLevel(totalXP);
  const levelProgress = getLevelProgress(totalXP);
  const levelTitle = getLevelTitle(level);

  return {
    totalXP,
    level,
    xpToNextLevel,
    levelProgress,
    levelTitle,
    currentStreak,
    longestStreak,
    lessonsCompleted,
    missionsCompleted,
    achievementsUnlocked,
    totalAchievements,
  };
}