import "react";

// CSS custom properties in style={{ "--d": ".2s" }}
declare module "react" {
  interface CSSProperties {
    [key: `--${string}`]: string | number | undefined;
  }
}
