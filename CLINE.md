# CLINE.md — AI Assistant Context for GitHubPH

> **⚠️ READ THIS FIRST** — Before making any change, read the "Anti-Hallucination Brain Dump" below. It contains the complete factual snapshot of this project so you never need to guess.

---

## 🧠 ANTI-HALLUCINATION BRAIN DUMP

### What GitHubPH IS

GitHubPH is a **Next.js 14 (App Router) + TypeScript + Tailwind CSS** web app. It is a free, gamified, interactive learning platform that teaches Filipino students Git and GitHub. It has a live Git terminal simulator, XP/level gamification, a GitHub contribution heatmap, and 20 routes across public, auth, and dashboard route groups.

### What GitHubPH IS NOT

- ❌ NOT a create-next-app default template — it has a custom folder structure
- ❌ NOT using shadcn/ui — we have our own component classes in `globals.css`
- ❌ NOT using Prisma — database is MongoDB via Mongoose (not yet populated, using mock/in-memory data)
- ❌ NOT using React Query yet — it's installed but NOT wired up; all state is Zustand + mock data
- ❌ NOT a production app — it's an MVP with mock data, no real API routes besides auth
- ❌ NOT a multi-page app with i18n — it uses hardcoded Taglish (Filipino-English) text
- ❌ The `border-border` class does NOT exist — we fixed this by using `border-color: hsl(var(--border))`
- ❌ Do NOT import `mongoose` in `src/middleware.ts` — Edge Runtime doesn't support it

### File Map (Every file in the project, one-line purpose)

