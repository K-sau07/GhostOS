import { profile } from "@/lib/content";

/** Plays once per session on the desktop, in CSS only, so it never blocks the
    page underneath and costs nothing without JavaScript. */
export default function BootScreen() {
  return (
    <div className="boot" aria-hidden>
      <div className="boot-card flex flex-col items-center text-center">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/avatar.webp" alt="" width={112} height={112}
             className="boot-pic h-[112px] w-[112px] rounded-full border border-line object-cover" />
        <div className="mt-7 font-serif text-[52px] leading-none">
          {profile.name.split("").map((ch, i) => (
            <span key={i} className="boot-ch" style={{ "--i": i }}>{ch}</span>
          ))}
        </div>
        <div className="boot-sub label mt-4">{profile.city}<span className="dot mx-2.5" />{profile.role}</div>
        <div className="mt-8 h-[3px] w-[220px] overflow-hidden rounded-full bg-line/70">
          <div className="boot-bar h-full rounded-full bg-accent" />
        </div>
      </div>
    </div>
  );
}
