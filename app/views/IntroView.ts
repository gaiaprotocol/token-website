import { QueriedDomNode, View } from "@common-module/app";
import { Alert, Button, ButtonType } from "@common-module/app-components";
import { introView } from "../../pages/introView.js";
import AppConfig from "../AppConfig.js";
import CoinDisplay from "../components/CoinDisplay.js";
import CalendarIcon from "../icons/CalendarIcon.js";
import Layout from "./Layout.js";

export default class IntroView extends View {
  private coinDisplay: CoinDisplay;

  constructor() {
    super();
    document.title = (AppConfig.isDevMode ? "(Dev) " : "") + "$GAIA";

    Layout.content = this.container = introView();

    const coinDisplay = new QueriedDomNode(".intro-view .coin-display");
    coinDisplay.append(this.coinDisplay = new CoinDisplay());

    new QueriedDomNode(".intro-view header .buttons").append(
      new Button({
        type: ButtonType.Outlined,
        //title: "Add $GAIA to Wallet",
        title: "Launching in Q1 2025",
        onClick: () => {
          new Alert({
            icon: new CalendarIcon(),
            title: "$GAIA Launch Schedule",
            message:
              "$GAIA will be launched in Q1 2025.\nStay tuned for more updates!",
          });
        },
      }),
    );
  }

  public close(): void {
    this.coinDisplay.remove();
  }
}
