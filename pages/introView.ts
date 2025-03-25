import { el, html } from "@common-module/universal-page";

export function introView<T>(): T {
  return el(
    ".intro-view",
    el(
      "header",
      el("p.caption", "Membership token"),
      el("h1", "$GAIA"),
      el(
        "p.description",
        "A membership token providing various benefits across the Gaia ecosystem.",
      ),
      el(
        ".buttons",
        /*el(
          "a.button.contained",
          "Trade on Uniswap",
          html(
            '<svg width="0.625rem" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M1 9L9 1M9 1H2.5M9 1V7.22222" stroke="currentColor" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round"></path></svg>',
          ),
          {
            href: "https://app.uniswap.org",
            target: "_blank",
          },
        ),*/
      ),
    ),
    el(".coin-display"),
  );
}
