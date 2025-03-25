import { GaiaUIPreset } from "@gaiaprotocol/ui-preset";

export interface IAppConfig {
  isDevMode: boolean;
}

class AppConfig implements IAppConfig {
  public isDevMode!: boolean;

  public init(config: IAppConfig) {
    Object.assign(this, config);
    GaiaUIPreset.init();
  }
}

export default new AppConfig();
