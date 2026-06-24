/**
 * GitHubPH Git Playground Engine
 *
 * A virtual Git simulator that processes commands
 * against an in-memory file system and repository.
 *
 * Supports: init, add, commit, branch, checkout, merge, log, status
 */

export interface GitFile {
  name: string;
  content: string;
  staged: boolean;
  modified: boolean;
}

export interface GitCommit {
  id: string;
  message: string;
  branch: string;
  timestamp: number;
  files: { name: string; content: string }[];
  parent?: string;
}

export interface GitBranch {
  name: string;
  head: string; // commit id
}

export interface GitRepoState {
  initialized: boolean;
  repoName: string;
  currentBranch: string;
  branches: GitBranch[];
  files: GitFile[];
  stagedFiles: string[];
  commits: GitCommit[];
  head: string; // current commit id
  output: string[];
}

let repo: GitRepoState | null = null;

function generateCommitId(): string {
  return Math.random().toString(16).slice(2, 9);
}

export function getRepo(): GitRepoState | null {
  return repo;
}

export function resetRepo(): void {
  repo = null;
}

export function executeCommand(input: string): string[] {
  const args = input.trim().split(/\s+/);
  const command = args[0];
  const params = args.slice(1);

  if (!repo && command !== "git") {
    return ["No Git repository found. Run 'git init <name>' first."];
  }

  if (command !== "git") {
    return [`Unknown command: ${command}. Did you mean 'git ${command}'?`];
  }

  const subcommand = params[0];
  const subParams = params.slice(1);

  switch (subcommand) {
    case "init":
      return handleInit(subParams);
    case "status":
      return handleStatus();
    case "add":
      return handleAdd(subParams);
    case "commit":
      return handleCommit(subParams);
    case "log":
      return handleLog();
    case "branch":
      return handleBranch(subParams);
    case "checkout":
      return handleCheckout(subParams);
    case "merge":
      return handleMerge(subParams);
    case "touch":
      return handleTouch(subParams);
    case "echo":
      return handleEcho(subParams, input);
    default:
      return [`git: '${subcommand}' is not a supported command in this playground.`];
  }
}

function handleInit(params: string[]): string[] {
  const name = params[0] || "my-project";
  const files: GitFile[] = [
    { name: "README.md", content: `# ${name}\n\nProject initialized!`, staged: false, modified: false },
    { name: ".gitignore", content: "node_modules/\n.env\n", staged: false, modified: false },
  ];

  const initialCommit: GitCommit = {
    id: generateCommitId(),
    message: "Initial commit",
    branch: "main",
    timestamp: Date.now(),
    files: files.map((f) => ({ name: f.name, content: f.content })),
  };

  repo = {
    initialized: true,
    repoName: name,
    currentBranch: "main",
    branches: [{ name: "main", head: initialCommit.id }],
    files,
    stagedFiles: [],
    commits: [initialCommit],
    head: initialCommit.id,
    output: [],
  };

  return [
    `Initialized empty Git repository in ${name}/.git/`,
    `Created initial files: README.md, .gitignore`,
    `[main ${initialCommit.id}] Initial commit`,
    "",
    `💡 Tip: Use 'git status' to see your files, 'git add <file>' to stage changes.`,
  ];
}

function handleStatus(): string[] {
  if (!repo) return ["No repository."];

  const output: string[] = [`On branch ${repo.currentBranch}`];

  const staged = repo.files.filter((f) => f.staged);
  const modified = repo.files.filter((f) => f.modified && !f.staged);
  const untracked = repo.files.filter((f) => !f.staged && !f.modified && !staged.includes(f));

  if (staged.length === 0 && modified.length === 0) {
    output.push("nothing to commit, working tree clean");
  } else {
    if (staged.length > 0) {
      output.push("\nChanges to be committed:");
      staged.forEach((f) => output.push(`  (staged)    ${f.name}`));
    }
    if (modified.length > 0) {
      output.push("\nChanges not staged for commit:");
      modified.forEach((f) => output.push(`  (modified)  ${f.name}`));
    }
  }

  output.push(`\n${repo.files.length} files in working directory`);
  return output;
}

