# Ghost OS

My portfolio is an operating system in a browser tab.

### → **[ghost-os-pied.vercel.app](https://ghost-os-pied.vercel.app)**

![Next.js](https://img.shields.io/badge/Next.js_16-000000?style=flat-square&logo=nextdotjs&logoColor=white)
![React](https://img.shields.io/badge/React_19-61DAFB?style=flat-square&logo=react&logoColor=black)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=flat-square&logo=typescript&logoColor=white)
![Tailwind](https://img.shields.io/badge/Tailwind_4-06B6D4?style=flat-square&logo=tailwindcss&logoColor=white)
![Framer](https://img.shields.io/badge/Framer_Motion-0055FF?style=flat-square&logo=framer&logoColor=white)

Boot sequence, menu bar with working dropdowns, a dock with real cursor-distance
magnification, draggable and resizable windows with traffic lights and z-stacking,
Spotlight on ⌘K, right-click context menus, and a shell you can actually type into.
Built from scratch — no UI kit.

## The look

Monochrome. There is no accent colour; hierarchy is carried entirely by luminance.
Volumetric fog drifts behind everything, film grain sits on top, and the name is
rendered with a gradient through `background-clip: text` so the letterforms dissolve
into the background rather than sitting on it.

## Apps

| | |
|:--|:--|
| `about.mdx` | profile, experience, stack, education — source-list navigation |
| `work` | a real Finder: sidebar, toolbar, icon and list views, search, status bar |
| `systems.app` | **architecture diagrams**, including the production systems |
| `live.app` | 3D coverflow of deployed projects |
| `Safari` | device-bezel browser that loads the live site |
| `terminal.app` | working shell — `whoami`, `ls work`, `cat <project>`, `open <app>` |
| `resume.pdf` · `contact.mail` · `trash` | |

`systems.app` is the point. Anyone can list technologies; it draws how the systems
actually fit together — request paths, batch pipelines, retrieval flows — rendered as
auto-laid-out SVG with orthogonal routing.

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

Everything the site says lives in `lib/content.ts` — one file, no copy embedded in
components. `components/os/` holds the window manager, dock, menus and each app.
State is a single Zustand store in `lib/store.ts`.

## Mobile

The desktop metaphor doesn't survive a phone, so under the `md` breakpoint it becomes
a scrolling page with the same palette and typography.
