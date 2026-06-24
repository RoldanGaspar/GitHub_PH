"use client";

import { motion } from "framer-motion";
import { Heart, Users, Target, Zap, MapPin, Globe } from "lucide-react";

const values = [
  {
    icon: Heart,
    title: "Gawa Para sa Pinoy",
    description:
      "Bawat lesson ay ginawa sa konteksto ng Pilipinas: capstone projects, library systems, POS, attendance systems — mga projects na ginagawa ng Pinoy students.",
  },
  {
    icon: Users,
    title: "Community First",
    description:
      "Naniniwala kami na mas mabilis matuto kapag may kasama. Kaya ginawa naming social at collaborative ang learning experience.",
  },
  {
    icon: Target,
    title: "Beginner-Friendly",
    description:
      "Zero knowledge? Walang problema! Mula sa basics hanggang advanced, dahan-dahan at malinaw ang bawat lesson.",
  },
  {
    icon: Zap,
    title: "Interactive & Fun",
    description:
      "Hindi textbook, hindi documentation — interactive simulations at gamified missions para hindi boring ang learning.",
  },
];

export default function AboutPage() {
  return (
    <div className="pt-24 pb-16">
      {/* Hero */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <h1 className="text-4xl sm:text-5xl font-extrabold mb-6">
            About <span className="gradient-text">GitHubPH</span>
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed">
            GitHubPH ay isang libre, gamified, at interactive learning platform
            na dinisenyo para turuan ang mga Pilipinong estudyante, capstone
            groups, at aspiring developers kung paano gumamit ng Git at GitHub
            sa pinakamadali at pinakamasayang paraan.
          </p>
        </motion.div>

        {/* Mission */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-3xl mx-auto mb-16 bg-white dark:bg-gray-800 rounded-2xl p-8 border border-gray-200 dark:border-gray-700 shadow-sm"
        >
          <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
            <MapPin className="w-6 h-6 text-accent-500" />
            Ang Mission Namin
          </h2>
          <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
            Ang goal namin ay hindi gumawa ng isa pang documentation website.
            Ang goal namin ay gawin ang pinakamadali at pinakamasayang lugar
            para tuluyang maintindihan ng mga Pilipino ang Git at GitHub — nang
            hindi kailangan kabisaduhin ang commands, nang hindi natatakot
            magkamali, at nang may kumpyansa na gamitin ito sa totoong projects.
          </p>
        </motion.div>

        {/* Values */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16"
        >
          {values.map((value, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700"
            >
              <div className="w-10 h-10 rounded-lg bg-primary-100 dark:bg-primary-900/30 flex items-center justify-center mb-4">
                <value.icon className="w-5 h-5 text-primary-600 dark:text-primary-400" />
              </div>
              <h3 className="text-lg font-semibold mb-2">{value.title}</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                {value.description}
              </p>
            </motion.div>
          ))}
        </motion.div>

        {/* Why This Exists */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-3xl mx-auto text-center"
        >
          <Globe className="w-12 h-12 mx-auto mb-4 text-primary-500" />
          <h2 className="text-2xl font-bold mb-4">Bakit Namin Ito Ginawa?</h2>
          <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
            Karamihan ng Git tutorials ay text-heavy, documentation-focused, at
            nakakabagot para sa beginners. Maraming estudyante ang sumusuko
            matuto ng GitHub dahil overwhelm sila sa mga concepts tulad ng
            repository, commit, branch, merge, at pull request. Gusto naming
            baguhin 'yan — gawing visual, interactive, at masaya ang pag-aaral
            ng isa sa pinakamahalagang skill ng modern developer.
          </p>
        </motion.div>
      </section>
    </div>
  );
}
