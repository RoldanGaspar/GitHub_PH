import Link from "next/link";
import { Zap, Github, Heart } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-gray-50 dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="md:col-span-1">
            <Link href="/" className="flex items-center gap-2 mb-3">
              <Zap className="w-6 h-6 text-primary-500" />
              <span className="text-lg font-bold gradient-text">
                GitHub<span className="text-accent-500">PH</span>
              </span>
            </Link>
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
              Ang pinakamadaling paraan para matuto ng Git at GitHub. Para sa
              bawat Pilipinong developer. 🇵🇭
            </p>
            <p className="flex items-center gap-1 text-sm text-gray-400">
              Made with <Heart className="w-3 h-3 text-red-500 fill-red-500" />{" "}
              for Filipino students
            </p>
          </div>

          {/* Learn */}
          <div>
            <h4 className="font-semibold text-sm mb-4 text-gray-900 dark:text-gray-100">
              Learn
            </h4>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/learn"
                  className="text-sm text-gray-500 dark:text-gray-400 hover:text-primary-500 transition-colors"
                >
                  Courses
                </Link>
              </li>
              <li>
                <Link
                  href="/path"
                  className="text-sm text-gray-500 dark:text-gray-400 hover:text-primary-500 transition-colors"
                >
                  Learning Paths
                </Link>
              </li>
              <li>
                <Link
                  href="/missions"
                  className="text-sm text-gray-500 dark:text-gray-400 hover:text-primary-500 transition-colors"
                >
                  Missions
                </Link>
              </li>
              <li>
                <Link
                  href="/playground"
                  className="text-sm text-gray-500 dark:text-gray-400 hover:text-primary-500 transition-colors"
                >
                  Git Playground
                </Link>
              </li>
            </ul>
          </div>

          {/* Platform */}
          <div>
            <h4 className="font-semibold text-sm mb-4 text-gray-900 dark:text-gray-100">
              Platform
            </h4>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/features"
                  className="text-sm text-gray-500 dark:text-gray-400 hover:text-primary-500 transition-colors"
                >
                  Features
                </Link>
              </li>
              <li>
                <Link
                  href="/roadmap"
                  className="text-sm text-gray-500 dark:text-gray-400 hover:text-primary-500 transition-colors"
                >
                  Roadmap
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  className="text-sm text-gray-500 dark:text-gray-400 hover:text-primary-500 transition-colors"
                >
                  About
                </Link>
              </li>
              <li>
                <Link
                  href="/faq"
                  className="text-sm text-gray-500 dark:text-gray-400 hover:text-primary-500 transition-colors"
                >
                  FAQ
                </Link>
              </li>
            </ul>
          </div>

          {/* Connect */}
          <div>
            <h4 className="font-semibold text-sm mb-4 text-gray-900 dark:text-gray-100">
              Connect
            </h4>
            <ul className="space-y-2">
              <li>
                <a
                  href="https://github.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 hover:text-primary-500 transition-colors"
                >
                  <Github className="w-4 h-4" />
                  GitHub
                </a>
              </li>
              <li>
                <Link
                  href="/leaderboard"
                  className="text-sm text-gray-500 dark:text-gray-400 hover:text-primary-500 transition-colors"
                >
                  Leaderboard
                </Link>
              </li>
              <li>
                <Link
                  href="/achievements"
                  className="text-sm text-gray-500 dark:text-gray-400 hover:text-primary-500 transition-colors"
                >
                  Achievements
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-10 pt-8 border-t border-gray-200 dark:border-gray-800">
          <p className="text-center text-sm text-gray-400">
            &copy; {new Date().getFullYear()} GitHubPH. All rights reserved.
            Built for the Filipino developer community. 🇵🇭
          </p>
        </div>
      </div>
    </footer>
  );
}
