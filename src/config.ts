import { ethers } from "ethers";


// Configuration
export class Config  {
  public static OPERATOR_MNEMONIC: string
  public static RPC_URL: string
  public static PIMLICO_API_KEY: string
  public static PROVIDER: ethers.JsonRpcProvider


  public static getProvider(): ethers.JsonRpcProvider {
    return new ethers.JsonRpcProvider(this.RPC_URL);
  }
}

