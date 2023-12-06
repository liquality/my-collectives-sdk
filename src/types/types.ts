import { BigNumberish, BytesLike, ethers } from "ethers";

export type IUserOperation = {
    sender: string;
    nonce: BigNumberish;
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

  export type createPoolsParam = {
    tokenContracts: string[];
    honeyPots: string[];
  }

  export type AppConfig = {
    OPERATOR_MNEMONIC: string;
    RPC_URL: string;
    PIMLICO_API_KEY: string;
  }