# Ghost OS

My portfolio is an operating system in a browser tab.

### → **[ghost-os-pied.vercel.app](https://ghost-os-pied.vercel.app)**

![Next.js](https://img.shields.io/badge/Next.js_16-000000?style=flat-square&logo=nextdotjs&logoColor=white)
![React](https://img.shields.io/badge/React_19-61DAFB?style=flat-square&logo=react&logoColor=black)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=flat-square&logo=typescript&logoColor=white)
![Tailwind](https://img.shields.io/badge/Tailwind_4-06B6D4?style=flat-square&logo=tailwindcss&logoColor=white)
![Framer](https://img.shields.io/badge/Framer_Motion-0055FF?style=flat-square&logo=framer&logoColor=white)

Menu bar with working dropdowns, a dock that magnifies toward the cursor, draggable and
resizable windows, Spotlight on ⌘K, a right-click menu, and a shell you can type into.
No UI kit.

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
| `projects` | six running projects, each with one small animated motif, then four from before |
| `shell` | `help`, `ls`, `cat <project>`, `sensei`, `open <window>`, `theme dark` |
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

## Content

Everything the site says lives in `lib/content.ts`. The site's own URL lives in
`lib/site.ts`; moving to a personal domain is a change to that one line.
