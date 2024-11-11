import { DomNode, el, View } from "@common-module/app";
import {
  Alert,
  AppCompConfig,
  Button,
  ButtonType,
  Input,
} from "@common-module/app-components";
import { StringUtils } from "@common-module/ts";
import {
  WalletConnectionManager,
  WalletConnectionPopup,
} from "@common-module/wallet";
import { formatEther, parseEther } from "ethers";
import { faucetView } from "../../pages/faucetView.js";
import AppConfig from "../AppConfig.js";
import GaiaProtocolTokenTestnetContract from "../contracts/GaiaProtocolTokenTestnetContract.js";
import Layout from "./Layout.js";

export default class FaucetView extends View {
  private balanceDisplay: DomNode;
  private connectButton: Button;
  private amountInput: Input;
  private requestButton: Button;

  constructor() {
    super();
    document.title = (AppConfig.isDevMode ? "(Dev) " : "") + "$GAIA Faucet";

    Layout.content = this.container = faucetView();
    this.container.append(
      el(
        "p",
        "Welcome to the $GAIA Testnet Faucet! Get test $GAIA on Base Sepolia testnet.",
      ),
      this.balanceDisplay = el("p"),
      el(
        "ul",
        el(
          "li",
          "Connect your wallet using the button below.",
          this.connectButton = new Button({
            type: ButtonType.Contained,
            title: WalletConnectionManager.isConnected
              ? "Disconnect Wallet"
              : "Connect Wallet",
            onClick: () => {
              if (WalletConnectionManager.isConnected) {
                WalletConnectionManager.disconnect();
              } else {
                new WalletConnectionPopup();
              }
            },
          }),
        ),
        el(
          "li",
          "Enter the amount of test $GAIA you want to receive",
          this.amountInput = new Input({
            placeholder: "Enter amount (max 10,000 $GAIA)",
            onChange: () => this.checkRequestable(),
          }),
        ),
        el(
          "li",
          "Click 'Request $GAIA' to receive them in your wallet",
          this.requestButton = new Button({
            type: ButtonType.Contained,
            title: "Request $GAIA",
            onClick: async () => {
              const signer = await WalletConnectionManager.getSigner(
                "base-sepolia",
              );
              const amount = parseEther(this.amountInput.value);

              await GaiaProtocolTokenTestnetContract.mint(signer, amount);

              new Alert({
                title: "Success",
                message: [
                  "Success! ",
                  el(
                    "b",
                    `${
                      StringUtils.formatNumberWithCommas(formatEther(amount), 3)
                    } $GAIA`,
                  ),
                  "have been sent to your wallet on Base Sepolia.",
                ],
              });

              this.amountInput.value = "";
              this.loadBalance();
            },
          }),
        ),
      ),
    );

    this.loadBalance();
    this.checkRequestable();

    WalletConnectionManager.on("connectionChanged", () => {
      this.connectButton.title = WalletConnectionManager.isConnected
        ? "Disconnect Wallet"
        : "Connect Wallet";

      this.loadBalance();
      this.checkRequestable();
    });
  }

  private async loadBalance() {
    if (!WalletConnectionManager.connectedAddress) this.balanceDisplay.clear();
    else {
      this.balanceDisplay.clear().append(new AppCompConfig.LoadingSpinner());

      const [userBalance, ethBalance] = await Promise.all([
        GaiaProtocolTokenTestnetContract.balanceOf(
          WalletConnectionManager.connectedAddress,
        ),
        WalletConnectionManager.getBalance(
          "base-sepolia",
          WalletConnectionManager.connectedAddress,
        ),
      ]);

      this.balanceDisplay.clear().append(
        "You currently have ",
        el(
          "b",
          StringUtils.formatNumberWithCommas(formatEther(userBalance), 3),
        ),
        " $GAIA and ",
        el("b", StringUtils.formatNumberWithCommas(formatEther(ethBalance), 3)),
        " Base Sepolia ETH.",
      );
    }
  }

  private checkRequestable() {
    const amountString = this.amountInput.value.trim();
    if (amountString === "") {
      this.requestButton.disable();
    } else {
      const amount = parseEther(amountString);
      if (
        amount <= parseEther("10000") && WalletConnectionManager.isConnected
      ) {
        this.requestButton.enable();
      } else {
        this.requestButton.disable();
      }
    }
  }
}
