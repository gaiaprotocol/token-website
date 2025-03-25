import { Router, SPAInitializer } from "@common-module/app";
import {
  WalletModuleConfig,
  WalletSessionManager,
} from "@common-module/wallet";
import AppConfig, { IAppConfig } from "./AppConfig.js";
import FaucetView from "./views/FaucetView.js";
import IntroView from "./views/IntroView.js";
import Layout from "./views/Layout.js";
import TestView from "./views/TestView.js";
import { baseSepolia } from "@wagmi/core/chains";
import GaiaProtocolTokenTestnetContract from "./contracts/GaiaProtocolTokenTestnetContract.js";

export default async function init(config: IAppConfig) {
  AppConfig.init(config);
  SPAInitializer.init();

  WalletModuleConfig.init({
    chains: [baseSepolia] as any,
    walletConnectProjectId: "7538ca3cec20504b06a3338d0e53b028",
  });
  WalletSessionManager.init();

  Router
    .add("/", IntroView)
    .add("/faucet", FaucetView)
    .add("/test", TestView);

  Layout.init();
}
