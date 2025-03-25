import { el as UniversalEl, html } from "@common-module/universal-page";
import {
  createPage,
  el,
} from "https://raw.githubusercontent.com/yjgaia/deno-module/refs/heads/main/page.ts";
import { faucetView } from "../pages/faucetView.ts";
import { introView } from "../pages/introView.ts";
import { layout } from "./pages/layout.ts";

UniversalEl.impl = el;
html.impl = (htmlContent) => htmlContent;

const GTAG_ID = "G-SD4BMR4ZKT";
const VERSION = "0.0.15";

export function pages(
  path: string,
  isDevMode = false,
): Response | undefined {
  if (path === "/") {
    return new Response(
      createPage(
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
      ),
      {
        status: 200,
        headers: { "Content-Type": "text/html" },
      },
    );
  } else if (path === "/faucet") {
    return new Response(
      createPage(
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
      ),
      {
        status: 200,
        headers: { "Content-Type": "text/html" },
      },
    );
  }
}
