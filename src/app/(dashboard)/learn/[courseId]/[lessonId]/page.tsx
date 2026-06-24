"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle,
  Clock,
  Star,
  BookOpen,
  Terminal,
  Lightbulb,
  AlertCircle,
  ChevronRight,
} from "lucide-react";

const lessonContent = `
## Bakit Kailangan Mo ang Git?

Isipin mong gumagawa ka ng capstone project — isang **Library Management System**. May tatlo kayong members:

- Ikaw: gumagawa ng **login system**
- Si Mia: gumagawa ng **book borrowing feature**
- Si Kiko: nagfi-fix ng **bug sa search**

Lahat kayo nag-e-edit ng parehong files. Paano niyo pagsasamahin ang changes nang hindi nawawala ang gawa ng isa't isa?

### Ang Lumang Paraan (Walang Git)

\`\`\`
project_v1.zip
project_v2_final.zip
project_v2_final_FINAL.zip
project_v2_final_FINAL_REVISED.zip
\`\`\`

Nakakalito, 'di ba? 😅

### Ang Git na Paraan

Sa Git, bawat change ay may record. Pwedeng balikan ang kahit anong version. Pwedeng pagsabayin ang gawa ng iba't ibang tao. **Hindi na kailangan ng maraming ZIP files.**

> **Key Concept:** Ang Git ay isang **Version Control System** — parang time machine para sa iyong code.
`;

const quizQuestions = [
  {
    id: "q1",
    question: "Ano ang pangunahing purpose ng Git?",
    options: [
      "Mag-edit ng code",
      "Mag-track ng changes sa code (Version Control)",
      "Mag-host ng website",
      "Mag-design ng UI",
    ],
    correctIndex: 1,
    explanation:
      "Ang Git ay isang Version Control System na nagta-track ng lahat ng changes sa iyong code.",
  },
  {
    id: "q2",
    question:
      "Ano ang advantage ng Git kumpara sa pag-save ng multiple ZIP files?",
    options: [
      "Mas mabilis mag-ZIP",
      "May record ng bawat change at pwedeng balikan",
      "Mas maganda ang file name",
      "Wala — pareho lang sila",
    ],
    correctIndex: 1,
    explanation:
      "Sa Git, bawat change ay may commit message at history. Pwedeng balikan ang kahit anong version anumang oras.",
  },
];

