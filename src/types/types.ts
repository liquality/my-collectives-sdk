import { BigNumberish, BytesLike, ethers } from "ethers";

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

  export type createPoolsParam = {
    tokenContracts: string[];
    honeyPots: string[];
  }

  export type Config = {
    OPERATOR_MNEMONIC: string;
    RPC_URL: string;
    PIMLICO_API_KEY: string;
  }

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

  export type JoinCollectiveParam = {
    inviteCode: BytesLike;
    inviteSignature: string;
  }

  export type CMetadata = {
    address: string;
    wallet: string;
    nonceKey: bigint;
  }