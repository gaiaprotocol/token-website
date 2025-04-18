import { QueriedDomNode, View } from "@common-module/app";
import { AlertDialog, Button, ButtonType } from "@common-module/app-components";
import { CalendarIcon } from "@gaiaprotocol/svg-icons";
import { introView } from "../../../pages/introView.js";
import AppConfig from "../AppConfig.js";
import CoinDisplay from "../components/CoinDisplay.js";
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
        title: "Launching in Q2 2025",
        onClick: () => {
          new AlertDialog({
            icon: new CalendarIcon(),
            title: "$GAIA Launch Schedule",
            message:
              "$GAIA will be launched in Q2 2025.\nStay tuned for more updates!",
          });
        },
      }),
    );
  }

  public close(): void {
    this.coinDisplay.remove();
  }
}