export default function LessonPage() {
  const params = useParams();
  const [quizStarted, setQuizStarted] = useState(false);
  const [selectedAnswers, setSelectedAnswers] = useState<
    Record<string, number>
  >({});
  const [submitted, setSubmitted] = useState(false);

  const lessonId = params.lessonId as string;
  const courseId = params.courseId as string;

  const score = quizQuestions.filter(
    (q) => selectedAnswers[q.id] === q.correctIndex
  ).length;

  return (
    <div className="p-6 lg:p-8 max-w-4xl mx-auto space-y-6">
      {/* Navigation */}
      <div className="flex items-center justify-between">
        <Link
          href={`/learn/${courseId}`}
          className="inline-flex items-center gap-1 text-sm text-gray-500 hover:text-primary-500 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Course
        </Link>
        <div className="flex items-center gap-2 text-xs text-gray-500">
          <Clock className="w-3.5 h-3.5" />
          <span>10 min</span>
          <Star className="w-3.5 h-3.5 ml-2" />
          <span>+50 XP</span>
        </div>
      </div>

      {/* Lesson Content */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 p-6 lg:p-8 shadow-sm"
      >
        <div className="lesson-content prose dark:prose-invert max-w-none">
          {/* Info boxes */}
          <div className="flex flex-wrap gap-3 mb-6 not-prose">
            <div className="flex items-center gap-2 px-3 py-1.5 bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-400 rounded-lg text-sm">
              <Terminal className="w-4 h-4" />
              Concept Lesson
            </div>
            <div className="flex items-center gap-2 px-3 py-1.5 bg-amber-50 dark:bg-amber-900/20 text-amber-700 dark:text-amber-400 rounded-lg text-sm">
              <Clock className="w-4 h-4" />
              10 min read
            </div>
            <div className="flex items-center gap-2 px-3 py-1.5 bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-400 rounded-lg text-sm">
              <Star className="w-4 h-4" />
              50 XP
            </div>
          </div>

          {/* Rendered lesson content (simplified for MVP) */}
          <h1 className="text-3xl font-extrabold mb-6">
            Ano ang Git at Bakit Kailangan Mo Ito?
          </h1>

          <h2>Bakit Kailangan Mo ang Git?</h2>
          <p>
            Isipin mong gumagawa ka ng capstone project — isang{" "}
            <strong>Library Management System</strong>. May tatlo kayong
            members:
          </p>
          <ul>
            <li>
              Ikaw: gumagawa ng <strong>login system</strong>
            </li>
            <li>
              Si Mia: gumagawa ng <strong>book borrowing feature</strong>
            </li>
            <li>
              Si Kiko: nagfi-fix ng <strong>bug sa search</strong>
            </li>
          </ul>
          <p>
            Lahat kayo nag-e-edit ng parehong files. Paano niyo pagsasamahin ang
            changes nang hindi nawawala ang gawa ng isa't isa?
          </p>

          <h3>Ang Lumang Paraan (Walang Git)</h3>
          <pre className="bg-gray-100 dark:bg-gray-900 p-4 rounded-lg font-mono text-sm overflow-x-auto">
            <code>
              project_v1.zip{"\n"}
              project_v2_final.zip{"\n"}
              project_v2_final_FINAL.zip{"\n"}
              project_v2_final_FINAL_REVISED.zip
            </code>
          </pre>
          <p>Nakakalito, 'di ba? 😅</p>

          <h3>Ang Git na Paraan</h3>
          <p>
            Sa Git, bawat change ay may record. Pwedeng balikan ang kahit anong
            version. Pwedeng pagsabayin ang gawa ng iba't ibang tao.{" "}
            <strong>Hindi na kailangan ng maraming ZIP files.</strong>
          </p>

          <blockquote>
            <strong>Key Concept:</strong> Ang Git ay isang{" "}
            <strong>Version Control System</strong> — parang time machine para
            sa iyong code.
          </blockquote>

          {/* Tip Box */}
          <div className="flex items-start gap-3 p-4 bg-primary-50 dark:bg-primary-900/20 border border-primary-200 dark:border-primary-800 rounded-xl my-6 not-prose">
            <Lightbulb className="w-5 h-5 text-primary-500 shrink-0 mt-0.5" />
            <div>
              <p className="font-semibold text-primary-700 dark:text-primary-300">
                Filipino Context Tip!
              </p>
              <p className="text-sm text-primary-600 dark:text-primary-400">
                Isipin mo ang Git parang "Google Docs version history" — pero
                para sa code. Pwedeng makita kung sino ang nag-edit, kailan, at
                bakit.
              </p>
            </div>
          </div>

          <h2>Ano ang Git?</h2>
          <p>
            Ang Git ay isang <strong>Distributed Version Control System</strong>{" "}
            na ginawa ni Linus Torvalds (ang gumawa ng Linux) noong 2005.
          </p>
          <p>Sa madaling salita, ang Git ay:</p>
          <ul>
            <li>
              📝 <strong>Tracker</strong> — sinusubaybayan ang bawat change
            </li>
            <li>
              ⏰ <strong>Time Machine</strong> — pwedeng balikan ang lumang
              version
            </li>
            <li>
              🤝 <strong>Collaboration Tool</strong> — pwedeng sabay-sabay
              magtrabaho
            </li>
            <li>
              🛡️ <strong>Safety Net</strong> — hindi mawawala ang gawa mo
            </li>
          </ul>

          <h2>Ano ang GitHub?</h2>
          <p>
            Ang <strong>GitHub</strong> ay isang website kung saan pwedeng
            i-upload ang iyong Git repositories. Parang "Google Drive for code"
            — pero may superpowers!
          </p>
          <p>Sa GitHub, pwedeng:</p>
          <ul>
            <li>I-store ang code online</li>
            <li>Makipag-collaborate sa ibang developers</li>
            <li>Mag-submit ng Pull Requests</li>
            <li>Mag-track ng issues at bugs</li>
            <li>I-showcase ang iyong projects sa profile</li>
          </ul>

          <div className="flex items-start gap-3 p-4 bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-xl my-6 not-prose">
            <AlertCircle className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
            <div>
              <p className="font-semibold text-amber-700 dark:text-amber-300">
                Important: Git ≠ GitHub!
              </p>
              <p className="text-sm text-amber-600 dark:text-amber-400">
                Git ay ang tool na nasa computer mo. GitHub ay ang website.
                Pwedeng gumamit ng Git nang walang GitHub, pero mas madali ang
                collaboration kapag may GitHub.
              </p>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Quiz Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 p-6 lg:p-8 shadow-sm"
      >
        {!quizStarted ? (
          <div className="text-center py-8">
            <BookOpen className="w-12 h-12 mx-auto text-primary-500 mb-4" />
            <h2 className="text-xl font-bold mb-2">Ready for a Quiz?</h2>
            <p className="text-gray-500 dark:text-gray-400 mb-6">
              Test your knowledge! {quizQuestions.length} questions • Earn XP
              for correct answers
            </p>
            <button
              onClick={() => setQuizStarted(true)}
              className="px-8 py-3 bg-primary-500 text-white rounded-full font-semibold hover:bg-primary-600 transition-all active:scale-95"
            >
              Start Quiz
            </button>
          </div>
        ) : !submitted ? (
          <div className="space-y-6">
            <h2 className="text-xl font-bold mb-4">Lesson Quiz</h2>
            {quizQuestions.map((q, qi) => (
              <div key={q.id} className="space-y-3">
                <p className="font-medium">
                  {qi + 1}. {q.question}
                </p>
                <div className="space-y-2">
                  {q.options.map((option, oi) => (
                    <button
                      key={oi}
                      onClick={() =>
                        setSelectedAnswers({ ...selectedAnswers, [q.id]: oi })
                      }
                      className={`w-full text-left p-3 rounded-lg border transition-all ${
                        selectedAnswers[q.id] === oi
                          ? "border-primary-500 bg-primary-50 dark:bg-primary-900/20"
                          : "border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600"
                      }`}
                    >
                      <span className="text-sm">{option}</span>
                    </button>
                  ))}
                </div>
              </div>
            ))}
            <button
              onClick={() => setSubmitted(true)}
              className="w-full py-3 bg-primary-500 text-white rounded-xl font-semibold hover:bg-primary-600 transition-all active:scale-95"
            >
              Submit Answers
            </button>
          </div>
        ) : (
          <div className="text-center py-8">
            <div
              className={`w-20 h-20 mx-auto rounded-full flex items-center justify-center mb-4 ${
                score === quizQuestions.length
                  ? "bg-green-100 dark:bg-green-900/30"
                  : score >= quizQuestions.length / 2
                  ? "bg-amber-100 dark:bg-amber-900/30"
                  : "bg-red-100 dark:bg-red-900/30"
              }`}
            >
              <CheckCircle
                className={`w-10 h-10 ${
                  score === quizQuestions.length
                    ? "text-green-600"
                    : score >= quizQuestions.length / 2
                    ? "text-amber-600"
                    : "text-red-600"
                }`}
              />
            </div>
            <h2 className="text-xl font-bold mb-2">
              {score}/{quizQuestions.length} Correct!
            </h2>
            <p className="text-gray-500 dark:text-gray-400 mb-6">
              {score === quizQuestions.length
                ? "Perfect score! Ang galing! 🎉"
                : "Good effort! Review mo lang ang lesson at subukan ulit."}
            </p>
            <div className="flex items-center justify-center gap-3">
              <Link
                href={`/learn/${courseId}`}
                className="px-6 py-2.5 border border-gray-200 dark:border-gray-700 rounded-full font-medium hover:bg-gray-50 dark:hover:bg-gray-800 transition-all"
              >
                Back to Course
              </Link>
              <Link
                href={`/learn/${courseId}`}
                className="px-6 py-2.5 bg-primary-500 text-white rounded-full font-semibold hover:bg-primary-600 transition-all flex items-center gap-1"
              >
                Next Lesson <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        )}
      </motion.div>
    </div>
  );
}
