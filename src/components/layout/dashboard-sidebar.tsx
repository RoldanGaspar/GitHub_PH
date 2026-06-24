"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { useGamificationStore } from "@/store/gamification-store";
import {
  LayoutDashboard,
  BookOpen,
  Terminal,
  Trophy,
  Target,
  Github,
  Puzzle,
  Zap,
  Settings,
  TrendingUp,
  Users,
  Star,
  Flame,
} from "lucide-react";

const sidebarLinks = [
  {
    section: "Main",
    items: [
      { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
      { href: "/learn", label: "Courses", icon: BookOpen },
      { href: "/path", label: "Learning Path", icon: TrendingUp },
    ],
  },
  {
    section: "Practice",
    items: [
      { href: "/playground", label: "Git Playground", icon: Terminal },
      { href: "/missions", label: "Missions", icon: Target },
    ],
  },
  {
    section: "Progress",
    items: [
      { href: "/achievements", label: "Achievements", icon: Trophy },
      { href: "/leaderboard", label: "Leaderboard", icon: Star },
      { href: "/github", label: "GitHub", icon: Github },
    ],
  },
  {
    section: "Social",
    items: [{ href: "/community", label: "Community", icon: Users }],
  },
];

export function DashboardSidebar() {
  const pathname = usePathname();
  const gamification = useGamificationStore((s) => s.getState());

  return (
    <aside className="hidden lg:flex flex-col w-64 fixed top-16 bottom-0 left-0 bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-800 overflow-y-auto z-40">
      <div className="flex-1 py-6 px-3 space-y-6">
        {/* Quick Stats */}
        <div className="px-2 py-3 bg-gradient-to-br from-primary-50 to-accent-50 dark:from-primary-900/20 dark:to-accent-900/20 rounded-xl border border-primary-100 dark:border-primary-800">
          <div className="flex items-center gap-2 mb-2">
            <Flame className="w-4 h-4 text-orange-500 streak-fire" />
            <span className="text-sm font-semibold text-gray-700 dark:text-gray-200">
              {gamification.currentStreak}-Day Streak!
            </span>
          </div>
          <div className="xp-bar h-2">
            <div
              className="xp-bar-fill"
              style={{ width: `${gamification.levelProgress}%` }}
            />
          </div>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
            Level {gamification.level} • {gamification.totalXP} /{" "}
            {gamification.totalXP + gamification.xpToNextLevel} XP
          </p>
        </div>

        {/* Nav Links */}
        {sidebarLinks.map((section, i) => (
          <div key={i}>
            <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2 px-2">
              {section.section}
            </p>
            <ul className="space-y-0.5">
              {section.items.map((item) => {
                const isActive =
                  pathname === item.href ||
                  pathname.startsWith(item.href + "/");
                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className={cn(
                        "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all",
                        isActive
                          ? "bg-primary-50 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400 border border-primary-200 dark:border-primary-700"
                          : "text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-gray-200"
                      )}
                    >
                      <item.icon className="w-5 h-5" />
                      {item.label}
                      {item.label === "Missions" && (
                        <span className="ml-auto flex items-center justify-center w-5 h-5 bg-accent-500 text-white text-[10px] font-bold rounded-full">
                          3
                        </span>
                      )}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </div>

      {/* Bottom */}
      <div className="p-3 border-t border-gray-200 dark:border-gray-800">
        <Link
          href="/profile"
          className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
        >
          <Settings className="w-5 h-5" />
          Settings
        </Link>
      </div>
    </aside>
  );
}
