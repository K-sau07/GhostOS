import type { Motif } from "@/lib/content";

/* One small animated drawing per project, ported from the README's cards.py.
   Coordinates are the card's own (580 wide); the viewBox crops to the motif band.
   Motion is CSS (.mo-* in globals.css) so prefers-reduced-motion can stop it. */

const c = {
  fg: "var(--fg)", muted: "var(--muted)", line: "var(--line)", panel: "var(--panel)",
  accent: "var(--accent)", blue: "var(--l-ui)", green: "var(--l-service)", orange: "var(--l-handler)",
};
const mono = { fontFamily: "var(--font-mono)" };

function OpenLens() {
  const steps: [string, number][] = [["repo", 120], ["5 questions", 290], ["first PR", 460]];
  return (
    <>
      <line x1="120" y1="200" x2="460" y2="200" stroke={c.line} strokeWidth="1.5" strokeDasharray="4 5" />
      {steps.map(([s, x]) => (
        <g key={s}>
          <circle cx={x} cy="200" r="7" fill={c.panel} stroke={c.accent} strokeWidth="1.5" />
          <text x={x} y="234" textAnchor="middle" fontSize="12" fill={c.muted} style={mono}>{s}</text>
        </g>
      ))}
      <circle className="mo-ol" cx="120" cy="200" r="4" fill={c.accent} />
    </>
  );
}

function TAssist() {
  return (
    <>
      <rect x="64" y="158" width="150" height="86" rx="6" fill={c.panel} stroke={c.line} />
      <rect x="78" y="172" width="70" height="7" rx="3" fill={c.muted} opacity=".6" />
      <rect x="78" y="188" width="120" height="5" rx="2.5" fill={c.line} />
      <rect x="78" y="200" width="104" height="5" rx="2.5" fill={c.line} />
      <rect className="mo-fade" x="76" y="212" width="96" height="12" rx="3" fill="none" stroke={c.accent} strokeWidth="1.3" />
      <text x="139" y="262" textAnchor="middle" fontSize="11" fill={c.muted} style={mono}>slide 14</text>
      <path className="mo-dash" d="M214 218 C 270 218, 280 200, 336 200" fill="none" stroke={c.accent}
            strokeWidth="1.3" strokeDasharray="4 4" />
      <rect x="336" y="172" width="200" height="56" rx="10" fill={c.panel} stroke={c.line} />
      <rect x="352" y="188" width="150" height="5" rx="2.5" fill={c.line} />
      <rect x="352" y="200" width="120" height="5" rx="2.5" fill={c.line} />
      <rect x="476" y="197" width="46" height="13" rx="6.5" fill="none" stroke={c.accent} />
      <text x="499" y="207" textAnchor="middle" fontSize="9" fill={c.accent} style={mono}>[14]</text>
    </>
  );
}

function Watchdog() {
  const cx = 290, cy = 204;
  const blips: [number, number, string, number][] = [
    [-34, -26, "greenhouse", 0], [40, -14, "lever", 1.3], [-8, 44, "ashby", 2.6],
  ];
  return (
    <>
      {[18, 38, 58].map((r) => <circle key={r} cx={cx} cy={cy} r={r} fill="none" stroke={c.line} />)}
      <g className="mo-sweep">
        {/* invisible disc so the group's box is centred on the radar */}
        <circle cx={cx} cy={cy} r="58" fill="none" />
        <path d={`M${cx} ${cy} L${cx} ${cy - 58} A58 58 0 0 1 ${cx + 41} ${cy - 41} Z`} fill={c.green} opacity=".16" />
        <line x1={cx} y1={cy} x2={cx} y2={cy - 58} stroke={c.green} strokeWidth="1.5" />
      </g>
      {blips.map(([dx, dy, n, d]) => (
        <g key={n} className="mo-blip" style={{ "--d": `${d}s` }}>
          <circle cx={cx + dx} cy={cy + dy} r="3.5" fill={c.green} />
          <text x={cx + dx + (dx >= 0 ? 10 : -10)} y={cy + dy + 4} textAnchor={dx >= 0 ? "start" : "end"}
                fontSize="11" fill={c.muted} style={mono}>{n}</text>
        </g>
      ))}
      <circle cx={cx} cy={cy} r="2.5" fill={c.green} />
    </>
  );
}