function handleAdd(params: string[]): string[] {
  if (!repo) return ["No repository."];

  if (params.length === 0 || params[0] === ".") {
    // git add .
    repo.files.forEach((f) => {
      f.staged = true;
      f.modified = false;
    });
    return ["Staged all files."];
  }

  const filename = params[0];
  const file = repo.files.find((f) => f.name === filename);

  if (!file) {
    // Create new file
    repo.files.push({ name: filename, content: "", staged: true, modified: false });
    return [`Created and staged new file: ${filename}`];
  }

  file.staged = true;
  file.modified = false;
  return [`Staged: ${filename}`];
}

function handleCommit(params: string[]): string[] {
  if (!repo) return ["No repository."];

  const messageFlag = params.indexOf("-m");
  const message =
    messageFlag >= 0 && params[messageFlag + 1]
      ? params[messageFlag + 1].replace(/^"(.*)"$/, "$1")
      : "Update files";

  const stagedFiles = repo.files.filter((f) => f.staged);

  if (stagedFiles.length === 0) {
    return ["nothing to commit (use 'git add' to stage files)"];
  }

  const commit: GitCommit = {
    id: generateCommitId(),
    message,
    branch: repo.currentBranch,
    timestamp: Date.now(),
    files: stagedFiles.map((f) => ({ name: f.name, content: f.content })),
    parent: repo.head,
  };

  // Update branch head
  const branch = repo.branches.find((b) => b.name === repo!.currentBranch);
  if (branch) branch.head = commit.id;

  repo.commits.push(commit);
  repo.head = commit.id;

  // Unstage files
  repo.files.forEach((f) => {
    f.staged = false;
    f.modified = false;
  });

  return [
    `[${repo.currentBranch} ${commit.id}] ${message}`,
    ` ${stagedFiles.length} file(s) changed`,
  ];
}

function handleLog(): string[] {
  if (!repo) return ["No repository."];

  const output: string[] = [];
  const seen = new Set<string>();

  // Show commits for current branch
  let commitId = repo.head;
  while (commitId && !seen.has(commitId)) {
    const commit = repo.commits.find((c) => c.id === commitId);
    if (!commit) break;
    seen.add(commitId);
    const marker = commit.id === repo.head ? " (HEAD -> " + repo.currentBranch + ")" : "";
    output.push(`commit ${commit.id}${marker}`);
    output.push(`  ${commit.message}`);
    output.push(`  ${new Date(commit.timestamp).toLocaleString()}`);
    output.push("");
    commitId = commit.parent || "";
  }

  return output.length > 0 ? output : ["No commits yet."];
}

function handleBranch(params: string[]): string[] {
  if (!repo) return ["No repository."];

  if (params.length === 0) {
    // List branches
    return repo.branches.map(
      (b) => (b.name === repo!.currentBranch ? `* ${b.name}` : `  ${b.name}`)
    );
  }

  const branchName = params[0];

  // Check if branch exists
  if (repo.branches.find((b) => b.name === branchName)) {
    return [`Branch '${branchName}' already exists.`];
  }

  // Create new branch from current HEAD
  repo.branches.push({
    name: branchName,
    head: repo.head,
  });

  return [`Created branch '${branchName}' at ${repo.head}`];
}

function handleCheckout(params: string[]): string[] {
  if (!repo) return ["No repository."];

  if (params.length === 0) {
    return [`You are on branch '${repo.currentBranch}'.`];
  }

  const flag = params[0];
  const branchName = params.length > 1 ? params[1] : params[0];

  if (flag === "-b") {
    // Create and switch
    if (repo.branches.find((b) => b.name === branchName)) {
      return [`Branch '${branchName}' already exists.`];
    }
    repo.branches.push({ name: branchName, head: repo.head });
    repo.currentBranch = branchName;
    return [`Switched to a new branch '${branchName}'`];
  }

  const branch = repo.branches.find((b) => b.name === branchName);
  if (!branch) {
    return [`error: pathspec '${branchName}' did not match any branch.`];
  }

  repo.currentBranch = branchName;
  repo.head = branch.head;
  return [`Switched to branch '${branchName}'`];
}

