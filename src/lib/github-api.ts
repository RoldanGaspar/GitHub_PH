/**
 * GitHubPH - GitHub API Integration
 *
 * Handles GitHub API calls for repository analysis,
 * contribution tracking, and profile data.
 *
 * Uses GitHub OAuth token from the user's session
 * or falls back to unauthenticated public API requests.
 */

export interface GitHubRepo {
  id: number;
  name: string;
  full_name: string;
  description: string | null;
  html_url: string;
  stars: number;
  forks: number;
  language: string | null;
  topics: string[];
  updated_at: string;
  default_branch: string;
  open_issues: number;
}

export interface GitHubContribution {
  date: string;
  count: number;
  level: 0 | 1 | 2 | 3 | 4;
}

export interface GitHubProfile {
  login: string;
  name: string | null;
  avatar_url: string;
  bio: string | null;
  public_repos: number;
  followers: number;
  following: number;
  html_url: string;
  created_at: string;
}

const GITHUB_API = "https://api.github.com";

async function githubFetch(
  endpoint: string,
  token?: string
): Promise<Response> {
  const headers: Record<string, string> = {
    Accept: "application/vnd.github.v3+json",
    "User-Agent": "GitHubPH",
  };

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  const res = await fetch(`${GITHUB_API}${endpoint}`, { headers });

  if (!res.ok) {
    throw new Error(`GitHub API error: ${res.status} ${res.statusText}`);
  }

  return res;
}

export async function getGitHubProfile(
  username: string,
  token?: string
): Promise<GitHubProfile> {
  const res = await githubFetch(`/users/${username}`, token);
  return res.json();
}

export async function getPublicRepos(
  username: string,
  token?: string
): Promise<GitHubRepo[]> {
  const res = await githubFetch(
    `/users/${username}/repos?sort=updated&per_page=10&type=owner`,
    token
  );
  return res.json();
}

export async function getRepoDetails(
  owner: string,
  repo: string,
  token?: string
): Promise<GitHubRepo> {
  const res = await githubFetch(`/repos/${owner}/${repo}`, token);
  return res.json();
}

// Mock data for MVP demo (when GitHub API is unavailable or rate-limited)
export function getMockRepos(): GitHubRepo[] {
  return [
    {
      id: 1,
      name: "capstone-library-system",
      full_name: "student/capstone-library-system",
      description: "Library Management System for BSIT Capstone Project",
      html_url: "https://github.com/student/capstone-library-system",
      stars: 5,
      forks: 2,
      language: "TypeScript",
      topics: ["react", "nextjs", "capstone", "library-system"],
      updated_at: new Date().toISOString(),
      default_branch: "main",
      open_issues: 3,
    },
    {
      id: 2,
      name: "attendance-monitoring",
      full_name: "student/attendance-monitoring",
      description: "Face Recognition Attendance System using Python",
      html_url: "https://github.com/student/attendance-monitoring",
      stars: 12,
      forks: 4,
      language: "Python",
      topics: ["python", "opencv", "face-recognition"],
      updated_at: new Date(Date.now() - 86400000).toISOString(),
      default_branch: "master",
      open_issues: 1,
    },
    {
      id: 3,
      name: "pos-system",
      full_name: "student/pos-system",
      description: "Point of Sale System for Small Businesses",
      html_url: "https://github.com/student/pos-system",
      stars: 8,
      forks: 3,
      language: "JavaScript",
      topics: ["react", "express", "mongodb", "pos"],
      updated_at: new Date(Date.now() - 172800000).toISOString(),
      default_branch: "main",
      open_issues: 0,
    },
  ];
}

export function getMockProfile(): GitHubProfile {
  return {
    login: "pinoy-dev",
    name: "Juan Dela Cruz",
    avatar_url: "https://avatars.githubusercontent.com/u/1234567",
    bio: "BSIT Student | Aspiring Full-Stack Developer 🇵🇭",
    public_repos: 15,
    followers: 34,
    following: 20,
    html_url: "https://github.com/pinoy-dev",
    created_at: "2024-01-15T00:00:00Z",
  };
}

export function getMockContributions(): GitHubContribution[] {
  const contributions: GitHubContribution[] = [];
  const now = new Date();

  for (let i = 364; i >= 0; i--) {
    const date = new Date(now);
    date.setDate(date.getDate() - i);
    const count = Math.random() > 0.4 ? Math.floor(Math.random() * 8) : 0;
    const level: 0 | 1 | 2 | 3 | 4 =
      count === 0 ? 0 : count <= 2 ? 1 : count <= 4 ? 2 : count <= 6 ? 3 : 4;

    contributions.push({
      date: date.toISOString().split("T")[0],
      count,
      level,
    });
  }

  return contributions;
}

export function getContributionStats(contributions: GitHubContribution[]) {
  const total = contributions.reduce((sum, c) => sum + c.count, 0);
  const last30Days = contributions.slice(-30);
  const last30Total = last30Days.reduce((sum, c) => sum + c.count, 0);
  const streak = calculateLongestStreak(contributions);
  const currentStreak = calculateCurrentStreak(contributions);

  return {
    total,
    last30Total,
    longestStreak: streak,
    currentStreak,
    averagePerDay: Math.round((last30Total / 30) * 10) / 10,
  };
}

function calculateLongestStreak(contributions: GitHubContribution[]): number {
  let longest = 0;
  let current = 0;

  for (const c of contributions) {
    if (c.count > 0) {
      current++;
      longest = Math.max(longest, current);
    } else {
      current = 0;
    }
  }

  return longest;
}

function calculateCurrentStreak(contributions: GitHubContribution[]): number {
  let streak = 0;
  for (let i = contributions.length - 1; i >= 0; i--) {
    if (contributions[i].count > 0) {
      streak++;
    } else {
      break;
    }
  }
  return streak;
}

// Contribution heatmap colors
export const HEAT_COLORS = [
  "bg-gray-100 dark:bg-gray-800",       // Level 0
  "bg-green-200 dark:bg-green-900/50",  // Level 1
  "bg-green-400 dark:bg-green-700",     // Level 2
  "bg-green-600 dark:bg-green-500",     // Level 3
  "bg-green-800 dark:bg-green-300",     // Level 4
];