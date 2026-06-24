"use client";

import { motion } from "framer-motion";
import { UserPlus, BookOpen, Play, Trophy, ArrowRight } from "lucide-react";

const steps = [
  {
    icon: UserPlus,
    title: "Sign Up (Libre!)",
    description:
      "Gumawa ng account gamit ang GitHub o Google. Walang bayad, walang credit card.",
    color: "from-blue-500 to-cyan-500",
  },
  {
    icon: BookOpen,
    title: "Pumili ng Course",
    description:
      "Pumili mula sa beginner-friendly courses: Git Basics, Branching, Collaboration, at marami pa.",
    color: "from-purple-500 to-pink-500",
  },
  {
    icon: Play,
    title: "Mag-practice sa Playground",
    description:
      "Gamitin ang interactive Git Playground para subukan ang mga natutunan mo — walang risk.",
    color: "from-amber-500 to-orange-500",
  },
  {
    icon: Trophy,
    title: "Earn XP & Achievements",
    description:
      "Kumpletuhin ang lessons at missions para mag-level up at mag-unlock ng achievements.",
    color: "from-emerald-500 to-teal-500",
  },
];

export function HowItWorksSection() {
  return (
    <section id="how-it-works" className="py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            Paano Gumagana ang <span className="gradient-text">GitHubPH</span>?
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400">
            Apat na simpleng hakbang mula beginner hanggang confident Git user.
          </p>
        </motion.div>

        {/* Steps */}
        <div className="relative">
          {/* Connection line (desktop) */}
          <div className="hidden lg:block absolute top-1/2 left-[12.5%] right-[12.5%] h-0.5 bg-gradient-to-r from-primary-200 via-accent-200 to-growth-200 dark:from-primary-800 dark:via-accent-800 dark:to-growth-800 -translate-y-1/2" />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((step, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="relative text-center"
              >
                {/* Step Number */}
                <div className="relative z-10 w-16 h-16 mx-auto mb-6 rounded-2xl bg-white dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-700 flex items-center justify-center shadow-lg">
                  <div
                    className={`w-10 h-10 rounded-xl bg-gradient-to-br ${step.color} flex items-center justify-center`}
                  >
                    <step.icon className="w-5 h-5 text-white" />
                  </div>
                  <div className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-white dark:bg-gray-800 border-2 border-accent-400 flex items-center justify-center text-xs font-bold text-accent-600">
                    {i + 1}
                  </div>
                </div>

                <h3 className="text-lg font-semibold mb-2 text-gray-900 dark:text-gray-100">
                  {step.title}
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                  {step.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
