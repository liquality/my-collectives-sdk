// implement a bundler factory to return a bundler based on the bundler type
import * as ethers5 from "ethers5";
import { AAProviders } from "../../types/types";
import { AppConfig } from "../../config";
import { PimlicoProvider } from "./pimlicoProvider";
import { BiconomyProvider } from "./biconomyProvider";
import { LocalProvider } from "./localProvider";
import { IAAProvider } from "./IAAProvider";

export class AAProviderFactory {

  public static get(
    signer: ethers5.Signer
  ): IAAProvider {

    switch (AppConfig.AA_PROVIDER) {
      case AAProviders.PIMLICO:
        return new PimlicoProvider(signer);
      case AAProviders.BICONOMY:
        return new BiconomyProvider(signer);
      case AAProviders.LOCAL:
        return new LocalProvider(signer);
    
      default:
        throw new Error("AA_PROVIDER is not defined in config");
    }

  }

}
