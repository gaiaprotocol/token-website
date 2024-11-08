import { el } from "@common-module/universal-page";

export function faucetView<T>(): T {
  return el(
    ".faucet-view",
    el("h1", "$GAIA Faucet"),
  );
}
