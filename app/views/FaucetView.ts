import { View } from "@common-module/app";
import { faucetView } from "../../pages/faucetView.js";
import AppConfig from "../AppConfig.js";
import Layout from "./Layout.js";

export default class FaucetView extends View {
  constructor() {
    super();
    Layout.content = this.container = faucetView();

    document.title = (AppConfig.isDevMode ? "(Dev) " : "") + "$GAIA Faucet";
  }
}