```
ROOT CONFIG:
├── package.json              → Dependencies (Next 14, Auth.js v5, Zustand, Framer Motion, Tailwind, Mongoose)
├── tsconfig.json             → strict mode, @/* alias → ./src/*
├── next.config.mjs           → Image domains (GitHub avatars, Google images)
├── tailwind.config.ts        → Custom colors (primary/accent/passion/growth), Inter + JetBrains Mono fonts, 7 custom animations
├── postcss.config.mjs        → Tailwind + Autoprefixer plugins
├── .env.local                → MONGODB_URI, AUTH_SECRET, AUTH_GITHUB/GOOGLE, AWS, Sentry, PostHog (all placeholder values)

DOCUMENTATION:
├── CONTEXT.MD                → Product vision, mission, users, pillars, user journey, brand identity
├── CLINE.md                  → THIS FILE — AI assistant rules + brain dump
├── SCALABLE.md               → Architecture diagram, 4 horizons, DB scaling, cost projections
├── PROGRESS.md               → Complete file inventory, milestones, Phase 1-6 checklists

LIBRARY FILES (src/lib/):
├── utils.ts                  → cn() (clsx+twMerge), formatDate(), formatRelativeTime(), generateAvatarUrl(), truncate()
├── db.ts                     → connectDB() — Mongoose singleton connection to MongoDB Atlas (dbName: "githubph") — NOT used in middleware
├── auth.ts                   → NextAuth config: GitHub + Google providers, JWT strategy, callbacks for jwt/session — NO DB import (removed to fix Edge build)
├── gamification.ts           → XP engine: getLevelFromXP(sqrt), getXPToNextLevel, getLevelProgress, getLevelTitle, XP_REWARDS constants, calculateStreak, getStreakBonus, getQuizXP, checkAchievement, getGamificationState
├── github-api.ts             → GitHub REST API client functions + getMockRepos(), getMockProfile(), getMockContributions(), getContributionStats(), HEAT_COLORS array (5-level green gradient)
├── git-simulator.ts          → In-memory virtual Git engine: GitRepoState, executeCommand() routes to handlers, 12 subcommands, getVisualizationData() returns PlaygroundVizData

TYPES (src/types/):
├── index.ts                  → User, UserProfile, UserProgress, Course, Lesson, QuizQuestion, Roadmap, Mission, Achievement, XPTransaction, Simulation, DashboardStats, LeaderboardEntry, AnalyticsEvent

STATE MANAGEMENT (src/store/):
├── gamification-store.ts     → Zustand: totalXP(650), currentStreak(5), lessonsCompleted(12), missionsCompleted(5), achievementsUnlocked(3/8), addXP(), completeLesson(), completeMission(), unlockAchievement(), notifications[], showLevelUp, showAchievement

COMPONENTS:
├── src/app/globals.css               → 300+ lines: CSS variables (:root/.dark), base resets, scrollbar, .glass-card, .gradient-text, .xp-bar/.xp-bar-fill, .level-badge, .streak-fire, .achievement-card, .command-input, .lesson-content (h1-h3, p, code, pre, ul, blockquote, table)
├── providers/theme-provider.tsx      → next-themes wrapper (attribute="class")
├── providers/session-provider.tsx    → next-auth SessionProvider wrapper
├── layout/navbar.tsx                 → Fixed navbar: logo(Zap+GitHubPH), nav links(Learn/Playground/Achievements), theme toggle, user dropdown(sign out), mobile hamburger menu, scroll-aware bg
├── layout/footer.tsx                 → 4-column: brand(Tagalog), Learn, Platform, Connect, copyright
├── layout/dashboard-sidebar.tsx      → Fixed left sidebar(64rem): XP card with live gamification, 4 nav sections(Main/Practice/Progress/Social), active link highlighting, mission count badge
├── landing/hero-section.tsx          → Full-viewport hero: gradient bg, grid pattern, badge, h1(Taglish), stats(5K users, 25+ lessons, 50+ missions, 3 simulators), CTA buttons, terminal preview mockup, scroll indicator
├── landing/features-section.tsx      → 6-feature grid: Git Playground, Branch Simulator, Gamified Learning, Structured Lessons, Mission-Based, Safe Practice — each with gradient icon, hover effects, bottom CTA banner
├── landing/how-it-works.tsx          → 4-step: Sign Up → Choose Course → Practice → Earn XP, numbered badges, connection line (desktop)
├── landing/cta-section.tsx           → Full-width gradient CTA: "Handa ka na bang matuto ng Git?" with trust badges
├── gamification/xp-toast.tsx         → Fixed bottom-right toast stack: animated spring entrances/exits, source-specific icons+colors, dismiss button, auto-dismiss 3s
├── gamification/level-up-modal.tsx   → Full-screen overlay: react-confetti(150 pieces, 5 colors), level badge spin animation, level title, "Continue Learning" button, auto-dismiss 5s
├── gamification/achievement-unlock-modal.tsx → Overlay: sparkle effects, trophy rotation animation, achievement name, "Awesome!" button

PAGES (src/app/):
├── layout.tsx                → Root: html lang="en" suppressHydrationWarning, SessionProvider → ThemeProvider → Navbar → {children} → Footer
├── page.tsx                  → Landing: HeroSection + FeaturesSection + HowItWorksSection + CTASection
├── globals.css               → (already listed in components)
├── middleware.ts              → Auth middleware: protects /dashboard/*, /learn/*, /path/*, /missions/*, /playground/*, /simulator/*, /achievements/*, /leaderboard/*, /profile/*, /admin/*
├── login/page.tsx             → Login: centered card, Zap logo, GitHub+Google OAuth buttons with loading states, back-to-home link, trust badges
├── api/auth/[...nextauth]/route.ts → Auth.js route handlers (GET+POST)

PUBLIC PAGES (src/app/(public)/):
├── about/page.tsx             → About: mission statement, 4 values cards, "Bakit Namin Ito Ginawa?" section
├── features/page.tsx          → Features: 10 feature cards with Available/Coming Soon/Future badges, bottom CTA
├── roadmap/page.tsx           → Roadmap: 6-phase vertical timeline with dots (completed/in-progress/planned), item lists
├── faq/page.tsx               → FAQ: 10 accordion items, toggle open/close

DASHBOARD PAGES (src/app/(dashboard)/):
├── layout.tsx                 → DashboardLayout: DashboardSidebar + main content area + XPToast + LevelUpModal + AchievementUnlockModal
├── dashboard/page.tsx         → Dashboard: welcome card(user name+streak+level), XP card, lessons done card, continue learning list(3 mock), active missions(3 mock), quick actions grid(4)
├── learn/page.tsx             → Course catalog: 6 courses as cards with banners, difficulty badges, progress bars, lesson count/hours/XP metadata
├── learn/[courseId]/page.tsx  → Course detail: back link, course header with progress, lesson list with completion checkmarks, links to lessons
├── learn/[courseId]/[lessonId]/page.tsx → Lesson viewer: navigation, metadata chips, rendered lesson content(Taglish about Git basics), tip box, warning box(Git≠GitHub), quiz section(2 questions, selection, scoring, result view)
├── playground/page.tsx        → Interactive terminal: input+output+history+quick commands, visual panel(file tree status/branch list/commit graph), command counter, reset button, XP award every 3 commands
├── path/page.tsx              → Learning paths: 3 paths with progress bars
├── achievements/page.tsx      → Achievements: 8 cards(grid 4-col), unlocked/locked state with colors
├── missions/page.tsx          → Missions: 6 mission cards with progress bars, expiry timers
├── leaderboard/page.tsx       → Leaderboard: top 3 podium(2nd-1st-3rd), full ranked list
├── github/page.tsx            → GitHub Integration: profile card, contribution stats(4), contribution heatmap(364 days grid, 5-level green), repo list(3 mock repos, topics, stars/forks/language)
├── community/page.tsx         → Community: "Coming Soon" banner, 4 discussion previews, 3 feature cards
├── profile/page.tsx           → Profile: avatar, stats grid(4), connected accounts, settings placeholder
```

