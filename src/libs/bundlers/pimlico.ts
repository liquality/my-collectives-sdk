
import { ethers } from 'ethers';
import { AppConfig } from '../../config';
import { IUserOperation } from '../../types/types';
import {ENTRYPOINT_ADDRESS} from "../constants"

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