import { QueriedDomNode, View } from "@common-module/app";
import { introView } from "../../pages/introView.js";
import AppConfig from "../AppConfig.js";
import CoinDisplay from "../components/CoinDisplay.js";
import Layout from "./Layout.js";

export default class IntroView extends View {
  private coinDisplay: CoinDisplay;

  constructor() {
    super();
    Layout.content = this.container = introView();

    const coinDisplay = new QueriedDomNode(".intro-view .coin-display");
    coinDisplay.append(this.coinDisplay = new CoinDisplay());

    document.title = (AppConfig.isDevMode ? "(Dev) " : "") + "$GAIA";
  }

  public close(): void {
    this.coinDisplay.remove();
  }
}
