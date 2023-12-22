import {BytesLike} from 'ethers'
import { ChainId, Transaction} from "@biconomy/core-types"
import {  PaymasterMode } from "@biconomy/paymaster";
import { ethers } from 'ethers';
import { AppConfig } from '../config';
import { IUserOperation, SupportedChains, TransactionResponse } from '../types/types';
import {CWallet__factory} from "../types/typechain-types/factories/contracts/core/CWallet__factory"
import {ADDRESSES, CALL_GAS_LIMIT, ENTRYPOINT_ABI, USER_OPERATIONS_DEFAULT_SIGNATURE} from "./constants"
import * as ethers5 from 'ethers5';
import { AddressLike, BigNumberish } from 'ethers/lib.esm';
import * as biconomyBundler from "./bundlers/biconomy"
import * as pimlicoBundler from "./bundlers/pimlico"
import { rpcCall } from './utils';



export async function buildUserOperation(signer: ethers5.Signer, smartAccount: string, nonceKey: bigint, collectiveInitCode: BytesLike, transactions: Transaction[]) : Promise<IUserOperation>{
  try {
    // Get calldata
    const executeCallData = await getExecuteCallData(transactions)
    const nonce = await getNonce(smartAccount, nonceKey)
    // Get default userOperation
    let userOperation: IUserOperation = await InitializeUserOperation(smartAccount, nonce, executeCallData)
    // Add initCode if it exist
    if (collectiveInitCode) {
      userOperation.initCode = collectiveInitCode
    }
    console.log("network >>>> ", JSON.stringify((await signer.provider?.getNetwork())))
    // Get fee & gas estimations
    const feeData = await pimlicoBundler.getFeeData(signer)//await signer.getFeeData()//
    userOperation.maxFeePerGas = feeData.maxFeePerGas!.toString()
    userOperation.maxPriorityFeePerGas = feeData.maxPriorityFeePerGas!.toString()

    let estimationOps = {...userOperation}
    estimationOps.signature = USER_OPERATIONS_DEFAULT_SIGNATURE

    // let estimations = await pimlicoBundler.estimate(estimationOps, signer)
    // userOperation.callGasLimit = estimations.callGasLimit.toString()//7000264//
    // userOperation.preVerificationGas = estimations.preVerificationGas.toString()//800808//
    // userOperation.verificationGasLimit = estimations.verificationGasLimit.toString() //600401 //
    
    // Get gas estimation for user oeperation
    const paymasterAndDataResponse = await pimlicoBundler.sponsor(userOperation, signer)
    userOperation.paymasterAndData = paymasterAndDataResponse.paymasterAndData
    // if (
    //   paymasterAndDataResponse.callGasLimit &&
    //   paymasterAndDataResponse.verificationGasLimit &&
    //   paymasterAndDataResponse.preVerificationGas
    // ) {
    //   userOperation.callGasLimit = paymasterAndDataResponse.callGasLimit.toString()
    //   userOperation.verificationGasLimit = paymasterAndDataResponse.verificationGasLimit.toString()
    //   userOperation.preVerificationGas = paymasterAndDataResponse.preVerificationGas.toString()
    // }

    let encoded = encodeUserOps(userOperation) 
    const userOpsHash = ethers5.utils.keccak256(encoded)
    const signedUserOps = await signUserOps(signer, userOpsHash)
    userOperation.signature = signedUserOps

    console.log("built userOperation >>>> ", userOperation)

    return userOperation

  } catch (error) {
    console.log("USEROPS__buildUserOperation error >>>> ", error)
    throw error
  }
}

// Get nonce
async function getNonce(smartAccount: string , nonceKey: bigint) {
  try {
    const entryPointAddress = ADDRESSES[Number((await AppConfig.PROVIDER.getNetwork()).chainId) as SupportedChains].entryPoint

    const entryPoint = new ethers.Contract(entryPointAddress, ENTRYPOINT_ABI, AppConfig.PROVIDER)
    const nonce = await entryPoint.getNonce(smartAccount, nonceKey)

    const nonceHex = ethers.toBeHex(nonce, 32)
    return nonceHex

  } catch (error) {
    console.log("USEROPS__getNonce error >>>> ", error)
    throw error 
  }
}

