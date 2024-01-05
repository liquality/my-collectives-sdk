
import {  PaymasterMode } from "@biconomy/paymaster";
import { IUserOperation, SupportedChains, TransactionResponse } from '../../types/types';
import {ADDRESSES, CALL_GAS_LIMIT} from "../constants"
import * as ethers5 from 'ethers5';
import { IBundler, Bundler } from "@biconomy/bundler";
import { AppConfig } from "../../config";
import { rpcCall } from "../utils"; 
import { queryReceipt } from "../userOp";


export async function estimate(userOperation: IUserOperation, signer: ethers5.Signer) {
    try {
        const chainId = await signer.getChainId()
        const bundler =  getBundler(chainId)

        let estimations = await bundler.estimateUserOpGas(userOperation)
        estimations.callGasLimit = (Number(estimations.callGasLimit) + Number(CALL_GAS_LIMIT)).toString()
        estimations.verificationGasLimit = (Number(estimations.verificationGasLimit)+ Number(CALL_GAS_LIMIT)).toString()
        estimations.preVerificationGas = (Number(estimations.preVerificationGas)+ Number(CALL_GAS_LIMIT)).toString()

        return estimations
    } catch (error) {
      console.log("BICONOMY__send error >>>> ", error)
      throw error
    }
}
  
export async function sponsor(userOperation: IUserOperation, signer: ethers5.Signer) {
    try {
      // Sponsorship params
      const partialUserOperation = {
        sender: userOperation.sender,
        nonce: userOperation.nonce,
        initCode: userOperation.initCode,
        callData: userOperation.callData,
        callGasLimit: userOperation.callGasLimit,
        verificationGasLimit: userOperation.verificationGasLimit,
        preVerificationGas: userOperation.preVerificationGas,
        maxFeePerGas: userOperation.maxFeePerGas,
        maxPriorityFeePerGas: userOperation.maxPriorityFeePerGas,
      }
      const paymasterServiceData = {
        mode: PaymasterMode.SPONSORED,
        calculateGasLimits: false,
        expiryDuration: 300, //5mins
        sponsorshipInfo: {
            webhookData: {},
            smartAccountInfo: {
                name: "BICONOMY",
                version: "1.0.0"
            }
        }
      }

      const estimations =rpcCall(AppConfig.BICONOMY_PAYMASTER, "pm_sponsorUserOperation", 
        [partialUserOperation, paymasterServiceData])

      return estimations

    } catch (error) {
      console.log("BICONOMY__sponsor error >>>> ", error)
      throw error
    }
}
  
export async function send(userOperation: IUserOperation, signer: ethers5.Signer) : Promise<TransactionResponse> {
try {
    const entryPoint = ADDRESSES[await signer.getChainId() as SupportedChains].entryPoint
    const result = await rpcCall(await getRPC(signer), "eth_sendUserOperation", [
        userOperation,
        entryPoint,
        {
            "simulation_type": "validation"
        }
    ]) 
    if (!result) {
        throw new Error("Transaction failed to send")
    }
    const receipt = await queryReceipt(await getRPC(signer), result.userOpHash)

    if (receipt === null) {
        return {
            userOpHash: result.userOpHash, 
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
    console.log("BICONOMY__send error >>>> ", error)
    throw error
}
}

export async function getFeeData(signer: ethers5.Signer)  {
    try {
        const bundler =  getBundler(await signer.getChainId())
        return await bundler.getGasFeeValues()
    } catch (error) {
        console.log("BICONOMY__getFeeData error >>>> ", error)
        throw error 
    }
}

function getBundler(chainId: number):  IBundler {
    const bundler: IBundler = new Bundler({
        bundlerUrl: `https://bundler.biconomy.io/api/v2/${chainId}/${AppConfig.BICONOMY_BUNDLER_API_KEY}`,     
        chainId,
        entryPointAddress: ADDRESSES[chainId as SupportedChains].entryPoint,
    })
    return bundler
}

async function getRPC(signer: ethers5.Signer) {
    return `https://bundler.biconomy.io/api/v2/${await signer.getChainId()}/${AppConfig.BICONOMY_BUNDLER_API_KEY}`
}
