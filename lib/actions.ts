import { useOS, type WinId } from "./store";
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

/** Bring up the projects window with one card in view. */
export function showCard(card: string) {
  launch("projects");
  requestAnimationFrame(() =>
    document.getElementById(`card-${card}`)?.scrollIntoView({ block: "start", behavior: "smooth" }));
}

export const openUrl = (href: string) =>
  href.startsWith("mailto:") ? (window.location.href = href) : window.open(href, "_blank", "noreferrer");
