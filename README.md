# Ghost OS

My portfolio is an operating system in a browser tab.

### → **[ghost-os-pied.vercel.app](https://ghost-os-pied.vercel.app)**

Next.js 16, React 19, TypeScript, Tailwind 4, Framer Motion.

Menu bar with working dropdowns, a dock that magnifies toward the cursor, draggable and
resizable windows that snap to the screen edges, Mission Control (⌥↑), a window switcher
(⌥\`), Spotlight (⌘K), Notification Center behind the clock, a screensaver after a minute
idle, a right-click menu, and a shell with tab completion. No UI kit.

## The look

The same theme as my GitHub profile README, values copied from the generators that draw
it. Georgia for names, the system sans for reading, monospace for labels and code. One
accent, used sparingly. 1px hairlines, 14px radii, a dot grid fading out behind things.
Light and dark both follow the OS, with a toggle in the menu bar.

## Windows

| | |
|:--|:--|
| `about` | who, what, and three facts under a hairline |
| `repo-sensei` | the README card, rebuilt: the question types itself, the trace draws down seven hops, citation chips light the rows they cite, replay |
| `activity` | quote of the day, my GitHub contributions and LeetCode, live, and this site's latest commits |
| `projects` | six running projects, each with one small animated motif, then four from before |
| `shell` | `neofetch`, `ls`, `cat <project>`, `leetcode`, `contributions`, `quote`, `git log`, `open <window>`, `mission` |
| `résumé.pdf` | the PDF, in a window |

Every window is in the server-rendered HTML. The desktop decides which ones float where;
without JavaScript, or on a phone, the same windows stack into one page. The boot plays
once per session, in CSS. Motion stops under `prefers-reduced-motion`.

## Running it

```bash
npm install
npm run dev     # localhost:3000
```

```bash
npm run typecheck   # tsc --noEmit
npm run lint
npm run build
```

All three run in CI on every push.

## Live numbers

LeetCode and GitHub contributions are fetched on the server and cached for an hour
(`lib/live.ts`). If either can't be reached, its widget falls back to a link. The quote
changes daily, from a list of real, attributed quotes in `lib/quotes.ts`. Unique visitors
are counted by Vercel Web Analytics (no cookies), visible in the Vercel dashboard.

## Content

Everything the site says lives in `lib/content.ts`. The site's own URL lives in
`lib/site.ts`; moving to a personal domain is a change to that one line.
