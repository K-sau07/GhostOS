"use client";
import { useOS } from "@/lib/store";
import { profile } from "@/lib/content";

/** The PDF, previewed in a window. The frame only loads once the window opens. */
export default function Resume() {
  const open = useOS((s) => s.wins.resume.open);
  return (
    <div className="flex h-full flex-col">
      <div className="flex h-10 shrink-0 items-center justify-between border-b border-line px-5">
        <span className="label">Preview</span>
        <a href={profile.resume} download className="link-u font-mono text-[12px] text-accent">download ↓</a>
      </div>
      {open && <iframe src={`${profile.resume}#view=FitH`} title="Résumé" className="w-full flex-1 bg-panel" />}
    </div>
  );
}
