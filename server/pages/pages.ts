import { createPage } from "@common-module/ssr";
import { faucetView } from "../../pages/faucetView.js";
import { introView } from "../../pages/introView.js";
import { layout } from "./layout.js";

const GTAG_ID = "G-SD4BMR4ZKT";
const VERSION = "0.0.15";

export function pages(
  path: string,
  isDevMode = false,
): string | undefined {
  if (path === "/") {
    return createPage(
      {
        title: (isDevMode ? "(Dev) " : "") + "$GAIA",
        jsFiles: [
          `${isDevMode ? "/bundle-dev.js" : "/bundle.js"}?v=${VERSION}`,
        ],
        cssFiles: [
          `${isDevMode ? "/bundle-dev.css" : "/bundle.css"}?v=${VERSION}`,
        ],
        gtagId: GTAG_ID,
      },
      layout(introView()),
    );
  } else if (path === "/faucet") {
    return createPage(
      {
        title: (isDevMode ? "(Dev) " : "") + "$GAIA Faucet",
        jsFiles: [
          `${isDevMode ? "/bundle-dev.js" : "/bundle.js"}?v=${VERSION}`,
        ],
        cssFiles: [
          `${isDevMode ? "/bundle-dev.css" : "/bundle.css"}?v=${VERSION}`,
        ],
        gtagId: GTAG_ID,
      },
      layout(faucetView()),
    );
  }
}
