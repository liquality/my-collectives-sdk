import {BytesLike} from 'ethers'
import { ChainId, Transaction} from "@biconomy/core-types"
import {  PaymasterMode } from "@biconomy/paymaster";
import { ethers } from 'ethers';
import { AppConfig } from '../config';
import { IUserOperation } from '../types/types';
import {CWallet__factory} from "../types/typechain-types/factories/contracts/core/CWallet__factory"
import {ENTRYPOINT_ADDRESS, ENTRYPOINT_ABI, USER_OPERATIONS_DEFAULT_SIGNATURE} from "./constants"
import * as ethers5 from 'ethers5';
import { AddressLike, BigNumberish } from 'ethers/lib.esm';
import * as biconomyBundler from "./bundlers/biconomy"



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

    // Get fee & gas estimations
    const feeData = await biconomyBundler.getFeeData()
    userOperation.maxFeePerGas = feeData.maxFeePerGas!.toString()
    userOperation.maxPriorityFeePerGas = feeData.maxPriorityFeePerGas!.toString()

    let estimationOps = {...userOperation}
    estimationOps.signature = USER_OPERATIONS_DEFAULT_SIGNATURE

    console.log("fee >> ", ((BigInt(userOperation.maxFeePerGas) * BigInt(userOperation.callGasLimit)) + (BigInt(userOperation.maxPriorityFeePerGas) * BigInt(userOperation.preVerificationGas)) + (BigInt(userOperation.verificationGasLimit) * BigInt(userOperation.maxFeePerGas))).toString())
   
    let estimations = await biconomyBundler.estimate(estimationOps)
    userOperation.callGasLimit = estimations.callGasLimit.toString()//7000264//
    userOperation.preVerificationGas = estimations.preVerificationGas.toString()//800808//
    userOperation.verificationGasLimit = estimations.verificationGasLimit.toString() //600401 //
    

    // Get gas estimation for user oeperation
    const paymasterAndDataResponse = await biconomyBundler.sponsor(userOperation)
    userOperation.paymasterAndData = paymasterAndDataResponse.paymasterAndData
    console.log("estimations >>>> ", paymasterAndDataResponse)
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
    console.log("actual signer >>>> ", await signer.getAddress())
    userOperation.signature = signedUserOps


    return userOperation

  } catch (error) {
    console.log("error buildUserOperation >>>> ", error)
    throw error
  }
}

// Get nonce
async function getNonce(smartAccount: string , nonceKey: bigint) {
  try {
    const entryPoint = new ethers.Contract(ENTRYPOINT_ADDRESS, ENTRYPOINT_ABI, AppConfig.PROVIDER)
    const nonce = await entryPoint.getNonce(smartAccount, nonceKey)
    const nonceHex = ethers.toBeHex(nonce, 32)
    console.log("!!!! came to getNonce >> ", nonceHex)
    return nonceHex
  } catch (error) {
    console.log("getNonce error >>>> ", error)
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
    console.log("getExecuteCallData error >>>> ", error)
    throw error 
  }
}

async function InitializeUserOperation(smartAccount: string, nonce: string, executeCallData: BytesLike) {

  const userOperation: IUserOperation = {
    sender: ethers.getAddress(smartAccount),
    nonce: nonce,
    initCode: '0x',
    callData: executeCallData,
    callGasLimit: "0",
    preVerificationGas: "0",
    verificationGasLimit: "0",
    maxFeePerGas: "0",
    maxPriorityFeePerGas: "0",
    signature: "0x",
    paymasterAndData: '0x'
  }

  return userOperation
}

async function signUserOps(signer: ethers5.Signer, userOpsHash: string) {
  try {
    const unsignedUserOpsEncoded = ethers5.utils.defaultAbiCoder.encode(["bytes32", "address", "uint256"], [userOpsHash, ENTRYPOINT_ADDRESS, (await AppConfig.PROVIDER.getNetwork()).chainId ])
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
