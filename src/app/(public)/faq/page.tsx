"use client";

import { motion } from "framer-motion";
import { ChevronDown, HelpCircle } from "lucide-react";
import { useState } from "react";

const faqs = [
  {
    q: "Ano ang GitHubPH?",
    a: "Ang GitHubPH ay isang libre, interactive, at gamified learning platform na ginawa para turuan ang mga Pilipinong estudyante, beginners, at aspiring developers kung paano gumamit ng Git at GitHub sa pinakamadaling paraan.",
  },
  {
    q: "Libre ba talaga ito?",
    a: "Oo! Libre ito magpakailanman para sa lahat. Walang hidden fees, walang credit card na kailangan. Ang mission namin ay gawing accessible ang Git education para sa lahat ng Pilipino.",
  },
  {
    q: "Kailangan ko ba ng prior knowledge sa Git?",
    a: "Hindi! Ang GitHubPH ay dinisenyo para sa absolute beginners. Magsisimula ka sa basics — ano ang Git, bakit ito ginagamit, at paano mag-setup. Step-by-step ang approach namin.",
  },
  {
    q: "Paano naiiba ang GitHubPH sa ibang tutorials?",
    a: "Hindi kami documentation website. May interactive simulations kami, gamified lessons, missions, achievements, at branch/merge simulator. Visual at hands-on ang learning experience — hindi puro text.",
  },
  {
    q: "Anong mga courses ang available?",
    a: "May courses kami mula Git Basics, Branching & Merging, Collaboration with GitHub, hanggang Advanced Workflows. Lahat ng examples ay nasa Filipino context — capstone projects, library systems, POS, atbp.",
  },
  {
    q: "Paano gumagana ang Git Playground?",
    a: "Ang Git Playground ay isang interactive terminal simulator sa browser. Pwedeng mag-type ng Git commands at makita ang visual result nang hindi kailangan mag-install ng Git sa computer mo. Safe environment ito — walang pwedeng masira.",
  },
  {
    q: "Ano ang XP, levels, at achievements?",
    a: "Habang natututo ka, nag-eearn ka ng XP (experience points). Kapag enough XP na, mag-lelevel up ka. May achievements din para sa milestones tulad ng completing courses, perfect quiz scores, at streaks. Parang laro pero natututo ka!",
  },
  {
    q: "Pwede ba itong gamitin ng capstone groups?",
    a: "Oo! Perfect ang GitHubPH para sa capstone groups. May collaboration lessons, branch management, at merge conflict resolution. Matututo ang buong grupo kung paano mag-work together gamit ang Git at GitHub.",
  },
  {
    q: "May certificate ba?",
    a: "Sa ngayon, wala pa kaming official certificates. Pero ang achievements at level system ay pwedeng i-share bilang proof ng iyong learning progress.",
  },
  {
    q: "Paano ako makakapag-suggest ng features?",
    a: "Bukas ang aming GitHub repository para sa feedback at suggestions. Pwede kang mag-open ng issue o mag-contribute sa project!",
  },
];

export default function FAQPage() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div className="pt-24 pb-16">
      <section className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <HelpCircle className="w-12 h-12 mx-auto mb-4 text-primary-500" />
          <h1 className="text-4xl sm:text-5xl font-extrabold mb-6">
            Frequently Asked <span className="gradient-text">Questions</span>
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400">
            Lahat ng kailangan mong malaman tungkol sa GitHubPH.
          </p>
        </motion.div>

        <div className="space-y-3">
          {faqs.map((faq, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden"
            >
              <button
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                className="w-full flex items-center justify-between p-5 text-left hover:bg-gray-50 dark:hover:bg-gray-750 transition-colors"
              >
                <span className="font-medium pr-4">{faq.q}</span>
                <ChevronDown
                  className={`w-5 h-5 shrink-0 text-gray-400 transition-transform duration-200 ${
                    openIndex === i ? "rotate-180" : ""
                  }`}
                />
              </button>
              {openIndex === i && (
                <div className="px-5 pb-5">
                  <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
                    {faq.a}
                  </p>
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
}