async function getExecuteCallData(transactions: Transaction[]) {
  try {
    let executeCallData: BytesLike
    if (transactions.length == 1) {
      executeCallData = CWallet__factory.createInterface().encodeFunctionData("execute", 
      [transactions[0].to, transactions[0].value as BigNumberish, transactions[0].data as BytesLike ])
    } else {
      let dests:AddressLike[] = []
      let values:BigNumberish[] = []
      let datas:BytesLike[] = []
      transactions.forEach((tx) => {
        dests.push(tx.to)
        values.push(tx.value as BigNumberish)
        datas.push(tx.data!)
      })
      executeCallData = CWallet__factory.createInterface().encodeFunctionData("executeBatch", 
      [dests, values, datas ])
    }
    return executeCallData;
  } catch (error) {
    console.log("USEROPS__getExecuteCallData error >>>> ", error)
    throw error 
  }
}

async function InitializeUserOperation(smartAccount: string, nonce: string, executeCallData: BytesLike) {

  const userOperation: IUserOperation = {
    sender: ethers.getAddress(smartAccount),
    nonce: nonce,
    initCode: '0x',
    callData: executeCallData,
    callGasLimit: CALL_GAS_LIMIT,
    preVerificationGas: CALL_GAS_LIMIT,
    verificationGasLimit: CALL_GAS_LIMIT,
    maxFeePerGas: "0",
    maxPriorityFeePerGas: "0",
    signature: "0x",
    paymasterAndData: '0x'
  }

  return userOperation
}

async function signUserOps(signer: ethers5.Signer, userOpsHash: string) {
  try {
    const entryPoint = ADDRESSES[await signer.getChainId() as SupportedChains].entryPoint
    const unsignedUserOpsEncoded = ethers5.utils.defaultAbiCoder.encode(["bytes32", "address", "uint256"], [userOpsHash, entryPoint, (await AppConfig.PROVIDER.getNetwork()).chainId ])
    const unsignedUserOps = ethers5.utils.keccak256(unsignedUserOpsEncoded)
    const signedUserOps = await signer.signMessage(ethers5.utils.arrayify(unsignedUserOps))

    //verify signature
    console.log("signer >>>> ", ethers5.utils.verifyMessage(unsignedUserOps, signedUserOps))
    console.log("unsignedUserOps >>>> ", unsignedUserOps)

    return signedUserOps
  } catch (error) {
    console.log("signUserOps error >>>> ", error)
    throw error 
    
  }
}

function encodeUserOps(userOperation: IUserOperation) {
  try {
    
    const encoded = ethers5.utils.defaultAbiCoder.encode([
      "address",
      "uint256",
      "bytes32",
      "bytes32",
      "uint256",
      "uint256",
      "uint256",
      "uint256",
      "uint256",
      "bytes32",
    ], [
      userOperation.sender,
      userOperation.nonce,
      ethers5.utils.keccak256(userOperation.initCode),
      ethers5.utils.keccak256(userOperation.callData),
      userOperation.callGasLimit,
      userOperation.verificationGasLimit,
      userOperation.preVerificationGas,
      userOperation.maxFeePerGas,
      userOperation.maxPriorityFeePerGas,
      ethers5.utils.keccak256(userOperation.paymasterAndData)
    ])
    return encoded
  } catch (error) {
    console.log("encodeUserOps error >>>> ", error)
    throw error 
  }
}


 // Query user operation receipt
 export async function queryReceipt(bundler:string, userOpHash: string) : Promise<any> {
  try {
      let receipt = null
      let timeOut = 20000 // 20 seconds timeout
      const startTime = Date.now()
      while (receipt === null && Date.now() - startTime < timeOut) {
          await new Promise((resolve) => setTimeout(resolve, 3000))
          receipt = await rpcCall(bundler, "eth_getUserOperationReceipt", [userOpHash])
          console.log("receipt >>>> ", receipt)
          console.log(
              receipt === null ? "Receipt not found..." : `Receipt found!\nTransaction hash: ${JSON.stringify(receipt)}`
          )
      }
      return receipt
  } catch (error) {
      console.log("BUNDLER__queryReceipt error >>>> ", error)
      return null
  }
}

export async function userOpsStatusByHash(signer: ethers5.providers.JsonRpcSigner, userOpHash: string) : Promise<TransactionResponse> {
  try {
    const bundler = await pimlicoBundler.getRPC(signer)
    const receipt = await queryReceipt(bundler, userOpHash)
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
      console.log("BUNDLER__queryReceipt error >>>> ", error)
      return {
        userOpHash, 
        status: "pending",
        txHash: ""
    } 
  }
}