import {
  IconDoc, IconPDF, IconFolder, IconApp, IconSystems,
  IconTerminal, IconMail, IconTrash, IconLink, IconFinder, IconMovie,
} from "@/components/os/Icons";
import { profile, projects } from "./content";

export interface Launchable {
  id: string;
  title: string;            // filename, e.g. "about.mdx"
  icon: (p: { size?: number }) => React.ReactElement;
  w?: number; h?: number;
  href?: string;            // external link instead of a window
  sep?: boolean;            // dock separator before this item
}

export const DOCK_ITEMS: Launchable[] = [
  { id: "finder",   title: "work",          icon: IconFinder,   w: 980, h: 620 },
  { id: "about",    title: "about.mdx",     icon: IconDoc,      w: 840, h: 640 },
  { id: "systems",  title: "systems.app",   icon: IconSystems,  w: 1060, h: 700 },
  { id: "live",     title: "live.app",      icon: IconMovie,    w: 1000, h: 660 },
  { id: "resume",   title: "resume.pdf",    icon: IconPDF,      w: 820, h: 660 },
  { id: "terminal", title: "terminal.app",  icon: IconTerminal, w: 720, h: 440 },
  { id: "contact",  title: "contact.mail",  icon: IconMail,     w: 640, h: 480 },
  { id: "github",   title: "github ↗",      icon: IconLink, href: profile.github, sep: true },
  { id: "linkedin", title: "linkedin ↗",    icon: IconLink, href: profile.linkedin },
  { id: "trash",    title: "trash",         icon: IconTrash, w: 560, h: 380, sep: true },
];

/** left-edge column, PostHog-style: the site as a filesystem */
export const DESKTOP_LEFT: Launchable[] = [
  { id: "about",   title: "about.mdx",   icon: IconDoc,    w: 840, h: 640 },
  { id: "finder",  title: "work",        icon: IconFolder, w: 980, h: 620 },
  { id: "systems", title: "systems.app", icon: IconSystems,w: 1060, h: 700 },
  { id: "live",    title: "live.app",    icon: IconMovie,  w: 1000, h: 660 },
  { id: "resume",  title: "resume.pdf",  icon: IconPDF,    w: 820, h: 660 },
];

/** right-edge column */
export const DESKTOP_RIGHT: Launchable[] = [
  { id: "terminal", title: "terminal.app", icon: IconTerminal, w: 720, h: 440 },
  { id: "contact",  title: "contact.mail", icon: IconMail,     w: 640, h: 480 },
  { id: "github",   title: "github ↗",     icon: IconLink, href: profile.github },
  { id: "trash",    title: "trash",        icon: IconTrash, w: 560, h: 380 },
];

/** every project is also a file you can open from the Finder window */
export const PROJECT_FILES: Launchable[] = projects.map((p) => ({
  id: `proj:${p.id}`,
  title: p.file,
  icon: p.kind === "infra" ? IconSystems : IconApp,
  w: 900, h: 640,
}));

export function titleFor(id: string): string {
  const all = [...DOCK_ITEMS, ...DESKTOP_LEFT, ...DESKTOP_RIGHT, ...PROJECT_FILES];
  return all.find((a) => a.id === id)?.title ?? id;
}
