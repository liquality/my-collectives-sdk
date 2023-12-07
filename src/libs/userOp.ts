import {BytesLike} from 'ethers'
import { ChainId, Transaction } from "@biconomy/core-types"
import { ethers } from 'ethers';
import { Config } from '../config';
import { IUserOperation } from '../types/types';
import {CWallet__factory} from "../types/typechain-types/factories/contracts/core/CWallet__factory"
import {ENTRYPOINT_ADDRESS, ENTRYPOINT_ABI} from "./constants"
import { BigNumber} from 'bignumber.js';
import { AddressLike, BigNumberish } from 'ethers/lib.esm';


export async function buildUserOperation(signer: ethers.JsonRpcSigner, smartAccount: string, nonceKey: string, collectiveInitCode: BytesLike, transactions: Transaction[]) {
  try {
    // Get calldata
    const executeCallData = await getExecuteCallData(transactions)
    const nonce = await getNonce(smartAccount, nonceKey, signer)

    // Get default userOperation
    let userOperation: IUserOperation = await InitializeUserOperation(smartAccount, nonce, executeCallData)
    // Add initCode if it exist
    if (collectiveInitCode) {
      userOperation.initCode = collectiveInitCode
    }

    let estimationOps = {...userOperation}
    const estimationSig = await signUserOps(signer, encodeUserOps(estimationOps))
    estimationOps.signature = estimationSig
    
    // Get gas estimation for user oeperation
    const estimations = await estimateWithPimlico(estimationOps)
    const feeData = await getFeeData()

    userOperation.callGasLimit = new BigNumber(estimations.callGasLimit).toString(16)
    userOperation.preVerificationGas = new BigNumber(estimations.preVerificationGas).toString(16)
    userOperation.verificationGasLimit = new BigNumber(estimations.verificationGasLimit).toString(16)
    userOperation.maxFeePerGas = new BigNumber(feeData.maxFeePerGas!.toString()).toString(16)
    userOperation.maxPriorityFeePerGas = new BigNumber(feeData.maxPriorityFeePerGas!.toString()).toString(16)

    let encoded = encodeUserOps(userOperation) 
    const userOpsHash = ethers.keccak256(encoded)
    const signedUserOps = await signUserOps(signer, userOpsHash)
    userOperation.signature = signedUserOps

    return userOperation

  } catch (error) {
    console.log("error buildUserOperation >>>> ", error)
  }
}

export async function estimateWithPimlico(userOperation: IUserOperation) {

  const pimlicoEndpoint = `https://api.pimlico.io/v1/mumbai/rpc?apikey=${process.env.PIMLICO_API_KEY}`
  const pimlicoProvider = new ethers.JsonRpcProvider(pimlicoEndpoint)

  const estimationResult = await pimlicoProvider.send("eth_estimateUserOperationGas", [userOperation, process.env.ENTRYPOINT])
  console.log(`UserOperation estimated. Result: ${estimationResult}`)

  return estimationResult
}

export async function sendWithPimlico(userOperation: IUserOperation) {

  const pimlicoEndpoint = `https://api.pimlico.io/v1/mumbai/rpc?apikey=${process.env.PIMLICO_API_KEY}`
  const pimlicoProvider = new ethers.JsonRpcProvider(pimlicoEndpoint)

  const userOperationHash = await pimlicoProvider.send("eth_sendUserOperation", [userOperation, process.env.ENTRYPOINT])
  console.log(`UserOperation submitted. Hash: ${userOperationHash}`)

  console.log("Querying for receipts...")
  let receipt = null
  while (receipt === null) {
      await new Promise((resolve) => setTimeout(resolve, 1000))
      receipt = await pimlicoProvider.send("eth_getUserOperationReceipt", [userOperationHash])
      console.log(
          receipt === null ? "Receipt not found..." : `Receipt found!\nTransaction hash: ${receipt.receipt.transactionHash}`
      )
  }
  return receipt.receipt
}

// Get nonce
async function getNonce(smartAccount: string , nonceKey: string, signer: ethers.JsonRpcSigner) {
  const entryPoint = new ethers.Contract(ENTRYPOINT_ADDRESS, ENTRYPOINT_ABI, signer)
  const nonce = await entryPoint.getNonce(smartAccount, nonceKey)
  return nonce
}

async function getExecuteCallData(transactions: Transaction[]) {
  let executeCallData: BytesLike
  if (transactions.length == 1) {
    executeCallData = CWallet__factory.createInterface().encodeFunctionData("execute", 
    [transactions[0].to as AddressLike, transactions[0].value as BigNumberish, transactions[0].data as BytesLike ])
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
}

async function InitializeUserOperation(smartAccount: string, nonce: string, executeCallData: BytesLike) {

  const userOperation: IUserOperation = {
    sender: smartAccount,
    nonce: new BigNumber(nonce).toString(16),
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

async function signUserOps(signer: ethers.JsonRpcSigner, userOpsHash: string) {
  const unsignedUserOpsEncoded = ethers.AbiCoder.defaultAbiCoder().encode(["bytes32", "address", "uint256"], [userOpsHash, process.env.ENTRYPOINT, ChainId.POLYGON_MUMBAI ])
  const unsignedUserOps = ethers.keccak256(unsignedUserOpsEncoded)
  const signedUserOps = await signer.signMessage(ethers.toUtf8Bytes(unsignedUserOps))
  return signedUserOps
}

function encodeUserOps(userOperation: IUserOperation) {
  const encoded = ethers.AbiCoder.defaultAbiCoder().encode([
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
    ethers.keccak256(userOperation.initCode),
    ethers.keccak256(userOperation.callData),
    userOperation.callGasLimit,
    userOperation.verificationGasLimit,
    userOperation.preVerificationGas,
    userOperation.maxFeePerGas,
    userOperation.maxPriorityFeePerGas,
    ethers.keccak256(userOperation.paymasterAndData)
  ])
  return encoded
}

async function getFeeData(): Promise<ethers.FeeData> {
  const feeData = await Config.PROVIDER.getFeeData()
  return feeData
}