function GhostOS() {
  return (
    <>
      <rect x="150" y="150" width="280" height="76" rx="8" fill={c.panel} stroke={c.line} />
      {[166, 178, 190].map((x) => <circle key={x} cx={x} cy="164" r="3.5" fill="none" stroke={c.line} />)}
      <text x="166" y="196" fontSize="12" fill={c.muted} style={mono}>
        ~ $ <tspan fill={c.fg}>open projects</tspan>
      </text>
      <rect className="rs-caret" x="290" y="185" width="7" height="14" rx="1" fill={c.accent} />
      <rect x="200" y="232" width="180" height="32" rx="10" fill="none" stroke={c.line} />
      {[0, 1, 2, 3, 4].map((i) => (
        <rect key={i} className={i === 2 ? "mo-mag" : undefined}
              x={212 + i * 32} y="237" width="22" height="22" rx="5" fill={c.line} />
      ))}
    </>
  );
}

function Ecoplate() {
  const path = "M80 182 C 200 186, 300 198, 380 220 S 460 246, 470 250";
  return (
    <>
      <line x1="80" y1="258" x2="500" y2="258" stroke={c.line} />
      <line x1="470" y1="176" x2="470" y2="258" stroke={c.orange} strokeDasharray="3 4" />
      <text x="470" y="170" textAnchor="middle" fontSize="11" fill={c.orange} style={mono}>expiry</text>
      <text x="92" y="176" fontSize="11" fill={c.muted} style={mono}>full price</text>
      <path d={path} fill="none" stroke={c.green} strokeWidth="2" />
      {/* SMIL for the motion along the curve; CSS swaps in a still dot for reduced motion */}
      <circle className="mo-move" r="5" fill={c.green}>
        <animateMotion dur="5s" repeatCount="indefinite" keyPoints="0;1;1" keyTimes="0;.8;1"
                       calcMode="linear" path={path} />
      </circle>
      <circle className="mo-still" cx="80" cy="182" r="5" fill={c.green} />
      <text x="482" y="236" fontSize="11" fill={c.muted} style={mono}>then</text>
      <text x="482" y="250" fontSize="11" fill={c.muted} style={mono}>an NGO</text>
    </>
  );
}

function Aura() {
  const waves: [string, number, number][] = [[c.accent, 18, 0], [c.blue, 12, 10], [c.orange, 8, 20]];
  return (
    <>
      <defs>
        <clipPath id="aura-clip"><rect x="40" y="160" width="500" height="80" /></clipPath>
      </defs>
      <g clipPath="url(#aura-clip)">
        {waves.map(([col, amp, dy], i) => {
          let d = `M 40 ${196 + dy}`;
          for (let k = 0; k < 12; k++) d += ` q 40 ${k % 2 === 0 ? -amp : amp} 80 0`;
          return (
            <path key={i} className="mo-wave" d={d} fill="none" stroke={col} strokeWidth="1.6" opacity=".85"
                  style={{ "--t": `${3 + i}s` }} />
          );
        })}
      </g>
      <text x="40" y="262" fontSize="11" fill={c.muted} style={mono}>speech in</text>
      <text x="540" y="262" textAnchor="end" fontSize="11" fill={c.muted} style={mono}>art out</text>
    </>
  );
}

const MOTIFS: Record<Motif, () => React.ReactElement> = {
  openlens: OpenLens, tassist: TAssist, watchdog: Watchdog,
  ghostos: GhostOS, ecoplate: Ecoplate, aura: Aura,
};

export default function MotifArt({ id }: { id: Motif }) {
  const M = MOTIFS[id];
  return (
    <svg viewBox="0 140 580 130" className="mo block h-auto w-full" aria-hidden focusable="false">
      <M />
    </svg>
  );
}
