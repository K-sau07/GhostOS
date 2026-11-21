import { profile } from "@/lib/content";

/** The welcome screen, once per session. CSS only, so it never blocks the
    page underneath and costs nothing without JavaScript. */
export default function BootScreen() {
  return (
    <div className="boot" aria-hidden>
      <div className="boot-wall" />
      <div className="boot-shade" />
      <div className="boot-card flex flex-col items-center px-6 text-center">
        <div className="boot-hello label">Welcome to Saurabh&apos;s MacBook</div>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/avatar.webp" alt="" width={112} height={112} fetchPriority="high"
             className="boot-pic mt-7 h-[96px] w-[96px] rounded-full border border-line object-cover lg:h-[112px] lg:w-[112px]" />
        <div className="mt-6 font-serif text-[clamp(36px,10vw,56px)] leading-none">
          {profile.name.split("").map((ch, i) => (
            <span key={i} className="boot-ch" style={{ "--i": i }}>{ch}</span>
          ))}
        </div>
        <p className="mt-5 max-w-[30ch] text-[clamp(16px,4.4vw,20px)] leading-[1.5] text-fg/80 lg:max-w-none">
          {profile.line.split(" ").map((w, i, all) => (
            <span key={i} className="boot-word" style={{ "--i": i }}>{w}{i < all.length - 1 ? " " : ""}</span>
          ))}
        </p>
        <div className="mt-9 h-[3px] w-[200px] overflow-hidden rounded-full bg-line/70">
          <div className="boot-bar h-full rounded-full bg-accent" />
        </div>
      </div>
    </div>
  );
}
