export interface IAppConfig {
  isDevMode: boolean;
}

class AppConfig implements IAppConfig {
  public isDevMode!: boolean;

  public init(config: IAppConfig) {
    Object.assign(this, config);
  }
}

export default new AppConfig();
