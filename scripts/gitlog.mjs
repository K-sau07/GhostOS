// Writes this repo's recent commits for the shell's `git log`. Runs before dev
// and build. A shallow or missing clone just yields fewer (or no) commits.
import { execFileSync } from "node:child_process";
import { writeFileSync, mkdirSync } from "node:fs";

let commits = [];
try {
  const out = execFileSync("git", ["log", "-12", "--format=%h%x1f%ad%x1f%s", "--date=short"], { encoding: "utf8" });
  commits = out.trim().split("\n").filter(Boolean).map((l) => {
    const [hash, date, subject] = l.split("\x1f");
    return { hash, date, subject };
  });
} catch {}
mkdirSync("lib/generated", { recursive: true });
writeFileSync("lib/generated/gitlog.json", JSON.stringify(commits, null, 2) + "\n");
console.log(`gitlog: ${commits.length} commits`);