### Key Architectural Facts (Never Guess These)

1. **All user-facing text** must be in Filipino-English (Taglish). Examples: "Ang pinakamadaling paraan para matuto ng Git." NOT "The easiest way to learn Git."
2. **Level formula**: `floor(sqrt(totalXP / 100)) + 1`. Level 8 needs 4900 XP, Level 9 needs 6400 XP. DO NOT use linear leveling.
3. **XP values**: Lesson=50, Quiz perfect bonus=+25, Daily mission=100, Weekly=500, Story=200, Achievement=150, Simulation=75, Course complete=200.
4. **Auth.js v5 is installed as `next-auth@5.0.0-beta.25`**. The import path is `next-auth` NOT `next-auth/react` for the main config. SessionProvider comes from `next-auth/react`.
5. **Zustand store** is at `src/store/gamification-store.ts`. It holds totalXP: 650, currentStreak: 5. All dashboards read from this store.
6. **Git simulator** is at `src/lib/git-simulator.ts`. It uses module-level `let repo: GitRepoState | null = null` — this means the repo state persists across commands in the same session but resets on page reload.
7. **MongoDB** is configured but NOT populated. All current data is mock/in-memory. The `connectDB()` function works but no collections have schemas yet.
8. **No real API routes exist except `/api/auth/[...nextauth]`**. The courses, lessons, progress, etc. are all hardcoded mock data in the pages themselves.
9. **Dark mode** works via `next-themes` with `class` strategy. Tailwind `dark:` variants are used throughout.
10. **Responsive breakpoints**: Mobile-first → `sm:`(640px) → `md:`(768px) → `lg:`(1024px) → `xl:`(1280px)

### Data Flow Diagram

```
User Action
  → Page Component (reads Zustand store for gamification state)
  → User clicks/commands (calls store actions or lib functions)
  → Zustand Store updates (addXP, completeLesson, etc.)
  → React re-renders (components subscribed to store)
  → UI Feedback (XPToast, LevelUpModal, AchievementUnlockModal)

For Git Playground:
  → User types command → git-simulator.ts executeCommand()
  → Mutates in-memory GitRepoState → Returns output + viz data
  → Component updates terminal + file tree + branches + commit graph

GitHub Integration:
  → Page loads → getMockRepos/Profile/Contributions() → useState
  → Contribution heatmap rendered from 364-element array
  → Repository cards with language colors, star/forks counts
```

