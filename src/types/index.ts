// User Types
export interface User {
  _id: string;
  email: string;
  name: string;
  avatar: string;
  provider: "github" | "google";
  role: "user" | "admin";
  createdAt: Date;
}

export interface UserProfile {
  userId: string;
  bio: string;
  githubUsername: string;
  learningGoal: string;
  joinedAt: Date;
  totalXP: number;
  currentLevel: number;
  currentStreak: number;
  longestStreak: number;
  lastActiveAt: Date;
}

// Learning Types
export type LessonStatus = "not_started" | "in_progress" | "completed";

export interface UserProgress {
  userId: string;
  lessonId: string;
  courseId: string;
  status: LessonStatus;
  quizScore: number;
  timeSpent: number;
  completedAt: Date | null;
}

export interface Course {
  _id: string;
  title: string;
  slug: string;
  description: string;
  difficulty: "beginner" | "intermediate" | "advanced";
  order: number;
  thumbnail: string;
  lessons: string[];
  estimatedHours: number;
  prerequisites: string[];
  category: string;
}

export interface Lesson {
  _id: string;
  courseId: string;
  title: string;
  slug: string;
  content: string; // Markdown
  type: "text" | "video" | "simulation";
  xpReward: number;
  estimatedMinutes: number;
  quiz: QuizQuestion[];
  order: number;
}

export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export interface Roadmap {
  _id: string;
  title: string;
  description: string;
  targetRole: string;
  courses: string[];
  estimatedWeeks: number;
}

// Gamification Types
export interface Mission {
  _id: string;
  title: string;
  description: string;
  objectives: MissionObjective[];
  xpReward: number;
  prerequisites: string[];
  type: "daily" | "weekly" | "story";
  expiresAt: Date | null;
}

export interface MissionObjective {
  id: string;
  description: string;
  target: number;
  current: number;
}

export interface Achievement {
  _id: string;
  name: string;
  description: string;
  icon: string;
  criteria: AchievementCriteria;
  xpReward: number;
  secret: boolean;
}

export interface AchievementCriteria {
  type: "lessons_completed" | "xp_earned" | "streak_days" | "missions_completed" | "quiz_perfect" | "course_completed" | "simulations_run";
  threshold: number;
}

export interface UserAchievement {
  userId: string;
  achievementId: string;
  unlockedAt: Date;
  progress: number;
}

export interface XPTransaction {
  userId: string;
  amount: number;
  source: "lesson_complete" | "mission" | "achievement" | "streak" | "quiz";
  sourceId: string;
  timestamp: Date;
}

// Simulation Types
export type SimulationType = "playground" | "branch" | "merge";

export interface Simulation {
  _id: string;
  type: SimulationType;
  title: string;
  scenario: string;
  steps: SimulationStep[];
  expectedOutcome: string;
}

export interface SimulationStep {
  order: number;
  instruction: string;
  command: string;
  hint: string;
  validation: string;
}

// Dashboard Types
export interface DashboardStats {
  totalXP: number;
  currentLevel: number;
  xpToNextLevel: number;
  currentStreak: number;
  lessonsCompleted: number;
  coursesInProgress: number;
  missionsCompleted: number;
  achievementsUnlocked: number;
  totalLearningMinutes: number;
}

export interface LeaderboardEntry {
  userId: string;
  name: string;
  avatar: string;
  totalXP: number;
  level: number;
  rank: number;
}

// Analytics
export interface AnalyticsEvent {
  userId: string;
  event: string;
  properties: Record<string, unknown>;
  timestamp: Date;
}