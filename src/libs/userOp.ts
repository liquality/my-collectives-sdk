import {BytesLike} from 'ethers'
import { ChainId, Transaction } from "@biconomy/core-types"
import { ethers } from 'ethers';
import { Config } from '../config';
import { IUserOperation } from '../types/types';
import {CWallet__factory} from "../types/typechain-types/factories/contracts/core/CWallet__factory"
import {ENTRYPOINT_ABI} from "./constants"
import { BigNumber} from 'bignumber.js';


export async function buildUserOperation(signer: ethers.JsonRpcSigner, smartAccount: string, nonceKey: string, collectiveInitCode: BytesLike, transactions: Transaction[]) {
  try {
  // Get calldata
  const executeCallData = await getExecuteCallData(transactions)
  const nonce = await getNonce(smartAccount, nonceKey)

  // Get default userOperation
  const userOperation: IUserOperation = await InitializeUserOperation(smartAccount, nonce, executeCallData)
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
  userOperation.maxFeePerGas = new BigNumber(feeData.maxFeePerGas.toString()).toString(16)
  userOperation.maxPriorityFeePerGas = new BigNumber(feeData.maxPriorityFeePerGas.toString()).toString(16)

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
  const pimlicoProvider = new providers.StaticJsonRpcProvider(pimlicoEndpoint)

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
async function getNonce(smartAccount: string , nonceKey: string) {
  const entryPoint = new ethers.Contract(process.env.ENTRYPOINT, ENTRYPOINT_ABI, Config.provider)
  const nonce = await entryPoint.getNonce(smartAccount, nonceKey)
  return nonce
}

async function getExecuteCallData(transactions: Transaction[]) {
  let executeCallData: BytesLike
  if (transactions.length == 1) {
    executeCallData = CWallet__factory.createInterface().encodeFunctionData("execute", 
    [transactions[0].to, transactions[0].value, transactions[0].data ])
  } else {
    let dest:string[]
    let value:BigNumber[]
    let data:BytesLike[]
    transactions.forEach((tx) => {
      dest.push(tx.to)
      value.push(new BigNumber(tx.value.toString()))
      data.push(tx.data)
    })
    executeCallData = CWallet__factory.createInterface().encodeFunctionData("executeBatch", 
    [dest, value, data ])
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
    new BigNumber(nonce).toString(16),
    ethers.keccak256(userOperation.initCode),
    ethers.keccak256(userOperation.callData),
    new BigNumber(userOperation.callGasLimit).toString(16),
    new BigNumber(userOperation.verificationGasLimit).toString(16),
    new BigNumber(userOperation.preVerificationGas).toString(16),
    new BigNumber(userOperation.maxFeePerGas).toString(16),
    new BigNumber(userOperation.maxPriorityFeePerGas).toString(16),
    ethers.keccak256(userOperation.paymasterAndData)
  ])
  return encoded
}

async function getFeeData() {
  const feeData = await Config.PROVIDER.getFeeData()
  return feeData
}