"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Terminal,
  Play,
  RotateCcw,
  Lightbulb,
  Zap,
  CheckCircle,
  GitBranch,
  FolderTree,
  FileText,
  PlusCircle,
  MinusCircle,
  ArrowRight,
  Star,
} from "lucide-react";
import {
  executeCommand,
  resetRepo,
  getVisualizationData,
  type PlaygroundVizData,
  type GitFile,
  type GitCommit,
} from "@/lib/git-simulator";
import { useGamificationStore } from "@/store/gamification-store";

const suggestedCommands = [
  { cmd: "git init capstone-project", desc: "Initialize a new repo" },
  { cmd: "git status", desc: "Check repo status" },
  { cmd: "git add login.js", desc: "Stage a new file" },
  { cmd: 'git commit -m "Added login"', desc: "Commit changes" },
  { cmd: "git branch feature/branch", desc: "Create a branch" },
  { cmd: "git checkout -b develop", desc: "Create & switch branch" },
  { cmd: "git merge feature/branch", desc: "Merge a branch" },
  { cmd: "git log", desc: "View commit history" },
];

export default function PlaygroundPage() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState<string[]>([
    "🔌 Welcome to the Git Playground!",
    "",
    "Type a Git command to get started.",
    "Suggested: git init capstone-project",
  ]);
  const [vizData, setVizData] = useState<PlaygroundVizData | null>(null);
  const [history, setHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [commandCount, setCommandCount] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const outputRef = useRef<HTMLDivElement>(null);
  const addXP = useGamificationStore((s) => s.addXP);

  // Auto-scroll output
  useEffect(() => {
    if (outputRef.current) {
      outputRef.current.scrollTop = outputRef.current.scrollHeight;
    }
  }, [output]);

  // Focus input on mount
  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const runCommand = useCallback(
    (cmd: string) => {
      if (!cmd.trim()) return;

      const results = executeCommand(cmd);
      setOutput((prev) => [
        ...prev,
        `$ ${cmd}`,
        ...(results.length > 0 ? results : ["(no output)"]),
        "",
      ]);

      // Track history
      setHistory((prev) => [...prev, cmd]);
      setHistoryIndex(-1);
      setCommandCount((c) => c + 1);

      // Update visualization
      const viz = getVisualizationData();
      setVizData(viz);

      // Award XP for commands
      if (commandCount % 3 === 2) {
        addXP(10, "lesson_complete");
      }
    },
    [commandCount, addXP]
  );

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      const cmd = input.trim();
      setInput("");
      runCommand(cmd);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      if (history.length > 0) {
        const newIndex =
          historyIndex === -1
            ? history.length - 1
            : Math.max(0, historyIndex - 1);
        setHistoryIndex(newIndex);
        setInput(history[newIndex]);
      }
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      if (historyIndex >= 0) {
        const newIndex = historyIndex + 1;
        if (newIndex >= history.length) {
          setHistoryIndex(-1);
          setInput("");
        } else {
          setHistoryIndex(newIndex);
          setInput(history[newIndex]);
        }
      }
    }
  };

  const handleReset = () => {
    resetRepo();
    setOutput([
      "🔄 Repository reset.",
      "",
      "Start fresh: git init <project-name>",
    ]);
    setVizData(null);
    setCommandCount(0);
  };

  return (
    <div className="p-6 lg:p-8 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div>
          <h1 className="text-3xl font-extrabold mb-1">
            Git <span className="gradient-text">Playground</span>
          </h1>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Practice Git commands in a live sandbox. Zero risk, 100% learning.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xs text-gray-500 mr-2">
            {commandCount} commands run
          </span>
          <button
            onClick={handleReset}
            className="flex items-center gap-1.5 px-4 py-2 bg-gray-100 dark:bg-gray-700 rounded-lg text-sm hover:bg-gray-200 dark:hover:bg-gray-600 transition-all"
          >
            <RotateCcw className="w-4 h-4" />
            Reset
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Terminal - Left 2/3 */}
        <div className="lg:col-span-2 space-y-4">
          {/* Terminal Window */}
          <div className="bg-gray-900 rounded-2xl shadow-2xl overflow-hidden border border-gray-700">
            {/* Terminal Header */}
            <div className="flex items-center justify-between px-4 py-3 bg-gray-800 border-b border-gray-700">
              <div className="flex items-center gap-2">
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-red-500" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500" />
                  <div className="w-3 h-3 rounded-full bg-green-500" />
                </div>
                <span className="text-xs text-gray-400 ml-2 font-mono">
                  git-playground
                </span>
              </div>
              <span className="text-[10px] text-gray-500 font-mono">bash</span>
            </div>

            {/* Output Area */}
            <div
              ref={outputRef}
              className="p-4 font-mono text-xs sm:text-sm space-y-0.5 max-h-[400px] overflow-y-auto"
              onClick={() => inputRef.current?.focus()}
            >
              {output.map((line, i) => (
                <div
                  key={i}
                  className={`${
                    line.startsWith("$")
                      ? "flex items-start gap-2"
                      : line === ""
                      ? "h-2"
                      : "text-gray-400 pl-4"
                  }`}
                >
                  {line.startsWith("$") ? (
                    <>
                      <span className="text-green-400 shrink-0">$</span>
                      <span className="text-gray-300">{line.slice(2)}</span>
                    </>
                  ) : (
                    <span>{line}</span>
                  )}
                </div>
              ))}
            </div>

            {/* Input Line */}
            <div className="flex items-center gap-2 px-4 py-3 bg-gray-800 border-t border-gray-700">
              <span className="text-green-400 font-mono text-sm shrink-0">
                $
              </span>
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Type a git command..."
                className="flex-1 bg-transparent text-gray-300 font-mono text-sm outline-none placeholder:text-gray-600"
                spellCheck={false}
                autoComplete="off"
              />
              <button
                onClick={() => {
                  const cmd = input.trim();
                  setInput("");
                  runCommand(cmd);
                }}
                className="p-1.5 bg-green-600 rounded-lg hover:bg-green-500 transition-colors"
              >
                <Play className="w-3 h-3 text-white" />
              </button>
            </div>
          </div>

          {/* Suggested Commands */}
          <div className="bg-white dark:bg-gray-800 rounded-xl p-4 border border-gray-200 dark:border-gray-700">
            <h3 className="text-sm font-semibold mb-3 flex items-center gap-2">
              <Lightbulb className="w-4 h-4 text-accent-500" />
              Quick Commands
            </h3>
            <div className="flex flex-wrap gap-2">
              {suggestedCommands.map((cmd) => (
                <button
                  key={cmd.cmd}
                  onClick={() => {
                    setInput(cmd.cmd);
                    inputRef.current?.focus();
                  }}
                  className="px-3 py-1.5 bg-gray-100 dark:bg-gray-700 rounded-lg text-xs font-mono hover:bg-primary-100 dark:hover:bg-primary-900/30 hover:text-primary-600 dark:hover:text-primary-400 transition-all"
                  title={cmd.desc}
                >
                  {cmd.cmd}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Visual Panel - Right 1/3 */}
        <div className="space-y-4">
          {/* File Tree */}
          {vizData && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-white dark:bg-gray-800 rounded-xl p-4 border border-gray-200 dark:border-gray-700"
            >
              <h3 className="text-sm font-semibold mb-3 flex items-center gap-2">
                <FolderTree className="w-4 h-4 text-primary-500" />
                Working Directory
              </h3>
              <div className="space-y-1.5">
                {vizData.files.map((file) => (
                  <div
                    key={file.name}
                    className="flex items-center gap-2 text-sm"
                  >
                    <span
                      className={`w-2 h-2 rounded-full ${
                        file.status === "staged"
                          ? "bg-green-500"
                          : file.status === "modified"
                          ? "bg-amber-500"
                          : "bg-gray-300 dark:bg-gray-600"
                      }`}
                    />
                    <FileText className="w-3.5 h-3.5 text-gray-400" />
                    <span className="text-gray-700 dark:text-gray-300">
                      {file.name}
                    </span>
                    <span className="text-[10px] text-gray-400 ml-auto">
                      {file.status === "staged"
                        ? "staged"
                        : file.status === "modified"
                        ? "modified"
                        : ""}
                    </span>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {/* Branch List */}
          {vizData && vizData.branches.length > 0 && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-white dark:bg-gray-800 rounded-xl p-4 border border-gray-200 dark:border-gray-700"
            >
              <h3 className="text-sm font-semibold mb-3 flex items-center gap-2">
                <GitBranch className="w-4 h-4 text-accent-500" />
                Branches
              </h3>
              <div className="space-y-1.5">
                {vizData.branches.map((branch) => (
                  <div
                    key={branch.name}
                    className="flex items-center gap-2 text-sm"
                  >
                    <GitBranch className="w-3.5 h-3.5 text-gray-400" />
                    <span className="text-gray-700 dark:text-gray-300 font-mono text-xs">
                      {branch.name}
                    </span>
                    <span className="text-[10px] text-gray-400 ml-auto">
                      {branch.commits.length} commits
                    </span>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {/* Commit History */}
          {vizData && vizData.commitGraph.nodes.length > 0 && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white dark:bg-gray-800 rounded-xl p-4 border border-gray-200 dark:border-gray-700"
            >
              <h3 className="text-sm font-semibold mb-3 flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-green-500" />
                Commit History
              </h3>
              <div className="space-y-2 max-h-[300px] overflow-y-auto">
                {vizData.commitGraph.nodes
                  .slice()
                  .reverse()
                  .map((node) => (
                    <div
                      key={node.id}
                      className="pl-3 border-l-2 border-primary-200 dark:border-primary-800"
                    >
                      <div className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-primary-500 shrink-0" />
                        <span className="text-xs font-mono text-gray-500 truncate flex-1">
                          {node.label}
                        </span>
                      </div>
                      <div className="flex items-center gap-2 mt-0.5 pl-4">
                        <span className="text-[10px] text-gray-400 font-mono">
                          {node.id.slice(0, 7)}
                        </span>
                        {node.branch && (
                          <span className="text-[10px] px-1.5 py-0.5 bg-accent-100 dark:bg-accent-900/30 text-accent-700 dark:text-accent-400 rounded-full font-mono">
                            {node.branch}
                          </span>
                        )}
                      </div>
                    </div>
                  ))}
              </div>
            </motion.div>
          )}

          {/* Empty State */}
          {!vizData && (
            <div className="bg-white dark:bg-gray-800 rounded-xl p-8 border border-gray-200 dark:border-gray-700 text-center">
              <Terminal className="w-12 h-12 mx-auto text-gray-300 dark:text-gray-600 mb-3" />
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Run <code className="text-primary-500">git init</code> to see
                your repository visualization here.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
