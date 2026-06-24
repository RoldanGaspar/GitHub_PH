"use client";

import { motion } from "framer-motion";
import {
  BookOpen,
  Terminal,
  Trophy,
  Zap,
  GitBranch,
  Puzzle,
  Shield,
  Rocket,
  Users,
} from "lucide-react";

const features = [
  {
    icon: Terminal,
    title: "Interactive Git Playground",
    description:
      "Huwag kabisaduhin ang commands — gamitin ang mga ito sa live simulation. Makita mo kung paano gumagana ang Git commands sa real-time.",
    color: "from-blue-500 to-cyan-500",
  },
  {
    icon: GitBranch,
    title: "Branch & Merge Simulator",
    description:
      "Visual na pag-explore ng branching at merging. Makita ang mga branches, conflicts, at merges bago mangyari sa totoong project.",
    color: "from-purple-500 to-pink-500",
  },
  {
    icon: Trophy,
    title: "Gamified Learning",
    description:
      "Earn XP, level up, at i-unlock ang achievements habang natututo. Parang laro, pero natututo ka ng totoong skills.",
    color: "from-amber-500 to-orange-500",
  },
  {
    icon: BookOpen,
    title: "Structured Lessons",
    description:
      "Step-by-step lessons na dinisenyo para sa beginners. Mula sa basics hanggang advanced workflows — may Filipino context palagi.",
    color: "from-emerald-500 to-teal-500",
  },
  {
    icon: Puzzle,
    title: "Mission-Based Learning",
    description:
      "Lessons become quests! Kumpletuhin ang mga missions para ma-practice ang natutunan mo sa real-world scenarios.",
    color: "from-rose-500 to-red-500",
  },
  {
    icon: Shield,
    title: "Safe Practice Environment",
    description:
      "Walang pwedeng masirang project. Practice lang nang practice sa sandbox environment hanggang confident ka na.",
    color: "from-sky-500 to-indigo-500",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

export function FeaturesSection() {
  return (
    <section id="features" className="py-24 bg-gray-50/50 dark:bg-gray-900/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            Bakit <span className="gradient-text">GitHubPH</span>?
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400">
            Hindi na kailangan matakot sa Git. Ginawa namin itong masaya,
            interactive, at madaling intindihin para sa bawat Pilipinong
            developer.
          </p>
        </motion.div>

        {/* Features Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {features.map((feature, i) => (
            <motion.div
              key={i}
              variants={itemVariants}
              className="group relative bg-white dark:bg-gray-800 rounded-2xl p-6 border border-gray-200 dark:border-gray-700 hover:border-primary-300 dark:hover:border-primary-600 transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
            >
              {/* Gradient Icon */}
              <div
                className={`w-12 h-12 rounded-xl bg-gradient-to-br ${feature.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}
              >
                <feature.icon className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-lg font-semibold mb-2 text-gray-900 dark:text-gray-100">
                {feature.title}
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </motion.div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-16 text-center"
        >
          <div className="inline-flex flex-col sm:flex-row items-center gap-4 p-8 bg-gradient-to-r from-primary-500/10 to-accent-500/10 dark:from-primary-500/5 dark:to-accent-500/5 rounded-2xl border border-primary-200 dark:border-primary-800">
            <div>
              <Rocket className="w-8 h-8 mx-auto sm:mx-0 text-primary-500 mb-2" />
            </div>
            <div className="text-left">
              <p className="font-semibold text-gray-900 dark:text-gray-100">
                Ready to start your Git journey?
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Libre ito — simulan mo na ngayon!
              </p>
            </div>
            <a
              href="/login"
              className="shrink-0 px-6 py-2.5 bg-primary-500 text-white rounded-full font-semibold hover:bg-primary-600 transition-all hover:shadow-lg"
            >
              Sign Up Free
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