function handleMerge(params: string[]): string[] {
  if (!repo) return ["No repository."];
  const r = repo; // Narrowed reference

  if (params.length === 0) {
    return ["usage: git merge <branch>"];
  }

  const branchName = params[0];
  const branch = r.branches.find((b) => b.name === branchName);

  if (!branch) {
    return [`merge: ${branchName} - not something we can merge`];
  }

  if (branchName === r.currentBranch) {
    return [`Already on '${branchName}'.`];
  }

  // Simple fast-forward merge
  const mergeCommit: GitCommit = {
    id: generateCommitId(),
    message: `Merge branch '${branchName}' into ${r.currentBranch}`,
    branch: r.currentBranch,
    timestamp: Date.now(),
    files: [],
    parent: r.head,
  };

  const currentBranch = r.branches.find((b) => b.name === r.currentBranch);
  if (currentBranch) currentBranch.head = mergeCommit.id;

  r.commits.push(mergeCommit);
  r.head = mergeCommit.id;

  // Simulate merge bringing in files from target branch
  const targetCommit = r.commits.find((c) => c.id === branch.head);
  if (targetCommit && targetCommit.files.length > 0) {
    targetCommit.files.forEach((f) => {
      if (!r.files.find((rf) => rf.name === f.name)) {
        r.files.push({ name: f.name, content: f.content, staged: false, modified: false });
      }
    });
  }

  return [
    `Merge made by the 'ort' strategy.`,
    ` ${mergeCommit.id}`,
    `Fast-forward merge of '${branchName}' into ${repo.currentBranch}`,
  ];
}

function handleTouch(params: string[]): string[] {
  if (!repo) return ["No repository."];

  if (params.length === 0) return ["usage: git touch <filename>"];

  const filename = params[0];
  const existing = repo.files.find((f) => f.name === filename);

  if (existing) {
    existing.modified = true;
    return [`Modified: ${filename}`];
  }

  repo.files.push({ name: filename, content: "", staged: false, modified: true });
  return [`Created: ${filename} (use 'git add ${filename}' to stage)`];
}

function handleEcho(params: string[], fullInput: string): string[] {
  if (!repo) return ["No repository."];

  // Parse: git echo "content" > filename
  const redirectIndex = params.findIndex((p) => p === ">");
  if (redirectIndex < 0 || redirectIndex >= params.length - 1) {
    return ["usage: git echo \"content\" > filename"];
  }

  const content = params.slice(0, redirectIndex).join(" ").replace(/^"(.*)"$/, "$1");
  const filename = params[redirectIndex + 1];

  const existing = repo.files.find((f) => f.name === filename);
  if (existing) {
    existing.content = content;
    existing.modified = true;
  } else {
    repo.files.push({ name: filename, content, staged: false, modified: true });
  }

  return [`Updated: ${filename}`];
}

// Get visualization data for the playground UI
export interface PlaygroundVizData {
  branches: { name: string; commits: string[] }[];
  files: { name: string; status: "staged" | "modified" | "clean" }[];
  commitGraph: {
    nodes: { id: string; label: string; branch: string }[];
    edges: { from: string; to: string }[];
  };
}

export function getVisualizationData(): PlaygroundVizData | null {
  if (!repo) return null;

  const branches = repo.branches.map((b) => {
    const branchCommits: string[] = [];
    let commitId = b.head;
    while (commitId) {
      const commit = repo!.commits.find((c) => c.id === commitId);
      if (!commit) break;
      branchCommits.push(commitId);
      commitId = commit.parent || "";
    }
    return { name: b.name, commits: branchCommits };
  });

  const files = repo.files.map((f) => ({
    name: f.name,
    status: f.staged ? "staged" as const : f.modified ? "modified" as const : "clean" as const,
  }));

  const nodes: { id: string; label: string; branch: string }[] = [];
  const edges: { from: string; to: string }[] = [];

  repo.commits.forEach((c) => {
    nodes.push({ id: c.id, label: c.message, branch: c.branch });
    if (c.parent) {
      edges.push({ from: c.parent, to: c.id });
    }
  });

  return { branches, files, commitGraph: { nodes, edges } };
}