"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Star, Github, Zap } from "lucide-react";

export function CTASection() {
  return (
    <section className="py-24 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary-500 via-primary-600 to-accent-500" />
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmZmZmYiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PGNpcmNsZSBjeD0iMzAiIGN5PSIzMCIgcj0iMiIvPjwvZz48L2c+PC9zdmc+')] opacity-50" />

      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white mb-6">
            Handa ka na bang
            <br />
            matuto ng <span className="text-accent-300">Git</span>?
          </h2>
          <p className="text-lg text-primary-100 max-w-2xl mx-auto mb-10 leading-relaxed">
            Sumali sa libo-libong Pilipinong developers na natuto ng Git at
            GitHub sa pinakamadali at pinakamasayang paraan. Libre ito — walang
            catch.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/login"
              className="group inline-flex items-center gap-2 px-8 py-4 bg-white text-primary-600 rounded-full text-lg font-bold hover:bg-gray-100 transition-all hover:shadow-2xl active:scale-95"
            >
              <Zap className="w-5 h-5" />
              Start Learning Free
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-8 py-4 bg-white/10 text-white border border-white/20 rounded-full text-lg font-semibold hover:bg-white/20 transition-all active:scale-95 backdrop-blur-sm"
            >
              <Github className="w-5 h-5" />
              View on GitHub
            </a>
          </div>

          {/* Trust badges */}
          <div className="mt-12 flex flex-wrap items-center justify-center gap-6 text-white/70 text-sm">
            <span className="flex items-center gap-1">
              <Star className="w-4 h-4 fill-white/70" />
              Libre magpakailanman
            </span>
            <span className="hidden sm:inline">•</span>
            <span>🇵🇭 Made for Filipinos</span>
            <span className="hidden sm:inline">•</span>
            <span>🛡️ Safe sandbox environment</span>
            <span className="hidden sm:inline">•</span>
            <span>🎮 Gamified experience</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
