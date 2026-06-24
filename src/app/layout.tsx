import type { Metadata } from "next";
import { SessionProvider } from "@/components/providers/session-provider";
import { ThemeProvider } from "@/components/providers/theme-provider";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import "./globals.css";

export const metadata: Metadata = {
  title: "GitHubPH - Learn Git & GitHub the Fun Way",
  description:
    "Ang pinakamadaling paraan para matuto ng Git at GitHub. Gamified, interactive, at ginawa para sa Pilipinong developer. Libre para sa lahat!",
  keywords: [
    "GitHub",
    "Git",
    "Tutorial",
    "Filipino",
    "Learn Git",
    "Git Tutorial Philippines",
    "Web Development",
  ],
  openGraph: {
    title: "GitHubPH - Learn Git & GitHub the Fun Way",
    description:
      "Free, gamified Git & GitHub learning platform for Filipino developers.",
    type: "website",
    locale: "en_PH",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="min-h-screen bg-background font-sans antialiased">
        <SessionProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <div className="relative flex min-h-screen flex-col">
              <Navbar />
              <main className="flex-1">{children}</main>
              <Footer />
            </div>
          </ThemeProvider>
        </SessionProvider>
      </body>
    </html>
  );
}
