import { Router, SPAInitializer } from "@common-module/app";
import { UniversalWalletConnector } from "@common-module/wallet";
import AppConfig, { IAppConfig } from "./AppConfig.js";
import FaucetView from "./views/FaucetView.js";
import IntroView from "./views/IntroView.js";
import Layout from "./views/Layout.js";
import TestView from "./views/TestView.js";

export default async function init(config: IAppConfig) {
  AppConfig.init(config);
  SPAInitializer.init();

  UniversalWalletConnector.init({
    name: "$GAIA",
    icon: "https://token.gaia.cc/images/icon-192x192.png",
    description: "Gaia Protocol's Membership Token",
    walletConnectProjectId: "7538ca3cec20504b06a3338d0e53b028",
    chains: {
      "base-sepolia": {
        id: 84532,
        name: "Base Sepolia Testnet",
        symbol: "ETH",
        rpc: "https://sepolia.base.org",
        explorerUrl: "https://sepolia.basescan.org",
      },
    },
  });

  Router
    .add("/", IntroView)
    .add("/faucet", FaucetView)
    .add("/test", TestView);

  Layout.init();
}
