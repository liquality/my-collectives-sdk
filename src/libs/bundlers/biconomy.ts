
import {  PaymasterMode } from "@biconomy/paymaster";
import { IUserOperation } from '../../types/types';
import {ENTRYPOINT_ADDRESS, CALL_GAS_LIMIT} from "../constants"
import * as ethers5 from 'ethers5';
import { IBundler, Bundler } from "@biconomy/bundler";
import { ChainId } from "@biconomy/core-types";



const bundler: IBundler = new Bundler({
    bundlerUrl: 'https://bundler.biconomy.io/api/v2/80001/nJPK7B3ru.dd7f7861-190d-41bd-af80-6877f74b8f44',     
    chainId: ChainId.POLYGON_MUMBAI,
    entryPointAddress: ENTRYPOINT_ADDRESS,
})


export async function estimate(userOperation: IUserOperation) {
    try {
      let estimations = await bundler.estimateUserOpGas(userOperation)
      estimations.callGasLimit = (Number(estimations.callGasLimit) + Number(CALL_GAS_LIMIT)).toString()
      return estimations
    } catch (error) {
      console.log("send error >>>> ", error)
      throw error
    }
  }
  
  export async function sponsor(userOperation: IUserOperation) {
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
  
      const estimations = (await response.json()).result
        // estimations.callGasLimit = (Number(estimations.callGasLimit) + Number(CALL_GAS_LIMIT)).toString()
      return estimations

  
    } catch (error) {
      console.log("sponsor error >>>> ", error)
      throw error
    }
  }
  
  export async function send(signer: ethers5.Signer, cWallet:string,  userOperation: IUserOperation) {
    try {
  
      // Local interact with entrypoint
      // const entryContract = new ethers5.Contract(ENTRYPOINT_ADDRESS, ENTRYPOINT_ABI, signer)
      // const data = entryContract.interface.encodeFunctionData("handleOps", [[userOperation], cWallet])
      // console.log("data >> ", data)
      // const tx = await entryContract.handleOps([userOperation], cWallet, {gasLimit: 10000000})
      // console.log(" !! tx >>>> ", tx)
  
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
  
       return tx
       
    } catch (error) {
      console.log("send error >>>> ", error)
      throw error
    }
  }

    export async function getFeeData()  {
    try {
      let bundleFeeVal = await bundler.getGasFeeValues()
      return bundleFeeVal
    } catch (error) {
      console.log("getFeeData error >>>> ", error)
      throw error 
    }
  }