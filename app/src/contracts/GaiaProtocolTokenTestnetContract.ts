import { WalletSessionManager } from "@common-module/wallet";
import { baseSepolia } from "@wagmi/core/chains";
import GaiaProtocolTokenTestnetArtifact from "./artifacts/GaiaProtocolTokenTestnet.json" assert {
  type: "json"
};

class GaiaProtocolTokenTestnetContract {
  private address: `0x${string}` = "0x93255F7A6FdDcBfd3c45362788AfB836b2E32154";

  public async balanceOf(address: string) {
    return await WalletSessionManager.readContract({
      chainId: baseSepolia.id,
      address: this.address,
      abi: GaiaProtocolTokenTestnetArtifact.abi,
      functionName: "balanceOf",
      args: [address],
    }) as bigint;
  }

  public async mint(amount: bigint) {
    return await WalletSessionManager.writeContract({
      chainId: baseSepolia.id,
      address: this.address,
      abi: GaiaProtocolTokenTestnetArtifact.abi,
      functionName: "mint",
      args: [amount],
    });
  }
}

export default new GaiaProtocolTokenTestnetContract();
