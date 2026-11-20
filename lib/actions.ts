import { useOS, type WinId, type SectionId } from "./store";
import { profile } from "./content";

const desktop = () => window.matchMedia("(min-width: 1024px)").matches;

/** Open a window on the desktop; on a phone, where every window is already on
    the page, scroll to it instead. */
export function launch(id: WinId) {
  if (!desktop()) {
    if (id === "resume") window.open(profile.resume, "_blank");
    else document.getElementById(`win-${id}`)?.scrollIntoView({ behavior: "smooth" });
    return;
  }
  useOS.getState().open(id);
}

/** Open the settings window at one sidebar section. On a phone, scroll to it. */
export function showSection(id: SectionId) {
  if (!desktop()) {
    document.getElementById(`sec-${id}`)?.scrollIntoView({ behavior: "smooth" });
    return;
  }
  useOS.getState().setSection(id);
  useOS.getState().open("settings");
}

/** Bring up the projects section with one card in view. */
export function showCard(card: string) {
  showSection("projects");
  requestAnimationFrame(() =>
    document.getElementById(`card-${card}`)?.scrollIntoView({ block: "start", behavior: "smooth" }));
}

/** A project's live site, in the browser window. */
export function browse(project: string) {
  useOS.getState().setPage(project);
  launch("browser");
}

export const openUrl = (href: string) =>
  href.startsWith("mailto:") ? (window.location.href = href) : window.open(href, "_blank", "noreferrer");