### Component → Zustand Store Mapping

- `dashboard-sidebar.tsx` → `useGamificationStore(s => s.getState())` — reads level, streak, XP
- `dashboard/page.tsx` → Uses `useSession` + hardcoded `recentLessons`/`activeMissions` arrays (NOT from store)
- `playground/page.tsx` → `useGamificationStore(s => s.addXP)` — awards XP every 3 commands
- `level-up-modal.tsx` → `useGamificationStore(s => s.showLevelUp + s.newLevel + s.dismissLevelUp)`
- `achievement-unlock-modal.tsx` → `useGamificationStore(s => s.showAchievement + s.dismissAchievement)`
- `xp-toast.tsx` → `useGamificationStore(s => s.notifications + s.dismissNotification)`
- `achievements/page.tsx` → Hardcoded array (NOT from store — needs wiring)
- `missions/page.tsx` → Hardcoded array (NOT from store — needs wiring)
- `leaderboard/page.tsx` → Hardcoded array (NOT from store — needs wiring)

### Known Inconsistencies to NOT "Fix" Without Asking

- Achievements/Missions/Leaderboard pages use hardcoded arrays, NOT the gamification store. This is intentional MVP behavior.
- The GitHub page uses `useState` with mock data, NOT the Zustand store.
- Profile page doesn't connect to real user data — uses `useSession` for name/image only.
- The course/lesson data is all hardcoded in page components — no database seeding exists yet.
- `recharts` and `react-hook-form` are in package.json but NOT imported anywhere yet.

---

## 🚨 Critical Rules for AI Agents

### 1. DO NOT modify these files without explicit user approval

- `next.config.mjs`
- `tailwind.config.ts`
- `tsconfig.json`
- `src/middleware.ts`
- `.env.local`
- `package.json` (dependencies)

### 2. Style & Convention Rules

- **Language**: UI text MUST be Taglish. Code comments in English.
- **Naming**: camelCase variables, PascalCase components, kebab-case files
- **Component Pattern**: `"use client"` at top if using hooks. Import React/Next first, then third-party, then lucide-react, then local, then types.
- **Icons**: Always `lucide-react`. No custom SVGs.
- **Styling**: Tailwind classes only. Use `cn()` from `@/lib/utils` for merging.
- **Colors**: Only use the theme colors defined in `tailwind.config.ts`: `primary-*`, `accent-*`, `passion-*`, `growth-*`. Never hardcode hex values.
- **Responsive**: Mobile-first, all Tailwind breakpoints.

### 3. Architecture Rules

- **Route Groups**: `(public)` = no auth, `(dashboard)` = auth required
- **Layout Pattern**: Root layout has Navbar+Footer. Dashboard layout adds Sidebar+gamification overlays.
- **State**: Zustand for client UI state (gamification). Mock data in page components for content.
- **Auth**: Always use `@/lib/auth.ts` exports. Route protection via middleware.
- **Add new feature**: types → lib → store → components → page → middleware matcher → sidebar link.

### 4. File Size Limits

- Pages: 400 lines max → extract sub-components
- Libraries: 500 lines max → split modules
- Components: 300 lines max
- CSS: 300 lines max → use Tailwind utilities

### 5. Common Pitfalls to AVOID

- ❌ `import mongoose` in middleware (Edge Runtime crash)
- ❌ `border-border` class (doesn't exist — use `border-color: hsl(var(--border))`)
- ❌ `window`/`document` in server components
- ❌ Hardcoded hex colors
- ❌ Pages outside route groups
- ❌ Forgetting `"use client"` on hook-using components
- ❌ Importing `next-auth` Server Session in client components (use `useSession` from `next-auth/react`)

### 6. Testing Checklist

- [ ] `npx next build --no-lint` passes with 0 errors
- [ ] All new pages render without crashes
- [ ] Dark mode works
- [ ] Mobile-responsive at 375px
- [ ] No layout shift from animations
- [ ] No console errors
