import { Contract } from "@common-module/contract";
import { JsonRpcSigner } from "ethers";
import { GaiaProtocolTokenTestnet } from "./abi/GaiaProtocolTokenTestnet.js";
import ProfilesArtifact from "./abi/GaiaProtocolTokenTestnet.json" assert {
  type: "json",
};

class GaiaProtocolTokenTestnetContract
  extends Contract<GaiaProtocolTokenTestnet> {
  constructor() {
    super(ProfilesArtifact.abi);
    this.init(
      "https://sepolia.base.org",
      "0x93255F7A6FdDcBfd3c45362788AfB836b2E32154",
    );
  }

  public async balanceOf(address: string) {
    return await this.viewContract.balanceOf(address);
  }

  public async mint(signer: JsonRpcSigner, amount: bigint) {
    return await this.executeAndWait(signer, async (contract) => {
      return contract.mint(amount);
    });
  }
}

export default new GaiaProtocolTokenTestnetContract();
