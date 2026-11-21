import BootScreen from "./BootScreen";
import MenuBar from "./MenuBar";
import MobileBar from "./MobileBar";
import Desktop from "./Desktop";
import Dock from "./Dock";
import Window from "./Window";
import Spotlight from "./Spotlight";
import Motion from "./Motion";
import Settings from "./Settings";
import LiveApp from "./LiveApp";
import SafariApp from "./SafariApp";
import TerminalApp from "./TerminalApp";
import Resume from "./Resume";
import NotificationCenter from "./NotificationCenter";
import Screensaver from "./Screensaver";
import { Keys, MissionControl, SnapPreview } from "./Overlays";
import { LiveProvider } from "@/lib/live-context";
import type { LiveData } from "@/lib/live-types";

/**
 * The whole site. Every window is in the server-rendered page, so the content
 * reads without JavaScript and search engines see all of it. On a desktop the
 * windows float over the wallpaper; below 1024px the same windows stack into
 * one page.
 */
export default function SaurabhOS({ live }: { live: LiveData }) {
  return (
    <LiveProvider value={live}>
    <Motion>
      <div className="desk">
        <BootScreen />
        <div aria-hidden className="wallpaper absolute inset-0 max-lg:hidden" />
        <MenuBar />
        <MobileBar />
        <Desktop />

        <main className="pb-24 lg:contents">
          <Window id="settings" delay={0.1}><Settings /></Window>
          <Window id="live" lgOnly><LiveApp /></Window>
          <Window id="browser" lgOnly><SafariApp /></Window>
          <Window id="shell" lgOnly><TerminalApp /></Window>
          <Window id="resume" lgOnly><Resume /></Window>
        </main>

        <MissionControl />
        <SnapPreview />
        <Dock />
        <NotificationCenter />
        <Spotlight />
        <Screensaver />
        <Keys />
      </div>
    </Motion>
    </LiveProvider>
  );
}
