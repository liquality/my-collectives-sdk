import { BigNumberish, BytesLike, ethers } from "ethers";

export enum SupportedPlatforms {
    ZORA = "Zora",
    SOUND = "Sound",
    LOCAL = "Local",
}

// ARBITRUM_TESTNET = "421613",
// OPTIMISM_TESTNET = "420",
export enum SupportedChains {
  BASE = 8453,
  ZORA = 7777777,
  ARBITRUM = 42161,
  OPTIMISM = 10,
  GOERLI = 5,
  POLYGON = 80001,
  SEPOLIA = 11155111,
}

export enum AAProviders {
  PIMLICO = "Pimlico",
  BICONOMY = "Binonomy",
  LOCAL = "Local",
}

  export type createPoolsParam = {
    tokenContracts: string[];
    honeyPots: string[];
  }

  export type Config = {
    RPC_URL: string;
    PIMLICO_API_KEY?: string;
    BICONOMY_PAYMASTER?: string;
    BICONOMY_BUNDLER_API_KEY?: string;
    AA_PROVIDER: AAProviders
  }

  export type JoinCollectiveParam = {
    inviteCode: BytesLike;
    inviteSignature: string;
  }

  export type CMetadata = {
    address: string;
    wallet: string;
    nonceKey: bigint;
  }

  export type MintParam = {
    recipient: string;
    tokenID: number;
    amount: bigint;
    quantity: number;
    platform: SupportedPlatforms;
    tokenContract: string;
    poolAddress: string;
  }

  export type TransactionResponse = {
    userOpHash: string;
    txHash: string;
    status: string;
  }


  // ----------------- Internal -----------------

  export type sendUserOpsRPCParams = {
    jsonrpc: string, // Json RPC version "2.0"
    id: number, // id
    method: string, // RPC method
    params: [
      userOperation: IUserOperation, // userOperation
      entryPoint: string // address
    ]
  }

  export type PartialUserOperation = {
    sender: string;
    nonce: BigNumberish;
    initCode: string;
    callData: string;
    callGasLimit: string;
    verificationGasLimit: string;
    preVerificationGas: string;
    maxFeePerGas: string;
    maxPriorityFeePerGas: string;
  }

export type Deployment = {
  collectiveFactory: string;
  honeyPotFactory: string;
  entryPoint: string;
}

export type IUserOperation = {
    sender: string;
    nonce: string;
    initCode: BytesLike;
    callData: BytesLike;
    callGasLimit: BigNumberish;
    verificationGasLimit: BigNumberish;
    preVerificationGas: BigNumberish;
    maxFeePerGas: BigNumberish;
    maxPriorityFeePerGas: BigNumberish;
    paymasterAndData: BytesLike;
    signature: BytesLike;
  }

export type Estimation = {
  callGasLimit: string;
  verificationGasLimit: string;
  preVerificationGas: string;
}

export type PaymasterEstimation = Estimation & {
  paymasterAndData: string;
}