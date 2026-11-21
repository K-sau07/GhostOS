"use client";
import { useEffect, useRef, useState } from "react";
import { useTheme } from "next-themes";
import { profile, running, earlier, sensei } from "@/lib/content";
import { useOS, WINDOWS, SECTIONS, type WinId } from "@/lib/store";
import { launch, showSection } from "@/lib/actions";
import { useLive } from "@/lib/live-context";
import { leetcodeUrl, GITHUB_USER } from "@/lib/live-types";
import { QUOTES } from "@/lib/quotes";

type Line = { t: "in" | "out"; v: string };

const OPENABLE = ["about", ...SECTIONS.filter((x) => x.id !== "overview").map((x) => x.id), "live", "safari", "shell", "resume"];

const HELP: [string, string][] = [
  ["whoami", "who this is"],
  ["neofetch", "the system, at a glance"],
  ["ls", "what's running, and what came before"],
  ["cat <project>", "one project, with its links"],
  ["sensei", "what repo-sensei is, and how it's measured"],
  ["leetcode", "problems solved, live"],
  ["contributions", "GitHub, the last year"],
  ["quote", "today's quote"],
  ["open <name>", "about, experience, projects, live, shell, resume, ..."],
  ["mission", "Mission Control"],
  ["theme light|dark", "switch the theme"],
  ["contact", "how to reach me"],
  ["clear", "clear the screen"],
];
const COMMANDS = ["whoami", "neofetch", "ls", "cat", "sensei", "leetcode", "contributions", "quote",
  "open", "mission", "theme", "contact", "clear", "help", "date"];

const all = [...running, ...earlier];
const find = (q: string) =>
  all.find((p) => p.id === q || p.name.toLowerCase() === q || p.name.toLowerCase().replace(/\s+/g, "-") === q);

const GHOST = [
  "   .-'''-.   ",
  "  /  o o  \\  ",
  " |    ^    | ",
  " |  \\___/  | ",
  " |         | ",
  " '.^.^.^.^.' ",
];

/** what each command's argument can complete to */
const ARGS: Record<string, string[]> = {
  cat: all.map((p) => p.id),
  open: OPENABLE,
  theme: ["light", "dark"],
};

const commonPrefix = (xs: string[]) =>
  xs.reduce((a, b) => { let i = 0; while (i < a.length && a[i] === b[i]) i++; return a.slice(0, i); });

