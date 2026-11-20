"use client";
import { useEffect, useRef, useState } from "react";
import { useTheme } from "next-themes";
import { profile, running, earlier, sensei } from "@/lib/content";
import { WINDOWS, type WinId } from "@/lib/store";
import { launch } from "@/lib/actions";

type Line = { t: "in" | "out"; v: string };

const HELP = [
  "whoami            who this is",
  "ls                what's running, and what came before",
  "cat <project>     one project, with its links",
  "sensei            what repo-sensei is, and how it's measured",
  "open <window>     about, sensei, projects, resume",
  "contact           how to reach me",
  "theme light|dark  switch the theme",
  "clear             clear the screen",
];

const all = [...running, ...earlier];
const find = (q: string) =>
  all.find((p) => p.id === q || p.name.toLowerCase() === q || p.name.toLowerCase().replace(/\s+/g, "-") === q);

export default function TerminalApp() {
  const { setTheme } = useTheme();
  const [lines, setLines] = useState<Line[]>([{ t: "out", v: "ghost shell. type help to begin." }]);
  const [v, setV] = useState("");
  const [past, setPast] = useState<string[]>([]);
  const [back, setBack] = useState(-1);
  const end = useRef<HTMLDivElement>(null);

  useEffect(() => { end.current?.scrollIntoView({ block: "end" }); }, [lines]);

  const run = (raw: string) => {
    const cmd = raw.trim();
    const [head = "", ...rest] = cmd.split(/\s+/);
    const arg = rest.join(" ").toLowerCase();
    const out: string[] = [];

    switch (head.toLowerCase()) {
      case "": break;
      case "help": out.push(...HELP); break;
      case "whoami":
        out.push(`${profile.name}, ${profile.role.toLowerCase()}, ${profile.city}.`, profile.line, profile.open);
        break;
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
      case "open": {
        const id = (arg === "repo-sensei" ? "sensei" : arg === "résumé" ? "resume" : arg) as WinId;
        if (id in WINDOWS) { launch(id); out.push(`opening ${WINDOWS[id].title}`); }
        else out.push(`open: ${arg || "?"}: no such window`);
        break;
      }
      case "contact":
        out.push(profile.email, profile.linkedin, profile.github);
        break;
      case "theme":
        if (arg === "light" || arg === "dark") { setTheme(arg); out.push(`theme: ${arg}`); }
        else out.push("theme: light or dark");
        break;
      case "clear": setLines([]); setV(""); setPast((h) => [...h, cmd]); setBack(-1); return;
      case "sudo": out.push("nice try."); break;
      default: out.push(`${head}: command not found. try help`);
    }

    setLines((l) => [...l, { t: "in", v: cmd }, ...out.map((o) => ({ t: "out" as const, v: o }))]);
    if (cmd) setPast((h) => [...h, cmd]);
    setBack(-1);
    setV("");
  };

  const recall = (dir: 1 | -1) => {
    if (!past.length) return;
    const n = back === -1 ? (dir === -1 ? past.length - 1 : -1) : back + dir;
    if (n < 0 || n >= past.length) { setBack(-1); setV(""); return; }
    setBack(n); setV(past[n]);
  };

  return (
    <div className="h-full overflow-auto p-5 font-mono text-[12.5px] leading-[1.75]"
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
            if (e.key === "ArrowUp") { e.preventDefault(); recall(-1); }
            if (e.key === "ArrowDown") { e.preventDefault(); recall(1); }
          }}
          spellCheck={false} autoComplete="off" aria-label="Shell input"
          className="flex-1 bg-transparent text-fg caret-[var(--accent)] outline-none"
        />
      </label>
      <div ref={end} />
    </div>
  );
}
