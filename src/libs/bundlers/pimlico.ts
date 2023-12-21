
import { ethers } from 'ethers';
import * as ethers5 from 'ethers5';
import { AppConfig } from '../../config';
import { IUserOperation, SupportedChains, TransactionResponse } from '../../types/types';
import {CALL_GAS_LIMIT, ADDRESSES} from "../constants"
import {rpcCall} from "../utils"
import { queryReceipt } from '../userOp';

export async function estimate(userOperation: IUserOperation, signer: ethers5.Signer) {
    try {
        const entryPoint = ADDRESSES[await signer.getChainId() as SupportedChains].entryPoint
        userOperation = formatUserOp(userOperation)
        const estimations = await rpcCall(await getRPC(signer), "eth_estimateUserOperationGas", [userOperation, entryPoint])
        estimations.callGasLimit = ethers5.utils.hexlify(ethers5.BigNumber.from((Number(estimations.callGasLimit) + Number(CALL_GAS_LIMIT)).toString()))
        estimations.verificationGasLimit = ethers5.utils.hexlify(ethers5.BigNumber.from((Number(estimations.verificationGasLimit)+ Number(CALL_GAS_LIMIT)).toString()))
        estimations.preVerificationGas = ethers5.utils.hexlify(ethers5.BigNumber.from((Number(estimations.preVerificationGas)+ Number(CALL_GAS_LIMIT)).toString()))

        return estimations
    } catch (error) {
      console.log("PIMLICO__estimate error >>>> ", error)
      throw error
    }
}

export async function sponsor(userOperation: IUserOperation, signer: ethers5.Signer) {
    try {
        userOperation = formatUserOp(userOperation)
        const entryPoint = ADDRESSES[await signer.getChainId() as SupportedChains].entryPoint
        const estimations = await rpcCall(await getRPC(signer), "pm_sponsorUserOperation", [userOperation, entryPoint])
        return estimations
    } catch (error) {
      console.log("PIMLICO__sponsor error >>>> ", error)
      // throw error
    }
}
  
export async function send(userOperation: IUserOperation, signer: ethers5.Signer) : Promise<TransactionResponse> {
try {
    const pimlicoEndpoint = await getRPC(signer)
    const entryPoint = ADDRESSES[await signer.getChainId() as SupportedChains].entryPoint
    const userOpHash = await rpcCall(pimlicoEndpoint, "eth_sendUserOperation", [userOperation, entryPoint])
    if (!userOpHash) {
        throw new Error("Transaction failed to send")
    }
    const receipt = await queryReceipt(pimlicoEndpoint, userOpHash)

    if (!receipt) {
        return {
            userOpHash, 
            status: "pending",
            txHash: ""
        }
    }
    return {
        txHash: receipt.receipt.transactionHash,
        userOpHash: receipt.userOpHash,
        status: (receipt.success)? "success" : "failed",
    }
    
} catch (error) {
    console.log("PIMLICO__send error >>>> ", error)
    throw error
}
}

export async function getFeeData(signer: ethers5.Signer)  {
  try {
    return await AppConfig.getProvider().getFeeData()
  } catch (error) {
    console.log("PIMLICO__getFeeData error >>>> ", error)
    throw error 
  }
}

 async function getRPC(signer: ethers5.Signer) {
    return `https://api.pimlico.io/v1/${(await signer.provider?.getNetwork())?.name}/rpc?apikey=${AppConfig.PIMLICO_API_KEY}`
 }

function formatUserOp(userOperation: IUserOperation): IUserOperation {
    userOperation.callGasLimit = ethers5.utils.hexlify(ethers5.BigNumber.from(userOperation.callGasLimit))
    userOperation.verificationGasLimit = ethers5.utils.hexlify(ethers5.BigNumber.from(userOperation.verificationGasLimit))
    userOperation.preVerificationGas = ethers5.utils.hexlify(ethers5.BigNumber.from(userOperation.preVerificationGas))
    userOperation.maxFeePerGas = ethers5.utils.hexlify(ethers5.BigNumber.from(userOperation.maxFeePerGas))
    userOperation.maxPriorityFeePerGas = ethers5.utils.hexlify(ethers5.BigNumber.from(userOperation.maxPriorityFeePerGas))
    return userOperation
 }