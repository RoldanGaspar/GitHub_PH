export { auth as middleware } from "@/lib/auth";

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/learn/:path*",
    "/path/:path*",
    "/missions/:path*",
    "/playground/:path*",
    "/simulator/:path*",
    "/achievements/:path*",
    "/leaderboard/:path*",
    "/profile/:path*",
    "/admin/:path*",
  ],
};