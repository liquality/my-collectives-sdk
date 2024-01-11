// implement a bundler factory to return a bundler based on the bundler type
import * as ethers5 from "ethers5";
import { AppConfig } from "../../config";
import { AAProviders } from "../../types";
import { PimlicoProvider } from "./pimlicoProvider";
import { BiconomyProvider } from "./biconomyProvider";
import { LocalProvider } from "./localProvider";
import { IAAProvider } from "./IAAProvider";

export class AAProviderFactory {
  public static get(signer: ethers5.Signer): IAAProvider {
    if (AppConfig.AA_PROVIDER == AAProviders.PIMLICO) {
      return new PimlicoProvider(signer);
    } else if (AppConfig.AA_PROVIDER == AAProviders.BICONOMY) {
      return new BiconomyProvider(signer);
    } else if (AppConfig.AA_PROVIDER == AAProviders.LOCAL) {
      return new LocalProvider(signer);
    } else {
      throw new Error("AA_PROVIDER is not defined in config");
    }
  }
}
