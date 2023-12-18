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
import { IBundler, Bundler } from '@biconomy/bundler'


const bundler: IBundler = new Bundler({
    bundlerUrl: 'https://bundler.biconomy.io/api/v2/80001/nJPK7B3ru.dd7f7861-190d-41bd-af80-6877f74b8f44',     
    chainId: ChainId.POLYGON_MUMBAI,
    entryPointAddress: ENTRYPOINT_ADDRESS,
})


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
    const feeData = await getFeeData()
    userOperation.maxFeePerGas = feeData.maxFeePerGas!.toString()
    userOperation.maxPriorityFeePerGas = feeData.maxPriorityFeePerGas!.toString()

    let estimationOps = {...userOperation}
    estimationOps.signature = USER_OPERATIONS_DEFAULT_SIGNATURE

    console.log("fee >> ", ((BigInt(userOperation.maxFeePerGas) * BigInt(userOperation.callGasLimit)) + (BigInt(userOperation.maxPriorityFeePerGas) * BigInt(userOperation.preVerificationGas)) + (BigInt(userOperation.verificationGasLimit) * BigInt(userOperation.maxFeePerGas))).toString())
   
    let estimations = await estimateWithBiconomy(estimationOps)
    userOperation.callGasLimit = estimations.callGasLimit.toString()//44401//
    userOperation.preVerificationGas = estimations.preVerificationGas.toString()//89808//
    userOperation.verificationGasLimit = estimations.verificationGasLimit.toString() //681264 //
    

    // Get gas estimation for user oeperation
    const paymasterAndDataResponse = await sponsorWithBiconomy(userOperation)
    userOperation.paymasterAndData = paymasterAndDataResponse.paymasterAndData
    console.log("estimations >>>> ", paymasterAndDataResponse)
    if (
      paymasterAndDataResponse.callGasLimit &&
      paymasterAndDataResponse.verificationGasLimit &&
      paymasterAndDataResponse.preVerificationGas
    ) {
      userOperation.callGasLimit = paymasterAndDataResponse.callGasLimit.toString()
      userOperation.verificationGasLimit = paymasterAndDataResponse.verificationGasLimit.toString()
      userOperation.preVerificationGas = paymasterAndDataResponse.preVerificationGas.toString()
    }


    // let sponsorRes = await sponsorWithBiconomy(estimationOps)
    // console.log("sponsorRes >>>> ", sponsorRes)
    // userOperation.paymasterAndData = sponsorRes.paymasterAndData
    console.log("userOperation >>>> ", userOperation)

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

export async function estimateWithPimlico(userOperation: IUserOperation) {
  try {
    const pimlicoEndpoint = `https://api.pimlico.io/v1/mumbai/rpc?apikey=${AppConfig.PIMLICO_API_KEY}`
    const pimlicoProvider = new ethers.JsonRpcProvider(pimlicoEndpoint)

    userOperation.nonce = userOperation.nonce
    const estimationResult = await pimlicoProvider.send("eth_estimateUserOperationGas", [userOperation, ENTRYPOINT_ADDRESS])
    console.log(`UserOperation estimated. Result: ${estimationResult}`)

    return estimationResult
  } catch (error) {
    console.log("estimateWithPimlico error >>>> ", error)
    throw error
  }
}
export async function sponsorWithPimlico(userOperation: IUserOperation) {

  try {
    const pimlicoEndpoint = `https://api.pimlico.io/v1/mumbai/rpc?apikey=${AppConfig.PIMLICO_API_KEY}`
    const pimlicoProvider = new ethers.JsonRpcProvider(pimlicoEndpoint)

    let estimations = await estimateWithPimlico(userOperation)

    const sponsorRes = await pimlicoProvider.send("pm_sponsorUserOperation", [userOperation, ENTRYPOINT_ADDRESS])
    console.log(`sponsorRes >> : ${sponsorRes}`)
    estimations.paymasterAndData = sponsorRes.paymasterAndData

    return estimations

  } catch (error) {
    console.log("sendWithBiconomy error >>>> ", error)
    // throw error
  }
}

export async function sendWithPimlico(userOperation: IUserOperation) {
  try {
    const pimlicoEndpoint = `https://api.pimlico.io/v1/mumbai/rpc?apikey=${AppConfig.PIMLICO_API_KEY}`
    const pimlicoProvider = new ethers.JsonRpcProvider(pimlicoEndpoint)

    const userOperationHash = await pimlicoProvider.send("eth_sendUserOperation", {userOperation, ENTRYPOINT_ADDRESS})
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
  } catch (error) {
    console.log("sendWithPimlico error >>>> ", error)
    throw error
  }
}

async function estimateWithBiconomy(userOperation: IUserOperation) {
  try {
    const estimations = await bundler.estimateUserOpGas(userOperation)
    return estimations
  } catch (error) {
    console.log("sendWithBiconomy error >>>> ", error)
    throw error
  }
}

export async function sponsorWithBiconomy(userOperation: IUserOperation) {
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
      calculateGasLimits: true,
      expiryDuration: 300, //5mins
      sponsorshipInfo: {
          webhookData: {},
          smartAccountInfo: {
              name: "BICONOMY",
              version: "1.0.0"
          }
      }
    }

    let response = await fetch('https://paymaster.biconomy.io/api/v1/80001/wKaNk3Beg.cc64c1e0-8898-4cb8-aeed-3846cfc6967e', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        id: 1,
        jsonrpc: "2.0",
        method: "pm_sponsorUserOperation",
        params: [
          partialUserOperation,
          paymasterServiceData
        ]
      }),
    })

    const estimations = await response.json()
    return estimations.result

  } catch (error) {
    console.log("sponsorWithBiconomy error >>>> ", error)
    throw error
  }
}

export async function sendWithBiconomy(userOperation: IUserOperation) {
  try {
    // const useropResponse = await bundler.sendUserOp(userOperation, "validation_and_execution")
    // const tx = await useropResponse.waitForTxHash()
    

    let response = await fetch('https://bundler.biconomy.io/api/v2/80001/nJPK7B3ru.dd7f7861-190d-41bd-af80-6877f74b8f44', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        id: 1697033408,
        jsonrpc: "2.0",
        method: "eth_sendUserOperation",
        params: [
          userOperation,
          ENTRYPOINT_ADDRESS,
          {
            "simulation_type": "validation"
          }
        ]
      }),
    })

    const tx = await response.json()

    const userOpStatus = await bundler.getUserOpStatus(tx.result)
     return {
      transactionHash: userOpStatus.transactionHash,
      userOpHash: tx.result,
      userOperationReceipt: userOpStatus.userOperationReceipt,
      state: userOpStatus.state
     }
     
  } catch (error) {
    console.log("sendWithBiconomy error >>>> ", error)
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

async function getFeeData()  {
  try {
    let bundleFeeVal = await bundler.getGasFeeValues()
    return bundleFeeVal
  } catch (error) {
    console.log("getFeeData error >>>> ", error)
    throw error 
  }
}