import { DashboardSidebar } from "@/components/layout/dashboard-sidebar";
import { XPToast } from "@/components/gamification/xp-toast";
import { LevelUpModal } from "@/components/gamification/level-up-modal";
import { AchievementUnlockModal } from "@/components/gamification/achievement-unlock-modal";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="pt-16">
      <DashboardSidebar />
      <div className="lg:pl-64">
        <main className="min-h-screen bg-gray-50 dark:bg-gray-950">
          {children}
        </main>
      </div>
      {/* Gamification UI Overlays */}
      <XPToast />
      <LevelUpModal />
      <AchievementUnlockModal />
    </div>
  );
}
