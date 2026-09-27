"use client";
import { useOS } from "@/lib/store";
import BootScreen from "./BootScreen";
import MenuBar from "./MenuBar";
import Desktop from "./Desktop";
import Dock from "./Dock";
import Window from "./Window";
import Spotlight from "./Spotlight";
import {
  AboutApp, SystemsApp, ResumeApp,
  ContactApp, TrashApp, ProjectApp,
} from "./AppViews";
import FinderApp from "./FinderApp";
import LiveApp from "./LiveApp";
import SafariApp from "./SafariApp";
import TerminalApp from "./TerminalApp";
import MobileView from "./MobileView";

function render(id: string) {
  if (id.startsWith("proj:")) return <ProjectApp id={id.slice(5)} />;
  if (id.startsWith("safari:")) return <SafariApp id={id.slice(7)} />;
  switch (id) {
    case "about":    return <AboutApp />;
    case "finder":   return <FinderApp />;
    case "systems":  return <SystemsApp />;
    case "live":     return <LiveApp />;
    case "resume":   return <ResumeApp />;
    case "terminal": return <TerminalApp />;
    case "contact":  return <ContactApp />;
    case "trash":    return <TrashApp />;
    default:         return null;
  }
}

export default function GhostOS() {
  const { booted, boot, windows } = useOS();

  return (
    <>
      <MobileView />

      <div className="hidden md:block">
      {!booted && <BootScreen onDone={boot} />}

      <div className="fog-layer">
        <i className="fog-1" /><i className="fog-2" /><i className="fog-3" /><i className="fog-4" />
      </div>

      {booted && (
        <>
          <MenuBar />
          <Desktop />
          <div className="absolute inset-0 z-[100] pointer-events-none">
            {windows.map((w) => (
              <div key={w.id} className="pointer-events-auto">
                <Window win={w}>{render(w.id)}</Window>
              </div>
            ))}
          </div>
          <Dock />
          <Spotlight />
        </>
      )}

      <div className="vignette" />
      <div className="grain" />
      </div>
    </>
  );
}
