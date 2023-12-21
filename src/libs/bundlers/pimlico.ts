
import { ethers } from 'ethers';
import * as ethers5 from 'ethers5';
import { AppConfig } from '../../config';
import { IUserOperation, TransactionResponse } from '../../types/types';
import {CALL_GAS_LIMIT, ENTRYPOINT_ADDRESS} from "../constants"
import {rpcCall} from "../utils"

export async function estimate(userOperation: IUserOperation, signer: ethers5.Signer) {
    try {
        userOperation = formatUserOp(userOperation)
        const estimations = await rpcCall(await getRPC(signer), "eth_estimateUserOperationGas", [userOperation, ENTRYPOINT_ADDRESS])
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
        const estimations = await rpcCall(await getRPC(signer), "pm_sponsorUserOperation", [userOperation, ENTRYPOINT_ADDRESS])
        return estimations
    } catch (error) {
      console.log("PIMLICO__sponsor error >>>> ", error)
      // throw error
    }
}
  
export async function send(userOperation: IUserOperation, signer: ethers5.Signer) : Promise<TransactionResponse> {
try {
    const pimlicoEndpoint = await getRPC(signer)
    const userOpHash = await rpcCall(pimlicoEndpoint, "eth_sendUserOperation", [userOperation, ENTRYPOINT_ADDRESS])
    const receipt = await queryReceipt(pimlicoEndpoint, userOpHash)

    if (receipt === null) {
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

 // Query user operation receipt
 async function queryReceipt(pimlicoEndpoint:string, userOpHash: string) : Promise<any> {
    try {
        let receipt = null
        let retries = 0
        const startTime = Date.now()
        while (receipt === null && retries < 6) {
            await new Promise((resolve) => setTimeout(resolve, 1000))
            receipt = await rpcCall(pimlicoEndpoint, "eth_getUserOperationReceipt", [userOpHash])
            console.log(
                receipt === null ? "Receipt not found..." : `Receipt found!\nTransaction hash: ${JSON.stringify(receipt)}`
            )
            retries++
        }
        console.log("queryReceipt time >>>> ", Date.now() - startTime)
        return receipt
    } catch (error) {
        console.log("PIMLICO__queryReceipt error >>>> ", error)
        return null
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