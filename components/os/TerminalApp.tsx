"use client";
import { useEffect, useRef, useState } from "react";
import { profile, projects, experience, skills } from "@/lib/content";
import { useOS } from "@/lib/store";

type Line = { t: "in" | "out"; v: string };

const HELP = [
  "available commands",
  "  whoami            who you're talking to",
  "  ls work           list shipped systems",
  "  cat <name>        read a project",
  "  stack             the tech stack",
  "  experience        work history",
  "  open <app>        launch an app",
  "  contact           how to reach me",
  "  clear             clear the screen",
];

export default function TerminalApp() {
  const { open } = useOS();
  const [lines, setLines] = useState<Line[]>([
    { t: "out", v: "ghost shell · type `help` to begin" },
  ]);
  const [v, setV] = useState("");
  const end = useRef<HTMLDivElement>(null);

  useEffect(() => { end.current?.scrollIntoView({ block: "end" }); }, [lines]);

  const run = (raw: string) => {
    const cmd = raw.trim();
    const out: string[] = [];
    const [head, ...rest] = cmd.split(/\s+/);
    const arg = rest.join(" ").toLowerCase();

    switch (head.toLowerCase()) {
      case "": break;
      case "help": out.push(...HELP); break;
      case "whoami":
        out.push(`${profile.name} — ${profile.role}`, profile.location, profile.summary);
        break;
      case "ls":
        if (arg.startsWith("work") || arg === "") {
          projects.forEach((p, i) =>
            out.push(`${String(i + 1).padStart(2, "0")}  ${p.file.padEnd(22)} ${p.kind}`));
        } else out.push(`ls: ${arg}: no such directory`);
        break;
      case "cat": {
        const p = projects.find(
          (x) => x.id === arg || x.file.toLowerCase() === arg || x.name.toLowerCase() === arg);
        if (!p) { out.push(`cat: ${arg || "?"}: no such file`); break; }
        out.push(p.name, "", p.blurb, "", `stack: ${p.stack.join(", ")}`);
        if (p.repo) out.push(`repo:  ${p.repo}`);
        break;
      }
      case "stack":
        Object.entries(skills).forEach(([k, val]) => out.push(`${k.padEnd(15)} ${val.join(", ")}`));
        break;
      case "experience":
        experience.forEach((x) => {
          out.push(`${x.title} — ${x.company}  (${x.when})`);
          x.bullets.forEach((b) => out.push(`  · ${b}`));
        });
        break;
      case "contact":
        out.push(profile.email, profile.github, profile.linkedin);
        break;
      case "open": {
        const map: Record<string, [string, string]> = {
          about: ["about", "about.mdx"], work: ["finder", "work"],
          systems: ["systems", "systems.app"], resume: ["resume", "resume.pdf"],
          contact: ["contact", "contact.mail"],
        };
        const hit = map[arg];
        if (hit) { open(hit[0], hit[1]); out.push(`opening ${hit[1]}…`); }
        else out.push(`open: ${arg || "?"}: unknown app`);
        break;
      }
      case "clear": setLines([]); setV(""); return;
      default: out.push(`ghost: command not found: ${head}`);
    }

    setLines((l) => [...l, { t: "in", v: cmd }, ...out.map((o) => ({ t: "out" as const, v: o }))]);
    setV("");
  };

  return (
    <div className="h-full p-5 mono text-[12.5px] leading-[1.75] overflow-auto"
         onClick={(e) => (e.currentTarget.querySelector("input") as HTMLInputElement)?.focus()}>
      {lines.map((l, i) => (
        <div key={i} className={l.t === "in" ? "text-white" : "text-white/62 whitespace-pre-wrap"}>
          {l.t === "in" ? <><span className="text-white/34">ghost ~ % </span>{l.v}</> : l.v}
        </div>
      ))}
      <div className="flex">
        <span className="text-white/34 shrink-0">ghost ~ % </span>
        <input
          value={v}
          onChange={(e) => setV(e.target.value)}
          onKeyDown={(e) => { if (e.key === "Enter") run(v); }}
          spellCheck={false} autoComplete="off"
          className="flex-1 bg-transparent outline-none text-white caret-white"
        />
      </div>
      <div ref={end} />
    </div>
  );
}
