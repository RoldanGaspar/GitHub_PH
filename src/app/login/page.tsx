"use client";

import { motion } from "framer-motion";
import { signIn } from "next-auth/react";
import {
  Github,
  Chrome,
  Zap,
  ArrowLeft,
  Star,
  ShieldCheck,
} from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export default function LoginPage() {
  const [isLoading, setIsLoading] = useState<string | null>(null);

  const handleSignIn = async (provider: string) => {
    setIsLoading(provider);
    await signIn(provider, { callbackUrl: "/dashboard" });
  };

  return (
    <div className="min-h-screen flex items-center justify-center pt-16 pb-16 px-4">
      {/* Background */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-primary-400/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-accent-400/10 rounded-full blur-3xl" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        {/* Back link */}
        <Link
          href="/"
          className="inline-flex items-center gap-1 text-sm text-gray-500 hover:text-primary-500 mb-8 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Home
        </Link>

        {/* Card */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 p-8">
          {/* Logo */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-primary-500 to-accent-500 mb-4">
              <Zap className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-2xl font-bold">
              Welcome to{" "}
              <span className="gradient-text">
                GitHub<span className="text-accent-500">PH</span>
              </span>
            </h1>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
              Sign in to start your Git learning journey!
            </p>
          </div>

          {/* OAuth Buttons */}
          <div className="space-y-3">
            <button
              onClick={() => handleSignIn("github")}
              disabled={isLoading !== null}
              className="w-full flex items-center justify-center gap-3 px-6 py-3 bg-gray-900 dark:bg-white text-white dark:text-gray-900 rounded-xl font-medium hover:opacity-90 transition-all disabled:opacity-50 active:scale-[0.98]"
            >
              <Github className="w-5 h-5" />
              {isLoading === "github" ? (
                <span className="animate-pulse">Connecting...</span>
              ) : (
                "Continue with GitHub"
              )}
            </button>

            <button
              onClick={() => handleSignIn("google")}
              disabled={isLoading !== null}
              className="w-full flex items-center justify-center gap-3 px-6 py-3 bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-200 rounded-xl font-medium border border-gray-300 dark:border-gray-600 hover:border-primary-300 dark:hover:border-primary-500 transition-all disabled:opacity-50 active:scale-[0.98]"
            >
              <Chrome className="w-5 h-5" />
              {isLoading === "google" ? (
                <span className="animate-pulse">Connecting...</span>
              ) : (
                "Continue with Google"
              )}
            </button>
          </div>

          {/* Trust badges */}
          <div className="mt-6 pt-6 border-t border-gray-100 dark:border-gray-700">
            <div className="flex items-center justify-center gap-6 text-xs text-gray-400">
              <span className="flex items-center gap-1">
                <ShieldCheck className="w-3 h-3" />
                Secure Auth
              </span>
              <span className="flex items-center gap-1">
                <Star className="w-3 h-3" />
                Libre magpakailanman
              </span>
            </div>
          </div>
        </div>

        {/* Bottom text */}
        <p className="text-center text-xs text-gray-400 mt-6">
          By signing in, you agree to our Terms of Service and Privacy Policy.
        </p>
      </motion.div>
    </div>
  );
}
