import * as ethers5 from "ethers5";
import { AAProviders, Config } from "./types";


// Configuration
export class AppConfig  {
  public static RPC_URL: string
  public static PIMLICO_API_KEY: string
  public static PROVIDER: ethers5.providers.JsonRpcProvider
  public static BICONOMY_PAYMASTER: string
  public static BICONOMY_BUNDLER_API_KEY: string
  public static AA_PROVIDER: AAProviders


  public static getProvider(): ethers5.providers.JsonRpcProvider {
    return new ethers5.providers.JsonRpcProvider(this.RPC_URL);
  }
}


export function setConfig(config: Config) {
  // Enforce config
  if (config.RPC_URL == null || config.AA_PROVIDER == null) {
    throw new Error("RPC_URL, or AA_PROVIDER is not defined in config");
  } else if (config.AA_PROVIDER == AAProviders.PIMLICO) {
    if (!config.PIMLICO_API_KEY) {
      throw new Error("PIMLICO_API_KEY is not defined in config");
    }
    AppConfig.PIMLICO_API_KEY = config.PIMLICO_API_KEY;
  } else if (config.AA_PROVIDER == AAProviders.BICONOMY) {
    if (!config.BICONOMY_PAYMASTER || !config.BICONOMY_BUNDLER_API_KEY) { 
      throw new Error("BICONOMY_PAYMASTER or BICONOMY_BUNDLER_API_KEY is not defined in config");
    }
    AppConfig.BICONOMY_PAYMASTER = config.BICONOMY_PAYMASTER;
    AppConfig.BICONOMY_BUNDLER_API_KEY = config.BICONOMY_BUNDLER_API_KEY;
  }

  AppConfig.RPC_URL = config.RPC_URL;
  AppConfig.PROVIDER = AppConfig.getProvider();
  AppConfig.AA_PROVIDER = config.AA_PROVIDER;
}