export default function TerminalApp() {
  const { setTheme, resolvedTheme } = useTheme();
  const live = useLive();
  const [lines, setLines] = useState<Line[]>([{ t: "out", v: "ghost shell. type help to begin, tab completes." }]);
  const [v, setV] = useState("");
  const [past, setPast] = useState<string[]>([]);
  const [back, setBack] = useState(-1);
  const end = useRef<HTMLDivElement>(null);

  useEffect(() => { end.current?.scrollIntoView({ block: "end" }); }, [lines]);

  const print = (cmd: string | null, out: string[]) =>
    setLines((l) => [...l, ...(cmd === null ? [] : [{ t: "in" as const, v: cmd }]), ...out.map((o) => ({ t: "out" as const, v: o }))]);

  const run = (raw: string) => {
    const cmd = raw.trim();
    const [head = "", ...rest] = cmd.split(/\s+/);
    const arg = rest.join(" ").toLowerCase();
    const out: string[] = [];
    const lc = live.leetcode, gh = live.contributions;

    switch (head.toLowerCase()) {
      case "": break;
      case "help": HELP.forEach(([c, d]) => out.push(`${c.padEnd(18)}${d}`)); break;
      case "whoami":
        out.push(`${profile.name}, ${profile.role.toLowerCase()}, ${profile.city}.`, profile.line, profile.open);
        break;
      case "neofetch": {
        const up = Math.round(performance.now() / 60000);
        const info = [
          "saurabh@ghost-os",
          "----------------",
          "OS       Ghost OS (Next.js 16, React 19)",
          `Host     ${window.location.host}`,
          `Uptime   ${up} min${up === 1 ? "" : "s"}`,
          "Shell    ghost shell",
          `Display  ${window.innerWidth}x${window.innerHeight}, ${resolvedTheme ?? "system"}`,
          `Stack    ${profile.stack}`,
          ...(lc ? [`LeetCode ${lc.solved} solved (${lc.easy} easy, ${lc.medium} medium, ${lc.hard} hard)`] : []),
          ...(gh ? [`GitHub   ${gh.total.toLocaleString("en-US")} contributions in the last year`] : []),
          `Now      ${profile.now.label}`,
        ];
        for (let i = 0; i < Math.max(GHOST.length, info.length); i++)
          out.push(`${(GHOST[i] ?? "").padEnd(16)}${info[i] ?? ""}`);
        break;
      }
      case "ls":
        out.push("running/");
        running.forEach((p) => out.push(`  ${p.id.padEnd(12)}${p.line}`));
        out.push("before-that/");
        earlier.forEach((p) => out.push(`  ${p.id.padEnd(12)}${p.line}`));
        break;
      case "cat": {
        const p = find(arg);
        if (!p) { out.push(`cat: ${arg || "?"}: no such project. try ls`); break; }
        out.push(p.name, p.line, `stack  ${p.stack}`);
        if ("live" in p) out.push(`live   ${p.live}`);
        out.push(`code   ${p.repo}`);
        break;
      }
      case "sensei":
        out.push(sensei.pitch, "", sensei.bench, "", ...sensei.links.map((l) => `${l.label.padEnd(18)}${l.href}`));
        break;
      case "leetcode":
        if (lc) {
          const bar = (n: number) => "#".repeat(Math.round((n / Math.max(lc.solved, 1)) * 30)).padEnd(30, ".");
          out.push(`${lc.solved} problems solved`, "",
            `easy    ${bar(lc.easy)} ${lc.easy}`, `medium  ${bar(lc.medium)} ${lc.medium}`, `hard    ${bar(lc.hard)} ${lc.hard}`,
            "", leetcodeUrl);
        } else out.push(`couldn't reach LeetCode just now. ${leetcodeUrl}`);
        break;
      case "contributions":
        if (gh) {
          const glyph = " .:*#";
          const weeks: string[] = [];
          for (let i = 0; i < gh.days.length; i += 7) weeks.push(gh.days.slice(i, i + 7).map((d) => glyph[d.level] ?? " ").join(""));
          out.push(`${gh.total.toLocaleString("en-US")} contributions in the last year`, "");
          for (let r = 0; r < 7; r++) out.push(weeks.slice(-52).map((w) => w[r] ?? " ").join(""));
          out.push("", `https://github.com/${GITHUB_USER}`);
        } else out.push(`couldn't reach GitHub just now. https://github.com/${GITHUB_USER}`);
        break;
      case "quote": {
        const q = QUOTES[live.quote] ?? QUOTES[0];
        out.push(`"${q.text}"`, `  ${q.by}${q.where ? `, ${q.where}` : ""}`);
        break;
      }
      case "date": out.push(new Date().toString()); break;
      case "open": {
        const sec = SECTIONS.find((x) => x.id === arg || x.label.toLowerCase() === arg || (arg === "about" && x.id === "overview"));
        const id = (arg === "safari" ? "browser" : arg === "résumé" ? "resume" : arg.replace(".app", "")) as WinId;
        if (sec) { showSection(sec.id); out.push(`opening ${sec.label}`); }
        else if (id in WINDOWS) { launch(id); out.push(`opening ${WINDOWS[id].title}`); }
        else out.push(`open: ${arg || "?"}: try ${OPENABLE.join(", ")}`);
        break;
      }
      case "mission": useOS.getState().setMission(true); out.push("mission control. esc to leave."); break;
      case "contact":
        out.push(profile.email, profile.linkedin, profile.github);
        break;
      case "theme":
        if (arg === "light" || arg === "dark") { setTheme(arg); out.push(`theme: ${arg}`); }
        else out.push("theme: light or dark");
        break;
      case "clear": setLines([]); setV(""); setPast((h) => [...h, cmd]); setBack(-1); return;
      case "sudo": out.push("nice try."); break;
      case "rm": out.push("this is a portfolio, not a production box."); break;
      case "exit": out.push("there's no leaving. try the dock."); break;
      default: out.push(`${head}: command not found. try help`);
    }

    print(cmd, out);
    if (cmd) setPast((h) => [...h, cmd]);
    setBack(-1);
    setV("");
  };

  const complete = () => {
    const parts = v.split(/\s+/);
    if (parts.length <= 1) {
      const hits = COMMANDS.filter((c) => c.startsWith(parts[0] ?? ""));
      if (hits.length === 1) setV(`${hits[0]} `);
      else if (hits.length > 1) { setV(commonPrefix(hits)); print(null, [hits.join("  ")]); }
      return;
    }
    const [cmd, ...rest] = parts;
    const pre = rest.join(" ").toLowerCase();
    const hits = (ARGS[cmd.toLowerCase()] ?? []).filter((a) => a.startsWith(pre));
    if (hits.length === 1) setV(`${cmd} ${hits[0]}`);
    else if (hits.length > 1) { setV(`${cmd} ${commonPrefix(hits)}`); print(null, [hits.join("  ")]); }
  };

  const recall = (dir: 1 | -1) => {
    if (!past.length) return;
    const n = back === -1 ? (dir === -1 ? past.length - 1 : -1) : back + dir;
    if (n < 0 || n >= past.length) { setBack(-1); setV(""); return; }
    setBack(n); setV(past[n]);
  };

  return (
    <div className="h-full overflow-auto p-5 font-mono text-[12.5px] leading-[1.7]"
         onClick={(e) => (e.currentTarget.querySelector("input") as HTMLInputElement | null)?.focus()}>
      {lines.map((l, i) => (
        <div key={i} className={l.t === "in" ? "text-fg" : "whitespace-pre-wrap text-muted"}>
          {l.t === "in" ? <><span className="text-accent">~ $ </span>{l.v}</> : l.v || " "}
        </div>
      ))}
      <label className="flex">
        <span className="shrink-0 text-accent">~ $&nbsp;</span>
        <input
          value={v}
          onChange={(e) => setV(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") run(v);
            if (e.key === "Tab") { e.preventDefault(); complete(); }
            if (e.key === "ArrowUp") { e.preventDefault(); recall(-1); }
            if (e.key === "ArrowDown") { e.preventDefault(); recall(1); }
            if (e.key === "l" && e.ctrlKey) { e.preventDefault(); setLines([]); }
          }}
          spellCheck={false} autoComplete="off" aria-label="Shell input"
          className="flex-1 bg-transparent text-fg caret-[var(--accent)] outline-none"
        />
      </label>
      <div ref={end} />
    </div>
  );
}
