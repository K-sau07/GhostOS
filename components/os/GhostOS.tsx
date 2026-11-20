import BootScreen from "./BootScreen";
import MenuBar from "./MenuBar";
import MobileBar from "./MobileBar";
import Desktop from "./Desktop";
import Dock from "./Dock";
import Window from "./Window";
import Spotlight from "./Spotlight";
import Motion from "./Motion";
import About from "./About";
import Sensei from "./Sensei";
import Projects from "./Projects";
import TerminalApp from "./TerminalApp";
import Resume from "./Resume";

/**
 * The whole site. Every window is in the server-rendered page, so the content
 * reads without JavaScript and search engines see all of it. On a desktop the
 * windows float over the wallpaper; below 1024px the same windows stack into
 * one page.
 */
export default function GhostOS() {
  return (
    <Motion>
      <div className="desk">
        <BootScreen />
        <div aria-hidden className="dots absolute inset-0 max-lg:hidden"
             style={{ "--gx": "50%", "--gy": "42%" }} />
        <MenuBar />
        <MobileBar />
        <Desktop />

        <main className="pb-24 lg:contents">
          <Window id="about" delay={0.05}><About /></Window>
          <Window id="sensei" delay={0.2}><Sensei /></Window>
          <Window id="projects"><Projects /></Window>
          <Window id="shell" lgOnly><TerminalApp /></Window>
          <Window id="resume" lgOnly><Resume /></Window>
        </main>

        <Dock />
        <Spotlight />
      </div>
    </Motion>
  );
}
