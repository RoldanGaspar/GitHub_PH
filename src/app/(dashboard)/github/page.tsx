"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Github,
  Star,
  GitFork,
  ExternalLink,
  Circle,
  BookOpen,
  Clock,
  AlertCircle,
  TrendingUp,
  Flame,
  Activity,
  Zap,
  Code2,
  Search,
} from "lucide-react";
import {
  getMockRepos,
  getMockProfile,
  getMockContributions,
  getContributionStats,
  HEAT_COLORS,
  type GitHubRepo,
  type GitHubProfile,
  type GitHubContribution,
} from "@/lib/github-api";
import { formatRelativeTime } from "@/lib/utils";

const DAYS = ["Mon", "", "Wed", "", "Fri", "", "Sun"];
const MONTHS = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

export default function GitHubPage() {
  const [profile] = useState<GitHubProfile>(getMockProfile());
  const [repos] = useState<GitHubRepo[]>(getMockRepos());
  const [contributions] = useState<GitHubContribution[]>(
    getMockContributions()
  );
  const stats = getContributionStats(contributions);

  // Generate weeks for heatmap
  const weeks: GitHubContribution[][] = [];
  let currentWeek: GitHubContribution[] = [];
  contributions.forEach((c, i) => {
    currentWeek.push(c);
    if (currentWeek.length === 7 || i === contributions.length - 1) {
      weeks.push(currentWeek);
      currentWeek = [];
    }
  });

  return (
    <div className="p-6 lg:p-8 space-y-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="text-3xl font-extrabold mb-2">
          GitHub <span className="gradient-text">Integration</span>
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          Connect your GitHub account to see your repositories, contributions,
          and activity.
        </p>
      </motion.div>

      {/* Profile Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 p-6"
      >
        <div className="flex items-start gap-4 flex-wrap">
          <img
            src={profile.avatar_url}
            alt={profile.login}
            className="w-16 h-16 rounded-full border-2 border-primary-500"
          />
          <div className="flex-1">
            <div className="flex items-center gap-2 flex-wrap">
              <h2 className="text-xl font-bold">
                {profile.name || profile.login}
              </h2>
              <span className="text-sm text-gray-500">@{profile.login}</span>
            </div>
            <p className="text-sm text-gray-500 mt-1">{profile.bio}</p>
            <div className="flex items-center gap-4 mt-3 text-sm text-gray-500">
              <span className="flex items-center gap-1">
                <BookOpen className="w-4 h-4" />
                {profile.public_repos} repos
              </span>
              <span className="flex items-center gap-1">
                <Activity className="w-4 h-4" />
                {profile.followers} followers
              </span>
              <span className="flex items-center gap-1">
                <Zap className="w-4 h-4" />
                {profile.following} following
              </span>
            </div>
          </div>
          <a
            href={profile.html_url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 px-4 py-2 bg-gray-900 dark:bg-white text-white dark:text-gray-900 rounded-full text-sm font-medium hover:opacity-80 transition-all"
          >
            <Github className="w-4 h-4" />
            View Profile
            <ExternalLink className="w-3 h-3" />
          </a>
        </div>
      </motion.div>

      {/* Contribution Stats */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.15 }}
        className="grid grid-cols-2 md:grid-cols-4 gap-4"
      >
        {[
          {
            icon: TrendingUp,
            label: "Total Contributions",
            value: stats.total,
            color: "text-green-500",
          },
          {
            icon: Activity,
            label: "Last 30 Days",
            value: stats.last30Total,
            color: "text-primary-500",
          },
          {
            icon: Flame,
            label: "Longest Streak",
            value: `${stats.longestStreak}d`,
            color: "text-orange-500",
          },
          {
            icon: Code2,
            label: "Avg/Day (30d)",
            value: stats.averagePerDay,
            color: "text-accent-500",
          },
        ].map((stat) => (
          <div
            key={stat.label}
            className="bg-white dark:bg-gray-800 rounded-xl p-4 border border-gray-200 dark:border-gray-700 text-center"
          >
            <stat.icon className={`w-5 h-5 mx-auto mb-2 ${stat.color}`} />
            <p className="text-2xl font-bold">{stat.value}</p>
            <p className="text-xs text-gray-500">{stat.label}</p>
          </div>
        ))}
      </motion.div>

      {/* Contribution Heatmap */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 p-6"
      >
        <h3 className="font-bold mb-4 flex items-center gap-2">
          <Activity className="w-5 h-5 text-green-500" />
          Contribution Activity
        </h3>
        <div className="overflow-x-auto">
          <div className="flex gap-1 min-w-[700px]">
            {/* Day labels */}
            <div className="flex flex-col gap-1 mr-2 text-[10px] text-gray-400 pt-[18px]">
              {DAYS.map((d, i) => (
                <div key={i} className="h-[11px] leading-[11px]">
                  {d}
                </div>
              ))}
            </div>

            {/* Heatmap */}
            <div>
              {/* Month labels */}
              <div className="flex text-[10px] text-gray-400 mb-1">
                {weeks.map((_, i) => {
                  const firstDay = weeks[i][0]?.date;
                  const month = firstDay
                    ? MONTHS[new Date(firstDay).getMonth()]
                    : "";
                  const prevMonth = i > 0 ? weeks[i - 1][0]?.date : "";
                  const prevM = prevMonth
                    ? MONTHS[new Date(prevMonth).getMonth()]
                    : "";
                  return (
                    <div key={i} className="w-[11px] mr-1">
                      {month !== prevM ? month : ""}
                    </div>
                  );
                })}
              </div>
              {/* Heatmap grid */}
              <div className="flex gap-1">
                {weeks.map((week, wi) => (
                  <div key={wi} className="flex flex-col gap-1">
                    {week.map((day, di) => (
                      <div
                        key={`${wi}-${di}`}
                        className={`w-[11px] h-[11px] rounded-sm ${
                          HEAT_COLORS[day.level]
                        }`}
                        title={`${day.date}: ${day.count} contributions`}
                      />
                    ))}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Legend */}
        <div className="flex items-center justify-end gap-1 mt-3 text-[10px] text-gray-400">
          Less
          {[0, 1, 2, 3, 4].map((level) => (
            <div
              key={level}
              className={`w-[11px] h-[11px] rounded-sm ${HEAT_COLORS[level]}`}
            />
          ))}
          More
        </div>
      </motion.div>

      {/* Repository List */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.25 }}
      >
        <h3 className="font-bold mb-4">Your Repositories</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {repos.map((repo, i) => (
            <motion.div
              key={repo.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 + i * 0.05 }}
              className="bg-white dark:bg-gray-800 rounded-xl p-5 border border-gray-200 dark:border-gray-700 hover:border-primary-300 dark:hover:border-primary-600 transition-all hover:shadow-md"
            >
              <div className="flex items-start justify-between mb-2">
                <div className="flex-1 min-w-0">
                  <h4 className="font-semibold truncate">
                    <a
                      href={repo.html_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-primary-500 transition-colors"
                    >
                      {repo.name}
                    </a>
                  </h4>
                  {repo.description && (
                    <p className="text-xs text-gray-500 mt-1 line-clamp-2">
                      {repo.description}
                    </p>
                  )}
                </div>
                <a
                  href={repo.html_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="shrink-0 p-1 text-gray-400 hover:text-primary-500 transition-colors"
                >
                  <ExternalLink className="w-4 h-4" />
                </a>
              </div>

              {/* Topics */}
              {repo.topics.length > 0 && (
                <div className="flex flex-wrap gap-1.5 mt-3">
                  {repo.topics.slice(0, 5).map((topic) => (
                    <span
                      key={topic}
                      className="text-[10px] px-2 py-0.5 bg-primary-50 dark:bg-primary-900/20 text-primary-600 dark:text-primary-400 rounded-full"
                    >
                      {topic}
                    </span>
                  ))}
                </div>
              )}

              {/* Meta */}
              <div className="flex items-center gap-4 mt-3 text-xs text-gray-500">
                {repo.language && (
                  <span className="flex items-center gap-1">
                    <span
                      className="w-2.5 h-2.5 rounded-full"
                      style={{
                        backgroundColor:
                          repo.language === "TypeScript"
                            ? "#3178c6"
                            : repo.language === "Python"
                            ? "#3572A5"
                            : repo.language === "JavaScript"
                            ? "#f1e05a"
                            : "#6e7681",
                      }}
                    />
                    {repo.language}
                  </span>
                )}
                <span className="flex items-center gap-1">
                  <Star className="w-3.5 h-3.5" />
                  {repo.stars}
                </span>
                <span className="flex items-center gap-1">
                  <GitFork className="w-3.5 h-3.5" />
                  {repo.forks}
                </span>
                {repo.open_issues > 0 && (
                  <span className="flex items-center gap-1">
                    <AlertCircle className="w-3.5 h-3.5" />
                    {repo.open_issues} issues
                  </span>
                )}
                <span className="flex items-center gap-1 ml-auto">
                  <Clock className="w-3.5 h-3.5" />
                  {formatRelativeTime(repo.updated_at)}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
